import axios from 'axios';

const API_URL = '/api/materials/';
const getConfig = (token) => {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
};

const getMaterials = async (token) => {
	const config = getConfig(token);
	const response = await axios.get(API_URL, config);
	return response.data;
};

const createMaterial = async (materialData, token) => {
	const config = getConfig(token);
	const response = await axios.post(
		API_URL,
		materialData,
		config
	);
	return response.data;
};

const deleteMaterial = async (materialId, token) => {
	const config = getConfig(token);
	const response = await axios.delete(
		API_URL + materialId,
		config
	);
	return response.data.id;
};

const updateMaterial = async (materialData, token) => {
	const config = getConfig(token);
	const response = await axios.put(
		API_URL + materialData._id,
		materialData,
		config
	);
	return response.data;
};

const materialService = {
	getMaterials,
	createMaterial,
	deleteMaterial,
	updateMaterial,
};

export default materialService;
