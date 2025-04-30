export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface DestinationResponse {
  data: Destination[];
  page: number;
  total_pages: number;
  total_items: number;
  page_size: number;
} 