import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const poolData = {
	UserPoolId: process.env.REACT_APP_USER_POOL_ID,
	ClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID
};

const userPool = new CognitoUserPool(poolData);

export const getIsAuthenticated = async () => {
	return new Promise((resolve, reject) => {
		const cognitoUser = userPool.getCurrentUser();
		if (cognitoUser) {
			cognitoUser.getSession((err, session) => {
				if (err || !session.isValid()) {
					cognitoUser.signOut();
					reject();
					return;
				}
				resolve();
			});
		}
		reject();
	});
};

export const signIn = async (username, password) => {
	const cognitoUser = new CognitoUser({
		Username: username,
		Pool: userPool
	});

	return new Promise((resolve, reject) => {
		const authDetails = new AuthenticationDetails({
			Username: username,
			Password: password
		});

		cognitoUser.authenticateUser(authDetails, {
			onSuccess: () => {
				cognitoUser.getSession((err, session) => {
					if (err) {
						reject(err);
					} else {
						cognitoUser.setSignInUserSession(session);
						resolve(session);
					}
				});
			},
			onFailure: reason => {
				reject(reason);
			}
		});
	});
};

export const signOut = () => {
	const cognitoUser = userPool.getCurrentUser();

	if (cognitoUser) {
		cognitoUser.signOut();
	}
};

const mapAttributeToCognito = obj => Object.keys(obj).map(key => ({ Name: key, Value: obj[key] }));

export const signUp = async (email, password, given_name, family_name, birthdate) => {
	return new Promise((resolve, reject) => {
		userPool.signUp(
			email,
			password,
			mapAttributeToCognito({
				given_name,
				family_name,
				birthdate
			}),
			null,
			(err, result) => {
				if (err) {
					reject(err);
					return;
				}
				resolve(result.user);
			}
		);
	});
};

export const verifyUser = (Username, code) => {
	const cognitoUser = new CognitoUser({
		Username,
		Pool: userPool
	});

	return new Promise((resolve, reject) => {
		try {
			cognitoUser.confirmRegistration(code, true, (err, result) => {
				if (err) {
					reject(err);
				}
				resolve(result);
			});
		} catch (e) {
			reject(e);
		}
	});
};

export const resendCode = Username => {
	const cognitoUser = new CognitoUser({
		Username,
		Pool: userPool
	});

	return new Promise((resolve, reject) => {
		try {
			cognitoUser.resendConfirmationCode((err, result) => {
				if (err) {
					reject(err);
				}
				resolve(result);
			});
		} catch (e) {
			reject(e);
		}
	});
};
