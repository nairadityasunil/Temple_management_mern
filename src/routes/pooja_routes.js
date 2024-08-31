const { by_devotee_name, vazhipadu_rate, add_dev_name, all_vazhipadu, new_vazhipadu, all_records, by_vashipadu_name, add_pooja_name, update_record, save_update, delete_record, print_record } = require('../controller/pooja_controller');

const routes = require('express').Router();

// Routes to add pooja by devotee name
routes.get('/by_devotee', by_devotee_name);
routes.get('/get-rate/:vazhipadu1', vazhipadu_rate);
routes.post('/add_dev_name', add_dev_name);

// Routes to add pooja by vazhipadu name
routes.get('/by_vazhipadu',by_vashipadu_name);
routes.post('/add_pooja_name',add_pooja_name);

// Routes of available vahipadu
routes.get('/all_vazhipadu', all_vazhipadu);
routes.post('/add_vazhipadu', new_vazhipadu);

// Routes to update record
routes.get('/update_record/:id',update_record);
routes.post('/save_update/:id',save_update);

// Route to delete vazhipadu
routes.get('/delete_record/:id',delete_record);

// Route to print a record
routes.get('/print_record/:id',print_record);

// Routes to get all records
routes.get('/all_records', all_records);
module.exports = routes;