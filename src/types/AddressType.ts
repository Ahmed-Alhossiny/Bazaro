export interface AddressType {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface AddressListResponse {
  status: string;
  message?: string;
  results?: number;
  data: AddressType[];
}

export interface AddressResponse {
  status: string;
  message?: string;
  data: AddressType;
}
