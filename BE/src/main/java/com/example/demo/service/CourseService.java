package com.example.demo.service;

import com.example.demo.cloudinary.CloudService;
import com.example.demo.entity.data.Lesson;
import com.example.demo.request.CourseRequest;
import com.example.demo.request.LessonRequest;
import com.example.demo.dto.ResponObject;
import com.example.demo.entity.data.Course;
import com.example.demo.repository.data.CourseRepository;
import com.example.demo.repository.data.LessonRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.atomic.AtomicReference;

@Data
@RequiredArgsConstructor
@Service
@Transactional
public class CourseService {
    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;
    private final CloudService cloudService;
    private final CategoryService categoryService;
    private final LessonService lessonService;



    public ResponObject updateCourse(int id, CourseRequest courseRequest, List<LessonRequest> lessons, MultipartFile thumbnail, List<MultipartFile> videos) throws IOException, ExecutionException, InterruptedException {
        var courseDAO = courseRepository.findById(id).orElse(null);
        if(courseDAO == null) {
            return ResponObject.builder().content("Course is not exist!").status(HttpStatus.BAD_REQUEST).build();
        }

        // ! Update thumbnail
        if(thumbnail != null) {
            CompletableFuture.runAsync(() -> {
                try {
                    courseDAO.setThumbnail(cloudService.getLinkCloud(thumbnail.getBytes()));
                } catch (IOException e) {
                    System.out.println("Update thumbnail course:  " + e.getMessage());
                }
            });
        }

        // ! Update field course
        courseDAO.setDescription(courseRequest.getDesc());
        courseDAO.setDiscount(courseRequest.getDiscount());
        courseDAO.setTitle(courseRequest.getTitle());

        // ! Update category
        if(courseRequest.isEditedCategories())
            categoryService.updateCategoryForCourse(courseDAO, courseRequest.getCategories());

        // ! Update lessons
        lessonService.updateLessonsOfCourse(lessons, courseDAO.getLessons(), courseDAO, videos);

        courseRepository.save(courseDAO);
        return ResponObject.builder().status(HttpStatus.OK).content("").build();
    }

    public ResponObject getCourseById(int id) {
        Course course = courseRepository.findById(id).orElse(null);
        if (course == null) {
            return ResponObject.builder().content("Course is not exist!").status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponObject.builder().content(course).status(HttpStatus.OK).build();
    }
    public ResponObject getCourseByAlias(String alias) {
        Course course = courseRepository.findByAlias(alias).orElse(null);
        if (course == null) {
            return ResponObject.builder().content("Course is not exist!").status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponObject.builder().content(course).status(HttpStatus.OK).build();
    }

    public ResponObject getAllCourse() {
        var courses = courseRepository.getAll().orElse(null);
        return ResponObject.builder().status(HttpStatus.OK).content("Get successfully").content(courses).build();
    }

    public ResponObject addCourse(CourseRequest request, List<LessonRequest> lessons, MultipartFile thumbnail, List<MultipartFile> videos)  {

        var course = courseRepository.findByTitle(request.getTitle()).orElse(null);
        if (course != null)
            return ResponObject.builder().content("Course is already exist").status(HttpStatus.BAD_REQUEST).build();

            Course newCourse = Course.builder()
                .price(request.getPrice())
                .title(request.getTitle())
                .description(request.getDesc())
                .discount(request.getDiscount())
                .lessons(new ArrayList<>())
                .date(LocalDateTime.now())
                .build();

            CompletableFuture.runAsync(() -> {
                try {
                    newCourse.setThumbnail(cloudService.getLinkCloud(thumbnail.getBytes()));
                } catch (IOException e) {
                    System.out.println("Create course:  " + e.getMessage());
                }
            });

        for(int i = 0; i < videos.size(); i++) {
            int index = i;

            Lesson temp = Lesson.builder()
                    .title(lessons.get(index).getTitle())
                    .linkVideo(lessons.get(index).getLinkVideo())
                    .date(LocalDateTime.now())
                    .description(lessons.get(index).getDesc())
                    .course(newCourse)
                    .build();
            CompletableFuture.runAsync(() -> {
                try {
                    setVideoForLesson(temp, videos.get(index).getBytes());
                    lessonRepository.save(temp);
                }
                catch (Exception e) {
                    System.out.println("add: " + e.getMessage());
                }
            });
        }
        courseRepository.save(newCourse);
        return ResponObject.builder().content("Create success").status(HttpStatus.OK).build();
    }

    public void test(List<MultipartFile> videos) {
        System.out.println(videos.get(0));
    }

    public void setVideoForLesson(Lesson lesson, byte[] file) throws IOException {
         lesson.setVideo(cloudService.getLinkCloud(file));
    }

    public boolean isValidCourse(CourseRequest request) {
        var course = courseRepository.findByTitle(request.getTitle());
        if(course != null) return true;
        return true;
    }
}
