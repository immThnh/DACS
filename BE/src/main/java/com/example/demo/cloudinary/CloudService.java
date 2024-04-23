package com.example.demo.cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.demo.entity.data.Course;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InterruptedIOException;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
public class CloudService {
    private final Cloudinary cloud;
//    @Async("asyncExecutor")
//    public CompletableFuture<String> getLinkCloud(byte[] file) throws IOException {
//        try {
//            Map map = cloud.uploader().upload(file, ObjectUtils.asMap("resource_type", "auto", "folder", "dacs"));
//            if(map != null) {
//                System.out.println(map.get("secure_url"));
//                return CompletableFuture.completedFuture(map.get("secure_url").toString());
//            }
//        }
//        catch (Exception e) {
//            System.out.println("getLinkCloud: " + e.getMessage());
//            return null;
//        }
//        return null;
//    }

    public String getLinkCloud(byte[] file)  {
        try {
            Map map = cloud.uploader().upload(file, ObjectUtils.asMap("resource_type", "auto", "folder", "dacs"));
            if(map != null) {
                System.out.println(map.get("secure_url"));
                return (map.get("secure_url").toString());
            }
        }
        catch (Exception e) {
            System.out.println("getLinkCloud: " + e.getMessage());
            return null;
        }
        return null;
    }

    @Async("asyncExecutor")
    public void saveImageToCourse(byte[] file, Course course) throws IOException {
        try {
            Map map = cloud.uploader().upload(file, ObjectUtils.asMap("resource_type", "auto", "folder", "dacs"));
            if(map != null) {
                course.setThumbnail(map.get("secure_url").toString());
            }
        }
        catch (Exception e) {
            System.out.println("saveImageToCourse: " + e.getMessage());
        }
    }
}
