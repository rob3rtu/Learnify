const { GraphQLObjectType, GraphQLString } = require("graphql");
const saveProfilePicture = require("./mutations/saveProfilePicture");

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    saveProfilePicture: saveProfilePicture,
  },
});

module.exports = mutationType;
