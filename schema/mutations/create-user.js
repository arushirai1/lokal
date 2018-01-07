import graphql from 'graphql';
import {GraphQLObjectType, GraphQLID, GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLBoolean} from 'graphql';
import {GraphQLEmail, GraphQLURL} from 'graphql-custom-types';
import UserType from '../types/user';
import {createUser} from '../../database/mongodb';

export const UserInputType = new GraphQLInputObjectType ({
    name: 'UserInputType',
    fields: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: new GraphQLNonNull(GraphQLEmail)},
        password: {type: new GraphQLNonNull(GraphQLString)},
        street: {type: new GraphQLNonNull(GraphQLString)},
        cityState: {type: new GraphQLNonNull(GraphQLString)},
        zip: {type: new GraphQLNonNull(GraphQLInt)},
        picUrl: {type: GraphQLURL},
        bio: {type: GraphQLString}
    }
});

export const UserCreationType = new GraphQLObjectType({
    name: 'UserCreationReturnType',
    fields: {
        ok: {type: GraphQLBoolean},
        n: {type: GraphQLID}
    }
});

export default {
    createUser: {
        type: UserCreationType,
        args: {
            input: {type: new GraphQLNonNull(UserInputType)}
        },
        resolve: (obj, {input}, {mongo}) => {
            return createUser(mongo, input);
        }

    }
}


//signIn: AuthUserType