import {GraphQLID, GraphQLList, GraphQLNonNull} from 'graphql'
import {getReviewList} from '../../database/reviews_collection';
import {ReviewType} from '../types/review';
import {BSONtoObject} from '../../lib/utils'
export const ReviewsQuery = {
    type: new GraphQLList(ReviewType),
    description: 'This returns a list of reviews',
    args: {
        tourId: {type: new GraphQLNonNull(GraphQLID)}
    },
    resolve: (obj, {tourId}, {mongo}) => {
        return getReviewList(mongo, tourId);
    }
}

