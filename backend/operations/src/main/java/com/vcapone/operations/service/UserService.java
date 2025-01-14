package com.vcapone.operations.service;

import java.util.List;
import java.util.UUID;

import com.vcapone.operations.entity.User;

public interface UserService {
    List<User> getAllUsers(); 
    User getUserById(UUID id); 
    User addUser(User user); 
    User updateUser(UUID id, User user); 
    void deleteUser(UUID id);
}
