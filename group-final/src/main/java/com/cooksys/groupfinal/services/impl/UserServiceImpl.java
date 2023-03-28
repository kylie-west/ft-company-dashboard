package com.cooksys.groupfinal.services.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.UserAddRequestDto;
import com.cooksys.groupfinal.entities.Credentials;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.BasicUserMapper;
import com.cooksys.groupfinal.mappers.CredentialsMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
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
	
	private User findUser(String username) {
        Optional<User> user = userRepository.findByCredentialsUsernameAndActiveTrue(username);
        if (user.isEmpty()) {
            throw new NotFoundException("The username provided does not belong to an active user.");
        }
        return user.get();
    }
	
	private User findUser(long id) {
        Optional<User> user = userRepository.findByIdAndActiveTrue(id);
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
		if (userAddRequestDto == null || userAddRequestDto.getCredentials() == null || userAddRequestDto.getCredentials().getUsername() == null || userAddRequestDto.getCredentials().getPassword() == null || userAddRequestDto.getUser() == null) {
            throw new BadRequestException("A username and password are required.");
        }
        Credentials credentialsToValidate = credentialsMapper.dtoToEntity(userAddRequestDto.getCredentials());
        User userToValidate = findUser(userAddRequestDto.getCredentials().getUsername());
        if (!userToValidate.getCredentials().equals(credentialsToValidate)) {
            throw new NotAuthorizedException("The provided credentials are invalid.");
        }
        if(!userToValidate.isAdmin()) {
        	throw new NotAuthorizedException("Admin credentials are required for this request.");
        }
        User userToEdit = findUser(id);

        // Check that the request has a username to change to
        if (userAddRequestDto.getUser().getCredentials().getUsername() != null) {
        	
        	// Check the given username doesn't not equal the current username
        	if(!userAddRequestDto.getUser().getCredentials().getUsername().equals(userToEdit.getCredentials().getUsername())) {
        		
        		// Check the given username doesn't exist is the database
        		if(userRepository.findByCredentialsUsername(userAddRequestDto.getUser().getCredentials().getUsername()).isEmpty()) {
        			userToEdit.getCredentials().setUsername(userAddRequestDto.getUser().getCredentials().getUsername());
        		}
        		else {
            		throw new BadRequestException("Given Username is already in use.");
                }
        	}   	
		}
       
        if (userAddRequestDto.getUser().getCredentials().getPassword() != null) {
        	userToEdit.getCredentials().setPassword(userAddRequestDto.getUser().getCredentials().getPassword());
		}
        if (userAddRequestDto.getUser().getProfile().getFirstName() != null) {
        	userToEdit.getProfile().setFirstName(userAddRequestDto.getUser().getProfile().getFirstName());
		}
		if (userAddRequestDto.getUser().getProfile().getLastName() != null) {
			userToEdit.getProfile().setLastName(userAddRequestDto.getUser().getProfile().getLastName());
		}
		if (userAddRequestDto.getUser().getProfile().getEmail() != null) {
			userToEdit.getProfile().setEmail(userAddRequestDto.getUser().getProfile().getEmail());
		}
		if (userAddRequestDto.getUser().getProfile().getPhone() != null) {
			userToEdit.getProfile().setPhone(userAddRequestDto.getUser().getProfile().getPhone());
		}
        
		return fullUserMapper.entityToFullUserDto(userRepository.saveAndFlush(userToEdit));
	}
	
	
	
	
	
	

}
