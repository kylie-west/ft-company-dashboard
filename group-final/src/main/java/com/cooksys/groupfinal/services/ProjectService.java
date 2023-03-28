package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.ProjectResponseDto;
import com.cooksys.groupfinal.dtos.ProjectRequestDto;

public interface ProjectService {

	ProjectResponseDto createProject(ProjectRequestDto projectRequestDto, Long id);
}
