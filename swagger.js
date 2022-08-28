const swaggerAutogen = require("swagger-autogen")();

const outputFile = "src/swagger_output.json";
const endpointsFiles = ["src/http/controllers/Controller.ts"];
const doc = {
  host: "localhost:4000",
};
swaggerAutogen(outputFile, endpointsFiles, doc);
