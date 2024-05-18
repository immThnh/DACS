import React, { useState, useEffect, useRef } from "react";
import searchIcon from "../../assets/images/search.png";
import loadingIcon from "../../assets/images/loading.png";
import * as dataApi from "../../api/apiService/dataService";
import clsx from "clsx";
import styles from "./Search.module.scss";
let timerId = null;

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const searchBarRef = useRef(null);
    const [loading, setloading] = useState(false);
    const inputRef = useRef();
    const fetchApi = async (title) => {
        try {
            const result = await dataApi.getCourseByName(title);
            setloading(false);
            setShowResult(true);
            setSearchResult(result.content.content);
        } catch (error) {
            console.log(error);
        }
    };
    const debounce = (func, delay = 800) => {
        return (title) => {
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                func(title);
            }, delay);
        };
    };

    const fetchApiRequest = debounce(fetchApi, 500);

    const handleSearch = (event) => {
        const title = event.target.value;

        setSearchTerm(title);
        setloading(true);
        if (title.trim() === "") {
            setSearchResult((prev) => []);
            setShowResult((prev) => false);
            clearTimeout(timerId);
            return;
        }
        setShowResult(true);
        debounce(fetchApi, 300)(title);
    };

    const handleClickOutside = (event) => {
        if (
            searchBarRef.current &&
            !searchBarRef.current.contains(event.target)
        ) {
            setShowResult(false);
        }
    };
    const clearSearch = () => {
        setSearchTerm("");
        inputRef.current.focus();
        setSearchResult([]);
        setShowResult(false);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleShowResult = () => {
        if (searchResult.length > 0 && !showResult) {
            setShowResult(true);
        }
    };

    return (
        <div
            className={clsx(
                styles.searchWrap,
                "relative flex flex-col items-center p-2 bg-white border-1 border-gray-300 rounded-full w-130 hover:border-black"
            )}
            ref={searchBarRef}
        >
            <div className="flex w-full">
                <input
                    ref={inputRef}
                    onClick={handleShowResult}
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="flex-grow text-xs  pl-2 pr-4 text-gray-700 leading-tight focus:outline-none rounded-l-full"
                    placeholder="Search courses..."
                />
                <div className="absolute inset-y-0 right-10 flex items-center mr-1.5">
                    {searchTerm.length > 0 && !loading && (
                        <button onClick={clearSearch}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="#a6a7ac"
                                className="w-5 h-5 hover:opacity-80"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    )}
                    {loading && searchTerm !== "" && (
                        <img
                            src={loadingIcon}
                            alt="Loading"
                            className="w-3 h-3 animate-spin"
                        />
                    )}
                </div>
                <div className="flex items-center pl-2">
                    <span className="border-l h-6 border-gray-300" />
                    <button className="px-2">
                        <img
                            src={searchIcon}
                            alt="Search"
                            className="w-4 h-4"
                        />
                    </button>
                </div>
            </div>
            {showResult && (
                <div className="absolute top-full bg-white border border-gray-300 rounded-md shadow-lg w-full z-20 mt-3">
                    {searchResult.length > 0 ? (
                        <div>
                            {searchResult.map((course, index) => (
                                <div
                                    key={index}
                                    className="flex font-semibold text-sm  p-2.5 truncate hover:bg-gray-100 cursor-pointer"
                                >
                                    <div className="w-9 h-9 mr-3 ">
                                        <img
                                            src={
                                                course.thumbnail
                                                    ? course.thumbnail
                                                    : ""
                                            }
                                            alt="thumbnail"
                                            className="w-9 h-9 object-cover"
                                        />
                                    </div>
                                    <div>
                                        {course.title}
                                        <div className="font-normal text-xs">
                                            Tags:
                                            {course.categories.map(
                                                (cate, ind) => (
                                                    <span
                                                        className="ml-1"
                                                        key={ind}
                                                    >
                                                        {cate.name}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <hr className="cssHr" />
                            {/* <div className="cursor-pointer p-2.5 text-sm text-center text-gray-700 truncate">
                                View more results for "
                                <strong>{searchTerm}</strong>"
                            </div> */}
                        </div>
                    ) : (
                        <div className="p-4 flex items-center text-xs flex-col ">
                            <span className="text-base font-bold mb-2">
                                Not Found
                            </span>
                            <span className="mb-1">
                                No results found for "
                                <strong>{searchTerm}</strong>".
                            </span>
                            <span>
                                Try checking for typos or using complete words.
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
