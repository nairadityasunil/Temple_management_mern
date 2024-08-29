const moment = require('moment');

// Importing necessary models
const available_vazhipadu = require('../models/available_vazhipadu_model');
const vazhipadu_record = require('../models/vazhipadu_model');


const by_devotee_name = async (req, res) => {
    try {
        const all_poojas = await available_vazhipadu.find().sort({vazhipadu : 1});

        // Define start and end of the current day
        const startOfDay = moment().startOf('day').toDate(); // Converts to Date object
        const endOfDay = moment().endOf('day').toDate(); // Converts to Date object

        // Query to get records created today
        const records_today = await vazhipadu_record.find({
            created_at: { $gte: startOfDay, $lte: endOfDay }
        });

        res.render('dev_name', { all_poojas, records_today });
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
}

const add_dev_name = async (req, res) => {
    try {
        const devotee_name = req.body.dev_name;
        const birth_star = req.body.birth_star;
        const pooja_date = req.body.pooja_date; // Ensure this is converted to Date object
        const inputs = req.body.inputs;
        // var now = new Date().toLocaleString();
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
            await vazhipaduRecord.save();
        }

        res.send("<script>alert('Vazhipadu Recorded Successfully !!!');window.location.href = '/pooja/by_devotee'; </script>");
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const all_vazhipadu = async (req,res) => {
    try {
        const available = await available_vazhipadu.find().sort({vazhipadu : 1});
        res.render("available_pooja", {available});
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const new_vazhipadu = async (req,res) => {
    try {
        const add_new = new available_vazhipadu({
            vazhipadu : req.body.vazhipadu_name,
            rate : req.body.rate
        });

        if (await add_new.save())
        {
            res.send("<script>alert('New Vazhipadu Saved Successfully !!!');window.location.href = '/pooja/all_vazhipadu'; </script>");
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const all_records = async (req,res) => {
    try {
        const records = await vazhipadu_record.find();
        res.render('all_records', {records});
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    by_devotee_name,
    vazhipadu_rate,
    add_dev_name,
    all_vazhipadu,
    new_vazhipadu,
    all_records
};