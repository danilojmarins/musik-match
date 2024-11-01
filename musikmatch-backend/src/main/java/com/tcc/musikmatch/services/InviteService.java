package com.tcc.musikmatch.services;

import com.tcc.musikmatch.enums.Role;
import com.tcc.musikmatch.models.Band;
import com.tcc.musikmatch.models.Musician;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.tcc.musikmatch.dtos.InviteRequestDTO;
import com.tcc.musikmatch.dtos.InviteResponseDTO;
import com.tcc.musikmatch.models.Invite;
import com.tcc.musikmatch.models.User;
import com.tcc.musikmatch.repositories.InviteRepository;
import com.tcc.musikmatch.repositories.UserRepository;

import jakarta.persistence.EntityNotFoundException;

import java.util.*;;

@Service
public class InviteService {
    
    private final InviteRepository inviteRepository;
    private final UserRepository userRepository;

    public InviteService(InviteRepository inviteRepository, UserRepository userRepository) {
        this.inviteRepository = inviteRepository;
        this.userRepository = userRepository;
    }

    public void sendInvite(InviteRequestDTO inviteRequestDTO) {
        User loggedUser = (User) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal()
        ;

        User invitedUser = userRepository
            .findById(inviteRequestDTO.toUser())
            .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado."))
        ;

        Invite invite = new Invite();

        invite.setFromUser(loggedUser);
        invite.setToUser(invitedUser);
        invite.setMessage(inviteRequestDTO.message());
        invite.setNumber(inviteRequestDTO.number());

        inviteRepository.save(invite);
    }

    public List<InviteResponseDTO> getReceivedInvites() {
        User loggedUser = (User) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal()
        ;

        List<Invite> receivedInvites = inviteRepository.findByToUser(loggedUser);

        List<InviteResponseDTO> invitesResponse = new ArrayList<>();

        receivedInvites.forEach(invite -> {
            if (loggedUser.getRole() == Role.MUSICIAN) {
                Band band = invite.getFromUser().getBand();

                Set<String> instruments = new HashSet<>();
                band.getInstruments().forEach(instrument -> instruments.add(instrument.getName()));

                InviteResponseDTO inviteResponse = new InviteResponseDTO(
                        band.getName(),
                        band.getCity(),
                        band.getState(),
                        instruments,
                        invite.getMessage(),
                        invite.getNumber(),
                        invite.getFromUser().getEmail(),
                        invite.getSentAt()
                );

                invitesResponse.add(inviteResponse);
            }
            else if (loggedUser.getRole() == Role.BAND) {
                Musician musician = invite.getFromUser().getMusician();

                Set<String> instruments = new HashSet<>();
                musician.getInstruments().forEach(instrument -> instruments.add(instrument.getInstrument().getName()));

                InviteResponseDTO inviteResponse = new InviteResponseDTO(
                        musician.getName(),
                        musician.getCity(),
                        musician.getState(),
                        instruments,
                        invite.getMessage(),
                        invite.getNumber(),
                        invite.getFromUser().getEmail(),
                        invite.getSentAt()
                );

                invitesResponse.add(inviteResponse);
            }
        });

        return invitesResponse;
    }

    public List<InviteResponseDTO> getSentInvites() {
        User loggedUser = (User) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal()
        ;

        List<Invite> receivedInvites = inviteRepository.findByFromUser(loggedUser);

        List<InviteResponseDTO> invitesResponse = new ArrayList<>();

        receivedInvites.forEach(invite -> {
            if (loggedUser.getRole() == Role.MUSICIAN) {
                Band band = invite.getToUser().getBand();

                Set<String> instruments = new HashSet<>();
                band.getInstruments().forEach(instrument -> instruments.add(instrument.getName()));

                InviteResponseDTO inviteResponse = new InviteResponseDTO(
                        band.getName(),
                        band.getCity(),
                        band.getState(),
                        instruments,
                        invite.getMessage(),
                        invite.getNumber(),
                        invite.getFromUser().getEmail(),
                        invite.getSentAt()
                );

                invitesResponse.add(inviteResponse);
            }
            else if (loggedUser.getRole() == Role.BAND) {
                Musician musician = invite.getToUser().getMusician();

                Set<String> instruments = new HashSet<>();
                musician.getInstruments().forEach(instrument -> instruments.add(instrument.getInstrument().getName()));

                InviteResponseDTO inviteResponse = new InviteResponseDTO(
                        musician.getName(),
                        musician.getCity(),
                        musician.getState(),
                        instruments,
                        invite.getMessage(),
                        invite.getNumber(),
                        invite.getFromUser().getEmail(),
                        invite.getSentAt()
                );

                invitesResponse.add(inviteResponse);
            }
        });

        return invitesResponse;
    }

}
