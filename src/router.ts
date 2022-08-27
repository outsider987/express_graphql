import Route from "./routes/route";
import AuthRoute from "~/routes/auth.route";

export const router: Array<Route> = [new AuthRoute()];
