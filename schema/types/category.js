import {GraphQLID, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat} from 'graphql'
import {getCategory} from '../../database/categories_collection'

export const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: {
        _id: {type: GraphQLID},
        name: {type: GraphQLString}
    }
})

export const CategoryQuery = {
    type: CategoryType,
    args: {
      _id: { type: GraphQLID }
    },
    resolve: (obj, { _id }, { mongo }) => {
      return getCategory(mongo, _id);
    }
};