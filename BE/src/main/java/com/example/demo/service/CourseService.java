package com.example.demo.service;

import com.example.demo.cloudinary.CloudService;
import com.example.demo.entity.data.Category;
import com.example.demo.entity.data.Lesson;
import com.example.demo.repository.data.CategoryRepository;
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
import java.util.HashSet;
import java.util.List;
import java.util.concurrent.CompletableFuture;

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
    private final CategoryRepository categoryRepository;

    public ResponObject getCourseById(int id) {
        Course course = courseRepository.findById(id).orElse(null);
        if (course == null) {
            return ResponObject.builder().mess("Course is not exist!").status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponObject.builder().content(course).status(HttpStatus.OK).build();
    }
    public ResponObject getCourseByAlias(String alias) {
        Course course = courseRepository.findByAlias(alias).orElse(null);
        if (course == null) {
            return ResponObject.builder().mess("Course is not exist!").status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponObject.builder().content(course).status(HttpStatus.OK).build();
    }

    public ResponObject getAllCourse() {
        var courses = courseRepository.getAll().orElse(null);
        if(courses == null) {
            return ResponObject.builder().status(HttpStatus.BAD_REQUEST).mess("Don't have any course").build();
        }
        return ResponObject.builder().status(HttpStatus.OK).mess("Get successfully").content(courses).build();
    }


    public ResponObject updateCourse(int id, CourseRequest courseRequest, List<LessonRequest> lessons, MultipartFile thumbnail, List<MultipartFile> videos) {
        var courseDAO = courseRepository.findById(id).orElse(null);
        if(courseDAO == null) {
            return ResponObject.builder().mess("Course is not exist!").status(HttpStatus.BAD_REQUEST).build();
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
        courseDAO.setDescription(courseRequest.getDescription());
        courseDAO.setDiscount(courseRequest.getDiscount());
        courseDAO.setTitle(courseRequest.getTitle());

        // ! Update category
        if(courseRequest.getIsEditedCategories() == 1)
            categoryService.updateCategoriesForCourse(courseDAO, courseRequest.getCategories());

        // ! Update lessons
        lessonService.updateLessonsOfCourse(lessons, courseDAO.getLessons(), courseDAO, videos);

        courseRepository.save(courseDAO);
        return ResponObject.builder().status(HttpStatus.OK).mess("Update successfully").build();
    }

    public ResponObject addCourse(CourseRequest request, List<LessonRequest> lessons, MultipartFile thumbnail, List<MultipartFile> videos)  {
        var course = courseRepository.findByTitle(request.getTitle()).orElse(null);
        if (course != null)
            return ResponObject.builder().mess("Course is already exist").status(HttpStatus.BAD_REQUEST).build();

        List<CompletableFuture<Void>> futures = new ArrayList<>();

        Course newCourse = Course.builder()
                .price(request.getPrice())
                .title(request.getTitle())
                .description(request.getDescription())
                .discount(request.getDiscount())
                .lessons(new ArrayList<>())
                .date(LocalDateTime.now())
                .build();

            newCourse.setCategories(new ArrayList<>());
            categoryService.addCategoriesForCourse(newCourse, request.getCategories());

            CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
                try {
                    newCourse.setThumbnail(cloudService.getLinkCloud(thumbnail.getBytes()));

                } catch (IOException e) {
                    System.out.println("Create course:  " + e.getMessage());
                }
            });
            futures.add(future);

        if(videos != null) {
            for(int i = 0; i < videos.size(); i++) {
                int index = i;

                Lesson temp = Lesson.builder()
                        .title(lessons.get(index).getTitle())
                        .linkVideo(lessons.get(index).getLinkVideo())
                        .date(LocalDateTime.now())
                        .description(lessons.get(index).getDescription())
                        .course(newCourse) // ! thiết lập quan hệ ở cả đối tượng con lesson
                        .build();

                // ! thiết lập quan hệ ở cả đối tươợng cha là course => lưu ở cả cha và con đảm bảo nhất quán quan hệ
                newCourse.getLessons().add(temp);

                CompletableFuture<Void> futureTemp = CompletableFuture.runAsync(() -> {
                    try {
                        setVideoForLesson(temp, videos.get(index).getBytes());
                    }
                    catch (Exception e) {
                        System.out.println("add: " + e.getMessage());
                    }
                });
                // ! Việc lưu như này là không cần thiết vì cascade ở Course, khi lưu course thì lesson sẽ được lưu theo
//                lessonRepository.save(temp);
                futures.add(futureTemp);
            }
        }

        courseRepository.save(newCourse);

        CompletableFuture<Void> allOf = CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]));
        allOf.join();


        return ResponObject.builder().mess("Create success").status(HttpStatus.OK).build();
    }

   public ResponObject deleteCourseById(int id) {
        var course = courseRepository.findById(id).orElse(null);
        if(course == null) {
            return ResponObject.builder().status(HttpStatus.BAD_REQUEST).mess("Course is not exist!").build();
        }

        courseRepository.delete(course);
        return ResponObject.builder().mess("Delete course successfully!").status(HttpStatus.OK).build();
   }

    public void setVideoForLesson(Lesson lesson, byte[] file)  {
         lesson.setVideo(cloudService.getLinkCloud(file));
    }



    public boolean isValidCourse(CourseRequest request) {
        var course = courseRepository.findByTitle(request.getTitle());
        if(course != null) return true;
        return true;
    }
}
