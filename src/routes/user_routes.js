const { user_master, update_user, login } = require('../controller/user_controller');

const routes = require('express').Router();

routes.get('/user_master',user_master);
routes.post('/update_user',update_user);
routes.post('/login',login);
module.exports = routes;
