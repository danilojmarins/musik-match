package com.tcc.musikmatch.services;

import com.tcc.musikmatch.dtos.MusicianInstrumentResponseDTO;
import com.tcc.musikmatch.dtos.UserResponseDTO;
import com.tcc.musikmatch.enums.Role;
import com.tcc.musikmatch.exceptions.EntityNotFoundException;
import com.tcc.musikmatch.models.Band;
import com.tcc.musikmatch.models.Musician;
import com.tcc.musikmatch.models.User;
import com.tcc.musikmatch.repositories.BandRepository;
import com.tcc.musikmatch.repositories.MusicianRepository;
import com.tcc.musikmatch.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final MusicianRepository musicianRepository;
    private final BandRepository bandRepository;

    public UserService(
        UserRepository userRepository,
        MusicianRepository musicianRepository,
        BandRepository bandRepository
    ) {
        this.userRepository = userRepository;
        this.musicianRepository = musicianRepository;
        this.bandRepository = bandRepository;
    }

    public UserResponseDTO getUserById(UUID id) {
        User user = userRepository
            .findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado."))
        ;

        Band band;
        Musician musician;
        UserResponseDTO userResponse;

        if (user.getRole() == Role.MUSICIAN) {
            musician = musicianRepository
                .findByUser(user)
                .orElseThrow(() -> new EntityNotFoundException("Músico não encontrado."))
            ;

            Set<MusicianInstrumentResponseDTO> musicianInstruments = new HashSet<>();
            musician.getInstruments().forEach(instrument -> {
                MusicianInstrumentResponseDTO musicianInstrument = new MusicianInstrumentResponseDTO(
                        instrument.getInstrument().getName(),
                        instrument.getProficiency()
                );
                musicianInstruments.add(musicianInstrument);
            });

            Set<String> genres = new HashSet<>();
            musician.getGenres().forEach(genre -> genres.add(genre.getName()));

            userResponse = new UserResponseDTO(
                musician.getName(),
                musician.getBio(),
                null,
                musician.getBirthdate(),
                null,
                musicianInstruments,
                null,
                genres,
                user.getRole().toString()
            );
        }
        else if (user.getRole() == Role.BAND) {
            band = bandRepository
                .findByUser(user)
                .orElseThrow(() -> new EntityNotFoundException("Banda não encontrada."))
            ;

            Set<String> bandInstruments = new HashSet<>();
            band.getInstruments().forEach(instrument -> bandInstruments.add(instrument.getName()));

            Set<String> genres = new HashSet<>();
            band.getGenres().forEach(genre -> genres.add(genre.getName()));

            userResponse = new UserResponseDTO(
                band.getName(),
                band.getBio(),
                band.getCity(),
                null,
                band.getType().toString(),
                null,
                bandInstruments,
                genres,
                user.getRole().toString()
            );
        }
        else {
            throw new EntityNotFoundException("Usuário indefinido.");
        }

        return userResponse;
    }
}
