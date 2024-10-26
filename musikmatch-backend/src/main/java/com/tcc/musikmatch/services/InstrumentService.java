package com.tcc.musikmatch.services;

import com.tcc.musikmatch.models.Instrument;
import com.tcc.musikmatch.repositories.InstrumentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstrumentService {

    private final InstrumentRepository instrumentRepository;

    public InstrumentService(InstrumentRepository instrumentRepository) {
        this.instrumentRepository = instrumentRepository;
    }

    public List<Instrument> getAllInstruments() {
        return instrumentRepository.findAll();
    }

}
