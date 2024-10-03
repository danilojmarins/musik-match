package com.tcc.musikmatch.repositories;

import com.tcc.musikmatch.models.Instrument;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstrumentRepository extends JpaRepository<Instrument, Integer> {
}
