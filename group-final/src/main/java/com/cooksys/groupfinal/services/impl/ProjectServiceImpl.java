package com.cooksys.groupfinal.services.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;
import com.cooksys.groupfinal.dtos.ProjectResponseDto;
import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.ProjectRequestDto;
import com.cooksys.groupfinal.entities.Project;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.ProjectMapper;
import com.cooksys.groupfinal.repositories.ProjectRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.ProjectService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {
	private final ProjectMapper projectMapper;
	private final ProjectRepository projectRepository;
	private final TeamRepository teamRepository;
	private final UserRepository userRepository;

	@Override
	public ProjectResponseDto createProject(Long teamId, ProjectRequestDto projectRequestDto) {
		CredentialsDto credentialsRequestDto = projectRequestDto.getCredentials();
		if (credentialsRequestDto.getUsername() == null || credentialsRequestDto.getPassword() == null) {
			throw new BadRequestException("Must provide username and password");
		}
		Optional<User> user = userRepository
				.findByCredentialsUsernameAndActiveTrue(credentialsRequestDto.getUsername());
		if (user.isEmpty()) {
			throw new NotFoundException("Could not find user");
		}
		if (projectRequestDto.getName() == null || projectRequestDto.getDescription() == null) {
			throw new BadRequestException("Must provide a name and description to create a new project.");
		}
		Project projectToSave = projectMapper.dtoToEntity(projectRequestDto);
		Optional<Team> team = teamRepository.findById(teamId);
		if (team.isEmpty()) {
			throw new NotFoundException("A team with the provided id does not exist.");
		}
		projectToSave.setTeam(team.get());
		return projectMapper.entityToDto(projectRepository.saveAndFlush(projectToSave));
	}

	@Override
	public ProjectResponseDto editProject(Long projectId, ProjectRequestDto projectRequestDto) {
		CredentialsDto credentialsRequestDto = projectRequestDto.getCredentials();
		if (credentialsRequestDto.getUsername() == null || credentialsRequestDto.getPassword() == null) {
			throw new BadRequestException("Must provide username and password");
		}
		Optional<User> user = userRepository
				.findByCredentialsUsernameAndActiveTrue(credentialsRequestDto.getUsername());
		if (user.isEmpty()) {
			throw new NotFoundException("Could not find user");
		}

		Optional<Project> project = projectRepository.findById(projectId);
		if (project.isEmpty()) {
			throw new NotFoundException("A project with the provided id does not exist.");
		}
		Project projectToEdit = project.get();

		// Updates the name and description if they provide values
		if (projectRequestDto.getName() != null) {
			projectToEdit.setName(projectRequestDto.getName());
		}
		if (projectRequestDto.getDescription() != null) {
			projectToEdit.setDescription(projectRequestDto.getDescription());
		}
		projectToEdit.setActive(projectRequestDto.isActive());

		return projectMapper.entityToDto(projectRepository.saveAndFlush(projectToEdit));
	}
	
	private void validateAdminCredentials(CredentialsDto credentialsDto) {
		if(credentialsDto == null || credentialsDto.getUsername() == null || credentialsDto.getPassword() == null) {
			throw new BadRequestException("User credentials must be supplied for this request.");
		}
		Optional<User> optionalUser = userRepository.findByCredentialsUsernameAndActiveTrue(credentialsDto.getUsername());
		if(optionalUser == null) {
			throw new NotAuthorizedException("No user exists with the given username.");
		}
		User associatedUser = optionalUser.get();
		if(!associatedUser.getCredentials().getPassword().equals(credentialsDto.getPassword())) {
			throw new NotAuthorizedException("User credentials are invalid.");
		}
		// check for is admin
		// throws not authorized
		if(!associatedUser.isAdmin()) {
			throw new NotAuthorizedException("User is not authorized for this request.");
		}
	}

	@Override
	public ProjectResponseDto deleteProject(Long projectId, CredentialsDto credentials) {
		validateAdminCredentials(credentials);
		
		Project projectToDelete = projectRepository.findByIdAndActiveTrue(projectId);
		if(projectToDelete == null) {
			throw new NotFoundException("Project with id " + projectId + " does not exist.");
		}
		projectToDelete.setActive(false);
		projectRepository.saveAndFlush(projectToDelete);
		return projectMapper.entityToDto(projectToDelete);
	}
}
