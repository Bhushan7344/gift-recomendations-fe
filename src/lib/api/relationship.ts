import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export async function addPerson(id: string, personData: any) {
  try {
    const payload = { userId: '65929f49-6e5b-4f9a-a059-b028d7feca92', ...personData};
    const response = await axios.post(`${API_BASE_URL}/relationships`, payload);

    return response.data;
  } catch (error: any) {
    console.error(`Error fetching user ${id}:`, error?.response?.data || error.message);
    throw new Error('Failed to fetch user');
  }
}