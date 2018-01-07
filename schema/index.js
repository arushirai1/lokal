const graphql = require("graphql");
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInputObjectType
} from "graphql";

import UserType, {UserQuery} from "./types/user";
import { GraphQLEmail, GraphQLURL } from "graphql-custom-types";
import {UserCreationType, UserInputType} from "./mutations/create-user";
import UserMutation from "./mutations/create-user";

const queryType = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    user: UserQuery
  }
});

const mutationType = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    createUser: UserMutation
  }
});
//
const mySchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

module.exports = mySchema;
