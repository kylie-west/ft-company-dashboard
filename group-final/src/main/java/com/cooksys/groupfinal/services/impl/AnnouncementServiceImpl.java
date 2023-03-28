package com.cooksys.groupfinal.services.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {

	private final AnnouncementRepository announcementRepository;
	private final AnnouncementMapper announcementMapper;
	
	
	@Override
	public Set<AnnouncementDto> getAllAnnouncements() {
		return announcementMapper.entitiesToDtos(new HashSet<>(announcementRepository.findAll()));
	}

}