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

import java.util.ArrayList;
import java.util.List;

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

    @PostMapping("/batch")
    public ResponseEntity<List<AuthenticationResponseDTO>> batchBands(@RequestBody @Valid List<BandRecordDTO> bandsRecords) {
        List<AuthenticationResponseDTO> authResponses = new ArrayList<>();
        bandsRecords.forEach(bandRecord -> {
            AuthenticationResponseDTO response = this.bandService.createBand(bandRecord);
            authResponses.add(response);
        });
        return  ResponseEntity.status((HttpStatus.CREATED)).body(authResponses);
    }

}
