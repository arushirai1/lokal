
import {GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat} from 'graphql'
import {getTour} from '../../database/tours_collection';

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

export const TourType = new GraphQLObjectType ({
    name: 'TourType',
    fields: {
        _id: {type: GraphQLID},
        title: {type: GraphQLString},
        path: {type: GraphQLList(LocationType)},
        userId: {type: GraphQLID},
        categoryId: {type: GraphQLID},
        summary: {type: SummaryType},
        info: {type: GraphQLString}
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



