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

import { GraphQLEmail, GraphQLURL } from "graphql-custom-types";
import {UserCreationType, UserInputType} from "./mutations/create-user";
import UserMutation from "./mutations/create-user";
import TourMutation from "./mutations/create-tour"

import {TourQuery} from './types/tour';
import UserType, {UserQuery} from "./types/user";
import {ReviewQuery} from './types/review';
import {CategoryQuery} from './types/category'

const queryType = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    user: UserQuery,
    tour: TourQuery,
    review: ReviewQuery,
    category: CategoryQuery
  }
});

const mutationType = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    createUser: UserMutation,
    createTour: TourMutation
  }
});
//
const mySchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

module.exports = mySchema;
