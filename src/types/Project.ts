export interface Project {
  id: string;
  title: string;
  slug: string;
  liveLink?: string | null;
  githubLink: string;
  imgSrc?: string;
  date: string;
  description: string;
  tags: string[];
  isFeatured: boolean;
  isVisible: boolean;
  createdAt?: string;
  updatedAt?: string;
}
