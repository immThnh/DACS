import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./CreateCourse.module.scss";
import clsx from "clsx";
import fileSelect from "../../../../assets/images/fileSelect.svg";
import { useEffect, useState } from "react";
import Select from "react-select";
import * as DataApi from "../../../../api/apiService/dataService";
import { toast } from "sonner";
import btnClose from "../../../../assets/images/btnClose.svg";

const initFormData = {
    title: "",
    description: "",
    price: "",
    thumbnail: "",
    date: "",
    categories: [],
};

function CreateCourse() {
    const [formData, setFormData] = useState(initFormData);
    const [options, setOptions] = useState([]);
    const [lessons, setLessons] = useState([]);
    let timerId;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange1 = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            thumbnail: file,
        });
    };

    const handleFileChange = (e, index) => {
        const file = e.target.files[0];
        if (file.type === "video/mp4") {
            const newLessons = [...lessons];
            newLessons[index] = {
                ...newLessons[index],
                video: file,
            };
            setLessons([...newLessons]);
        } else {
            let newData = { ...formData };
            newData = {
                ...newData,
                thumbnail: file,
            };
            setFormData({ ...newData });
        }
        e.target.value = "";
    };

    const handleSelectChange = (e) => {
        setFormData({
            ...formData,
            categories: [...e],
        });
    };
    const handleRemoveItemPrevivew = (e, type, index) => {
        if (type === "video") {
            console.log(index);
            const newLesson = [...lessons];
            newLesson[index] = {
                ...newLesson[index],
                video: "",
            };
            setLessons([...newLesson]);
        } else setFormData({ ...formData, thumbnail: "" });
        e.target.value = "";
    };

    const handleAddLesson = () => {
        let lesson = {
            stt: "",
            title: "",
            description: "",
            video: "",
            linkVideo: "",
        };
        const updatedLessons = [...lessons];
        if (lessons.length === 0) {
            lesson.stt = "1";
        } else lesson.stt = lessons.length + 1;
        updatedLessons.push(lesson);
        setLessons(updatedLessons);
    };

    const handleInputLessonChange = (e, index) => {
        console.log(e.target.dataset.section);
        const { name, value } = e.target;
        const updateLessons = [...lessons];
        updateLessons[index] = {
            ...updateLessons[index],
            [name]: value,
        };

        setLessons([...updateLessons]);
    };

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await DataApi.getAllCategories();
                setOptions(result);
            } catch (error) {
                console.log("Error while get categories");
            }
        };
        fetchApi();
    }, []);

    console.log("render");

    const handleSubmit = (e) => {
        e.preventDefault();

        const thumbnail = formData.thumbnail;

        const videos = [];
        lessons.forEach((less) => {
            videos.push(less.video);
        });

        const featchApi = async () => {
            let newCategories = [];
            formData.categories.forEach((cate) => newCategories.push(cate.id));
            const newFormData = {
                ...formData,
                categories: newCategories,
            };
            toast.promise(
                DataApi.createCourse(newFormData, lessons, thumbnail, videos),
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

    const handleRemoveLesson = (index) => {
        var newLessons = [...lessons];
        newLessons.splice(index, 1);
        setLessons([...newLessons]);
    };

    const debounce = (func, delay = 600) => {
        return () => {
            clearTimeout(timerId);

            timerId = setTimeout(() => {
                func();
            }, delay);
        };
    };

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
                                className={clsx(styles.formField, "w-1/2 mr-9")}
                            >
                                <Select
                                    isMulti
                                    onChange={handleSelectChange}
                                    value={formData.categories}
                                    getOptionLabel={(x) => x.name}
                                    getOptionValue={(x) => x.id}
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
                                {/* <Combobox
                                    fValueChange={handleInputChange}
                                    title="Category"
                                    list={["C#", "Java"]}
                                ></Combobox> */}
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
                        <div className={clsx(styles.formField)}>
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
                                onChange={handleFileChange1}
                                id="thumbnail"
                                type="file"
                                hidden
                            />

                            <div className={clsx(styles.imgList)}>
                                {formData.thumbnail && (
                                    <div className={clsx(styles.imgField)}>
                                        <img
                                            src={URL.createObjectURL(
                                                formData.thumbnail
                                            )}
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

                        {/*NOTE Lesson */}

                        <h5 className="text-center">Lesson</h5>

                        <div className={clsx(styles.lessonArea)}>
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
                                                    value={lesson.description}
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
                                                                src={fileSelect}
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
                                                                onClick={(e) =>
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
                            Create Course
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateCourse;
