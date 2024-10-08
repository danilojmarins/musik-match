package com.tcc.musikmatch.services;

import com.tcc.musikmatch.dtos.AuthenticationResponseDTO;
import com.tcc.musikmatch.dtos.MusicianRecordDTO;
import com.tcc.musikmatch.enums.Role;
import com.tcc.musikmatch.exceptions.EntityAlreadyExistsException;
import com.tcc.musikmatch.exceptions.EntityNotFoundException;
import com.tcc.musikmatch.models.Genre;
import com.tcc.musikmatch.models.Musician;
import com.tcc.musikmatch.models.MusicianInstrument;
import com.tcc.musikmatch.models.User;
import com.tcc.musikmatch.repositories.GenreRepository;
import com.tcc.musikmatch.repositories.InstrumentRepository;
import com.tcc.musikmatch.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class MusicianService {

    private final UserRepository userRepository;
    private final InstrumentRepository instrumentRepository;
    private final GenreRepository genreRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public MusicianService(
        UserRepository userRepository,
        InstrumentRepository instrumentRepository,
        GenreRepository genreRepository,
        PasswordEncoder passwordEncoder,
        JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.instrumentRepository = instrumentRepository;
        this.genreRepository = genreRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Transactional
    public AuthenticationResponseDTO createMusician(MusicianRecordDTO musicianRecordDTO) {
        boolean userAlreadyExists = userRepository.findByEmail(musicianRecordDTO.email()).isPresent();
        if (userAlreadyExists) {
            throw new EntityAlreadyExistsException("Já existe um usuário cadastrado com o e-mail informado.");
        }

        User user = new User();
        user.setEmail(musicianRecordDTO.email());
        user.setPassword(passwordEncoder.encode(musicianRecordDTO.password()));
        user.setRole(Role.MUSICIAN);

        Musician musician = new Musician();
        musician.setName(musicianRecordDTO.name());
        musician.setBio(musicianRecordDTO.bio());
        musician.setBirthdate(musicianRecordDTO.birthdate());
        musician.setZip_code(musicianRecordDTO.zip_code());
        musician.setLat(musicianRecordDTO.lat());
        musician.setLon(musicianRecordDTO.lon());

        Set<MusicianInstrument> musicianInstruments = new HashSet<>();

        musicianRecordDTO.instruments().forEach(instrument -> {
            MusicianInstrument musicianInstrument = new MusicianInstrument();
            musicianInstrument.setMusician(musician);
            musicianInstrument.setInstrument(instrumentRepository
                .findById(instrument.id())
                .orElseThrow(() -> new EntityNotFoundException("Instrumento não encontrado."))
            );
            musicianInstrument.setProficiency(instrument.proficiency());
            musicianInstruments.add(musicianInstrument);
        });

        Set<Genre> genres = new HashSet<>();

        musicianRecordDTO.genresIds().forEach(id -> {
            Genre genre = genreRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Gênero não encontrado."))
            ;
            genres.add(genre);
        });

        musician.setInstruments(musicianInstruments);
        musician.setGenres(genres);
        musician.setUser(user);
        user.setMusician(musician);
        userRepository.save(user);

        String jwtToken = jwtService.generateJwtToken(user);
        return new AuthenticationResponseDTO(jwtToken);
    }

}
