import {UserResponse} from "../../src/types/userResponse";

export const mockUser: UserResponse = {
	"success": true,
	"accessToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MTRjNmRmZThlNjFkMDAxY2VjNTk3YiIsImlhdCI6MTc0OTYzNTc3MCwiZXhwIjoxNzQ5NjM2OTcwfQ.YctpBiK25j2is0i4zrF5sICyGd4cE8yW-KMa-lRVa_Y",
	"refreshToken": "06fdb3642d5adea703e237867478924133c78e65ab0163f208de2df4635afc3347db40634588aeaf",
	"user": {
		"email": "ilya@test.ru",
		"name": "ilya"
	}
}
