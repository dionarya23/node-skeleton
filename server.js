require('dotenv').config();
const express = require('express');
const { json, urlencoded } = require('body-parser');
const cors = require('cors');
const logger  = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

const db = require('./config/database')
// digunakan untuk migrasi hapus jika sudah melakukan migrasi
db.sync({
    forced: true,
    sync: true
}).then(() => console.log('db created'));

app.use(cors());
app.use(logger('dev'));
app.use(urlencoded({ extended: false }));
app.use(json());

const authMiddleware = require('./middleware/auth.middleware');

// memanggil router
const USER_ROUTE = require('./routes/user.routes');
const ARTICLE_ROUTE = require('./routes/article.routes');

app.use('/api/v1/user', USER_ROUTE);

// menerapkan auth middleware untuk proteksi api dari user yang belum login
app.use('/api/v1/article', authMiddleware, ARTICLE_ROUTE)

app.listen(PORT, console.log(`Server running on ${PORT}`));
