package com.fms.ras.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.annotations.NaturalId;

import com.fms.ras.model.audit.DateAudit;

import lombok.Data;

@Entity
@Data
@Table(name = "users", uniqueConstraints = { @UniqueConstraint(columnNames = { "username" }),
		@UniqueConstraint(columnNames = { "email" }) })
public class User extends DateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userId;

	@NotBlank
	@Size(max = 40)
	private String username;

	@Size(max = 20)
	private String firstName;

	@Size(max = 20)
	private String lastName;

	@Size(max = 40)
	@Email
	@NotBlank
	@NaturalId
	private String email;
	
	@Size(max = 12)
	private String phone;

	@Size(max = 150)
	private String address;

	@Size(max = 50)
	@NotBlank
	private String password;
	
	private boolean enabled = true;

	@Temporal(TemporalType.DATE)
	private Date dateOfBirth;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	public User() {
		super();
	}

	public User(@NotBlank @Size(max = 40) String username, @Size(max = 20) String firstName, @Size(max = 20) String lastName,
				@Size(max = 40) @Email @NotBlank String email, @Size(max = 12) String phone,
				@Size(max = 150) String address, @Size(max = 50) @NotBlank String password,
				Date dateOfBirth) {
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.phone = phone;
		this.address = address;
		this.password = password;
		this.dateOfBirth = dateOfBirth;
	}
}
