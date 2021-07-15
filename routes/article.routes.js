// memanggil base_router
const baseRoute = require('./base_route');

const BaseController = require('../controllers/base.controller');
const ArticleController = require('../controllers/article.controller');

const validationMiddleware = require('../middleware/validation.middleware');
const { articlePOST } = require('../services/validation');

const router = baseRoute();

router.post(
  '/',
  // validasi data pada body menggunakan joi dibagian middleware
  validationMiddleware(articlePOST),
  BaseController((req) => ArticleController.create(req)),
);

router.get(
  '/me',
  BaseController((req) => ArticleController.getArticleUser(req)),
);

module.exports = router;
