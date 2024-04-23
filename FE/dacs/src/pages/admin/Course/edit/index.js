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

const animatedComponents = makeAnimated();

const initFormData = {
    id: "",
    title: "",
    description: "",
    price: "",
    thumbnail: "",
    date: "",
    lessons: [],
    categories: [],
};

function EditCourse() {
    const [formData, setFormData] = useState(initFormData);
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const { id } = useParams();

    let timerId;
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e, index) => {
        const file = e.target.files[0];
        if (file.type === "video/mp4") {
            const newLessons = [...formData.lessons];
            newLessons[index] = {
                ...newLessons[index],
                video: file,
                isEditedVideo: 1,
            };
            console.log(newLessons);
            setFormData({ ...formData, lessons: [...newLessons] });
        } else {
            setFormData({
                ...formData,
                thumbnail: file,
                isEditedThumbnail: 1,
            });
        }
        e.target.value = "";
    };

    const handleSelectChange = (e) => {
        let newCate = [];
        e.forEach(({ name, value }) => {
            newCate = [...newCate, value];
        });
        setFormData({
            ...formData,
            categories: [...newCate],
        });
    };

    const handleRemoveItemPrevivew = (e, type, index) => {
        if (type === "video") {
            const newLesson = [...formData.lessons];
            newLesson[index] = {
                ...newLesson[index],
                video: "",
            };
            setFormData({ ...formData, lessons: [...newLesson] });
        } else setFormData({ ...formData, thumbnail: "" });
        e.target.value = "";
    };

    const handleAddLesson = () => {
        let lesson = {
            title: "",
            description: "",
            video: "",
            linkVideo: "",
        };
        const updatedLessons = [...formData.lessons];

        updatedLessons.push(lesson);
        setFormData({
            ...formData,
            lessons: [...updatedLessons],
        });
    };

    const handleInputLessonChange = (e, index) => {
        const { name, value } = e.target;
        const updateLessons = [...formData.lessons];
        updateLessons[index] = {
            ...updateLessons[index],
            [name]: value,
            isEdited: true,
        };

        setFormData({
            ...formData,
            lessons: [...updateLessons],
        });
    };

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await DataApi.getAllCategories();
                var listOption = [];
                result.forEach((category) => {
                    const { id, name } = category;
                    listOption.push({ value: id, label: name });
                });
                setOptions(listOption);
            } catch (error) {
                console.log("Error while get categories");
            }
        };

        const fetchData = async () => {
            toast.promise(DataApi.getCourseById(id), {
                loading: "Loading...",
                success: (data) => {
                    setFormData(data.content);
                    const defaultValues = [...data.content.categories];
                    const defaultValue = options.filter((option) =>
                        defaultValues.includes(option.value)
                    );
                    setSelectedOptions(defaultValue);
                    return "Get data successfully";
                },
                error: (error) => {
                    return error.content;
                },
            });
        };

        fetchData();
        fetchApi();
    }, []);

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

    console.log("render");

    const handleSubmit = (e) => {
        e.preventDefault();

        const thumbnail = formData.thumbnail;

        const videos = [];
        formData.lessons.forEach((less) => {
            if (less.video instanceof File) {
                videos.push(less.video);
            }
        });

        const featchApi = async () => {
            const { lessons, ...course } = formData;
            toast.promise(
                DataApi.updateCourse(id, course, lessons, thumbnail, videos),
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

    const handleRemoveLesson = (index) => {
        console.log(index);
        var newLessons = [...formData.lessons];
        newLessons.splice(index, 1);
        setFormData({ ...formData, lessons: [...newLessons] });
    };

    return (
        <div>
            <>
                <div className="container flex flex-col">
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
                                    className={clsx(
                                        styles.formLabel,
                                        styles.descInput
                                    )}
                                >
                                    Description
                                </label>
                            </div>
                            <div className={clsx("flex")}>
                                <div
                                    className={clsx(
                                        styles.formField,
                                        "w-1/2 mr-9"
                                    )}
                                >
                                    <Select
                                        isMulti
                                        components={animatedComponents}
                                        onChange={handleSelectChange}
                                        defaultValue={selectedOptions}
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
                                <div
                                    className={clsx(styles.formField, "w-1/2")}
                                >
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
                                <div
                                    className={clsx(styles.formField, "w-1/2")}
                                >
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
                                                className={clsx(
                                                    styles.thumbnailImg
                                                )}
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
                                                className={clsx(
                                                    styles.btnClose
                                                )}
                                            >
                                                {" "}
                                                <img
                                                    src={btnClose}
                                                    alt=""
                                                />{" "}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/*NOTE Lesson */}

                            <h5 className="text-center">Lesson</h5>

                            <div className={clsx(styles.lessonArea)}>
                                {formData.lessons &&
                                    formData.lessons.map((lesson, index) => {
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
                                                        Lesson {index + 1}
                                                    </div>
                                                    <div
                                                        className="justify-center px-3 py-1.5 text-sm cursor-pointer font-medium text-center text-white bg-black rounded-lg max-md:max-w-1/5 w-1/5 self-center"
                                                        onClick={() => {
                                                            handleRemoveLesson(
                                                                index
                                                            );
                                                        }}
                                                    >
                                                        {" "}
                                                        Remove
                                                    </div>
                                                </div>
                                                <div
                                                    className={clsx(
                                                        styles.formField
                                                    )}
                                                >
                                                    <input
                                                        name={`title`}
                                                        onChange={(e) => {
                                                            handleInputLessonChange(
                                                                e,
                                                                index
                                                            );
                                                        }}
                                                        value={lesson.title}
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
                                                        onChange={(e) => {
                                                            handleInputLessonChange(
                                                                e,
                                                                index
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
                                                            htmlFor={`video${index}`}
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
                                                            onChange={(e) => {
                                                                handleFileChange(
                                                                    e,
                                                                    index
                                                                );
                                                            }}
                                                            id={`video${index}`}
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
                                                                            index
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
                                                        value={lesson.linkVideo}
                                                        onChange={(e) => {
                                                            handleInputLessonChange(
                                                                e,
                                                                index
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
                            </div>
                            <button
                                type="submit"
                                className="justify-center px-5 py-3.5 mt-5 text-sm font-medium text-center text-white bg-black rounded-lg max-md:max-w-1/2 w-1/2 self-center"
                                onClick={handleAddLesson}
                            >
                                Add Lesson
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
            </>
        </div>
    );
}

export default EditCourse;
