const { by_devotee_name, vazhipadu_rate, add_dev_name, all_vazhipadu, new_vazhipadu, all_records } = require('../controller/pooja_controller');

const routes = require('express').Router();

// Routes to add pooja by devotee name
routes.get('/by_devotee', by_devotee_name);
routes.get('/get-rate/:vazhipadu1', vazhipadu_rate);
routes.post('/add_dev_name', add_dev_name);

// Routes to add pooja by vazhipadu name


// Routes of available vahipadu
routes.get('/all_vazhipadu', all_vazhipadu);
routes.post('/add_vazhipadu', new_vazhipadu);

routes.get('/all_records', all_records);
module.exports = routes;