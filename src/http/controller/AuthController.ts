import { Request, Response } from "express";
import AuthService from "../services/auth";

class AuthController {
  async Register(req: Request, res: Response) {
    const authService=new AuthService();

    const dates = await authService.register(req);
    await res.send(dates);
  }

}

export default AuthController;
