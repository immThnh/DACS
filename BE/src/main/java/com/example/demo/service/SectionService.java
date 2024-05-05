package com.example.demo.service;

import com.example.demo.entity.data.Course;
import com.example.demo.entity.data.Section;
import com.example.demo.repository.data.SectionRepository;
import com.example.demo.dto.SectionDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SectionService {

    private final SectionRepository sectionRepository;

    public void removeSection(Section section) {
        sectionRepository.delete(section);
    }

    public void removeAllSection(List<Section> sections) {
        sectionRepository.deleteAll(sections);
    }

    public Section findById(int id) {
        return sectionRepository.findById(id).orElse(null);
    }

}
