import React from 'react';
import Styles from './userCourses.module.scss';

const CourseCard = ({ title, thumbnail,status, time }) => (
  <div className={Styles.courseCard}>
    <div className={Styles.courseThumbnail}><img src={thumbnail}/></div>
    <div className={Styles.courseTitle}>{title}</div>
    <div className={Styles.courseStatus}>{status}</div>
    <div className={Styles.courseTime}>{time}</div>
  </div>

);

const MyCourses = () => {
  const courses = [
    {
      title: 'HTML, CSS từ zero đến hero',
      thumbnail:'https://picsum.photos/200/100',
      status: 'Học xong cách đây 2 tháng trước',
      time: '2 months ago'
    },
    {
      title: 'Lập Trình JavaScript Cơ Bản',
      thumbnail:'https://picsum.photos/200/100',

      status: 'Bắt chưa hoàn thành khóa này',
      time: 'In progress'
    },
    {
      title: 'Responsive Web Design',
      thumbnail:'https://picsum.photos/200/100',

      status: 'Bạn chưa hoàn thành khóa này',
      time: 'Not started'
    }
  ];

  return (
    <div className={Styles.myCourses}>
      <h2 className={Styles.myCoursesTitle}>Khóa học của tôi</h2>
      <div className={Styles.courseList}>
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
      <button className={Styles.addCourseButton}>Thêm khóa học</button>
    </div>
  );
};

export default MyCourses;
