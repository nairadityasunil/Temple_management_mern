const { by_devotee_name, vazhipadu_rate, add_dev_name } = require('../controller/pooja_controller');

const routes = require('express').Router();

routes.get('/by_devotee',by_devotee_name);
routes.get('/get-rate/:vazhipadu1',vazhipadu_rate);
routes.post('/add_dev_name', add_dev_name);

module.exports = routes;