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
import {TourType} from "../types/tour";
import { createTour } from "../../database/tours_collection";
import {GraphQLDateTime} from 'graphql-iso-date'

const LocationInputType = new GraphQLInputObjectType({
    name: 'LocationInputType',
    fields: {
        lat: {type: GraphQLFloat},
        lon: {type: GraphQLFloat}
    }
}) 

const InfoInputType = new GraphQLInputObjectType ({
    name: 'InfoInputType',
    fields: {
        provide: {description: 'This is what the tour guide will provide', type: GraphQLString},
        bring: {description: 'This is what the user should bring', type: GraphQLString},
        des: {description: 'This is the overall description', type: GraphQLString},
        imgUrls: {type: new GraphQLList(GraphQLURL)} 
    }
})

const RepeatableInputType = new GraphQLInputObjectType({
    name: 'RepeatableInputType',
    fields: {
        beg: {type: GraphQLDateTime},
        end: {type: GraphQLDateTime},
        days: {type: new GraphQLList(GraphQLInt), description: '0-Monday, 6-Sunday'}
    }
})
const TourInputType = new GraphQLInputObjectType({
  name: "TourInputType",
  fields: {
    title: {type: new GraphQLNonNull(GraphQLString)},
    path: {type: new GraphQLNonNull(new GraphQLList(LocationInputType))},
    userId: {type: new GraphQLNonNull(GraphQLID)},
    categoryName: {type: new GraphQLNonNull(GraphQLString)},
    info: {type: new GraphQLNonNull(InfoInputType)},
    maxUsers: {type: new GraphQLNonNull(GraphQLInt)},
    repeat: {type: RepeatableInputType},
    specificDates: {type: new GraphQLList(GraphQLDateTime)},
  }
});

export const TourCreationType = new GraphQLObjectType({
  name: "TourCreationReturnType",
  fields: {
    ok: { type: GraphQLBoolean },
    n: { type: GraphQLID }
  }
});

export default {
  type: TourCreationType,
  args: {
    input: { type: new GraphQLNonNull(TourInputType) }
  },
  resolve: (obj, { input }, { mongo }) => {
    return createTour(mongo, input);
  }
};

