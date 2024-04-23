package com.example.demo.service;

import com.example.demo.entity.data.Category;
import com.example.demo.entity.data.Course;
import com.example.demo.repository.data.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.getAllCategories().orElse(null);
    }

    public Category getById(int id) {
        var cate = categoryRepository.findById(id).orElse(null);
        if(cate == null) {
            return null;
        }
        return cate;
    }

    public void updateCategoriesForCourse(Course course, Set<Integer> categories) {
        List<Category> newCategories = new ArrayList<>();
        for(var temp : categories) {
            var cate = categoryRepository.findById(temp).orElse(null);
            if(cate != null) {
                newCategories.add(cate);
                course.getCategories().add(cate);
            }
        }

        course.getCategories().removeIf(old -> !newCategories.contains(old));
    }

    public void addCategoriesForCourse(Course course, Set<Integer> categories) {
        if(categories == null) {
            course.setCategories(null);
            return;
        }
        for(var temp : categories) {
            categoryRepository.findById(temp).ifPresent(cate -> course.getCategories().add(cate));
        }
    }
}