package com.cooksys.groupfinal.services.impl;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.TeamResponseDto;
import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {
    @Override
    public TeamResponseDto editTeam(TeamDto team, Long id) {
        // TODO Implement editTeam
        throw new UnsupportedOperationException("Unimplemented method 'editTeam'");
    }

}
