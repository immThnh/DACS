import "bootstrap/dist/css/bootstrap.min.css";
import clsx from "clsx";
import styles from "../create/CreateCourse.module.scss";
import fileSelect from "../../../../assets/images/fileSelect.svg";
import { useEffect, useState } from "react";
import Select from "react-select";
import * as DataApi from "../../../../api/apiService/dataService";
import { toast } from "sonner";
import btnClose from "../../../../assets/images/btnClose.svg";
import { useParams } from "react-router-dom";
import makeAnimated from "react-select/animated";
import { clear } from "@testing-library/user-event/dist/clear";
import { isEditable } from "@testing-library/user-event/dist/utils";

const animatedComponents = makeAnimated();

const initFormData = {
    id: "",
    title: "",
    description: "",
    price: "",
    thumbnail: "",
    date: "",
    sections: [],
    categories: [],
};

function EditCourse() {
    const [formData, setFormData] = useState(initFormData);
    const [options, setOptions] = useState([]);
    const { id } = useParams();

    let timerId;

    //!NOTE: ============================START HANDLE ===================================

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e, index, indexSection) => {
        console.log(e.target.dataset.sectionindex);
        console.log("indexSection: " + indexSection);
        const file = e.target.files[0];
        if (file.type === "video/mp4") {
            let updateSection = { ...formData.sections[indexSection] };
            updateSection = {
                ...updateSection,
                isEdited: 1,
            };
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
                isEditThumbnail: 1,
            });
        }
        e.target.value = "";
    };

    const handleUpdateVideoCourse = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, video: file, actionVideo: "UPDATE" });
    };

    const handleSelectChange = (e) => {
        setFormData({
            ...formData,
            categories: [...e],
            isEditedCategories: 1,
        });
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

    const handleInputLessonChange = (e, index, sectionIndex) => {
        const { name, value } = e.target;
        let updateSection = {
            ...formData.sections[sectionIndex],
        };
        updateSection = {
            ...updateSection,
            isEdited: 1,
        };
        const updateSections = [...formData.sections];
        updateSection.lessons[index] = {
            ...updateSection.lessons[index],
            [name]: value,
        };
        updateSections[sectionIndex] = { ...updateSection };

        setFormData({
            ...formData,
            sections: [...updateSections],
        });
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

    const handleInputSectionChange = (e, sectionIndex) => {
        let updateSection = formData.sections[sectionIndex];
        updateSection = {
            ...updateSection,
            title: e.target.value,
            isEdited: 1,
        };
        const updateSections = [...formData.sections];
        updateSections[sectionIndex] = updateSection;
        setFormData({ ...formData, sections: [...updateSections] });
    };

    const handleRemoveSection = (index) => {
        const updateSections = [...formData.sections];
        updateSections.splice(index, 1);
        setFormData({ ...formData, sections: [...updateSections] });
    };

    const handleRemoveLesson = (index, sectionId) => {
        var newSection = { ...formData.sections[sectionId] };
        newSection.lessons.splice(index, 1);
        var newSections = [...formData.sections];

        newSections[sectionId] = newSections;
        setFormData({ ...formData, sections: newSections });
    };

    const handleRemoveVideoCourse = (e) => {
        setFormData({ ...formData, video: null, actionVideo: "REMOVE" });
    };

    //!NOTE: ========================END HANDLE ====================================

    function isURL(str) {
        const urlPattern = new RegExp(
            "^(https?:\\/\\/)?" + // protocol
                "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
                "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
                "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
                "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
                "(\\#[-a-z\\d_]*)?$",
            "i"
        ); // fragment locator
        return urlPattern.test(str);
    }

    //!======================================NOTE SUBMIT ========================
    const handleSubmit = (e) => {
        e.preventDefault();

        const thumbnail = formData.thumbnail;
        const video = formData.video;
        formData.video = null;
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

            if (newCourse.sections !== null) {
                for (var i = 0; i < newCourse.sections.length; i++) {
                    var section = newCourse.sections[i];
                    if (section.lessons) {
                        for (var j = 0; j < section.lessons.length; j++) {
                            var lesson = section.lessons[j];
                            if (lesson.video !== "") {
                                lesson.actionVideo = "KEEP";
                            }
                        }
                    }
                }
            }
            toast.promise(
                DataApi.updateCourse(id, newCourse, thumbnail, video, videos),
                {
                    loading: "Loading...",
                    success: () => {
                        window.location.reload();
                        return "Update successfully";
                    },
                    error: (error) => {
                        return error;
                    },
                }
            );
        };

        const debounceApi = debounce(featchApi);
        debounceApi();
    };

    const debounce = (func, delay = 600) => {
        return () => {
            clearTimeout(timerId);

            timerId = setTimeout(() => {
                func();
            }, delay);
        };
    };

    //!NOTE========================== USEFFECT ====================================
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await DataApi.getAllCategories();

                setOptions(result.content.content);

                toast.promise(DataApi.getCourseById(id), {
                    loading: "Loading...",
                    success: (data) => {
                        setFormData(data.content);
                        return "Get data successfully";
                    },
                    error: (error) => {
                        return error.content;
                    },
                });
            } catch (error) {
                console.log("Error while get categories");
            }
        };

        fetchApi();
    }, []);

    console.log("render");

    return (
        <div className="flex justify-center w-full ">
            <div className="wrapMainDash mr-auto w-3/4 ">
                <h3 className="titleMainDash">Edit</h3>
                <div
                    className={clsx(
                        styles.formGroup,
                        "flex gap-6 flex-col rounded-lg"
                    )}
                >
                    <div className={clsx(styles.formField)}>
                        <input
                            onChange={handleInputChange}
                            value={formData.title}
                            name="title"
                            className={clsx(styles.formInput)}
                            type="text"
                        />
                        <label className={clsx(styles.formLabel)}>
                            Course Name
                        </label>
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
                            className={clsx(styles.formLabel, styles.descInput)}
                        >
                            Description
                        </label>
                    </div>
                    <div className={clsx("flex")}>
                        <div className={clsx(styles.formField, "w-1/2 mr-9")}>
                            <Select
                                isMulti
                                components={animatedComponents}
                                onChange={handleSelectChange}
                                getOptionLabel={(x) => x.name}
                                getOptionValue={(x) => x.id}
                                value={formData.categories}
                                options={options}
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

                            <input
                                name="thumbnail"
                                onChange={handleFileChange}
                                id="thumbnail"
                                type="file"
                                hidden
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
                                        className={clsx(styles.thumbnailImg)}
                                        src={
                                            !isURL(formData.thumbnail)
                                                ? URL.createObjectURL(
                                                      formData.thumbnail
                                                  )
                                                : formData.thumbnail
                                        }
                                        alt=""
                                    />
                                    <button
                                        onClick={(e) =>
                                            handleRemoveItemPrevivew(e)
                                        }
                                        className={clsx(styles.btnClose)}
                                    >
                                        {" "}
                                        <img src={btnClose} alt="" />{" "}
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
                                        key={formData.video}
                                        controls
                                        className="rounded-lg"
                                    >
                                        <source
                                            src={
                                                !isURL(formData.video)
                                                    ? URL.createObjectURL(
                                                          formData.video
                                                      )
                                                    : formData.video
                                            }
                                            type="video/mp4"
                                        />
                                    </video>
                                    <button
                                        className={clsx(styles.btnClosePreview)}
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

                    <h5 className="text-center">Lesson</h5>

                    <div className={clsx(styles.lessonArea)}>
                        {formData.sections &&
                            formData.sections.map((section, sectionIndex) => {
                                const lessons = section.lessons;
                                return (
                                    <div
                                        className={clsx("mt-1 flex flex-col")}
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
                                            lessons.map((lesson, index) => {
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
                                                                {index + 1}
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
                                                                Remove lesson
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
                                                                Lesson Name
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
                                                                    o
                                                                    data-sectionIndex={
                                                                        sectionIndex
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleFileChange(
                                                                            e,
                                                                            index,
                                                                            sectionIndex
                                                                        )
                                                                    }
                                                                    id={`video${section.title}${index}`}
                                                                    type="file"
                                                                    hidden
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
                                                                            key={
                                                                                lesson.video
                                                                            }
                                                                            controls
                                                                            className="rounded-lg"
                                                                        >
                                                                            <source
                                                                                src={
                                                                                    !isURL(
                                                                                        lesson.video
                                                                                    )
                                                                                        ? URL.createObjectURL(
                                                                                              lesson.video
                                                                                          )
                                                                                        : lesson.video
                                                                                }
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
                                                                Link Video
                                                            </label>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        <button
                                            type="submit"
                                            className="justify-start px-1 py-2 mt-4 text-sm font-medium text-center text-white bg-black rounded-lg max-md:max-w-1/5 w-1/5 self-start"
                                            onClick={() =>
                                                handleAddLesson(sectionIndex)
                                            }
                                        >
                                            Add Lesson
                                        </button>
                                    </div>
                                );
                            })}
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
                        Update Course
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditCourse;
