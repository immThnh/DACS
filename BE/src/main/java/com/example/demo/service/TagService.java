package com.example.demo.service;

import com.example.demo.dto.ResponseObject;
import com.example.demo.entity.data.QTag;
import com.example.demo.entity.data.Tag;
import com.example.demo.repository.data.TagRepository;
import com.querydsl.jpa.impl.JPAQuery;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TagService {
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private EntityManager entityManager;

    public ResponseObject searchTagByName(String name) {
        var tags = new JPAQuery<Tag>(entityManager)
                .select(QTag.tag)
                .where(QTag.tag.name.contains(name))
                .fetch()
                .stream().limit(5);
        return ResponseObject.builder()
                .content(tags)
                .status(HttpStatus.OK)
                .build();
    }

    @Transactional
    public void saveTags(List<Tag> tags) {
        List<String> tagNames = tags.stream()
                .map(Tag::getName)
                .collect(Collectors.toList());

        List<String> nonExistingTagNames = tagRepository.findExistTagNames(tagNames);

        List<Tag> newTags = tags.stream()
                .filter(tag -> !nonExistingTagNames.contains(tag.getName()))
                .collect(Collectors.toList());
        if (newTags.isEmpty()) return;
        tagRepository.saveAll(newTags);
    }
}
