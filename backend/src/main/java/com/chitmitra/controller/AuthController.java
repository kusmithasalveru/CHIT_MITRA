package com.chitmitra.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        // Mock authentication for initial setup
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");
        
        if ("test@chitmitra.com".equals(email) && "password".equals(password)) {
            Map<String, Object> response = new HashMap<>();
            response.put("token", "mock_jwt_token_for_development");
            response.put("user", Map.of(
                "id", 1,
                "email", email,
                "name", "Test User",
                "role", "ROLE_USER"
            ));
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> registerRequest) {
        // Mock registration
        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }
}
