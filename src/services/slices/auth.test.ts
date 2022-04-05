import reducer, {
	initialState,
	registerUser,
	loginUser,
	logoutUser,
	getUser,
	updateUser,
	forgotPassword,
	resetPassword
} from './auth'

describe('user reducer', () => {
	it('should return initial state', () => {
		expect(reducer(undefined, { type: "test" })).toEqual(initialState);
	});

	describe('should handle registerUser thunk', () => {
		it('should handle registerUser.pending', () => {
			const action = { type: registerUser.pending };
			expect(reducer(initialState, action)).toEqual({
				...initialState,
				authRequest: true,
				authRequestFailed: false,
			})
		});
		it('should handle registerUser.fulfilled', () => {
			const mock = {
				user: { email: 'email', name: 'name' },
				success: true,
			}
			const action = {
				type: registerUser.fulfilled,
				payload: mock
			};
			expect(reducer(initialState, action)).toEqual({
				...initialState,
				authRequest: false,
				authRequestFailed: false,
				authRequestFailedMessage: '',
				currentUser: mock.user,
			})
		});
		it("should handle registerUser.rejected", () => {
			const action = {
				type: registerUser.rejected,
				error: { message: 'error' }
			};

			expect(reducer(initialState, action)).toEqual({
				...initialState,
				authRequest: false,
				authRequestFailed: true,
				authRequestFailedMessage: 'error',
			});
		});
	});

	describe('should handle loginUser thunk', () => {
		it('should handle loginUser.pending', () => {
			const action = { type: loginUser.pending };
			expect(reducer(initialState, action)).toEqual({
				...initialState,
				authRequest: true,
				authRequestFailed: false,
			})
		});
		it('should handle loginUser.fulfilled', () => {
			const mock = {
				user: { email: 'email', name: 'name' },
				success: true,
			}
			const action = {
				type: loginUser.fulfilled,
				payload: mock
			};
			expect(reducer(initialState, action)).toEqual({
				...initialState,
				authRequest: false,
				authRequestFailed: false,
				authRequestFailedMessage: '',
				currentUser: mock.user,
			})
		});
		it("should handle loginUser.rejected", () => {
			const action = {
				type: loginUser.rejected,
				error: { message: 'error' }
			};

			expect(reducer(initialState, action)).toEqual({
				...initialState,
				authRequest: false,
				authRequestFailed: true,
				authRequestFailedMessage: 'error',
			});
		});
	});

	describe('should handle logoutUser thunk', () => {
		it('should handle logoutUser.pending', () => {
			const action = { type: logoutUser.pending };
			expect(reducer(initialState, action)).toEqual({
				...initialState,
				authRequest: true,
				authRequestFailed: false,
			})
		});
		it('should handle logoutUser.fulfilled', () => {
			const action = {
				type: logoutUser.fulfilled,
			};
			expect(reducer(initialState, action)).toEqual({
				...initialState,
				authRequest: false,
				authRequestFailed: false,
				authRequestFailedMessage: '',
				currentUser: undefined,
			})
		});
		it("should handle logoutUser.rejected", () => {
			const action = {
				type: logoutUser.rejected,
				error: { message: 'error' }
			};

			expect(reducer(initialState, action)).toEqual({
				...initialState,
				authRequest: false,
				authRequestFailed: true,
				authRequestFailedMessage: 'error',
			});
		});
	});

	describe('should handle getUser thunk', () => {
		it('should handle getUser.pending', () => {
			const action = { type: getUser.pending };
			expect(reducer(initialState, action)).toEqual({
				...initialState,
				authRequest: true,
				authRequestFailed: false,
			})
		});
		it('should handle getUser.fulfilled', () => {
			const mock = {
				user: { email: 'email', name: 'name' },
				success: true,
			}

			const action = {
				type: getUser.fulfilled,
				payload: mock
			};
			expect(reducer(initialState, action)).toEqual({
				...initialState,
				authRequest: false,
				authRequestFailed: false,
				authRequestFailedMessage: '',
				currentUser: mock.user,
			})
		});
		it("should handle getUser.rejected", () => {
			const action = {
				type: getUser.rejected,
				error: { message: 'error' }
			};

			expect(reducer(initialState, action)).toEqual({
				...initialState,
				authRequest: false,
				authRequestFailed: true,
				authRequestFailedMessage: 'error',
			});
		});
	});

	describe('should handle updateUser thunk', () => {
		it('should handle updateUser.pending', () => {
			const action = { type: updateUser.pending };
			expect(reducer(initialState, action)).toEqual({
				...initialState,
				authRequest: true,
				authRequestFailed: false,
			})
		});
		it('should handle updateUser.fulfilled', () => {
			const mock = {
				data: { email: 'email', name: 'name' },
				success: true,
			}

			const action = {
				type: updateUser.fulfilled,
				payload: mock
			};
			expect(reducer(initialState, action)).toEqual({
				...initialState,
				authRequest: false,
				authRequestFailed: false,
				authRequestFailedMessage: '',
				currentUser: mock.data,
			})
		});
		it("should handle updateUser.rejected", () => {
			const action = {
				type: updateUser.rejected,
				error: { message: 'error' }
			};

			expect(reducer(initialState, action)).toEqual({
				...initialState,
				authRequest: false,
				authRequestFailed: true,
				authRequestFailedMessage: 'error',
			});
		});
	});

	describe('should handle forgotPassword thunk', () => {
		it('should handle forgotPassword.pending', () => {
			const action = { type: forgotPassword.pending };
			expect(reducer(initialState, action)).toEqual({
				...initialState,
				authRequest: true,
				authRequestFailed: false,
			})
		});
		it('should handle forgotPassword.fulfilled', () => {
			const action = {
				type: forgotPassword.fulfilled,
			};
			expect(reducer(initialState, action)).toEqual({
				...initialState,
				authRequest: false,
				authRequestFailed: false,
				authRequestFailedMessage: '',
			})
		});
		it("should handle forgotPassword.rejected", () => {
			const action = {
				type: forgotPassword.rejected,
				error: { message: 'error' }
			};

			expect(reducer(initialState, action)).toEqual({
				...initialState,
				authRequest: false,
				authRequestFailed: true,
				authRequestFailedMessage: 'error',
			});
		});
	});

	describe('should handle resetPassword thunk', () => {
		it('should handle resetPassword.pending', () => {
			const action = { type: resetPassword.pending };
			expect(reducer(initialState, action)).toEqual({
				...initialState,
				authRequest: true,
				authRequestFailed: false,
			})
		});
		it('should handle resetPassword.fulfilled', () => {
			const action = {
				type: resetPassword.fulfilled,
			};
			expect(reducer(initialState, action)).toEqual({
				...initialState,
				authRequest: false,
				authRequestFailed: false,
				authRequestFailedMessage: '',
			})
		});
		it("should handle resetPassword.rejected", () => {
			const action = {
				type: resetPassword.rejected,
				error: { message: 'error' }
			};

			expect(reducer(initialState, action)).toEqual({
				...initialState,
				authRequest: false,
				authRequestFailed: true,
				authRequestFailedMessage: 'error',
			});
		});
	});
})