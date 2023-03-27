package com.cooksys.groupfinal.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class AnnouncementRequestDto {
	
	UserRequestDto userRequest;
	
	String title;
	
	String message;
}
