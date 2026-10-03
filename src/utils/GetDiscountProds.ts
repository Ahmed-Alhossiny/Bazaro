import GetAllProds from "@/services/GetAllProds";

export default async function GetDiscountProds() {
  const { products } = await GetAllProds();

  const allDiscountProds = [];

  for (let i = 0; i < products.length; i++) {
    if (products[i].priceAfterDiscount) {
      allDiscountProds.push(products[i]);
    }
  }

  return allDiscountProds;
}
