package com.tcc.musikmatch.dtos;

import java.util.Date;
import java.util.Set;

public record UserResponseDTO(
        String name,
        String bio,
        String city,
        Date birthdate,
        String type,
        Set<MusicianInstrumentResponseDTO> musicianInstruments,
        Set<String> bandInstruments,
        Set<String> genres,
        String role
) {
}