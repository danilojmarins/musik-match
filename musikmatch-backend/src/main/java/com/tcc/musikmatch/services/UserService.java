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

import com.tcc.musikmatch.utils.Distance;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
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

    public List<UserResponseDTO> filterUsers(String search, Integer genreId, Integer instrumentId, Integer distance) {
        User loggedUser = (User) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal()
        ;

        List<Band> bands;
        List<Musician> musicians;
        List<UserResponseDTO> usersResponse = new ArrayList<>();

        if (loggedUser.getRole() == Role.MUSICIAN) {
            bands = bandRepository.findAll();

            double userLat = loggedUser.getMusician().getLat().doubleValue();
            double userLon = loggedUser.getMusician().getLon().doubleValue();
            
            List<Band> bandsFilteredByGenre = new ArrayList<Band>();
            bands.forEach(band -> {
                if (genreId == null || band.getGenres().stream().anyMatch(genre -> genre.getId() == genreId)) {
                    bandsFilteredByGenre.add(band);
                }
            });

            List<Band> bandsFilteredByInstrument = new ArrayList<Band>();
            bandsFilteredByGenre.forEach(band -> {
                if (instrumentId == null || band.getInstruments().stream().anyMatch(instrument -> instrument.getId() == instrumentId)) {
                    bandsFilteredByInstrument.add(band);
                }
            });

            List<Band> bandsFilteredBySearch = new ArrayList<Band>();
            bandsFilteredByInstrument.forEach(band -> {
                if (search == null || band.getName().toLowerCase().contains(search.toLowerCase()) || band.getBio().toLowerCase().contains(search.toLowerCase())) {
                    bandsFilteredBySearch.add(band);
                }
            });

            List<Band> bandsFilteredByDistance = new ArrayList<>();
            bandsFilteredBySearch.forEach(band -> {
                if (distance == null || Distance.calcHaversine(userLat, userLon, band.getLat().doubleValue(), band.getLon().doubleValue()) <= distance) {
                    bandsFilteredByDistance.add(band);
                }
            });

            bandsFilteredByDistance.forEach(band -> {
                Set<String> bandInstruments = new HashSet<>();
                band.getInstruments().forEach(instrument -> bandInstruments.add(instrument.getName()));

                Set<String> genres = new HashSet<>();
                band.getGenres().forEach(genre -> genres.add(genre.getName()));

                UserResponseDTO userResponse = new UserResponseDTO(
                    band.getName(),
                    band.getBio(),
                    band.getState(),
                    band.getCity(),
                    band.getType().toString(),
                    null,
                    bandInstruments,
                    genres,
                    band.getUser().getRole().toString()
                );

                usersResponse.add(userResponse);
            });
        }
        else if (loggedUser.getRole() == Role.BAND) {
            musicians = musicianRepository.findAll();

            double userLat = loggedUser.getBand().getLat().doubleValue();
            double userLon = loggedUser.getBand().getLon().doubleValue();

            List<Musician> musiciansFilteredByGenre = new ArrayList<>();
            musicians.forEach(musician -> {
                if (genreId == null || musician.getGenres().stream().anyMatch(genre -> genre.getId() == genreId)) {
                    musiciansFilteredByGenre.add(musician);
                }
            });

            List<Musician> musiciansFilteredByInstrument = new ArrayList<>();
            musiciansFilteredByGenre.forEach(musician -> {
                if (instrumentId == null || musician.getInstruments().stream().anyMatch(instrument -> instrument.getInstrument().getId() == instrumentId)) {
                    musiciansFilteredByInstrument.add(musician);
                }
            });

            List<Musician> musiciansFilteredBySearch = new ArrayList<>();
            musiciansFilteredByInstrument.forEach(musician -> {
                if (search == null || musician.getName().toLowerCase().contains(search.toLowerCase()) || musician.getBio().toLowerCase().contains(search.toLowerCase())) {
                    musiciansFilteredBySearch.add(musician);
                }
            });

            List<Musician> musiciansFilteredByDistance = new ArrayList<>();
            musiciansFilteredBySearch.forEach(musician -> {
                if (distance == null || Distance.calcHaversine(userLat, userLon, musician.getLat().doubleValue(), musician.getLon().doubleValue()) <= distance) {
                    musiciansFilteredByDistance.add(musician);
                }
            });

            musiciansFilteredByDistance.forEach(musician -> {
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

                UserResponseDTO userResponse = new UserResponseDTO(
                    musician.getName(),
                    musician.getBio(),
                    musician.getState(),
                    musician.getCity(),
                    null,
                    musicianInstruments,
                    null,
                    genres,
                    musician.getUser().getRole().toString()
                );

                usersResponse.add(userResponse);
            });
        }
        else {
            throw new EntityNotFoundException("Usuário indefinido.");
        }

        return usersResponse;
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
                musician.getState(),
                musician.getCity(),
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
                band.getState(),
                band.getCity(),
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
