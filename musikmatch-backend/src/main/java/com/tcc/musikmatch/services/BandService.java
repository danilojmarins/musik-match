package com.tcc.musikmatch.services;

import com.tcc.musikmatch.dtos.AuthenticationResponseDTO;
import com.tcc.musikmatch.dtos.BandRecordDTO;
import com.tcc.musikmatch.enums.BandType;
import com.tcc.musikmatch.enums.Role;
import com.tcc.musikmatch.exceptions.EntityAlreadyExistsException;
import com.tcc.musikmatch.exceptions.EntityNotFoundException;
import com.tcc.musikmatch.models.Band;
import com.tcc.musikmatch.models.Genre;
import com.tcc.musikmatch.models.Instrument;
import com.tcc.musikmatch.models.User;
import com.tcc.musikmatch.repositories.GenreRepository;
import com.tcc.musikmatch.repositories.InstrumentRepository;
import com.tcc.musikmatch.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class BandService {

    private final UserRepository userRepository;
    private final InstrumentRepository instrumentRepository;
    private final GenreRepository genreRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public BandService(
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

    public AuthenticationResponseDTO createBand(BandRecordDTO bandRecordDTO) {
        boolean userAlreadyExists = userRepository.findByEmail(bandRecordDTO.email()).isPresent();
        if (userAlreadyExists) {
            throw new EntityAlreadyExistsException("Já existe um usuário cadastrado com o e-mail informado.");
        }

        User user = new User();
        user.setEmail(bandRecordDTO.email());
        user.setPassword(passwordEncoder.encode(bandRecordDTO.password()));
        user.setRole(Role.BAND);

        Band band = new Band();
        band.setName(bandRecordDTO.name());
        band.setBio(bandRecordDTO.bio());
        band.setCity(bandRecordDTO.city());
        band.setType(BandType.valueOf(bandRecordDTO.type()));
        band.setLat(bandRecordDTO.lat());
        band.setLon(bandRecordDTO.lon());

        Set<Instrument> instruments = new HashSet<>();

        bandRecordDTO.instrumentsIds().forEach(id -> {
            Instrument instrument = instrumentRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Instrumento não encontrado."))
            ;
            instruments.add(instrument);
        });

        Set<Genre> genres = new HashSet<>();

        bandRecordDTO.genresIds().forEach(id -> {
            Genre genre = genreRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Gênero não encontrado."))
            ;
            genres.add(genre);
        });

        band.setInstruments(instruments);
        band.setGenres(genres);
        band.setUser(user);
        user.setBand(band);
        userRepository.save(user);

        String jwtToken = jwtService.generateJwtToken(user);
        return new AuthenticationResponseDTO(jwtToken);
    }

}
