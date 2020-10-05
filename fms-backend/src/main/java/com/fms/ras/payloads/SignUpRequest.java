package com.fms.ras.payloads;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;

import java.util.Date;

@Data
public class SignUpRequest {

	@NotBlank
	@Size(min = 3, max = 15)
	private String username;

	@NotBlank
	@Size(min = 3, max = 15)
	private String firstName;

	@NotBlank
	@Size(min = 3, max = 15)
	private String lastName;

	@NotBlank
	@Size(min = 6, max = 40)
	@Email
	private String email;

	@NotBlank
	@Size(min = 3, max = 150)
	private String address;
	
//	@NotBlank
	@Size(max=12)
	private String phone;

	@NotBlank
	@Size(min = 6, max = 20)
	private String password;
	
	@NotBlank
	@Size(min = 6, max = 20)
	private String passwordConfirmation;

	@NotBlank
	private Boolean policy;

//	@NotBlank
	private Date dateOfBirth;

	private String role;

}
