export default async function GetAllCat() {
  const response = await fetch(`${process.env.API_BASE_URL}/categories`);

  if (!response.ok) {
    throw new Error("API Error");
  }

  const data = await response.json();

  return data.data;
}
