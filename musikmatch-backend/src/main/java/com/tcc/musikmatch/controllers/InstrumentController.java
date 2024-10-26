package com.tcc.musikmatch.controllers;

import com.tcc.musikmatch.models.Instrument;
import com.tcc.musikmatch.services.InstrumentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/instruments")
public class InstrumentController {

    private final InstrumentService instrumentService;

    public InstrumentController(InstrumentService instrumentService) {
        this.instrumentService = instrumentService;
    }

    @GetMapping
    public ResponseEntity<List<Instrument>> getInstruments() {
        return ResponseEntity.status(HttpStatus.OK).body(instrumentService.getAllInstruments());
    }

}
