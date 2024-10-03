package com.tcc.musikmatch.controllers;

import com.tcc.musikmatch.dtos.AuthenticationResponseDTO;
import com.tcc.musikmatch.dtos.MusicianRecordDTO;
import com.tcc.musikmatch.services.MusicianService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/musicians")
public class MusicianController {

    private final MusicianService musicianService;

    public MusicianController(MusicianService musicianService) {
        this.musicianService = musicianService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponseDTO> createMusician(@RequestBody @Valid MusicianRecordDTO musicianRecordDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.musicianService.createMusician(musicianRecordDTO));
    }

}
