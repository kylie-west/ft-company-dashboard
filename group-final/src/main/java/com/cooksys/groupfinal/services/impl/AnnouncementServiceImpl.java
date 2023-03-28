package com.cooksys.groupfinal.services.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {

	private final AnnouncementRepository announcementRepository;
	private final AnnouncementMapper announcementMapper;
	private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
	
	@Override
	public Set<AnnouncementDto> getAllAnnouncements() {
		return announcementMapper.entitiesToDtos(new HashSet<>(announcementRepository.findAll()));
	}
	
    @Override
    public AnnouncementDto createAnnouncement(AnnouncementRequestDto announcementRequestDto) {
        if (announcementRequestDto.getCredentials() == null) {
            throw new BadRequestException("Credentials are required");
        }
    	
        User author = userRepository.findByCredentialsUsernameAndActiveTrue(announcementRequestDto.getCredentials().getUsername())
                .orElseThrow(() -> new NotFoundException("User not found"));

        if (!author.getCredentials().getPassword().equals(announcementRequestDto.getCredentials().getPassword())) {
            throw new BadRequestException("Invalid credentials");
        }

        Company company = companyRepository.findById(announcementRequestDto.getCompanyId())
                .orElseThrow(() -> new NotFoundException("Company not found"));

        Announcement announcement = announcementMapper.dtoToEntity(announcementRequestDto);
        announcement.setAuthor(author);
        announcement.setCompany(company);

        Announcement savedAnnouncement = announcementRepository.save(announcement);
        return announcementMapper.entityToDto(savedAnnouncement);
    }

}