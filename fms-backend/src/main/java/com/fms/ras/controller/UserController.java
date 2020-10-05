package com.fms.ras.controller;

import java.net.URI;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.fms.ras.exception.ResourceNotFoundException;
import com.fms.ras.model.Role;
import com.fms.ras.model.User;
import com.fms.ras.payloads.ApiResponse;
import com.fms.ras.payloads.SignUpRequest;
import com.fms.ras.payloads.UserIdentityAvailability;
import com.fms.ras.payloads.UserProfile;
import com.fms.ras.payloads.UserSummary;
import com.fms.ras.security.CurrentUser;
import com.fms.ras.security.UserPrincipal;
import com.fms.ras.service.UserService;

/* 
* <pre>
 * Revision History:
 * Version Date             Author           	Changes
 * -----------------------------------------------------------------------------
 * 1.0     2 Sep 2020       Sekhar		Initial coding
 *
 * </pre>
 */
@RestController
@RequestMapping("api/users")
public class UserController {

	@Autowired
	public UserService userService;

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@GetMapping("/me")
	@PreAuthorize("hasRole('USER')")
	public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
		UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(),
				currentUser.getName());
		return userSummary;
	}

	@GetMapping("/user/checkUsernameAvailability")
	public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
		Boolean isAvailable = userService.existsByUsername(username);
		return new UserIdentityAvailability(!isAvailable);
	}

	@GetMapping("/user/checkEmailAvailability")
	public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
		Boolean isAvailable = userService.existsByEmail(email);
		return new UserIdentityAvailability(!isAvailable);
	}

	@GetMapping("/userProfile")
	public UserProfile getUserProfile(@RequestParam(value = "username") String username) {

		User user = userService.findByUsernameOrEmail(username)
				.orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
		Role role = user.getRoles().stream().findFirst().get();

		UserProfile userProfile = new UserProfile(user.getUserId(), user.getFirstName(), user.getLastName(),
				user.getUsername(), user.getEmail(), user.getPhone(), user.getAddress());
		userProfile.setRole(role.getRoleName().toString());
		return userProfile;
	}

	@PutMapping("/updateUser/{id}")
	@Transactional
	public ResponseEntity<?> updateUserProfile(@PathVariable(value = "id") Long id,
			@Valid @RequestBody SignUpRequest signupReq) {

		User userUpd = userService.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

		if (userService.existsByUsername(signupReq.getUsername())) {
			return new ResponseEntity(new ApiResponse(false, "Username already Taken!"), HttpStatus.BAD_REQUEST);
		}

		if (userService.existsByEmail(signupReq.getEmail())) {
			return new ResponseEntity(new ApiResponse(false, "Email already used!"), HttpStatus.BAD_REQUEST);
		}

		userUpd.setFirstName(signupReq.getFirstName());
		userUpd.setLastName(signupReq.getLastName());
		userUpd.setUsername(signupReq.getUsername());
		userUpd.setPhone(signupReq.getPhone());
		userUpd.setAddress(signupReq.getAddress());

		User saveUser = userService.save(userUpd);

		URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/")
				.buildAndExpand(saveUser.getUsername()).toUri();

		return ResponseEntity.created(location).body(new ApiResponse(true, "User Updated Successfully!"));
	}

}
