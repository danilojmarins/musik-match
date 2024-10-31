package com.tcc.musikmatch.controllers;

import com.tcc.musikmatch.dtos.UserResponseDTO;
import com.tcc.musikmatch.services.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@RestControllerAdvice
@Validated
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> filterUsers(
        @RequestParam(name = "search", required = false) String search,
        @RequestParam(name = "genre", required = false) Integer genre,
        @RequestParam(name = "instrument", required = false) Integer instrument,
        @RequestParam(name = "distance", required = false) Integer distance,
        @AuthenticationPrincipal UserDetails user
    ) {
        System.out.println(instrument);
        return ResponseEntity.status(HttpStatus.OK).body(userService.filterUsers(search, genre, instrument, distance));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable("id")UUID id) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUserById(id));
    }

}
