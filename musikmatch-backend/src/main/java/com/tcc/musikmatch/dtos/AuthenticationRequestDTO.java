package com.tcc.musikmatch.dtos;

public record AuthenticationRequestDTO(
        String email,
        String password
) {
}
