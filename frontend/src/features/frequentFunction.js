export const config = (token) => {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
};
export const getError = (error) => {
	return (
		(error.response &&
			error.response.data &&
			error.response.data.message) ||
		error.message ||
		error.toString()
	);
};

// const frequentFunction = {
// 	config,
// 	getError,
// };

// export default frequentFunction;
