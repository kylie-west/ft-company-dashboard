package com.cooksys.groupfinal.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.UserAddRequestDto;
import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;

	@PostMapping("/login")
	@CrossOrigin(origins = "*")
	public FullUserDto login(@RequestBody CredentialsDto credentialsDto) {
		return userService.login(credentialsDto);
	}

	@PatchMapping("/{id}")
	public FullUserDto editUser(@RequestBody UserAddRequestDto userAddRequestDto, @PathVariable long id) {
		return userService.editUser(userAddRequestDto, id);
	}
	
	@DeleteMapping("/{id}")
	public FullUserDto deleteUser(@RequestBody CredentialsDto credentialsDto, @PathVariable long id) {
		return userService.deleteUser(credentialsDto, id);
	}
}
