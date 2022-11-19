const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


const typeDefs = `
  type Profile {
    email: String
    name: String
    id: Int


    
  }
  type User {
    email: String
    name: String
    id: Int


    
  }


  type Query {
  
    signup(name: String, email:String, password:String ): User
    profile(id: Int): Profile

  }
`;

const resolvers = {
  Query: {
    profile:  (_, { id }) => {
      return  prisma.user.findFirst({
        where:{
          id:id
        }
      });
    },
    signup:(_, {name, email, password } ) => {
      return  prisma.user.create({ data: {name, email, password}});


    }



  }
};

 const schema = makeExecutableSchema({
  typeDefs,
  resolvers,

});

const app = express(express.json());
app.use('/apis', graphqlHTTP({
  schema,
  graphiql:true
  
}));

app.listen(4000);