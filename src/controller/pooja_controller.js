const moment = require('moment');
const mongoose = require('mongoose');

// Importing necessary models
const available_vazhipadu = require('../models/available_vazhipadu_model');
const vazhipadu_record = require('../models/vazhipadu_model');


const by_devotee_name = async (req, res) => {
    try {
        var total = 0;
        const all_poojas = await available_vazhipadu.find().sort({ vazhipadu: 1 });

        // Define start and end of the current day
        const startOfDay = moment().startOf('day').toDate(); // Converts to Date object
        const endOfDay = moment().endOf('day').toDate(); // Converts to Date object

        // Query to get records created today
        const records_today = await vazhipadu_record.find({
            created_at: { $gte: startOfDay, $lte: endOfDay }
        });

        for (const r of records_today) {
            total += parseInt(r.rate);
        }

        res.render('dev_name', { all_poojas, records_today, total });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const update_record = async (req, res) => {
    try {
        const all_poojas = await available_vazhipadu.find().sort({ vazhipadu: 1 });
        const record = await vazhipadu_record.findById(req.params.id);
        res.render("update_pooja_record", { all_poojas, record });
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error');
    }
};

const by_vashipadu_name = async (req, res) => {
    try {
        var total = 0;

        const all_poojas = await available_vazhipadu.find().sort({ vazhipadu: 1 });

        // Define start and end of the current day
        const startOfDay = moment().startOf('day').toDate(); // Converts to Date object
        const endOfDay = moment().endOf('day').toDate(); // Converts to Date object

        // Query to get records created today
        const records_today = await vazhipadu_record.find({
            created_at: { $gte: startOfDay, $lte: endOfDay }
        });

        for (const r of records_today) {
            total += parseInt(r.rate);
        }

        res.render('vazhipadu_name', { all_poojas, records_today, total });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const vazhipadu_rate = async (req, res) => {
    const vazhipadu1 = req.params.vazhipadu1;
    try {
        const pooja = await available_vazhipadu.findOne({ vazhipadu: vazhipadu1 });
        if (pooja) {
            res.json({ rate: pooja.rate });
        } else {
            res.json({ rate: null });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const add_dev_name = async (req, res) => {
    try {
        const devotee_name = req.body.dev_name;
        const birth_star = req.body.birth_star;
        const pooja_date = req.body.pooja_date; // Ensure this is converted to Date object
        const inputs = req.body.inputs;
        const elements = { devotee_name, birth_star, pooja_date };

        var total_amount = 0;

        console.log(elements);
        const now = new Date(); // Current date and time
        // Process each input and save to database
        for (const input of inputs) {
            const { entity_name, amount } = input;

            const vazhipaduRecord = new vazhipadu_record({
                vazhipadu_name: entity_name,
                rate: amount,
                devotee_name: devotee_name,
                birth_star: birth_star,
                pooja_date: pooja_date,
                created_at: now,
                updated_at: now
            });
            total_amount = total_amount + parseInt(amount);
            await vazhipaduRecord.save();
        }

        // res.send("<script>alert('Vazhipadu Recorded Successfully !!!');window.location.href = '/pooja/by_devotee'; </script>");
        res.render('by_dev_receipt', { elements, total_amount, inputs });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const add_pooja_name = async (req, res) => {
    try {
        // Log the entire form data for debugging
        console.log('Request Body:', req.body);

        const devotee_name = req.body.inputs1; // This should be an array of objects
        const pooja_name = req.body.pooja_name;
        const rate = parseInt(req.body.rate); // Ensure this is correctly named and used
        const pooja_date = req.body.pooja_date;
        const elements = { pooja_name, rate, pooja_date };

        if (!Array.isArray(devotee_name)) {
            throw new Error('Invalid format for devotee_name');
        }

        const now = new Date();
        var total_amount = 0;

        for (const dev of devotee_name) {
            const { devotee_name: name, star: nakshatram } = dev; // Adjust based on actual field names
            const vazhipaduRecord = new vazhipadu_record({
                vazhipadu_name: pooja_name,
                rate: rate,
                devotee_name: name,
                birth_star: nakshatram,
                pooja_date: pooja_date,
                created_at: now,
                updated_at: now
            });

            total_amount += rate;
            await vazhipaduRecord.save();
        }
        res.render('by_pooja_receipt', { elements, total_amount, devotee_name });

    } catch (error) {
        console.error('Error details:', error); // Log detailed error
        res.status(500).send('Internal Server Error');
    }
};


const all_vazhipadu = async (req, res) => {
    try {
        const available = await available_vazhipadu.find().sort({ vazhipadu: 1 });
        res.render("available_pooja", { available });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const new_vazhipadu = async (req, res) => {
    try {
        const add_new = new available_vazhipadu({
            vazhipadu: req.body.vazhipadu_name,
            rate: req.body.rate
        });

        if (await add_new.save()) {
            res.send("<script>alert('New Vazhipadu Saved Successfully !!!');window.location.href = '/pooja/all_vazhipadu'; </script>");
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const all_records = async (req, res) => {
    try {
        const records = await vazhipadu_record.find().sort({ created_at: -1 }).exec();
        records.forEach(record => {
            if (record.created_at) {
                // Format the date to 'YYYY-MM-DD'
                const date = new Date(record.created_at);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() is zero-based
                const day = String(date.getDate()).padStart(2, '0');
                record.formattedDate = `${year}-${month}-${day}`;
            }
            if (record.updated_at) {
                const date = new Date(record.updated_at);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() is zero-based
                const day = String(date.getDate()).padStart(2, '0');
                record.formattedupdate = `${year}-${month}-${day}`;
            }
        });
        res.render('all_records', { records });
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error');
    }
};

const save_update = async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        const devotee_name = req.body.dev_name;
        const birth_star = req.body.birth_star;
        const pooja_date = req.body.pooja_date; // Ensure this is converted to Date object
        const pooja_name = req.body.pooja_name;
        const rate = req.body.rate;
        // const elements = { devotee_name, birth_star, pooja_date };

        updates.updated_at = new Date();
        const now = new Date();
        console.log(req.body.rate);
        // Log to verify inputs
        // console.log('ID:', id);
        // console.log('Updates:', updates);

        // const update_result = await vazhipadu_record.updateOne({ _id: id }, { $set: updates });
        const update_result = await vazhipadu_record.updateOne({ _id: id }, {
            $set: {
                vazhipadu_name: pooja_name,
                rate: rate,
                devotee_name: devotee_name,
                birth_star: birth_star,
                pooja_date: pooja_date,
                updated_at: now
            }
        });

        console.log('Update Result:', update_result);

        if (update_result.matchedCount === 0) {
            return res.send("<script>alert('No record found with the given ID!');window.location.href = '/pooja/all_records'; </script>");
        }

        if (update_result.modifiedCount === 0) {
            return res.send("<script>alert('Record updated but no changes were made!');window.location.href = '/pooja/all_records'; </script>");
        }

        res.send("<script>alert('Record Updated Successfully!');window.location.href = '/pooja/all_records'; </script>");


    } catch (error) {
        console.error('Error:', error);
        res.status(500).send("<script>alert('Internal Server Error');window.location.href = '/pooja/all_records'; </script>");
    }
};

const delete_record = async (req, res) => {
    try {
        const id = req.params.id;
        const delete_result = await vazhipadu_record.deleteOne({ _id: id });
        if (delete_result.deletedCount == 0) {
            res.send("<script>alert('Vazhipadu Record Not Found !!!');window.location.href = '/pooja/all_records'; </script>");
        }
        res.send("<script>alert('Vazhipadu Record Deleted !!!');window.location.href = '/pooja/all_records'; </script>");
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send("<script>alert('Internal Server Error');window.location.href = '/pooja/all_records'; </script>");
    }
};

const print_record = async (req, res) => {
    try {
        const record = await vazhipadu_record.findById(req.params.id);

        res.render("print_record", { record });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send("<script>alert('Internal Server Error');window.location.href = '/pooja/all_records'; </script>");
    }
};

module.exports = {
    by_devotee_name,
    vazhipadu_rate,
    add_dev_name,
    all_vazhipadu,
    new_vazhipadu,
    all_records,
    by_vashipadu_name,
    add_pooja_name,
    update_record,
    save_update,
    delete_record,
    print_record
};