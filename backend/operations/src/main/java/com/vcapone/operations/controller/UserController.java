package com.vcapone.operations.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vcapone.operations.entity.User;
import com.vcapone.operations.repository.UserRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository; 

    @GetMapping()
    public List<User> getUsers() 
    {
        return userRepository.findAll();
    }

    @GetMapping("user/{id}")
    public User getUser(@PathVariable("id") UUID id) 
    {
        return userRepository.findById(id).orElse(null); 
    }

    @PostMapping()
    public User addUser(@RequestBody User user) 
    {
        user.setIsActive(true);
        return userRepository.save(user); 
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable("id") UUID id, @RequestBody User user) 
    {
        user.setId(id); 
        return userRepository.save(user); 
    }

    @PutMapping("deActivate/{id}")
    public User deActivateUser(@PathVariable("id") UUID id, @RequestBody User user) 
    {
        user.setId(id);
        user.setIsActive(false);
        return userRepository.save(user); 
    }
    
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") UUID id) 
    {
        userRepository.deleteById(id); 
    }
    
}