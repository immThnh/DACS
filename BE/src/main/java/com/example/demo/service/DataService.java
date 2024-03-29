package com.example.demo.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.demo.data.CourseRequest;
import com.example.demo.entity.data.Course;
import com.example.demo.repository.data.CourseRepository;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Data
@RequiredArgsConstructor
@Service
public class DataService {
    private final CourseRepository courseRepository;
    private final Cloudinary cloud;

    public boolean addCourse(CourseRequest request, MultipartFile thumbnail){
        var course = courseRepository.findByTitle(request.getTitle()).orElse(null);
        if(course != null) return false;
        try {
            course = Course.builder()
                    .price(request.getPrice())
                    .title(request.getTitle())
                    .description(request.getDesc())
                    .discount(request.getDiscount())
                    .thumbnail(getLinkClound(thumbnail.getBytes()))
                    .build();
        }
        catch (Exception ex) {
            System.out.println(ex.getMessage());
            return false;
        }
        return  true;
    }

    public String getLinkClound(byte[] file) throws IOException {
        Map map = cloud.uploader().upload(file, ObjectUtils.asMap("resource_type", "auto", "folder", "dacs"));
        System.out.println(map.get("secure_url"));
        String link = (String) map.get("secure_url");
        return link;
    }

    public boolean isValidCourse(CourseRequest request) {
        var course = courseRepository.findByTitle(request.getTitle());
        if(course != null) return true;
        return true;
    }
}
