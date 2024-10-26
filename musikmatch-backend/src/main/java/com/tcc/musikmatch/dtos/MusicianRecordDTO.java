package com.tcc.musikmatch.dtos;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.Set;

public record MusicianRecordDTO(
        @NotNull(message = "email não pode ser NULL")
        @NotBlank(message = "email é um campo obrigatório")
        @Email(message = "email possui formato inválido")
        String email,

        @NotNull(message = "password não pode ser NULL")
        @NotBlank(message = "password é um campo obrigatório")
        @Size(min = 6, max = 240, message = "password deve ter entre 6 e 240 caracteres")
        String password,

        @NotNull(message = "name não pode ser NULL")
        @NotBlank(message = "name é um campo obrigatório")
        @Size(min = 3, max = 240, message = "password deve ter entre 3 e 240 caracteres")
        String name,

        @NotNull(message = "bio não pode ser NULL")
        @NotBlank(message = "bio é um campo obrigatório")
        @Size(min = 3, max = 240, message = "bio deve ter entre 3 e 240 caracteres")
        String bio,

        @NotNull(message = "lat não pode ser NULL")
        @DecimalMin(value = "-90.0", message = "lat não pode ser menor que -90")
        @DecimalMax(value = "90.0", message = "lat não pode ser maior que 90")
        BigDecimal lat,

        @NotNull(message = "lon não pode ser NULL")
        @DecimalMin(value = "-180.0", message = "lon não pode ser menor que -180")
        @DecimalMax(value = "180.0", message = "lon não pode ser maior que 180")
        BigDecimal lon,

        @NotNull(message = "state não pode ser NULL")
        @NotBlank(message = "state é um campo obrigatório")
        String state,

        @NotNull(message = "city não pode ser NULL")
        @NotBlank(message = "city é um campo obrigatório")
        String city,

        @NotNull(message = "instruments não pode ser NULL")
        Set<MusicianInstrumentRecordDTO> instruments,

        @NotNull(message = "genresIds não pode ser NULL")
        Set<Integer> genresIds
) {
}
