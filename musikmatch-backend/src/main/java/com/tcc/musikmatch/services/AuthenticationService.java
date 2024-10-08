package com.tcc.musikmatch.services;

import com.tcc.musikmatch.dtos.AuthenticationRequestDTO;
import com.tcc.musikmatch.dtos.AuthenticationResponseDTO;
import com.tcc.musikmatch.exceptions.UnauthorizedException;
import com.tcc.musikmatch.models.User;
import com.tcc.musikmatch.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public AuthenticationService(
        AuthenticationManager authenticationManager,
        UserRepository userRepository,
        JwtService jwtService
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public AuthenticationResponseDTO authenticate(@Valid AuthenticationRequestDTO request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.email(),
                request.password()
            )
        );

        User user = userRepository
            .findByEmail(request.email())
            .orElseThrow(() -> new UnauthorizedException("Não autorizado. Usuário não encontrado."))
        ;
        String jwtToken = jwtService.generateJwtToken(user);
        return new AuthenticationResponseDTO(jwtToken);
    }

}
