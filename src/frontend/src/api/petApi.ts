const getPets = async (ODataQuery?: string) => {
	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	};
	const url = `https://localhost:44334/api/pet${
		ODataQuery ? `?${ODataQuery}` : ''
	}`;
	return await fetch(url, options)
		.then((response) => response.json())
		.catch((error) => console.error(error));
};

export const petApi = {
	getPets,
};
