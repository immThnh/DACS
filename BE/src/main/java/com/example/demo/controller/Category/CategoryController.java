package com.example.demo.controller.Category;

import com.example.demo.entity.data.Category;
import com.example.demo.repository.data.CategoryRepository;
import com.example.demo.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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

}
