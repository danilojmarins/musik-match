package com.tcc.musikmatch.dtos;

import java.util.Set;
import java.util.Date;
import java.util.UUID;

public record InviteResponseDTO(
    UUID id,
    String name,
    String city,
    String state,
    Set<String> instruments,
    String message,
    String number,
    String email,
    Date sentAt
) {
    
}
