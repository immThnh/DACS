package com.example.demo.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.demo.request.CourseRequest;
import com.example.demo.request.LessonRequest;
import com.example.demo.dto.ResponObject;
import com.example.demo.entity.data.Course;
import com.example.demo.entity.data.Lesson;
import com.example.demo.repository.data.CourseRepository;
import com.example.demo.repository.data.LessonRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
@RequiredArgsConstructor
@Service
public class DataService {
    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;
    private final Cloudinary cloud;
    private final CategoryService categoryService;
    private final LessonService lessonService;

    public ResponObject updateCourse(int id, CourseRequest courseRequest, List<LessonRequest> lessons, MultipartFile thumbnail, List<MultipartFile> videos) throws IOException {
        var courseDAO = courseRepository.findById(id).orElse(null);
        if(courseDAO == null) {
            return ResponObject.builder().content("Course is not exist!").status(HttpStatus.BAD_REQUEST).build();
        }

        // ! Update thumbnail
        if(courseRequest.isEditedThumbnail()) {
            courseDAO.setThumbnail(getLinkCloud(thumbnail.getBytes()));
        }

        // ! Update field course
        courseDAO.setDescription(courseRequest.getDesc());
        courseDAO.setDiscount(courseRequest.getDiscount());
        courseDAO.setTitle(courseRequest.getTitle());

        // ! Update category
        if(courseRequest.isEditedCategories())
            categoryService.updateCategoryForCourse(courseDAO, courseRequest.getCategories());

        // ! Update lessons
        lessonService.updateLessonsOfCourse(lessons, courseDAO.getLessons());

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

    public ResponObject getAllCourse() {
        var courses = courseRepository.getAll().orElse(null);
        return ResponObject.builder().status(HttpStatus.OK).content("Get successfully").content(courses).build();
    }
    public ResponObject addCourse(CourseRequest request, List<LessonRequest> lessons, MultipartFile thumbnail, List<MultipartFile> videos){
        var course = courseRepository.findByTitle(request.getTitle()).orElse(null);
        if(course != null) return  ResponObject.builder().content("Course is already exist").status(HttpStatus.BAD_REQUEST).build();
        try {
            course = Course.builder()
                    .price(request.getPrice())
                    .title(request.getTitle())
                    .description(request.getDesc())
                    .discount(request.getDiscount())
                    .thumbnail(getLinkCloud(thumbnail.getBytes()))
                    .lessons(new ArrayList<>())
                    .date(LocalDateTime.now())
                    .build();
            courseRepository.save(course);

            if(!lessons.isEmpty()) {
                for(int i = 0; i < lessons.size(); i++) {

                    var temp = Lesson.builder()
                            .description(lessons.get(i).getDesc())
                            .title(lessons.get(i).getTitle())
                            .linkVideo(lessons.get(i).getLinkVideo())
                            .date(LocalDateTime.now())
                            .build();
                    if(videos != null && videos.size() > i) {
                        temp.setVideo(getLinkCloud(videos.get(i).getBytes()));
                    }
                    course.getLessons().add(temp);
                    lessonRepository.save(temp);
                }
            }
        }
        catch (Exception ex) {
            System.out.println(ex.getMessage());
            return  ResponObject.builder().content("Error while creating course").status(HttpStatus.BAD_REQUEST).build();
        }
        return  ResponObject.builder().content("Create successfully").status(HttpStatus.OK).build();
    }

    public String getLinkCloud(byte[] file) throws IOException {
        Map map = cloud.uploader().upload(file, ObjectUtils.asMap("resource_type", "auto", "folder", "dacs"));
        System.out.println(map.get("secure_url"));
        return (String) map.get("secure_url");
    }

    public boolean isValidCourse(CourseRequest request) {
        var course = courseRepository.findByTitle(request.getTitle());
        if(course != null) return true;
        return true;
    }
}
