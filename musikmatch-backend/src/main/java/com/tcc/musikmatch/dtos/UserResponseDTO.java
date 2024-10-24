package com.tcc.musikmatch.dtos;

import java.util.Set;

public record UserResponseDTO(
        String name,
        String bio,
        String state,
        String city,
        String type,
        Set<MusicianInstrumentResponseDTO> musicianInstruments,
        Set<String> bandInstruments,
        Set<String> genres,
        String role
) {
}