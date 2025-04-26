import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export async function getUserById(id: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);

    return response.data;
  } catch (error: any) {
    console.error(
      `Error fetching user ${id}:`,
      error?.response?.data || error.message
    );
  }
}

export async function updateUserPreferences(id: string, updatedUserData: any) {
  try {
    const payload = updatedUserData;
    const response = await axios.patch(`${API_BASE_URL}/users/${id}`, payload);

    return response.data;
  } catch (error: any) {
    console.error(
      `Error fetching user ${id}:`,
      error?.response?.data || error.message
    );
  }
}