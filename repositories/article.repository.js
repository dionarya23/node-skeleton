const { Article, User } = require("../services/relation_table");
// memanggil service cache
const { getCache, setCache } = require("../services/cache");

module.exports = {
  async insert(newArticle) {
    try {
      const article = await Article.create(newArticle);
      return article;
    } catch (err) {
      console.log('error at user repository insert : ', err);
      throw new Error('error at user repository insert');
    }
  },

  async getAllArticleByIdUser(user_id) {
    try {
        // mengecek apakah sebelum nya ada article di cache
      const userExistInCache = JSON.parse(await getCache(`user_article_${user_id}`));
      if (userExistInCache) {
          //jika ada return dari cache redis
        return userExistInCache;
      } else {
        const userWithArticles = await User.findByPk(user_id, {
          include: {
            as: 'articles',
            model: Article,
          },
        });
        //jika tidak return dari hasil query dan menyimpan nya di cache
        setCache(`user_article_${user_id}`, userWithArticles);
        return userWithArticles;
      }
    } catch (err) {
      console.log('error at articles repository getAllArticleByIdUser : ', err);
      throw new Error('error at articles repository getAllArticleByIdUser');
    }
  },
};
