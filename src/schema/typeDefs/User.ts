import {GraphQLObjectType, GraphQLString, GraphQLID} from 'graphql';

export const userType = new GraphQLObjectType({
  name: 'Users',
  fields: {
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    username: {type: GraphQLString},
    password: {type: GraphQLString},
  }
})
