import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export async function getRelationshipPreferences(userId: string) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/relate-preferences/${userId}`
    );
    const data = response.data.data;
    const formattedData = {
      ...data,
      priceRange: parsePriceRange(data.price_range),
    };

    return { data: formattedData };
  } catch (error: any) {
    console.error(
      `Error fetching relationships:`,
      error?.response?.data || error.message
    );
  }
}

function parsePriceRange(priceRangeString?: string) {
  if (!priceRangeString) return { min: 0, max: 0 };
  const [min, max] = priceRangeString
    .replace(" INR", "")
    .split("-")
    .map(Number);
  return { min, max };
}
