package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.TeamResponseDto;

public interface TeamService {

    TeamResponseDto editTeam(TeamDto team, Long id);

}
