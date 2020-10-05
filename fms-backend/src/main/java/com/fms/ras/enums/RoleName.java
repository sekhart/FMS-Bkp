package com.fms.ras.enums;

public enum RoleName {

	ROLE_USER("ROLE_USER"), ROLE_ADMIN("ROLE_ADMIN");

	private String role;

	private RoleName(String role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return role;
	}

}
