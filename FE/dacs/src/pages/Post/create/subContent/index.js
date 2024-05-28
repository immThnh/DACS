import styles from "../../../admin/Course/create/CreateCourse.module.scss";
import clsx from "clsx";
import btnClose from "../../../../assets/images/btnClose.svg";
import fileSelect from "../../../../assets/images/fileSelect.svg";
import { useEffect, useState } from "react";
import React from "react";
import CreatableSelect from "react-select/creatable";
import { toast } from "sonner";
import * as UserApi from "../../../../api/apiService/authService";
import { useSelector } from "react-redux";
import * as DataApi from "../../../../api/apiService/dataService";

const options = ["Java", "React", "Node", "Python", "C++", "C#"].map(
    (option) => ({
        value: option,
        label: option,
    })
);

const customStyles = {
    control: (provided) => ({
        ...provided,
        height: 50,
    }),
};

function SubContent({ post = {}, handleBackClick }) {
    const [thumbnail, setThumbnail] = useState(null);
    const user = useSelector((state) => state.login.user);
    const [tags, setTags] = useState([]);

    const handleRemovePreview = () => {
        setThumbnail(null);
    };

    const handleChangeTag = (e) => {
        console.log(e);
        console.log("object");
        // if (tags.length <= 4 && e.length <= 4) {
        //     setTags(e);
        // }
    };

    const handlePublish = () => {
        const tagsValue = tags.map((tag) => {
            return {
                name: tag.value,
            };
        });
        post = { ...post, tags: tagsValue, thumbnail };
        toast.promise(UserApi.createPost({ ...post }, user.email), {
            loading: "loading...",
            success: (result) => {
                return result.mess;
            },
            error: (error) => {
                console.log(error);
                return error.mess;
            },
        });
    };

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await DataApi.serchTag();
            } catch (error) {}
        };
    }, []);

    return (
        <div className="container mt-10">
            <div className="row">
                <div className="col-lg-6">
                    <div className="px-4">
                        <span className="font-semibold text-lg">Preview</span>
                        <div className={clsx("mt-2 text-sm font-light")}>
                            Adding an attractive thumbnail picture will make
                            your article more attractive to readers.
                        </div>
                        <div className="flex overflow-hidden">
                            <div
                                className={clsx(
                                    styles.formField,
                                    "w-full overflow-hidden"
                                )}
                            >
                                <label
                                    htmlFor="thumbnail"
                                    style={{
                                        backgroundImage: thumbnail
                                            ? `url(${thumbnail})`
                                            : `url(${fileSelect})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "50%",
                                    }}
                                    className={clsx(
                                        styles.formLabel2,
                                        styles.labelFile,
                                        "h-52 p-0"
                                    )}
                                ></label>
                                <button
                                    onClick={handleRemovePreview}
                                    className={clsx(styles.btnClosePreview)}
                                >
                                    <img src={btnClose} alt="" />
                                </button>
                                <input
                                    onChange={(e) =>
                                        setThumbnail(
                                            URL.createObjectURL(
                                                e.target.files[0]
                                            )
                                        )
                                    }
                                    name="thumbnail"
                                    id="thumbnail"
                                    type="file"
                                    hidden
                                    accept=".jpg, .jpeg, .png"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="px-4">
                        <div className="text-sm font-light mb-3">
                            Add up to 4 tags to let readers know what your post
                            is about.
                        </div>
                        <CreatableSelect
                            isMulti
                            value={tags}
                            options={options}
                            onChange={handleChangeTag}
                            styles={customStyles}
                        />
                        <div className="flex justify-between">
                            <button
                                onClick={handleBackClick}
                                className="cursor-pointer hover:opacity-80z w-auto rounded-lg inline-block float-end mt-4 px-4 py-2 text-white bg-black font-medium text-sm"
                            >
                                Back To Create
                            </button>
                            <button
                                className="cursor-pointer hover:opacity-80z w-auto rounded-lg inline-block float-end mt-4 px-4 py-2 text-white bg-black font-medium text-sm"
                                onClick={handlePublish}
                            >
                                Publist Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubContent;
