package br.puc.novaapicontroller.controller;

import br.puc.novaapicontroller.dto.Login.LoginRequest;
import br.puc.novaapicontroller.service.LoginService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/public/login")
public class LoginController {

    private final LoginService service;

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody LoginRequest request) throws JsonProcessingException {
        return ResponseEntity.ok(service.logar(request));
    }

}
