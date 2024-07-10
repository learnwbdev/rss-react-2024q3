export interface ApiResult {
  name: string;
  height: string;
  hair_color: string;
  gender: string;
}

export interface ApiResponse {
  count: number;
  results: ApiResult[];
}
