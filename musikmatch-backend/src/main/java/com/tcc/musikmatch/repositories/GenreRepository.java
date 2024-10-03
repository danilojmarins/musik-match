package com.tcc.musikmatch.repositories;

import com.tcc.musikmatch.models.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Integer> {
}
