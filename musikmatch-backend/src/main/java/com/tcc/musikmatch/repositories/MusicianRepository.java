package com.tcc.musikmatch.repositories;

import com.tcc.musikmatch.models.Musician;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MusicianRepository extends JpaRepository<Musician, UUID> {
}
