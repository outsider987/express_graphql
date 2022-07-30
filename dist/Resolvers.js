"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataset_1 = __importDefault(require("./dataset")); //get all of the available data from our database.
const Resolvers = {
    Query: {
        getAllPeople: () => dataset_1.default,
        //if the user runs the getPerson command:
        getPerson: (_, args) => {
            console.log(args);
            //get the object that contains the specified ID.
            return dataset_1.default.find((person) => person.id === args.id);
        },
    },
    Mutation: {
        //create our mutation:
        addPerson: (_, args) => {
            const newPerson = {
                id: dataset_1.default.length + 1,
                name: args.name, //name field
            };
            dataset_1.default.push(newPerson);
            return newPerson; //return the new object's result
        },
    }
};
exports.default = Resolvers;
