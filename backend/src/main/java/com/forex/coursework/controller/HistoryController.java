package com.forex.coursework.controller;

import com.forex.coursework.model.History;
import com.forex.coursework.model.User;
import com.forex.coursework.service.CustomUserDetails;
import com.forex.coursework.service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/history")
public class HistoryController {

    @Autowired
    HistoryService historyService;
    //to add history for the user
    @PostMapping("/add")
    public ResponseEntity<History> addHistory(@RequestBody Map<String, String> history) {
        return ResponseEntity.ok(historyService.addHistory(
                history.get("userName"),
                history.get("fromCurrency"),
                history.get("toCurrency")
//                history.get("exchangeRate")
        ));
    }
    //http://localhost:8080/history/all/abc to get the rest by userid
    @GetMapping("all/{userName}")
    public ResponseEntity<List<History>> getHistoriesByUserName(@PathVariable String userName) {
        return ResponseEntity.ok(historyService.getHistoriesByUserName(userName));
    }
}
