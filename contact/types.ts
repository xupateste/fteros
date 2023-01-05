export interface Contact {
  id: string;
  phone: string;
  name?: string;
  location?: string;
  description?: string;
  visits?: number;
  createdAt: number;
  updatedAt: number;
}
