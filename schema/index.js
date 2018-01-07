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

import {createUser} from '../database/mongodb';
import UserType from "./types/user";
import { GraphQLEmail, GraphQLURL } from "graphql-custom-types";
import {UserCreationType, UserInputType} from "./mutations/create-user";
import { getUser } from "../database/mongodb";

const DataTest = { id: 1, str: "test" };

const TestType = new GraphQLObjectType({
  name: "TestType",
  fields: () => ({
    id: { type: GraphQLInt },
    str: { type: GraphQLString }
  })
});

const queryType = new GraphQLObjectType({
  name: "RootQuery",
  /*user: {
      type: UserType,
       args: {
           email: {type: GraphQLEmail}
      },
      resolve: (obj, {email}, {mongo}) => {
        return getUser(email, mongo);
      }
  },*/
  fields: {
    user: {
      type: UserType,
      args: {
        email: { type: GraphQLEmail }
      },
      resolve: (obj, { email }, { mongo }) => {
        return getUser(email, mongo);
      }
    },
    test: {
      type: GraphQLString,
      resolve() {
        return "DataTest";
      }
    }
  }
});

const mutationType = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    createUser: {
      type: UserCreationType,
      args: {
        input: { type: new GraphQLNonNull(UserInputType) }
      },
      resolve: (obj, { input }, { mongo }) => {
        return createUser(mongo, input);
      }
    }
  }
});
//
const mySchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

module.exports = mySchema;
