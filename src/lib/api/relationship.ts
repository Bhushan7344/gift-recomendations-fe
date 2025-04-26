import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export async function getAllRelationships(userId: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/relationships/${userId}`);

    return response.data;
  } catch (error: any) {
    console.error(
      `Error fetching relationships:`,
      error?.response?.data || error.message
    );
  }
}

export async function addPerson(id: string, personData: any) {
  try {
    const payload = {
      userId: "00f70814-88b5-417e-8c27-26f221313902",
      ...personData,
    };
    const response = await axios.post(`${API_BASE_URL}/relationships`, payload);

    return response.data;
  } catch (error: any) {
    console.error(
      `Error fetching user ${id}:`,
      error?.response?.data || error.message
    );
    throw new Error("Failed to fetch user");
  }
}

export async function deleteRelationship(relationshipId: string) {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/relationships/${relationshipId}`
    );

    return response.data;
  } catch (error: any) {
    console.error(
      `Error deleting relationship:`,
      error?.response?.data || error.message
    );
  }
}