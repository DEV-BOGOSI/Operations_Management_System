package com.vcapone.operations.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vcapone.operations.entity.User;

public interface UserRepository extends JpaRepository<User, UUID> {

}

