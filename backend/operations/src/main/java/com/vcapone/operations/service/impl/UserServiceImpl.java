package com.vcapone.operations.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcapone.operations.entity.User;
import com.vcapone.operations.repository.UserRepository;
import com.vcapone.operations.service.UserService;

import jakarta.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired 
    private UserRepository userRepository; 

    @Override 
    public List<User> getAllUsers() 
    { 
        return userRepository.findAll(); 
    } 

    @Override 
    public User getUserById(UUID id) 
    { 
        return userRepository.findById(id).orElse(null); 
    } 

    @Override public User addUser(User user) 
    { 
        return userRepository.save(user); 
    } 

    @Override
    public User updateUser(UUID id, User user) 
    { 
        user.setId(id);
        return userRepository.save(user); 
    } 

    @Override 
    public void deleteUser(UUID id) 
    { 
        userRepository.deleteById(id); 
    }
}

