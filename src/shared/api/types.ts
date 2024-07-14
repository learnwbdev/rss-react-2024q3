export interface DataResult {
  id: string;
  name: string;
  description: string;
}

export interface DataResponse {
  itemsPerPage: number;
  totalPages: number;
  results: DataResult[];
}
