package com.tcc.musikmatch.dtos;

import com.tcc.musikmatch.validation.DateValidation;
import jakarta.validation.constraints.*;

import java.time.LocalDate;
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
        @Min(value = 0, message = "lat não pode ser menor que 0")
        @Max(value = 90, message = "lat não pode ser maior que 90")
        double lat,

        @NotNull(message = "lon não pode ser NULL")
        @Min(value = 0, message = "lon não pode ser menor que 0")
        @Max(value = 180, message = "lon não pode ser maior que 180")
        double lon,

        @DateValidation(message = "birthdate deve ser uma data válida, no formato: dd/MM/yyyy")
        LocalDate birthdate,

        @NotNull(message = "zip_code não pode ser NULL")
        @NotBlank(message = "zip_code é um campo obrigatório")
        @Size(min = 8, max = 8, message = "zip_code deve ser 8 dígitos")
        String zip_code,

        @NotNull(message = "instruments não pode ser NULL")
        @NotBlank(message = "instruments é um campo obrigatório")
        Set<MusicianInstrumentRecordDTO> instruments,

        @NotNull(message = "genresIds não pode ser NULL")
        @NotBlank(message = "genresIds é um campo obrigatório")
        Set<Integer> genresIds
) {
}
