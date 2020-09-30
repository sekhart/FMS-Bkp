package com.fms.ras.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fms.ras.payloads.UserSummary;
import com.fms.ras.security.CurrentUser;
import com.fms.ras.security.UserPrincipal;

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

	@GetMapping("/msg")
	public String getMsg() {

		return "Hello world!";
	}

	@GetMapping("/me")
	@PreAuthorize("hasRole('USER')")
	public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
		UserSummary userSummary = new UserSummary(currentUser.getId(),
				currentUser.getUsername(), currentUser.getName());
		return userSummary;
	}

}
