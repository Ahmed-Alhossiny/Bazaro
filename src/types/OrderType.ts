export interface OrderProduct {
  _id: string;
  title: string;
  imageCover: string;
  ratingsAverage: number;
  brand?: {
    _id: string;
    name: string;
    image: string;
  };
  category?: {
    _id: string;
    name: string;
  };
}

export interface OrderItem {
  _id: string;
  count: number;
  price: number;
  product: OrderProduct;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
  postalCode?: string;
}

export interface Order {
  _id: string;
  id: number;
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt?: string;
  cartItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
}
