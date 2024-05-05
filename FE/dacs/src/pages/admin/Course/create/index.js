import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./CreateCourse.module.scss";
import clsx from "clsx";
import fileSelect from "../../../../assets/images/fileSelect.svg";
import { useEffect, useState } from "react";
import Select from "react-select";
import * as DataApi from "../../../../api/apiService/dataService";
import { toast } from "sonner";
import btnClose from "../../../../assets/images/btnClose.svg";
import axios from "axios";

const initFormData = {
    title: "",
    description: "",
    price: "",
    thumbnail: "",
    date: "",
    categories: [],
    sections: [],
};

function CreateCourse() {
    const [formData, setFormData] = useState(initFormData);
    const [options, setOptions] = useState([]);
    const [errors, setErrors] = useState({});
    let timerId;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        errors[name] = "";
        setErrors(errors);
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e, index, indexSection) => {
        const file = e.target.files[0];
        if (file.type === "video/mp4") {
            const updateSection = { ...formData.sections[indexSection] };
            updateSection.lessons[index] = {
                ...updateSection.lessons[index],
                video: file,
                actionVideo: "UPDATE",
            };
            const updateSections = [...formData.sections];
            updateSections[indexSection] = updateSection;

            setFormData({ ...formData, sections: [...updateSections] });
        } else {
            setFormData({
                ...formData,
                thumbnail: file,
            });
        }
        e.target.value = "";
        errors[e.target.name] = "";
        setErrors(errors);
    };

    const handleSelectChange = (e) => {
        setFormData({
            ...formData,
            categories: [...e],
        });
    };

    const handleUpdateVideoCourse = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, video: file });
    };

    const handleRemoveItemPrevivew = (e, type, index, sectionIndex) => {
        if (type === "video") {
            const updateSection = { ...formData.sections[sectionIndex] };
            updateSection.lessons[index] = {
                ...updateSection.lessons[index],
                video: null,
                actionVideo: "NONE",
            };
            const updateSections = [...formData.sections];
            updateSections[sectionIndex] = { ...updateSection };
            setFormData({ ...formData, sections: [...updateSections] });
        } else setFormData({ ...formData, thumbnail: "" });
        e.target.value = "";
    };

    const handleInputLessonChange = (e, index, sectionIndex) => {
        const { name, value } = e.target;
        const updateSection = { ...formData.sections[sectionIndex] };
        const updateSections = [...formData.sections];
        updateSection.lessons[index] = {
            ...updateSection.lessons[index],
            [name]: value,
        };
        updateSections[sectionIndex] = { ...updateSection };

        errors[name] = "";
        setErrors(errors);

        setFormData({
            ...formData,
            sections: [...updateSections],
        });
    };

    const handleRemoveLesson = (index, sectionId) => {
        var newSection = { ...formData.sections[sectionId] };
        newSection.lessons.splice(index, 1);
        var newSections = [...formData.sections];

        newSections[sectionId] = newSections;
        setFormData({ ...formData, sections: newSections });
    };

    const handleAddLesson = (sectionIndex) => {
        let lesson = {
            title: "",
            description: "",
            video: "",
            linkVideo: "",
        };
        const updateSection = { ...formData.sections[sectionIndex] };
        updateSection.lessons.push(lesson);
        const updateSections = [...formData.sections];
        updateSections[sectionIndex] = updateSection;

        setFormData({
            ...formData,
            sections: [...updateSections],
        });
    };

    const handleInputSectionChange = (e, sectionIndex) => {
        const updateSection = formData.sections[sectionIndex];
        updateSection.title = e.target.value;
        const updateSections = [...formData.sections];
        updateSections[sectionIndex] = updateSection;
        setFormData({ ...formData, sections: [...updateSections] });
    };

    const handleRemoveSection = (index) => {
        const updateSections = [...formData.sections];
        updateSections.splice(index, 1);
        setFormData({ ...formData, sections: [...updateSections] });
    };

    const debounce = (func, delay = 600) => {
        return () => {
            clearTimeout(timerId);

            timerId = setTimeout(() => {
                func();
            }, delay);
        };
    };

    const handleCreateSection = () => {
        const newSection = {
            title: "",
            lessons: [],
        };

        const newSections = [...formData.sections];
        newSections.push(newSection);
        setFormData({ ...formData, sections: [...newSections] });
    };

    const handleRemoveVideoCourse = (e) => {
        setFormData({ ...formData, video: null });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let errors = [];
        // Object.keys(formData).forEach((key) => {
        //     if (formData[key] === "") {
        //         errors[key] = "This field is required.";
        //     }
        // });

        // if (Object.keys(errors).length > 0) {
        //     setErrors(errors);
        //     return;
        // }
        // console.log(formData);

        const thumbnail = formData.thumbnail;
        const courseVideo = formData.video;
        formData.video = "";

        const videos = [];
        formData.sections.forEach((section) => {
            if (section.lessons)
                section.lessons.forEach((less) => {
                    if (less.video instanceof File) {
                        videos.push(less.video);
                        less.video = "";
                    }
                });
        });

        const featchApi = async () => {
            let newCategories = [];
            formData.categories.forEach((cate) => newCategories.push(cate.id));
            const newCourse = {
                ...formData,
                categories: newCategories,
            };
            toast.promise(
                DataApi.createCourse(newCourse, thumbnail, courseVideo, videos),
                {
                    loading: "Loading...",
                    success: () => {
                        window.location.reload();
                        return "Create successfully";
                    },
                    error: (error) => {
                        console.log(error);
                        return error.mess;
                    },
                }
            );
        };

        const debounceApi = debounce(featchApi);
        debounceApi();
    };
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await DataApi.getAllCategories(0, 99999999);
                setOptions(result.content.content);
            } catch (error) {
                console.log(error.mess);
            }
        };
        fetchApi();
    }, []);

    console.log("render");
    return (
        <>
            <div className="container flex flex-col">
                <div className="wrapMainDash mr-auto w-3/4 ">
                    <h3 className="titleMainDash">Create a new course</h3>
                    <div
                        className={clsx(
                            styles.formGroup,
                            "flex gap-6 flex-col rounded-lg"
                        )}
                    >
                        <div className={clsx(styles.formField)}>
                            <input
                                required
                                onChange={handleInputChange}
                                value={formData.title}
                                name="title"
                                data-validate
                                className={clsx(styles.formInput)}
                                type="text"
                            />
                            <label className={clsx(styles.formLabel)}>
                                Course Name
                            </label>
                            {errors.title && (
                                <div className="text-red-500 mt-1 text-sm ml-1">
                                    {errors.title}
                                </div>
                            )}
                        </div>
                        <div className={clsx(styles.formField)}>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className={clsx(styles.formInput, "h-22")}
                                type="text"
                            />
                            <label
                                className={clsx(
                                    styles.formLabel,
                                    styles.descInput
                                )}
                            >
                                Description
                            </label>
                            {errors.description && (
                                <div className="text-red-500 mt-1 text-sm ml-1">
                                    {errors.description}
                                </div>
                            )}
                        </div>
                        <div className={clsx("flex")}>
                            <div
                                className={clsx(styles.formField, "w-1/2 mr-9")}
                            >
                                <Select
                                    isMulti
                                    onChange={handleSelectChange}
                                    value={formData.categories}
                                    getOptionLabel={(x) => x.name}
                                    getOptionValue={(x) => x.id}
                                    options={options}
                                    name="categories"
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            borderColor: state.isFocused
                                                ? "black"
                                                : "#e9ecee",
                                        }),
                                    }}
                                />
                                <label className={clsx(styles.formLabel)}>
                                    Category
                                </label>
                                {errors.categories && (
                                    <div className="text-red-500 mt-1 text-sm ml-1">
                                        {errors.categories}
                                    </div>
                                )}
                            </div>
                            <div className={clsx(styles.formField, "w-1/2")}>
                                <input
                                    name="price"
                                    onChange={handleInputChange}
                                    value={formData.price}
                                    min="0"
                                    className={clsx(styles.formInput)}
                                    type="number"
                                />
                                <label className={clsx(styles.formLabel)}>
                                    Price
                                </label>
                                {errors.price && (
                                    <div className="text-red-500 mt-1 text-sm ml-1">
                                        {errors.price}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex">
                            <div className={clsx(styles.formField, "w-1/2")}>
                                <span className={clsx(styles.formLabel2)}>
                                    Thumbnail
                                </span>
                                <label
                                    htmlFor="thumbnail"
                                    className={clsx(
                                        styles.formLabel2,
                                        styles.labelFile
                                    )}
                                >
                                    <div className={clsx(styles.iconFile)}>
                                        <img src={fileSelect} alt="" />
                                    </div>
                                </label>
                                {errors.thumbnail && (
                                    <div className="text-red-500 mt-1 text-sm ml-1">
                                        {errors.thumbnail}
                                    </div>
                                )}

                                <input
                                    name="thumbnail"
                                    onChange={handleFileChange}
                                    id="thumbnail"
                                    type="file"
                                    hidden
                                    accept=".jpg, .jpeg, .png"
                                />
                            </div>
                            <div
                                className={clsx(
                                    styles.formField,
                                    "w-1/2 mt-8 ml-9"
                                )}
                            >
                                {formData.thumbnail && (
                                    <div className={clsx(styles.imgField)}>
                                        <img
                                            className={clsx(
                                                styles.thumbnailImg
                                            )}
                                            src={URL.createObjectURL(
                                                formData.thumbnail
                                            )}
                                            alt=""
                                        />
                                        <button
                                            onClick={(e) =>
                                                handleRemoveItemPrevivew(e)
                                            }
                                            className={clsx(
                                                styles.btnClosePreview
                                            )}
                                        >
                                            <img src={btnClose} alt="" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex">
                            <div className={clsx(styles.formField, "w-1/2")}>
                                <span className={clsx(styles.formLabel2)}>
                                    Video
                                </span>
                                <label
                                    htmlFor={`courseVideo`}
                                    className={clsx(
                                        styles.formLabel2,
                                        styles.labelFile
                                    )}
                                >
                                    <div className={clsx(styles.iconFile)}>
                                        <img src={fileSelect} alt="" />
                                    </div>
                                </label>
                                <input
                                    name="video"
                                    onChange={handleUpdateVideoCourse}
                                    id={`courseVideo`}
                                    type="file"
                                    hidden
                                    accept=".mp4"
                                />
                            </div>
                            <div
                                className={clsx(
                                    styles.formField,
                                    "w-1/2 mt-8 ml-9"
                                )}
                            >
                                {formData.video && (
                                    <div className={clsx(styles.videoField)}>
                                        <video
                                            id="video"
                                            controls
                                            className="rounded-lg"
                                        >
                                            <source
                                                src={URL.createObjectURL(
                                                    formData.video
                                                )}
                                                type="video/mp4"
                                            />
                                        </video>
                                        <button
                                            className={clsx(
                                                styles.btnClosePreview
                                            )}
                                            onClick={(e) =>
                                                handleRemoveVideoCourse(e)
                                            }
                                        >
                                            {" "}
                                            <img src={btnClose} alt="" />{" "}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/*NOTE Lesson */}
                        <h5 className="text-center font-semibold text-3xl">
                            Curriculum
                        </h5>

                        <div className={clsx(styles.lessonArea)}>
                            {formData.sections &&
                                formData.sections.map(
                                    (section, sectionIndex) => {
                                        const lessons = section.lessons;
                                        return (
                                            <div
                                                className={clsx(
                                                    "mt-1 flex flex-col"
                                                )}
                                                key={sectionIndex}
                                            >
                                                <div
                                                    className={clsx(
                                                        styles.sectionName,
                                                        "text-center  font-semibold"
                                                    )}
                                                >
                                                    Section {sectionIndex + 1}
                                                </div>
                                                <div
                                                    className="justify-end px-3 py-1.5 text-sm cursor-pointer font-medium text-center text-white bg-black rounded-lg max-md:max-w-1/5 w-1/5 self-end"
                                                    onClick={() => {
                                                        handleRemoveSection(
                                                            sectionIndex
                                                        );
                                                    }}
                                                >
                                                    {" "}
                                                    Remove section
                                                </div>
                                                <div
                                                    className={clsx(
                                                        styles.formField,
                                                        "mt-4"
                                                    )}
                                                >
                                                    <input
                                                        data-section="1"
                                                        name={`title`}
                                                        onChange={(e) => {
                                                            handleInputSectionChange(
                                                                e,
                                                                sectionIndex
                                                            );
                                                        }}
                                                        value={section.title}
                                                        className={clsx(
                                                            styles.formInput
                                                        )}
                                                        type="text"
                                                    />
                                                    <label
                                                        className={clsx(
                                                            styles.formLabel
                                                        )}
                                                    >
                                                        Section Name
                                                    </label>
                                                </div>
                                                {lessons &&
                                                    lessons.map(
                                                        (lesson, index) => {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className={clsx(
                                                                        styles.lessonField,
                                                                        "gap-6 flex flex-col mt-4"
                                                                    )}
                                                                >
                                                                    <div
                                                                        className={clsx(
                                                                            styles.formField,
                                                                            "flex justify-between"
                                                                        )}
                                                                    >
                                                                        <div className="self-center  font-semibold">
                                                                            Lesson{" "}
                                                                            {index +
                                                                                1}
                                                                        </div>

                                                                        <div
                                                                            className="justify-center px-3 py-1.5 text-sm cursor-pointer font-medium text-center text-white bg-black rounded-lg max-md:max-w-1/5 w-1/5 self-center"
                                                                            onClick={() => {
                                                                                handleRemoveLesson(
                                                                                    index,
                                                                                    sectionIndex
                                                                                );
                                                                            }}
                                                                        >
                                                                            {" "}
                                                                            Remove
                                                                            lesson
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className={clsx(
                                                                            styles.formField
                                                                        )}
                                                                    >
                                                                        <input
                                                                            data-section="1"
                                                                            name={`title`}
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                handleInputLessonChange(
                                                                                    e,
                                                                                    index,
                                                                                    sectionIndex
                                                                                );
                                                                            }}
                                                                            value={
                                                                                lesson.title
                                                                            }
                                                                            className={clsx(
                                                                                styles.formInput
                                                                            )}
                                                                            type="text"
                                                                        />
                                                                        <label
                                                                            className={clsx(
                                                                                styles.formLabel
                                                                            )}
                                                                        >
                                                                            Lesson
                                                                            Name
                                                                        </label>
                                                                    </div>
                                                                    <div
                                                                        className={clsx(
                                                                            styles.formField
                                                                        )}
                                                                    >
                                                                        <textarea
                                                                            name="description"
                                                                            value={
                                                                                lesson.description
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                handleInputLessonChange(
                                                                                    e,
                                                                                    index,
                                                                                    sectionIndex
                                                                                );
                                                                            }}
                                                                            className={clsx(
                                                                                styles.formInput,
                                                                                "h-22"
                                                                            )}
                                                                            type="text"
                                                                        />
                                                                        <label
                                                                            className={clsx(
                                                                                styles.formLabel,
                                                                                styles.descInput
                                                                            )}
                                                                        >
                                                                            Description
                                                                        </label>
                                                                    </div>
                                                                    <div className="flex">
                                                                        <div
                                                                            className={clsx(
                                                                                styles.formField,
                                                                                "w-1/2"
                                                                            )}
                                                                        >
                                                                            <span
                                                                                className={clsx(
                                                                                    styles.formLabel2
                                                                                )}
                                                                            >
                                                                                Video
                                                                            </span>
                                                                            <label
                                                                                htmlFor={`video${section.title}${index}`}
                                                                                className={clsx(
                                                                                    styles.formLabel2,
                                                                                    styles.labelFile
                                                                                )}
                                                                            >
                                                                                <div
                                                                                    className={clsx(
                                                                                        styles.iconFile
                                                                                    )}
                                                                                >
                                                                                    <img
                                                                                        src={
                                                                                            fileSelect
                                                                                        }
                                                                                        alt=""
                                                                                    />
                                                                                </div>
                                                                            </label>
                                                                            <input
                                                                                name="video"
                                                                                onChange={(
                                                                                    e
                                                                                ) => {
                                                                                    handleFileChange(
                                                                                        e,
                                                                                        index,
                                                                                        sectionIndex
                                                                                    );
                                                                                }}
                                                                                id={`video${section.title}${index}`}
                                                                                type="file"
                                                                                hidden
                                                                                accept=".mp4"
                                                                            />
                                                                        </div>
                                                                        <div
                                                                            className={clsx(
                                                                                styles.formField,
                                                                                "w-1/2 mt-8 ml-9"
                                                                            )}
                                                                        >
                                                                            {lesson.video && (
                                                                                <div
                                                                                    className={clsx(
                                                                                        styles.videoField
                                                                                    )}
                                                                                >
                                                                                    <video
                                                                                        id="video"
                                                                                        controls
                                                                                        className="rounded-lg"
                                                                                    >
                                                                                        <source
                                                                                            src={URL.createObjectURL(
                                                                                                lesson.video
                                                                                            )}
                                                                                            type="video/mp4"
                                                                                        />
                                                                                    </video>
                                                                                    <button
                                                                                        className={clsx(
                                                                                            styles.btnClosePreview
                                                                                        )}
                                                                                        onClick={(
                                                                                            e
                                                                                        ) =>
                                                                                            handleRemoveItemPrevivew(
                                                                                                e,
                                                                                                "video",
                                                                                                index,
                                                                                                sectionIndex
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        {" "}
                                                                                        <img
                                                                                            src={
                                                                                                btnClose
                                                                                            }
                                                                                            alt=""
                                                                                        />{" "}
                                                                                    </button>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className={clsx(
                                                                            styles.formField
                                                                        )}
                                                                    >
                                                                        <input
                                                                            name="linkVideo"
                                                                            value={
                                                                                lesson.linkVideo
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                handleInputLessonChange(
                                                                                    e,
                                                                                    index,
                                                                                    sectionIndex
                                                                                );
                                                                            }}
                                                                            className={clsx(
                                                                                styles.formInput
                                                                            )}
                                                                            type="text"
                                                                        />
                                                                        <label
                                                                            className={clsx(
                                                                                styles.formLabel
                                                                            )}
                                                                        >
                                                                            Link
                                                                            Video
                                                                        </label>
                                                                    </div>

                                                                    {/* <div
                                                                        className={clsx(
                                                                            styles.formField
                                                                        )}
                                                                    >
                                                                        <input
                                                                            name="duration"
                                                                            value={
                                                                                lesson.duration
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                handleInputLessonChange(
                                                                                    e,
                                                                                    index,
                                                                                    sectionIndex
                                                                                );
                                                                            }}
                                                                            className={clsx(
                                                                                styles.formInput
                                                                            )}
                                                                            type="time"
                                                                        />
                                                                        <label
                                                                            className={clsx(
                                                                                styles.formLabel
                                                                            )}
                                                                        >
                                                                            Duration
                                                                        </label>
                                                                    </div> */}
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                <button
                                                    type="submit"
                                                    className="justify-start px-1 py-2 mt-4 text-sm font-medium text-center text-white bg-black rounded-lg max-md:max-w-1/5 w-1/5 self-start"
                                                    onClick={() =>
                                                        handleAddLesson(
                                                            sectionIndex
                                                        )
                                                    }
                                                >
                                                    Add Lesson
                                                </button>
                                            </div>
                                        );
                                    }
                                )}
                        </div>
                        <button
                            type="submit"
                            className="justify-center px-5 py-2.5 mt-5 text-sm font-medium text-center text-white bg-black rounded-lg max-md:max-w-1/3 w-1/3 self-center"
                            onClick={handleCreateSection}
                        >
                            Create Section
                        </button>

                        <button
                            type="submit"
                            className="justify-center px-5 py-3.5 mt-5 text-sm font-medium text-center text-white bg-black rounded-lg max-md:max-w-full w-full"
                            onClick={handleSubmit}
                        >
                            Create Course
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateCourse;
