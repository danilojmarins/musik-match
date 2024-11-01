package com.tcc.musikmatch.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcc.musikmatch.dtos.InviteRequestDTO;
import com.tcc.musikmatch.dtos.InviteResponseDTO;
import com.tcc.musikmatch.services.InviteService;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/invites")
public class InviteController {
    
    private final InviteService inviteService;

    public InviteController(InviteService inviteService) {
        this.inviteService = inviteService;
    }

    @PostMapping
    public ResponseEntity<String> inviteUser(@RequestBody @Valid InviteRequestDTO inviteRequestDTO) {
        inviteService.sendInvite(inviteRequestDTO);
        return ResponseEntity.status(HttpStatus.OK).body("Convite enviado com sucesso.");
    }

    @GetMapping("/received")
    public ResponseEntity<List<InviteResponseDTO>> getReceivedInvites() {
        return ResponseEntity.status(HttpStatus.OK).body(inviteService.getReceivedInvites());
    }

    @GetMapping("/sent")
    public  ResponseEntity<List<InviteResponseDTO>> getSentInvites() {
        return  ResponseEntity.status(HttpStatus.OK).body(inviteService.getSentInvites());
    }

}
