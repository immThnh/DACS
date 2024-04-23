package com.example.demo.service;

import com.example.demo.entity.data.Category;
import com.example.demo.entity.data.Course;
import com.example.demo.repository.data.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.getAllCategories().orElse(null);
    }

    public void updateCategoryForCourse(Course course, Set<String> categories) {
        List<Category> newCategories = new ArrayList<>();
        for(var temp : categories) {
            var cate = categoryRepository.findByName(temp).orElse(null);
            if(cate != null) {
                newCategories.add(cate);
                course.getCategories().add(cate);
            }
        }

        for (var old:
             course.getCategories()) {
            if(!newCategories.contains(old)) {
                course.getCategories().remove(old);
            }
        }
    }
}