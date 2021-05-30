export default interface BaseResponse<Data = {}> {
  documents?: Data;
  document?: Data;
  success: boolean;
}