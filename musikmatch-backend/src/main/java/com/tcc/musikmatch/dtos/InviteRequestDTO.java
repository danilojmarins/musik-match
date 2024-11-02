package com.tcc.musikmatch.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record InviteRequestDTO(
    @NotNull(message = "")
    @NotBlank(message = "toUser é um campo obrigatório")
    String toUser,

    @NotNull(message = "bio não pode ser NULL")
    @NotBlank(message = "bio é um campo obrigatório")
    @Size(min = 3, max = 240, message = "bio deve ter entre 3 e 240 caracteres")
    String message,

    @NotNull(message = "number não pode ser NULL")
    @NotBlank(message = "number é um campo obrigatório")
    @Size(min = 3, max = 240, message = "number deve ter entre 3 e 240 caracteres")
    String number
) {
    
}
