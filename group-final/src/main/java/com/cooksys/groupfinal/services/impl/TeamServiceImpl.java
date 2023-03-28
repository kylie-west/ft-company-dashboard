package com.cooksys.groupfinal.services.impl;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.TeamRequestDto;
import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {
    @Override
    public TeamDto editTeam(TeamRequestDto teamRequestDto, Long id) {
        // TODO Implement editTeam
    }

}
