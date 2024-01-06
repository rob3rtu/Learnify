const { GraphQLObjectType } = require("graphql");
const saveProfileImage = require("./mutations/saveProfileImage");

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    saveProfileImage: saveProfileImage,
  },
});

module.exports = mutationType;
