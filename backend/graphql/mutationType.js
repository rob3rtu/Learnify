const { GraphQLObjectType } = require("graphql");
const login = require("./mutations/login");
const saveProfileImage = require("./mutations/saveProfileImage");
const addCourse = require("./mutations/addCourse");

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    login: login,
    saveProfileImage: saveProfileImage,
    addCourse: addCourse,
  },
});

module.exports = mutationType;
