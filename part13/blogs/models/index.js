const Blog = require('./blog');
const ReadingList = require('./readingList');
const User = require('./user');

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, {
  through: ReadingList,
  as: 'read_blogs',
});

Blog.belongsToMany(User, {
  through: ReadingList,
  as: 'users_read',
});

module.exports = {
  Blog,
  User,
  ReadingList,
};
