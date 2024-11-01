package com.tcc.musikmatch.dtos;

import java.util.Set;
import java.time.Instant;

public record InviteResponseDTO(
    String name,
    String city,
    String state,
    Set<String> instruments,
    String message,
    String number,
    String email,
    Instant sentAt
) {
    
}
