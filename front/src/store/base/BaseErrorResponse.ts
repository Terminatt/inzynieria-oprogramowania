export interface ErrorResponse {
  status: boolean;
  errors: {
    [key: string]: any;
  }
}