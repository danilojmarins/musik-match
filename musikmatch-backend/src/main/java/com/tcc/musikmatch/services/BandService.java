package com.tcc.musikmatch.services;

import com.tcc.musikmatch.dtos.AuthenticationResponseDTO;
import com.tcc.musikmatch.dtos.BandRecordDTO;
import com.tcc.musikmatch.enums.Role;
import com.tcc.musikmatch.models.Band;
import com.tcc.musikmatch.models.User;
import com.tcc.musikmatch.repositories.GenreRepository;
import com.tcc.musikmatch.repositories.InstrumentRepository;
import com.tcc.musikmatch.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;

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
        User user = new User();
        user.setEmail(bandRecordDTO.email());
        user.setPassword(passwordEncoder.encode(bandRecordDTO.password()));
        user.setRole(Role.BAND);

        Band band = new Band();
        band.setName(bandRecordDTO.name());
        band.setBio(bandRecordDTO.bio());
        band.setCity(bandRecordDTO.city());
        band.setType(bandRecordDTO.type());
        band.setLat(bandRecordDTO.lat());
        band.setLon(bandRecordDTO.lon());

        band.setInstruments(new HashSet<>(instrumentRepository.findAllById(bandRecordDTO.instrumentsIds())));
        band.setGenres(new HashSet<>(genreRepository.findAllById(bandRecordDTO.genresIds())));
        band.setUser(user);
        user.setBand(band);
        userRepository.save(user);

        String jwtToken = jwtService.generateJwtToken(user);
        return new AuthenticationResponseDTO(jwtToken);
    }

}
