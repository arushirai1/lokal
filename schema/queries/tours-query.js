import {GraphQLID, GraphQLBoolean, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat} from 'graphql'
import {getTourList} from '../../database/tours_collection';
import { GraphQLURL } from 'graphql-custom-types';
import {GraphQLDateTime} from 'graphql-iso-date';
import {TourType, LocationType} from '../types/tour';
import {LocationInputType} from '../mutations/create-tour'
import {BSONtoObject} from '../../lib/utils'
import { CategoryType } from '../types/category';
export const ToursQuery = {
    type: new GraphQLList(TourType),
    description: 'This returns a list of tours',
    args: {
        limit: {type: GraphQLInt},
        location: {type: LocationInputType},
        categories: {type: new GraphQLList(GraphQLString), description: 'ranked in order of importance'},
        maxDist: {type: GraphQLInt},
        minDate: {type: GraphQLDateTime},
        maxDate: {type: GraphQLDateTime}
    },
    resolve: (obj, args, {mongo}) => {
        return getTourList(mongo, args);
    }
}

