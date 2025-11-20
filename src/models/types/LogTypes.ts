export interface AddLogTypes {
  user_id?: string;
  userName?: string;
  action?: "Register User" | "User Login" | "Update User" | "Delete User";
  startDate?: string;
  endDate?: string;
}
