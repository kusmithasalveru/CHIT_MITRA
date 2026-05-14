package com.chitmitra.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chit-groups")
public class ChitGroupController {

    @GetMapping
    public ResponseEntity<?> getAllGroups() {
        // Mock response for frontend integration
        List<Map<String, Object>> mockGroups = List.of(
            Map.of("id", 1, "name", "Premium Savings Fund", "totalAmount", 100000, "durationMonths", 20, "status", "OPEN", "currentMembers", 5, "maxMembers", 20),
            Map.of("id", 2, "name", "Gold Accumulation", "totalAmount", 500000, "durationMonths", 25, "status", "IN_PROGRESS", "currentMembers", 25, "maxMembers", 25)
        );
        return ResponseEntity.ok(mockGroups);
    }
}
