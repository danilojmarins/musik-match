package com.tcc.musikmatch.keys;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Embeddable
public class MusicianInstrumentKey implements Serializable {

    private UUID musicianId;
    private int instrumentId;


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
