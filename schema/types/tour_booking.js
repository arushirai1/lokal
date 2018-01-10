import {GraphQLDateTime} from 'graphql-iso-date';
import {GraphQLID, GraphQLNonNull, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat} from 'graphql'
import {getTourBooking} from '../../database/tour_bookings_collection'
export const TourBookingType = new GraphQLObjectType({
    name: 'TourBookingType',
    description: 'This is the specific tour-session that is being booked',
    fields: {
        _id: {type: GraphQLID},
        dateTime: {type: GraphQLDateTime},
        tourId: {type: GraphQLID},
        users:{type: GraphQLList(GraphQLID)}
    }
});

export const TourBookingQuery = new GraphQLObjectType({
    name: 'TourBookingType',
    description: 'Get the availibility of a tour-booking by the date-time and tour',
    args: {
        datetime: {type: new GraphQLNonNull(GraphQLDateTime)},
        tourId: {type: new GraphQLNonNull(GraphQLID)}
    },
    resolve: (obj, {datetime, tourId}, {mongo}) => {
        return getTourBooking(mongo, datetime, tourId);
    }
})
