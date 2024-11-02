package com.tcc.musikmatch.controllers;

import com.tcc.musikmatch.dtos.AuthenticationResponseDTO;
import com.tcc.musikmatch.dtos.MusicianRecordDTO;
import com.tcc.musikmatch.services.MusicianService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/musicians")
@RestControllerAdvice
@Validated
public class MusicianController {

    private final MusicianService musicianService;

    public MusicianController(MusicianService musicianService) {
        this.musicianService = musicianService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponseDTO> createMusician(@RequestBody @Valid MusicianRecordDTO musicianRecordDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.musicianService.createMusician(musicianRecordDTO));
    }

    @PostMapping("/batch")
    public ResponseEntity<List<AuthenticationResponseDTO>> batchMusicians(@RequestBody List<@Valid MusicianRecordDTO> musiciansRecords) {
        List<AuthenticationResponseDTO> authResponses = new ArrayList<>();
        musiciansRecords.forEach(musicianRecord -> {
            AuthenticationResponseDTO response = this.musicianService.createMusician(musicianRecord);
            authResponses.add(response);
        });
        return  ResponseEntity.status((HttpStatus.CREATED)).body(authResponses);
    }

}
