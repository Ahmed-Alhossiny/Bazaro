export default async function GetProdDetails(id: string) {
  const response = await fetch(`${process.env.API_BASE_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("API Error");
  }

  const data = await response.json();

  return data.data;
}
