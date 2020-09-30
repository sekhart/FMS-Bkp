package com.fms.ras.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fms.ras.enums.RoleName;
import com.fms.ras.model.Role;
import com.fms.ras.repository.RoleRepository;

@Service
public class RoleService {

	@Autowired
	public RoleRepository roleRepository;
	
	public Optional<Role> findByRoleName(RoleName name){
		return roleRepository.findByRoleName(name);
		
	}
}
