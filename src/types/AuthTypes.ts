export interface UserDTO {
	id: string
	name: string
	email: string
}

export interface LoginUserDTO {
	email: string
	password: string
}

export interface RegisterUserDTO extends LoginUserDTO {
	name: string
}

export interface AuthenticateResponseDTO {
	user: UserDTO
	token: string
}
