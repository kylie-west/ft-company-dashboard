package com.cooksys.groupfinal.services.impl;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.CompanyDto;
import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.UserAddRequestDto;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Credentials;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.BasicUserMapper;
import com.cooksys.groupfinal.mappers.CredentialsMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final FullUserMapper fullUserMapper;
	private final BasicUserMapper basicUserMapper;
	private final CredentialsMapper credentialsMapper;
	private final CompanyRepository companyRepository;

	private User findUser(String username) {
		Optional<User> user = userRepository.findByCredentialsUsernameAndActiveTrue(username);
		if (user.isEmpty()) {
			throw new NotFoundException("The username provided does not belong to an active user.");
		}
		return user.get();
	}

	private User findUser(long id) {
		Optional<User> user = userRepository.findById(id);
		if (user.isEmpty()) {
			throw new NotFoundException("The user id provided does not belong to an active user.");
		}
		return user.get();
	}

	@Override
	public FullUserDto login(CredentialsDto credentialsDto) {
		if (credentialsDto == null || credentialsDto.getUsername() == null || credentialsDto.getPassword() == null) {
			throw new BadRequestException("A username and password are required.");
		}
		Credentials credentialsToValidate = credentialsMapper.dtoToEntity(credentialsDto);
		User userToValidate = findUser(credentialsDto.getUsername());
		if (!userToValidate.getCredentials().equals(credentialsToValidate)) {
			throw new NotAuthorizedException("The provided credentials are invalid.");
		}
		if (userToValidate.getStatus().equals("PENDING")) {
			userToValidate.setStatus("JOINED");
			userRepository.saveAndFlush(userToValidate);
		}
		return fullUserMapper.entityToFullUserDto(userToValidate);
	}

	@Override
	public FullUserDto editUser(UserAddRequestDto userAddRequestDto, long id) {
		if (userAddRequestDto == null || userAddRequestDto.getCredentials() == null
				|| userAddRequestDto.getCredentials().getUsername() == null
				|| userAddRequestDto.getCredentials().getPassword() == null || userAddRequestDto.getUser() == null) {
			throw new BadRequestException("A username and password are required.");
		}
		Credentials credentialsToValidate = credentialsMapper.dtoToEntity(userAddRequestDto.getCredentials());
		User userToValidate = findUser(userAddRequestDto.getCredentials().getUsername());
		if (!userToValidate.getCredentials().equals(credentialsToValidate)) {
			throw new NotAuthorizedException("The provided credentials are invalid.");
		}
		User userToEdit = findUser(id);
		User newUserInfo = basicUserMapper.requestDtoToEntity(userAddRequestDto.getUser());

		if (newUserInfo.getCredentials().getUsername() != null) {
			userToEdit.getCredentials().setUsername(newUserInfo.getCredentials().getUsername());
		}
		if (newUserInfo.getCredentials().getPassword() != null) {
			userToEdit.getCredentials().setPassword(newUserInfo.getCredentials().getPassword());
		}
		if (newUserInfo.getProfile().getFirstName() != null) {
			userToEdit.getProfile().setFirstName(newUserInfo.getProfile().getFirstName());
		}
		if (newUserInfo.getProfile().getLastName() != null) {
			userToEdit.getProfile().setLastName(newUserInfo.getProfile().getLastName());
		}
		if (newUserInfo.getProfile().getEmail() != null) {
			userToEdit.getProfile().setEmail(newUserInfo.getProfile().getEmail());
		}
		if (newUserInfo.getProfile().getPhone() != null) {
			userToEdit.getProfile().setPhone(newUserInfo.getProfile().getPhone());
		}

		return fullUserMapper.entityToFullUserDto(userRepository.saveAndFlush(userToEdit));
	}
	
	// check if credentials exist and correspond
	private void validateAdminCredentials(CredentialsDto credentialsDto) {
		if(credentialsDto == null || credentialsDto.getUsername() == null || credentialsDto.getPassword() == null) {
			throw new BadRequestException("User credentials must be supplied for this request.");
		}
		User associatedUser = findUser(credentialsDto.getUsername());
		if(!associatedUser.getCredentials().getPassword().equals(credentialsDto.getPassword())) {
			throw new NotAuthorizedException("User credentials are invalid.");
		}
		// check for is admin
		// throws not authorized
		if(!associatedUser.isAdmin()) {
			throw new NotAuthorizedException("User is not authorized for this request.");
		}
	}
	
//	private void validateUser(CredentialsDto credentialsDto, BasicUserDto basicUserDto) {
//		validateCredentials(credentialsDto);
//		if(credentialsDto.getUsername() != findUser(basicUserDto.getId()).getCredentials().getUsername()) {
//			throw new NotAuthorizedException("Invalid user credentials offered.");
//		}
//	}

	@Override
	public BasicUserDto createUser(UserAddRequestDto userAddRequestDto, Long companyId) {
		validateAdminCredentials(userAddRequestDto.getCredentials());
		
		
		User userToAdd = fullUserMapper.requestDtoToEntity(userAddRequestDto.getUser());
		userToAdd.setStatus("PENDING");
		Optional<Company> optionalCompany = companyRepository.findById(companyId);
		if(optionalCompany == null) {
			throw new NotFoundException("No company has id " + companyId + ".");
		}
		Company company = optionalCompany.get();
		User userToReturn = userRepository.saveAndFlush(userToAdd);
		company.getEmployees().add(userToReturn);
		companyRepository.saveAndFlush(company);
		return basicUserMapper.entityToBasicUserDto(userToReturn);
	}
}
