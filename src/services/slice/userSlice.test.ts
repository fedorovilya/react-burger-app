import userSlice, {
	createGetUserRequest,
	createLoginRequest,
	createLogoutRequest,
	createRegisterRequest,
	createUpdateUserRequest,
	UserData,
} from '@services/slice/userSlice';
import Cookies from 'js-cookie';

jest.mock('@utils/request', () => ({
	request: jest.fn(),
}));

afterEach(() => {
	jest.restoreAllMocks();
});

describe('тесты userSlice', () => {
	const mockUser = {
		email: 'test@example.com',
		name: 'Test User',
	};

	const mockUserResponse = {
		success: true,
		accessToken: 'mockAccessToken',
		refreshToken: 'mockRefreshToken',
		user: mockUser,
	};

	it('должен использовать initialState по умолчанию', () => {
		// Подчищаем localStorage и cookies перед тестом
		localStorage.clear();
		jest.spyOn(Cookies, 'get').mockReturnValue({});

		const actual = userSlice(undefined, { type: '' });
		expect(actual).toEqual({
			user: null,
			status: 'idle',
			error: null,
			isAuthorized: false,
		});
	});

	it('должен установить status "loading" при pending действиях', () => {
		const actions = [
			createRegisterRequest.pending('', {
				name: 'testUser',
				email: 'testUser@example.com',
				password: 'password',
			}),
			createLoginRequest.pending('', {
				email: 'testUser@example.com',
				password: 'password',
			}),
			createLogoutRequest.pending('', { token: 'token' }),
			createGetUserRequest.pending('', undefined),
			createUpdateUserRequest.pending('', {
				name: 'testUser1',
				email: 'testUser1@example.com',
				password: 'password1',
			}),
		];

		actions.forEach((action) => {
			const actual = userSlice(undefined, action);
			expect(actual.status).toBe('loading');
			expect(actual.error).toBeNull();
		});
	});

	it('должен обработать успешную регистрацию/логин/обновление пользователя', () => {
		const actions = [
			createRegisterRequest.fulfilled(mockUserResponse, '', {
				name: 'Test',
				email: 'test@example.com',
				password: '123456',
			}),
			createLoginRequest.fulfilled(mockUserResponse, '', {
				email: 'test@example.com',
				password: '123456',
			}),
			createUpdateUserRequest.fulfilled(mockUserResponse, '', {
				email: 'newemail@example.com',
				name: 'New Name',
			}),
		];

		actions.forEach((action) => {
			const actual = userSlice(undefined, action);
			expect(actual.status).toBe('success');
			expect(actual.error).toBeNull();
			expect(actual.user).toEqual(mockUser);
			expect(actual.isAuthorized).toBe(true);
		});
	});

	it('должен обработать ошибки регистрации/логина/обновления', () => {
		const errorMessage = 'Ошибка сети';

		const actions = [
			createRegisterRequest.rejected(
				new Error(errorMessage),
				'',
				{
					name: 'Test',
					email: 'test@example.com',
					password: '123456',
				},
				{
					message: errorMessage,
					name: 'unknown',
				}
			),
			createLoginRequest.rejected(
				new Error(errorMessage),
				'',
				{
					email: 'test@example.com',
					password: '123456',
				},
				{
					message: errorMessage,
					name: 'unknown',
				}
			),
			createUpdateUserRequest.rejected(
				new Error(errorMessage),
				'',
				{
					email: 'newemail@example.com',
					name: 'New Name',
				},
				{
					message: errorMessage,
					name: 'unknown',
				}
			),
		];

		actions.forEach((action) => {
			const actual = userSlice(undefined, action);
			expect(actual.status).toBe('fail');
			expect(actual.error).toBe(errorMessage);
			expect(actual.user).toBeNull();
			expect(actual.isAuthorized).toBe(false);
		});
	});

	it('должен обработать ошибку AuthError и сбросить isAuthorized', () => {
		const errorPayload = {
			message: 'Токен истек',
			name: 'AuthError',
		};

		const actual = userSlice(
			{
				user: mockUser,
				status: 'success',
				error: null,
				isAuthorized: true,
			},
			createGetUserRequest.rejected(
				new Error(errorPayload.message),
				'',
				undefined,
				errorPayload
			)
		);

		expect(actual.status).toBe('fail');
		expect(actual.error).toBe(errorPayload.message);
		expect(actual.isAuthorized).toBe(false);
	});

	it('должен выполнить logout и сбросить state', () => {
		const stateWithUser: UserData = {
			user: mockUser,
			status: 'success',
			error: null,
			isAuthorized: true,
		};

		const actual = userSlice(
			stateWithUser,
			createLogoutRequest.fulfilled({ success: true }, '', {
				token: 'mockRefreshToken',
			})
		);

		expect(actual).toEqual({
			user: null,
			status: 'idle',
			error: null,
			isAuthorized: false,
		});
	});
});
