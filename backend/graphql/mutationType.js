const { GraphQLObjectType } = require("graphql");
const login = require("./mutations/login");
const saveProfileImage = require("./mutations/saveProfileImage");

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    login: login,
    saveProfileImage: saveProfileImage,
  },
});

module.exports = mutationType;
