// memanggil base_router
const baseRoute = require('./base_route');

const BaseController = require('../controllers/base.controller');
const UserController = require('../controllers/user.controller');

const validationMiddleware = require('../middleware/validation.middleware');
const { registrationUser } = require('../services/validation');

const router = baseRoute();

router.post(
  '/register',
  // validasi data pada body menggunakan joi dibagian middleware
  validationMiddleware(registrationUser),
  BaseController((req) => UserController.register(req)),
);

router.post(
  '/login',
  // validasi data pada body menggunakan joi dibagian middleware
  validationMiddleware(registrationUser),
  BaseController((req) => UserController.login(req)),
);

module.exports = router;
