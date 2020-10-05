package com.fms.ras.controller;

import java.net.URI;
import java.util.Collections;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.fms.ras.enums.RoleName;
import com.fms.ras.exception.AppException;
import com.fms.ras.model.Role;
import com.fms.ras.model.User;
import com.fms.ras.payloads.ApiResponse;
import com.fms.ras.payloads.JwtAuthenticationResponse;
import com.fms.ras.payloads.LoginRequest;
import com.fms.ras.payloads.SignUpRequest;
import com.fms.ras.security.JwtTokenProvider;
import com.fms.ras.service.RoleService;
import com.fms.ras.service.UserService;

@RestController
@RequestMapping("/api")
public class AuthenticationController {

	@Autowired
	public UserService userService;

	@Autowired
	public RoleService roleService;

	@Autowired
	JwtTokenProvider tokenProvider;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	PasswordEncoder passwordEncoder;

	@PostMapping("/auth/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginReq) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginReq.getUsernameOrEmail(), loginReq.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = tokenProvider.generateToken(authentication);
		return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
	}

	@PostMapping("/auth/signup")
	@Transactional
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signupReq) {

		if (userService.existsByUsername(signupReq.getUsername())) {
			return new ResponseEntity(new ApiResponse(false, "Username already Taken!"), HttpStatus.BAD_REQUEST);
		}

		if (userService.existsByEmail(signupReq.getEmail())) {
			return new ResponseEntity(new ApiResponse(false, "Email already used!"), HttpStatus.BAD_REQUEST);
		}

		User user = new User(signupReq.getUsername(), signupReq.getFirstName(), signupReq.getLastName(),
				signupReq.getEmail(), signupReq.getPhone(), signupReq.getAddress(), signupReq.getPassword(),
				signupReq.getDateOfBirth());

		user.setPassword(passwordEncoder.encode(user.getPassword()));

		Role role = new Role();
		if (signupReq.getRole() != null && signupReq.getRole().equals("ROLE_ADMIN")) {
			role = roleService.findByRoleName(RoleName.ROLE_ADMIN)
					.orElseThrow(() -> new AppException("User Role not set."));
		} else {
			role = roleService.findByRoleName(RoleName.ROLE_USER)
					.orElseThrow(() -> new AppException("User Role not set."));
		}

		user.setRoles(Collections.singleton(role));

		User saveUser = userService.save(user);

		URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/auth/signin")
				.buildAndExpand(saveUser.getUsername()).toUri();

		return ResponseEntity.created(location).body(new ApiResponse(true, "User Registered Successfully!"));

	}
}
