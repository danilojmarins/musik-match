package com.tcc.musikmatch.keys;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Embeddable
public class MusicianInstrumentKey implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Column(name = "musician_id")
    private UUID musicianId;

    @Column(name = "instrument_id")
    private int instrumentId;

    public MusicianInstrumentKey(UUID musicianId, int instrumentId) {
        this.musicianId = musicianId;
        this.instrumentId = instrumentId;
    }

    public UUID getMusicianId() {
        return musicianId;
    }

    public void setMusicianId(UUID musicianId) {
        this.musicianId = musicianId;
    }

    public int getInstrumentId() {
        return instrumentId;
    }

    public void setInstrumentId(int instrumentId) {
        this.instrumentId = instrumentId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MusicianInstrumentKey that = (MusicianInstrumentKey) o;
        return instrumentId == that.instrumentId && Objects.equals(musicianId, that.musicianId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(musicianId, instrumentId);
    }
}
