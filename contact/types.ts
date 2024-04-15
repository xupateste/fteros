export interface Contact {
  id: string;
  phone: string;
  name?: string;
  pastInfo?: string;
  sales?: string;
  location?: string;
  description?: string;
  visits?: number;
  deleted?: boolean;
  visitsPast?: number;
  createdAt: number;
  createdAtPast: number;
  updatedAt: number;
}
