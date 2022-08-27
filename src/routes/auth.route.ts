import AuthController from "~/http/controller/AuthController";
import Route from "./route";

class AuthRoute extends Route {
  private authController = new AuthController();
  
  constructor() {
    super();
    this.setRoutes();
  }

  protected setRoutes() {
    this.router.get("/planField", this.authController.Register);
 
  }
}

export default AuthRoute;
