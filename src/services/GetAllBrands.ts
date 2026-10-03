export default async function GetAllBrands() {
  const response = await fetch(`${process.env.API_BASE_URL}/brands?limit=50`);

  if (!response.ok) {
    throw new Error("API Error");
  }

  const data = await response.json();

  return data.data;
}
