export interface PropertyOwner {
  id_property: number;
  rent: number;
  currency: string;
  type: string;
  surface_area: string;
  postal_address: string;
  created_at: Date;
  updated_at: Date;
  id_owner: number;
  owner: Owner;
}

export interface Owner {
  id_owner: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export default function formatDate(dateString: Date): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
