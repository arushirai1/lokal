
import {GraphQLID, GraphQLBoolean, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat} from 'graphql'
import {getTour} from '../../database/tours_collection';
import { GraphQLURL } from 'graphql-custom-types';
import {GraphQLDateTime} from 'graphql-iso-date'

export const InfoType = new GraphQLObjectType ({
    name: 'InfoType',
    description: 'This contains the actual content of tour',
    fields: {
        provide: {description: 'This is what the tour guide will provide', type: GraphQLString},
        bring: {description: 'This is what the user should bring', type: GraphQLString},
        des: {description: 'This is the overall description', type: GraphQLString},
        imgUrls: {type: new GraphQLList(GraphQLURL)} 
    }
});

export const LocationType = new GraphQLObjectType ({
    name: 'LocationType',
    fields: {
        lat: {type: GraphQLFloat},
        lon: {type: GraphQLFloat}
    }
});

export const SummaryType = new GraphQLObjectType ({
    name: 'TourSummaryType',
    fields: {
        avgRating: {type: GraphQLFloat}, 
        totReviews: {type: GraphQLInt},
        totToursGiven: {type: GraphQLInt},
    }
})

export const RepeatableType = new GraphQLObjectType({
    name: 'RepeatableType',
    description: 'This is the information that will be used to set up availibility, etc',
    fields: {
        beg: {type: GraphQLDateTime},
        end: {type: GraphQLDateTime},
        days: {type: new GraphQLList(GraphQLInt), description: '0-Monday, 6-Sunday'}
    }
})

export const TourType = new GraphQLObjectType ({
    name: 'TourType',
    fields: {
        _id: {type: GraphQLID},
        title: {type: GraphQLString},
        path: {type: new GraphQLList(LocationType)},
        userId: {type: GraphQLID},
        categoryId: {type: GraphQLID},
        summary: {type: SummaryType},
        info: {type: InfoType},
        maxUsers: {type: GraphQLInt},
        repeat: {type: RepeatableType},
        specificDates: {type: new GraphQLList(GraphQLDateTime)},
    }
});

export const TourQuery = {
    type: TourType,
    args: {
      _id: { type: GraphQLID }
    },
    resolve: (obj, { _id }, { mongo }) => {
      return getTour(mongo, _id);
    }
};



