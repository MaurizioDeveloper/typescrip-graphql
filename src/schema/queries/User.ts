import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import { Users } from "../../entities/Users";
import { userType } from "../typeDefs/User";


export const GET_ALL_USERS = {
  type: new GraphQLList(userType),

  async resolve() {
    return await Users.find();
  }
}

export const GET_USER = {
  type: userType,
  args: {
    id: {type: new GraphQLNonNull(GraphQLID)}
  },
  async resolve(_: any, args: any) {
    return await Users.findOneBy({id: args.id});    
  }
}

