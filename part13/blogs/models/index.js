const Blog = require('./blog');

const syncBlog = async () => {
  try {
    await Blog.sync();
    console.log('Blog table synced successfully');
  } catch (error) {
    console.error('Error syncing Blog table:', error);
  }
};

syncBlog();

module.exports = {
  Blog,
};
