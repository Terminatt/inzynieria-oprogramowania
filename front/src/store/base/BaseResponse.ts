export default interface BaseResponse<Data = {}> {
  documents?: Data;
  success: boolean;
}