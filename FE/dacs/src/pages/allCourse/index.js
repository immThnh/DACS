    import React, { useState, useEffect } from "react";
    import * as dataApi from "../../api/apiService/dataService.js";
    import FilterComponent from "../../component/filter";
    import SearchComponent from "../../component/searchAdminComponent";
    import CourseCard from "../../component/courseCard";
    import FooterDataAdmin from "../../component/footerDataAdmin";
    import styles from "./allCourse.module.scss";
    import PriceRange from "../../component/priceRange";
    import StockDropdown from "../../component/combobox2";

    const AllCourses = () => {
        const [courses, setCourses] = useState([]);
        const [filteredCourses, setFilteredCourses] = useState([]);
        const [searchQuery, setSearchQuery] = useState("");
        const [selectedCategory, setSelectedCategory] = useState(null);
        const [categories, setCategories] = useState([]);
        const [page, setPage] = useState(0);
        const [pageSize, setPageSize] = useState(5);
        const totalData = filteredCourses.length;

        useEffect(() => {
            const fetchApi = async () => {
                try {
                    const courseResult = await dataApi.getAllCourse(0, 9999);
                    const categoryResult = await dataApi.getAllCategories(0, 9999);
                    setCourses(courseResult.content.content);
                    setFilteredCourses(courseResult.content.content);
                    setCategories(categoryResult.content.content.map(cat => ({ value: cat.id, label: cat.name })));
                } catch (error) {
                    console.log("error: " + error);
                }
            };
            fetchApi();
        }, []);

        const handleSearchInputChange = (e) => {
            setSearchQuery(e.target.value);
            filterCourses(e.target.value, selectedCategory);
        };

        const handleSelectChange = (selectedOption) => {
            setSelectedCategory(selectedOption);
            filterCourses(searchQuery, selectedOption);
        };

        const filterCourses = (searchQuery, category) => {
            let updatedCourses = courses;

            if (searchQuery) {
                updatedCourses = updatedCourses.filter((course) =>
                    course.title.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }

            if (category && category.length > 0) {
                updatedCourses = updatedCourses.filter((course) =>
                    category.some(cat => course.categories.some(c => c.id === cat.value))
                );
            }

            setFilteredCourses(updatedCourses);
        };

        const handleSelectPageSizeChange = (size) => {
            setPageSize(size);
            setPage(0);
        };

        return (
            <div className="flex justify-center w-full">
                <div className={styles.container}>
                    <div className={styles.topMain}>
                        <div className={styles.itemTopMain}>
                            <h4>All Courses</h4>
                        </div>
                    </div>

                    <div className={styles.gridContainer}>
                        <div className={styles.filterSection}>
                            <div className={styles.filterItem}>
                                <StockDropdown
                                    options={categories}
                                    handleSelectChange={handleSelectChange}
                                />
                            </div>
                            
                            <div className={styles.filterItem}>
                                <SearchComponent handleSearchInputChange={handleSearchInputChange} />
                            </div>
                            <div className={styles.filterItem}>
                                <PriceRange />
                            </div>
                        </div>

                        <div className={styles.coursesSection}>
                            <section className="p-4 sm:px-5 sm:py-10 mx-auto max-w-[1400px] w-full">
                                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-6">
                                    {filteredCourses &&
                                        filteredCourses.slice(page * pageSize, page * pageSize + pageSize).map((course, index) => (
                                            <CourseCard
                                                key={index}
                                                course={course}
                                                courseId={course.id}
                                            />
                                        ))}
                                </div>
                            </section>

                            <FooterDataAdmin
                                handleSelectPageSizeChange={handleSelectPageSizeChange}
                                totalData={totalData}
                                size={pageSize}
                                page={page}
                                setPage={setPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    export default AllCourses;
