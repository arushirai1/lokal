import graphql from "graphql";
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLFloat
} from "graphql";
import { GraphQLURL } from "graphql-custom-types";
import {ReviewType} from "../types/review";
import { createReview } from "../../database/reviews_collection";
import {GraphQLDateTime} from 'graphql-iso-date'

const ReviewInputType = new GraphQLInputObjectType({
    name: "ReviewInputType",
    fields: {
        userId: {type: new GraphQLNonNull(GraphQLID)},
        tourId: {type: new GraphQLNonNull(GraphQLID)},
        rating: {type: new GraphQLNonNull(GraphQLInt)},
        review: {type: new GraphQLNonNull(GraphQLString)}
    }
  });
  
  export const ReviewCreationType = new GraphQLObjectType({
    name: "ReviewCreationReturnType",
    fields: {
      ok: { type: GraphQLBoolean },
      n: { type: GraphQLID }
    }
  });
  
  export default {
    type: ReviewCreationType,
    args: {
      input: { type: new GraphQLNonNull(ReviewInputType) }
    },
    resolve: (obj, { input }, { mongo }) => {
      return createReview(mongo, input);
    }
  };