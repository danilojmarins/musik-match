package com.tcc.musikmatch.controllers;

import com.tcc.musikmatch.models.Genre;
import com.tcc.musikmatch.services.GenreService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/genres")
public class GenreController {

    private final GenreService genreService;

    public GenreController(GenreService genreService) {
        this.genreService = genreService;
    }

    @GetMapping
    public ResponseEntity<List<Genre>> getGenres() {
        return ResponseEntity.status(HttpStatus.OK).body(genreService.getAllGenres());
    }

}
