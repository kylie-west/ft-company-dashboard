package com.cooksys.groupfinal.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class AnnouncementRequestDto {
	
	CredentialsDto credentials;
	
	String title;
	
	String message;
	
	Long companyId;
}
