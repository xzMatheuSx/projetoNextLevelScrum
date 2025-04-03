import axios from 'axios';

export const deleteUser = async (userId: string) => {
	const response = await axios.delete(`/api/users/${userId}`);
	return response.data;
};
