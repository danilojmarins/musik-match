package com.tcc.musikmatch.repositories;

import com.tcc.musikmatch.models.Band;
import com.tcc.musikmatch.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface BandRepository extends JpaRepository<Band, UUID> {

    Optional<Band> findByUser(User user);

}
