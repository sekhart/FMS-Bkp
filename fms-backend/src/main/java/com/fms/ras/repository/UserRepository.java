package com.fms.ras.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fms.ras.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByEmail(String email);

	Optional<User> findByEnabledTrueAndUsernameOrEmail(String username, String email);

	Optional<User> findByUsername(String username);

	List<User> findByUserIdIn(List<Long> userIds);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);

}
