import graphql from 'graphql';
import {  GraphQLObjectType, GraphQLString, GraphQLInt} from 'graphql';
import {GraphQLEmail, GraphQLURL} from 'graphql-custom-types'
import {getUser} from '../../database/users_collection'

const UserType = new GraphQLObjectType( {
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

export const UserQuery = {
    type: UserType,
    args: {
      email: { type: GraphQLEmail }
    },
    resolve: (obj, { email }, { mongo }) => {
      return getUser(email, mongo);
    }
  };

export default UserType;