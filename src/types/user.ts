// User types from DummyJSON API
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female';
  hair: {
    color: string;
  };
  address: {
    postalCode: string;
  };
  company: {
    department: string;
  };
}

export interface DummyJsonResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

// Transformed data types
export interface HairColors {
  [color: string]: number;
}

export interface AddressUser {
  [fullName: string]: string;
}

export interface DepartmentData {
  male: number;
  female: number;
  ageRange: string;
  hair: HairColors;
  addressUser: AddressUser;
}

export interface TransformedData {
  [department: string]: DepartmentData;
}
