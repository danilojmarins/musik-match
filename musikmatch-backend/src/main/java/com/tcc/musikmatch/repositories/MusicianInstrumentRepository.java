package com.tcc.musikmatch.repositories;

import com.tcc.musikmatch.keys.MusicianInstrumentKey;
import com.tcc.musikmatch.models.Musician;
import com.tcc.musikmatch.models.MusicianInstrument;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MusicianInstrumentRepository extends JpaRepository<MusicianInstrument, MusicianInstrumentKey> {
    void deleteAllByMusician(Musician musician);
}
