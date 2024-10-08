package com.tcc.musikmatch.repositories;

import com.tcc.musikmatch.models.Musician;
import com.tcc.musikmatch.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface MusicianRepository extends JpaRepository<Musician, UUID> {

    Optional<Musician> findByUser(User user);

}
