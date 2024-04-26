package com.example.demo.service;

import com.example.demo.cloudinary.CloudService;
import com.example.demo.dto.ResponObject;
import com.example.demo.entity.data.Course;
import com.example.demo.entity.data.Lesson;
import com.example.demo.entity.data.Section;
import com.example.demo.repository.data.CategoryRepository;
import com.example.demo.repository.data.CourseRepository;
import com.example.demo.repository.data.LessonRepository;
import com.example.demo.dto.CourseDTO;
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
import java.util.concurrent.atomic.AtomicReference;

@Data
@RequiredArgsConstructor
@Service
@Transactional
public class CourseService {
    private final CourseRepository courseRepository;
    private final CloudService cloudService;
    private final CategoryService categoryService;
    private final LessonService lessonService;
    private final SectionService sectionService;

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
        if (courses == null) {
            return ResponObject.builder().status(HttpStatus.BAD_REQUEST).mess("Don't have any course").build();
        }
        return ResponObject.builder().status(HttpStatus.OK).mess("Get successfully").content(courses).build();
    }

    public ResponObject updateCourse(int id, CourseDTO courseDTO, MultipartFile thumbnail, List<MultipartFile> videos) {
        var course = courseRepository.findById(id).orElse(null);
        if (course == null) {
            return ResponObject.builder().mess("Course does not exist!").status(HttpStatus.BAD_REQUEST).build();
        }

        // ! Update thumbnail
        if (thumbnail != null) {
            if(courseDTO.getIsEditedThumbnail() == 1) {
                CompletableFuture.runAsync(() -> {
                    try {
                        course.setThumbnail(cloudService.uploadImage(thumbnail.getBytes()));
                    } catch (IOException e) {
                        System.out.println("Update thumbnail course:  " + e.getMessage());
                    }
                });
            }
            if(courseDTO.getIsEditedThumbnail() == 2) {
                course.setThumbnail(null);
            }
        }

        // ! Update field course
        course.setDescription(courseDTO.getDescription());
        course.setDiscount(courseDTO.getDiscount());
        course.setTitle(courseDTO.getTitle());

        // ! Update category
        if (courseDTO.getIsEditedCategories() == 1)
            categoryService.updateCategoriesForCourse(course, courseDTO.getCategories());

        // ! Update sections
        if(courseDTO.getSections().isEmpty()) {
            sectionService.removeAllSection(course.getSections());
            course.setSections(null);
        }
        else {
            List<String> urlVideos = new ArrayList<String>();

            if(videos != null && !videos.isEmpty()) {
                AtomicReference<List<String>> atmVideos = new AtomicReference<>();
                CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
                    try {
                        atmVideos.set(cloudService.uploadVideos(videos));
                    }
                    catch (Exception e) {
                        System.out.println("Upload videos: " + e.getMessage());
                    }
                });
                future.join();
                urlVideos = atmVideos.get();
                System.out.println(urlVideos);
            }
            int indexVideo = 0;
            List<Section> updateSections = new ArrayList<>();
            for(var section : courseDTO.getSections()) {
                var currentSection = sectionService.findById(section.getId());
                if(currentSection != null) {
                    System.out.println("Update section");
                    currentSection.setTitle(section.getTitle());
                    indexVideo = lessonService.updateLessonsOfSection(section.getLessons(), currentSection.getLessons(), currentSection, urlVideos, indexVideo);
                    updateSections.add(currentSection);
                }
                else {
                    System.out.println("Create section");
                    currentSection = Section.builder()
                            .course(course)
                            .title(section.getTitle()).build();
                    indexVideo = lessonService.addLessonForSection(section.getLessons(), currentSection, section, urlVideos, indexVideo);
                    course.getSections().add(currentSection);
                }
                updateSections.add(currentSection);
            }

            //! remove
            for (int i = course.getSections().size() - 1; i >= 0; i--) {
                Section section = course.getSections().get(i);
                if(!updateSections.contains(section)) {
                    System.out.println("remove section");
                    course.getSections().remove(section);
                    sectionService.removeSection(section);
                }
            }
        }

        courseRepository.save(course);
        return ResponObject.builder().status(HttpStatus.OK).mess("Update successfully").build();
    }

    public ResponObject addCourse(CourseDTO request, MultipartFile thumbnail, List<MultipartFile> videos) {
        var course = courseRepository.findByTitle(request.getTitle()).orElse(null);
        if (course != null){
            return ResponObject.builder().mess("Course is already exist").status(HttpStatus.BAD_REQUEST).build();
        }

        List<CompletableFuture<Void>> futures = new ArrayList<>();
        Course newCourse = Course.builder().price(request.getPrice())
                .title(request.getTitle())
                .description(request.getDescription())
                .discount(request.getDiscount())
                .sections(new ArrayList<>())
                .date(LocalDateTime.now())
                .build();
            try {

            newCourse.setCategories(new ArrayList<>());
            categoryService.addCategoriesForCourse(newCourse, request.getCategories());
            if (thumbnail != null) {
                CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
                    try {
                        newCourse.setThumbnail(cloudService.uploadImage(thumbnail.getBytes()));

                    } catch (IOException e) {
                        System.out.println("Create course:  " + e.getMessage());
                    }
                });
                futures.add(future);
            }

                List<String> urlVideos = null;

            if(videos != null) {
                AtomicReference<List<String>> atmVideos = new AtomicReference<List<String>>();
                CompletableFuture<Void> future = CompletableFuture.runAsync(() -> atmVideos.set(cloudService.uploadVideos(videos)));
                future.join();
                System.out.println(atmVideos.get());
                urlVideos = atmVideos.get();
            }

            int indexVideo = 0;
            for(var section : request.getSections()) {
                if(!section.getLessons().isEmpty()) {
                    Section tSection = Section.builder()
                            .title(section.getTitle())
                            .course(newCourse)
                            .lessons(new ArrayList<>())
                            .build();
                newCourse.getSections().add(tSection);

                    if(section.getLessons().size() > 0) {
                        for (var lesson : section.getLessons()
                        ) {
                            Lesson tLesson = Lesson.builder()
                                    .section(tSection)
                                    .date(LocalDateTime.now())
                                    .title(lesson.getTitle())
                                    .description(lesson.getDescription())
                                    .linkVideo(lesson.getLinkVideo())
                                    .build();
                            tSection.getLessons().add(tLesson);
                            indexVideo = lessonService.updateVideo(lesson, tLesson, urlVideos, indexVideo);
                            }
                        }
                    }
                }
            courseRepository.save(newCourse);
            CompletableFuture<Void> allOf = CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]));
            allOf.join();
        }
        catch (Exception e) {
            System.out.println(e);
        }
        return ResponObject.builder().mess("Create success").status(HttpStatus.OK).build();
    }

    public ResponObject deleteCourseById(int id) {
        var course = courseRepository.findById(id).orElse(null);
        if (course == null) {
            return ResponObject.builder().status(HttpStatus.BAD_REQUEST).mess("Course is not exist!").build();
        }

        courseRepository.delete(course);
        return ResponObject.builder().mess("Delete course successfully!").status(HttpStatus.OK).build();
    }

}
