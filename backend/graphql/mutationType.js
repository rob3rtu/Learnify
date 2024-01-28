const { GraphQLObjectType } = require("graphql");
const login = require("./mutations/login");
const saveProfileImage = require("./mutations/saveProfileImage");
const addCourse = require("./mutations/addCourse");
const deleteCourse = require("./mutations/deleteCourse");

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    login: login,
    saveProfileImage: saveProfileImage,
    addCourse: addCourse,
    deleteCourse: deleteCourse,
  },
});

module.exports = mutationType;
