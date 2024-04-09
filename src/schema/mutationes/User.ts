import {GraphQLString, GraphQLBoolean, GraphQLID, GraphQLInputObjectType} from 'graphql';
import { Users } from '../../entities/Users';
import { userType } from '../typeDefs/User';
import bcrypt from 'bcryptjs';
import { messageType } from '../typeDefs/Message';

export const CREATE_USER = {
  type: userType,
  args: {
    name: {type: GraphQLString},
    username: {type: GraphQLString},
    password: {type: GraphQLString}
  },
  async resolve(_:any, args: any) {
    const {name, username, password } = args;

    const encryptPassword = await bcrypt.hash(password, 10);

    const result = await Users.insert({
      name:name,
      username:username,
      password:encryptPassword
    })
    
    //return {...args, id: result.identifiers[0].id, password: encryptPassword}
    return {username}
  }
}

export const DELETE_USER = {
  type: GraphQLBoolean,
  args: {
    id: {type: GraphQLID},
  },
  async resolve(_: any, {id}: any){
    const result = await Users.delete(id);

    if(result.affected === 1) return true;
    return false
  }
}

export const UPDATE_USER = {
  type: messageType,
  args: {
    id: {type: GraphQLID},
    // name: {type: GraphQLString},
    // username: {type: GraphQLString},
    // oldPassword: {type: GraphQLString},
    // newPassword: {type: GraphQLString},
    input: {
      type: new GraphQLInputObjectType({
        name: "UserInput",
        fields : {
          name: {type: GraphQLString},
          username: {type: GraphQLString},
          oldPassword: {type: GraphQLString},
          newPassword: {type: GraphQLString},
        } 
      })
    }
  },
  // async resolve(_: any, {id, name, username, oldPassword, newPassword}: any ){

  async resolve(_: any, {id, input}: any ){
    
    const userFound = await Users.findOneBy({id})

    if(!userFound) return {
      success: false,
      message: "User not found"
    }

    const isMatch = await bcrypt.compare(input.oldPassword, userFound!.password)

    if(!isMatch) return {
      success: false,
      message: "Password is incorrect"
    }

    const newPasswordHash = await bcrypt.hash(input.newPassword, 10);

    const result = await Users.update({id}, {name: input.name, username: input.username, password:newPasswordHash})

    if(result.affected === 0) return false;
    
    return {
      success: true,
      message: "User update successfully"
    }
  }
}