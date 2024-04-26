package com.example.demo.controller.category;

import com.example.demo.entity.data.Category;
import com.example.demo.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/data/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/getAll")
    public ResponseEntity<List<Category>> getAll() {
        var categories = categoryService.getAllCategories();
        if(categories == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(categories);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Category> getById(@PathVariable int id) {
        var category = categoryService.getById(id);
        if(category == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(category);
    }

}