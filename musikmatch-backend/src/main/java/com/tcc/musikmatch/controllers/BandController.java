package com.tcc.musikmatch.controllers;

import com.tcc.musikmatch.dtos.AuthenticationResponseDTO;
import com.tcc.musikmatch.dtos.BandRecordDTO;
import com.tcc.musikmatch.services.BandService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bands")
public class BandController {

    private final BandService bandService;

    public BandController(BandService bandService) {
        this.bandService = bandService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponseDTO> createMusician(@RequestBody @Valid BandRecordDTO bandRecordDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.bandService.createBand(bandRecordDTO));
    }

}
