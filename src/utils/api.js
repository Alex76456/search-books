class Api {
	constructor(config) {
		this._url = config.baseUrl;
	}

	_getResponse(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	}

	getSnippets(request) {
		return fetch(`http://${this._url}/search.json?q=${request}`)
			.then(this._getResponse)
			.catch((err) => {
				console.error(err);
			});
	}

	getSnippetImage(id, size = 'L') {
		return fetch(`http://covers.${this._url}/b/id/${id}-${size}.jpg`)
			.then(this._getResponse)
			.catch((err) => {
				console.error(err);
			});
	}
}

const api = new Api({ baseUrl: 'openlibrary.org' });

export default api;
