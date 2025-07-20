export interface Experience {
  id: string;
  designation: string;
  company: string;
  from: string;
  to: string;
  description: string;
  tags: string[];
  startDate: string;
  endDate?: string | null;
  isVisible: boolean;
  createdAt?: string;
  updatedAt?: string;
}
