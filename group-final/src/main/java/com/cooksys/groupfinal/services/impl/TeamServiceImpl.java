package com.cooksys.groupfinal.services.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.TeamRequestDto;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.BasicUserMapper;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.repositories.UserRepository;

import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {
    @Override
    public TeamDto editTeam(TeamDto team, Long id) {
        // TODO Implement editTeam
        throw new UnsupportedOperationException("Unimplemented method 'editTeam'");
    }

  private final TeamRepository teamRepository;
  private final UserRepository userRepository;
  private final CompanyRepository companyRepository;

  private final TeamMapper teamMapper;
  private final BasicUserMapper basicUserMapper;

  @Override
  public TeamDto createTeam(TeamRequestDto teamRequestDto, long companyId) {
    if (teamRequestDto.getCredentials() == null || teamRequestDto.getCredentials().getUsername() == null
        || teamRequestDto.getCredentials().getPassword() == null) {
      throw new BadRequestException("A username and password are required.");
    }
    if (teamRequestDto == null || teamRequestDto.getName() == null || teamRequestDto.getDescription() == null
        || teamRequestDto.getTeammates() == null) {
      throw new BadRequestException("All team information required.");
    }

    User userToValidate = userRepository
        .findByCredentialsUsernameAndActiveTrue(teamRequestDto.getCredentials().getUsername())
        .orElseThrow(() -> new NotFoundException("User not found"));

    if (!userToValidate.isAdmin()
        && !teamRequestDto.getCredentials().getPassword().equals(userToValidate.getCredentials().getPassword())) {
      throw new BadRequestException("Invalid Credentials");
    }

    Team team = teamMapper.requestDtoToEntity(teamRequestDto);

    Set<User> members = new HashSet<>();
    teamRequestDto.getTeammates().forEach(member -> {
      final User tempUser = userRepository.getByProfileFirstNameAndActiveTrue(member.getProfile().getFirstName());
      if (tempUser != null)
        members.add(tempUser);
    });
    Company company = companyRepository.findById(companyId)
        .orElseThrow(() -> new NotFoundException("Company not found"));
    team.setCompany(company);
    team.setTeammates(members);

    return teamMapper.entityToDto(teamRepository.saveAndFlush(team));
  }

}
