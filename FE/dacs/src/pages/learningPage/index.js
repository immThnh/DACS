// index.js
import React, { useState } from 'react'; // This imports the useState hook
import styles from './Course.module.scss';

const PlayIcon = () => (
  <div className={styles.playIcon}>
    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/91b4c2d063585c32b868da3584ddb0514cbf2955902271549e68b7c3ffeb1802?apiKey=9349475655ee4a448868f824f5feb11d&" alt="Play icon" />
  </div>
);

const TimeInfo = ({ icon, time }) => (
  <div className={styles.timeInfo}>
    <img src={icon} alt="Clock icon" className={styles.clockIcon} />
    <div className={styles.time}>{time} Minutes</div>
  </div>
);
const LessonItem = ({ id, title, lesson, time, isHighlighted, videoUrl, onVideoSelect }) => (
    <div
      className={`${styles.lessonItem} ${isHighlighted ? styles.highlighted : ''}`}
      onClick={() => onVideoSelect(id, videoUrl)}
    >
      <div className={styles.lessonInfo}>
        <div className={styles.lessonTitle}>{title}</div>
        <div className={styles.lessonNumber}>{lesson}</div>
      </div>
      <div className={styles.timeInfo}>
      <TimeInfo icon={isHighlighted ? "https://cdn.builder.io/api/v1/image/assets/TEMP/23214151b02736ebba19b562aabfd0bc3fc955a52ce1a15c8b59fd722461241d?apiKey=9349475655ee4a448868f824f5feb11d&" : "https://cdn.builder.io/api/v1/image/assets/TEMP/23214151b02736ebba19b562aabfd0bc3fc955a52ce1a15c8b59fd722461241d?apiKey=9349475655ee4a448868f824f5feb11d&"} time={time} />
      </div>
    </div>
  );





const CourseSection = ({ sectionNumber, sectionTitle, lessons }) => (
    <section className={styles.courseSection}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionNumber}>{sectionNumber}</div>
        <h2 className={styles.sectionTitle}>{sectionTitle}</h2>
      </div>
      {lessons.map((lesson, index) => (
        <LessonItem key={index} {...lesson} />
      ))}
    </section>
  );

const CourseHero = ({ videoUrl }) => {

  const videoId = videoUrl.split('v=')[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <section className={styles.courseHero}>
      <iframe
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={styles.videoPlayer}
      ></iframe>
      <PlayIcon />
    </section>
  );
};

const CourseIntro = () => (
  <section className={styles.courseIntro}>
    <div className={styles.introContent}>
      <h1 className={styles.courseTitle}>UI/UX Design Courses</h1>
      <p className={styles.courseDescription}>
        Welcome to our UI/UX Design course! This comprehensive program will
        equip you with the knowledge and skills to create exceptional user
        interfaces (UI) and enhance user experiences (UX). Dive into the world
        of design thinking, wireframing, prototyping, and usability testing.
        Below is an overview of the curriculum
      </p>
    </div>
  </section>
);

function UiUxCourse() {
    const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [highlightedId, setHighlightedId] = useState(null);
  const handleVideoSelect = (id, videoUrl) => {
    setCurrentVideoUrl(videoUrl);
    setHighlightedId(id);
  };
  const courseSections = [
    {
        sectionNumber: "01",
        sectionTitle: "Introduction to UI/UX Design",
        lessons: [
         
          {
            id: 1,
            title: "Understanding UI/UX Design Principles",
            lesson: "Lesson 02",
            time: "45",
            videoUrl: "video-url-2.mp4",
          },
          {
            id: 2, // Unique identifier for the lesson
            title: "Understanding UI/UX Design Principles",
            lesson: "Lesson 01",
            time: "45",
            videoUrl: "https://www.youtube.com/watch?v=V4jLEdwTqvY",
          },
        ],
      },
      {
        sectionNumber: "02",
        sectionTitle: "Introduction to UI/UX Design",
        lessons: [
          {
            id: 3,
            title: "Understanding UI/UX Design Principles",
            lesson: "Lesson 01",
            time: "45",
            videoUrl: "video-url-1.mp4", 
          },
          {
            id: 4,
            title: "Understanding UI/UX Design Principles",
            lesson: "Lesson 01",
            time: "45",
            videoUrl: "video-url-1.mp4", 
          },
        ],
      },
                 
      ]
  

  return (
    <>
       <main className={styles.uiUxCourse}>
        <CourseIntro />
        <CourseHero videoUrl={currentVideoUrl} />
        <div className={styles.courseSectionsContainer}>
        {courseSections.map((section) => (
          <section className={styles.courseSection} key={section.sectionNumber}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionNumber}>{section.sectionNumber}</div>
              <h2 className={styles.sectionTitle}>{section.sectionTitle}</h2>
            </div>
            {section.lessons.map((lesson) => (
              <LessonItem
                key={lesson.id}
                {...lesson}
                onVideoSelect={handleVideoSelect}
                isHighlighted={lesson.id === highlightedId}
              />
            ))}
          </section>
        ))}
          </div>
      </main>
    </>
  );
}

export default UiUxCourse;
