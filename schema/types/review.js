import {GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat} from 'graphql'
import {getReview} from '../../database/reviews_collection'

export const ReviewType = new GraphQLObjectType ({
    name: 'ReviewType',
    fields: {
        _id: {type: GraphQLID},
        userId: {type: GraphQLID},
        tourId: {type: GraphQLID},
        rating: {type: GraphQLInt},
        votes: {type: GraphQLInt},
        review: {type: GraphQLString}
    }
});

export const ReviewQuery = {
    type: ReviewType,
    args: {
        _id: { type: GraphQLID}
    },
    resolve: (obj, {_id}, { mongo }) => {
      return getReview(mongo, _id);
    }
};