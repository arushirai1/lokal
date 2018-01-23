import graphql from 'graphql';
import {GraphQLID, GraphQLObjectType, GraphQLString, GraphQLInt} from 'graphql';
import {GraphQLEmail, GraphQLURL} from 'graphql-custom-types'
import {getUser} from '../../database/users_collection'

export const UserType = new GraphQLObjectType( {
    name: 'UserType',
    fields: {
        _id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLEmail},
        password: {type: GraphQLString},
        zip: {type: GraphQLString},
        phone: {type: GraphQLString},
        picUrl: {type: GraphQLURL},
        bio: {type: GraphQLString},
        addr: {type: GraphQLString},
    }
})

export const UserQuery = {
    type: UserType,
    args: {
      email: { type: GraphQLEmail }
    },
    resolve: (obj, { email }, { mongo }) => {
      return getUser(email, mongo);
    }
  };

