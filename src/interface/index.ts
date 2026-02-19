export interface Address {
  id: number;
  name: string;
  phone: string;
  email?: string;
  address: string;
  area: string;
  city: string;
  postalCode?: string;
  type: "home" | "office" | "other";
  default: boolean;
  landmark?: string;
}

export interface FormErrors {
  name?: string;
  phone?: string;
  address?: string;
  area?: string;
  city?: string;
  postalCode?: string;
  email?: string;
}
