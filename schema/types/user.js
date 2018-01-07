import graphql from 'graphql';
import {  GraphQLObjectType, GraphQLString, GraphQLInt} from 'graphql';
import {GraphQLEmail, GraphQLURL} from 'graphql-custom-types'

module.exports = new GraphQLObjectType( {
    name: 'UserType',
    fields: {
        name: {type: GraphQLString},
        email: {type: GraphQLEmail},
        password: {type: GraphQLString},
        street: {type: GraphQLString},
        cityState: {type: GraphQLString},
        zip: {type: GraphQLInt},
        picUrl: {type: GraphQLURL},
        bio: {type: GraphQLString}
    }
})