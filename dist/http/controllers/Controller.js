"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Methods = void 0;
const express_1 = require("express");
// HTTP methods
var Methods;
(function (Methods) {
    Methods["GET"] = "GET";
    Methods["POST"] = "POST";
    Methods["PUT"] = "PUT";
    Methods["DELETE"] = "DELETE";
})(Methods = exports.Methods || (exports.Methods = {}));
;
;
class Controller {
    constructor() {
        // Router instance for mapping routes
        this.router = (0, express_1.Router)();
        // Array of objects which implement IRoutes interface
        this.routes = [];
        this.setRoutes = () => {
            // Set HTTP method, middleware, and handler for each route
            // Returns Router object, which we will use in Server class
            for (const route of this.routes) {
                if (route.localMiddleware)
                    for (const mw of route.localMiddleware) {
                        this.router.use(route.path, mw);
                    }
                ;
                switch (route.method) {
                    case 'GET':
                        this.router.get(route.path, route.handler);
                        break;
                    case 'POST':
                        this.router.post(route.path, route.handler);
                        break;
                    case 'PUT':
                        this.router.put(route.path, route.handler);
                        break;
                    case 'DELETE':
                        this.router.delete(route.path, route.handler);
                        break;
                    default:
                    // Throw exception
                }
                ;
            }
            ;
            // Return router instance (will be usable in Server class)
            return this.router;
        };
    }
}
exports.default = Controller;
;
//# sourceMappingURL=Controller.js.map