declare namespace Express {
  interface Request {
    user_email: string;
    user_id: string;
  }
  interface User {
    id: string;
  }
}