"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Server {
    constructor(app, database, port) {
        this.app = app;
        this.port = port;
    }
    ;
    run() {
        return this.app.listen(this.port, () => {
            console.log(`Up and running on port http://localhost:${this.port}`);
        });
    }
    ;
    loadMiddleware(middleware) {
        // global stuff like cors, body-parser, etc
        middleware.forEach(mw => {
            this.app.use(mw);
        });
    }
    ;
    loadControllers(controllers) {
        controllers.forEach(controller => {
            // use setRoutes method that maps routes and returns Router object
            this.app.use(controller.path, controller.setRoutes());
        });
    }
    ;
    initDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            // ...
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map