package com.tcc.musikmatch.models;

import com.tcc.musikmatch.keys.MusicianInstrumentKey;
import jakarta.persistence.*;

import java.io.Serial;
import java.io.Serializable;

@Entity
@Table(name = "musicians_instruments")
public class MusicianInstrument implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @EmbeddedId
    private MusicianInstrumentKey id = new MusicianInstrumentKey();

    @ManyToOne
    @MapsId("musicianId")
    @JoinColumn(name = "musician_id")
    private Musician musician;

    @ManyToOne
    @MapsId("instrumentId")
    @JoinColumn(name = "instrument_id")
    private Instrument instrument;

    @Column(nullable = false)
    private int proficiency;

    public MusicianInstrumentKey getId() {
        return id;
    }

    public void setId(MusicianInstrumentKey id) {
        this.id = id;
    }

    public Musician getMusician() {
        return musician;
    }

    public void setMusician(Musician musician) {
        this.musician = musician;
    }

    public Instrument getInstrument() {
        return instrument;
    }

    public void setInstrument(Instrument instrument) {
        this.instrument = instrument;
    }

    public int getProficiency() {
        return proficiency;
    }

    public void setProficiency(int proficiency) {
        this.proficiency = proficiency;
    }
}
