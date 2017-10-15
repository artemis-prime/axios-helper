const axios 		= require('axios');
const logger		= require('@artemis-prime/logger');

class AxiosHelper {

	constructor(conf) {
		if (_instance == null) {
			let {baseURL, timeout} = conf;
			_instance = axios.create({
				baseURL: baseURL,
				timeout: timeout
			});
			logger.log("Created axios instance");
		}
		return _instance;
	}

	setAuthToken(token) {
		if (_instance) {
			_instance.defaults.headers.common['Authorization'] = token;
		}
	}

	hasAuthToken() {
		return (_instance) ?
			('Authorization' in _instance.defaults.headers.common)
			:
			false;
	}

	clearAuthToken() {
		if (_instance) {
			delete _instance.defaults.headers.common.Authorization;
		}
	}
}
let _instance = null;

module.exports = new AxiosHelper();
