package com.tcc.musikmatch.repositories;

import com.tcc.musikmatch.models.Invite;
import com.tcc.musikmatch.models.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface InviteRepository extends JpaRepository<Invite, UUID> {

    List<Invite> findByToUser(User toUser);

    List<Invite> findByFromUser(User fromUser);

}
