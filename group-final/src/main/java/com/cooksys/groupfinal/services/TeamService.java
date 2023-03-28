package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.TeamRequestDto;

public interface TeamService {
  TeamDto editTeam(TeamRequestDto team, Long id);

  TeamDto createTeam(TeamRequestDto teamRequestDto, long companyId);
}
