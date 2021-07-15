/**
 * file ini digunakan untuk mempertemukan table yang memiliki relasi
 * yang nantinya bisa dipanggil pada repository
*/

const User = require('./models/user.model');
const Article = require('./models/article.model');

User.hasMany(Article, {
  as: 'articles',
  foreignKey: 'author_id',
});

Article.belongsTo(User, {
  as: 'author',
  foreignKey: 'author_id',
});

module.exports = {
  User,
  Article,
};
