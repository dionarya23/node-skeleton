const { User } = require("../services/relation_table");

module.exports = {
  async insert(newUserData) {
    try {
      const newUser = await User.create(newUserData);
      return newUser;
    } catch (err) {
      console.log("error at user repository insert : ", err);
      throw new Error("error at user repository insert");
    }
  },

  async findUserByEmail(email) {
    try {
      const user = await User.findOne({ where: { email } });
      return user;
    } catch (err) {
      console.log('error at user repository findUserByEmail : ', err);
      throw new Error('error at user repository findUserByEmail');
    }
  },
};
