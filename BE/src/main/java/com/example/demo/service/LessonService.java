package com.example.demo.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.demo.dto.ResponObject;
import com.example.demo.entity.data.Course;
import com.example.demo.request.LessonRequest;
import com.example.demo.entity.data.Lesson;
import com.example.demo.repository.data.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class LessonService {
    private final LessonRepository lessonRepository;
    private final Cloudinary cloud;

    public ResponObject getById(int id) {
        var lesson = lessonRepository.findById(id).orElse(null);
        if(lesson == null) {
            return ResponObject.builder().content("Lesson is not exist!").status(HttpStatus.BAD_REQUEST).build();
        }
        return  ResponObject.builder().status(HttpStatus.OK).content(lesson).build();
    }

    public String getLinkCloud(byte[] file) throws IOException {
        Map map = cloud.uploader().upload(file, ObjectUtils.asMap("resource_type", "auto", "folder", "dacs"));
        System.out.println(map.get("secure_url"));
        return (String) map.get("secure_url");
    }

    public void updateLessonsOfCourse(List<LessonRequest> newLessons, List<Lesson> currentLessons, Course course, List<MultipartFile> videos) {

        if(newLessons.isEmpty()) {
                    System.out.println("remove all lessons");
            for (var oldLesson:
                    currentLessons) {
                    oldLesson.setCourse(null);
                    lessonRepository.delete(oldLesson);
            }
            return;
        }

        var lessonsUpdate = new ArrayList<>();
            int index = 0;
        for(var newLesson : newLessons) {
            int finalIndex = index;

            Lesson isExistLesson = currentLessons.stream()
                    .filter(l -> newLesson.getId() == l.getId())
                    .findFirst()
                    .orElse(null);

            if(isExistLesson != null)  {
                System.out.println("update lesson");
                isExistLesson.setDescription(newLesson.getDesc());
                isExistLesson.setTitle(newLesson.getTitle());
                isExistLesson.setLinkVideo(newLesson.getLinkVideo());
                if(newLesson.getIsEditedVideo() == 1) {
                    CompletableFuture.runAsync(() -> {
                        try {
                            System.out.println("create video");
                            isExistLesson.setVideo((getLinkCloud(videos.get(finalIndex).getBytes())));
                            lessonRepository.save(isExistLesson);

                        } catch (IOException e) {
                            System.out.println("Update video lesson: " + e.getMessage());
                        }
                    });
                    index++;
                }
                lessonsUpdate.add(isExistLesson);
            }
            else {
                System.out.println("create lessons");
                Lesson temp = Lesson.builder()
                        .description(newLesson.getDesc())
                        .title(newLesson.getTitle())
                        .linkVideo(newLesson.getLinkVideo())
                        .course(course)
                        .build();

                CompletableFuture.runAsync(() -> {
                    try {
                        System.out.println("create video");
                        temp.setVideo((getLinkCloud(videos.get(finalIndex).getBytes())));
                        lessonRepository.save(temp);
                    } catch (IOException e) {
                        System.out.println("Update video lesson: " + e.getMessage());
                    }
                });
                index++;
                lessonsUpdate.add(temp);
            }
        }

        for (var oldLesson:
                currentLessons) {
            if(!lessonsUpdate.contains(oldLesson)) {
                System.out.println("remove lessons");
                oldLesson.setCourse(null);
                lessonRepository.delete(oldLesson);
            }
        }
    }

}
