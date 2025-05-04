const Blog = require('./blog');
const User = require('./user');

User.hasMany(Blog);
Blog.belongsTo(User);

const syncModels = async () => {
  try {
    await Blog.sync({ alter: true });
    console.log('Blog table synced successfully');
    await User.sync({ alter: true });
    console.log('User table synced successfully');
  } catch (error) {
    console.error('Error syncing tables:', error);
  }
};

syncModels();

module.exports = {
  Blog,
  User,
};
