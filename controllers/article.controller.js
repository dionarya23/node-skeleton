const { StatusCodes } = require('http-status-codes');
// memanggil error handler jika proses pada controller mengalami kendala
const ApiError = require('../helpers/ApiError');

const ArticleRepository = require('../repositories/article.repository');
/**
 * mendefinisikan router handle dengan
 * async await untuk menghindari callback hell
 * yang nantinya bisa dipakai router
*/
module.exports = {
 // contoh untuk user melakukan register
  async create(req) {
    try {
      const userLogged = req.user.data;
      const { title, body } = req.body;
      const newArticle = await ArticleRepository.insert({
        title,
        body,
        author_id: userLogged.id,
      });
      return {
        status: StatusCodes.CREATED,
        message: 'success create article',
        data: {
          article: newArticle,
        },
      };
    } catch (err) {
      console.log('error at create controller article :', err);
      throw new ApiError('Internal Server Error', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  async getArticleUser(req) {
    try {
      const userLogged = req.user.data;
      const article = await ArticleRepository.getAllArticleByIdUser(userLogged.id)
      return {
        status: StatusCodes.OK,
        message: 'success get article',
        data: {
          article,
        },
      };
    } catch (err) {
      console.log('error at getArticleUser controller article :', err);
      throw new ApiError('Internal Server Error', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
};
