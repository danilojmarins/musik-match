package com.tcc.musikmatch.repositories;

import com.tcc.musikmatch.models.Invite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface InviteRepository extends JpaRepository<Invite, UUID> {
}
