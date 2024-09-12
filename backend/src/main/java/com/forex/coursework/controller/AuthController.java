package com.forex.coursework.controller;

import com.forex.coursework.model.User;
import com.forex.coursework.repository.UserRepository;
import com.forex.coursework.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/user")
public class AuthController {

    @Autowired
    private UserService userService;
    //end point to register http://localhost:8080/user/register
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.registerUser(user));
    }
    //end point to get user details http://localhost:8080/user/abc
    @GetMapping("/{userName}")
    public ResponseEntity<User> getUserByUserName(@PathVariable String userName) {
        return userService.getUserByUserName(userName)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //end for login http://localhost:8080/user/auth?userName=ABC&password=Kings@2024 - passing as params
    @PostMapping("/auth")
    public ResponseEntity<String> loginUser(@RequestParam String userName,
                                            @RequestParam String password) {
        Optional<User> optionalUser = userService.getUserByUserName(userName);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(401).body("User not found");
        }

        User user = optionalUser.get();
        boolean isValid = userService.validatePassword(user, password);
        if (!isValid) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        return ResponseEntity.ok("success");

//
//        // Change password endpoint
//        @PutMapping("/change-password")
//        public ResponseEntity<String> changePassword(@RequestParam String userName,
//                @RequestParam String oldPassword,
//                @RequestParam String newPassword) {
//            Optional<User> optionalUser = userService.getUserByUserName(userName);
//            if (optionalUser.isEmpty()) {
//                return ResponseEntity.status(404).body("User not found");
//            }
//
//            User user = optionalUser.get();
//            if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
//                return ResponseEntity.status(401).body("Old password is incorrect");
//            }
//
//            user.setPassword(passwordEncoder.encode(newPassword)); // Encode new password
//            userService.updateUser(user);
//            return ResponseEntity.ok("Password updated successfully");
//        }
//
//        // Update email endpoint
//        @PutMapping("/update-email")
//        public ResponseEntity<String> updateEmail(@RequestParam String userName,
//                @RequestParam String newEmail) {
//            Optional<User> optionalUser = userService.getUserByUserName(userName);
//            if (optionalUser.isEmpty()) {
//                return ResponseEntity.status(404).body("User not found");
//            }
//
//            User user = optionalUser.get();
//            user.setEmail(newEmail);
//            userService.updateUser(user);  // Save updated email
//            return ResponseEntity.ok("Email updated successfully");
//        }
    }

    }
