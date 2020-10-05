package com.fms.ras.payloads;

import com.fms.ras.model.Role;

import lombok.Data;

@Data
public class UserProfile {

	private Long id;
	private String firstName;
	private String lastName;
	private String username;
	private String email;
	private String phone;
	private String address;
	private String role;

	public UserProfile(Long id, String firstName, String lastName, String username, String email, String phone,
			String address) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.email = email;
		this.phone = phone;
		this.address = address;

	}

}
