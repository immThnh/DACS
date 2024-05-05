package com.example.demo.controller.category;

import com.example.demo.dto.ResponseObject;
import com.example.demo.entity.data.Category;
import com.example.demo.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/data/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/getAll")
    public ResponseEntity<ResponseObject> getAll(@RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "5") int size) {
        var result = categoryService.getAllCategory(page, size);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @GetMapping("/getAllDeleted")
    public ResponseEntity<ResponseObject> getAllDeleted(@RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "5") int size) {
        var result = categoryService.getAllCategoryDeleted(page, size);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @GetMapping("")
    public ResponseEntity<ResponseObject> getCategoryByName(@RequestParam String name, @RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "5") int size) {
        var result = categoryService.getByTitle(name, page, size);
        return ResponseEntity.ok(result);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Category> getById(@PathVariable int id) {
        var category = categoryService.getById(id);
        if(category == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(category);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> update(@PathVariable int id, @RequestBody Category category) {
        var result = categoryService.updateCategoryById(id, category);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseObject> create(@RequestBody String name) {
        var result = categoryService.createCategory(name);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @PutMapping("/delete/soft/{id}")
    public ResponseEntity<ResponseObject> softDelete(@PathVariable int id) {
        var result = categoryService.softDelete(id);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<ResponseObject> restore(@PathVariable int id) {
        var result = categoryService.restoreCategoryById(id);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @DeleteMapping("/delete/hard/{id}")
    public ResponseEntity<ResponseObject> hardDelete(@PathVariable int id) {
        var result = categoryService.hardDelete(id);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

}
