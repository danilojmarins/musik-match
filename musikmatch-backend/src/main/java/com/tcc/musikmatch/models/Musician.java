package com.tcc.musikmatch.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "musicians")
public class Musician implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String bio;

    @Column(nullable = false)
    private double lat;

    @Column(nullable = false)
    private double lon;

    @Column
    private LocalDate birthdate;

    @Column(nullable = false)
    private String zip_code;

    @OneToMany(mappedBy = "musician")
    private Set<MusicianInstrument> instruments = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "musicians_genres",
        joinColumns = @JoinColumn(name = "musician_id"),
        inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private Set<Genre> genres = new HashSet<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLon() {
        return lon;
    }

    public void setLon(double lon) {
        this.lon = lon;
    }

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }

    public String getZip_code() {
        return zip_code;
    }

    public void setZip_code(String zip_code) {
        this.zip_code = zip_code;
    }

    public Set<MusicianInstrument> getInstruments() {
        return instruments;
    }

    public void setInstruments(Set<MusicianInstrument> instruments) {
        this.instruments = instruments;
    }

    public Set<Genre> getGenres() {
        return genres;
    }

    public void setGenres(Set<Genre> genres) {
        this.genres = genres;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
