const express = require('express');
const monk = require('monk');
const joi = require('@hapi/joi');


const db = monk('localhost:27017/faqs');
const faqs = db.get('faqs');

const schema = joi.object({
    question: joi.string().trim().required(),
    answer: joi.string().trim().required(),
});

const app = express();
app.use(express.json());

//read all
app.get('/', async (req, res, next) => {
    try{
        const items = await faqs.find();
        res.json(items);
    }catch (error){
        next(error);
    }
});

//read one
app.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await faqs.findOne({
            _id: id,
        });
        if (!item) return next();
        return res.json(item);
        
    }catch (error) {
        next(error);
    }
});

//create one
app.post('/', async (req, res, next) => {
    try{
        console.log(req.body);
        const value = await schema.validateAsync(req.body);
        const inserted = await faqs.insert(value);
        res.json(inserted);
    }catch (error){
        next(error);
    }
});

//update one
app.put('/:id', async (req, res, next) => {
    try{
        const { id } = req.params;
        const value = await schema.validateAsync(req.body);
        const item = await faqs.findOne({
            _id: id,
        });
        if (!item) return next();
        await faqs.update({
            _id: id,
        }, {
            $set: value,
        });
        res.json(value);
    }catch (error){
        next(error);
    }
});

//delete one
app.delete('/:id', async (req, res, next) => {
    try{
        const { id } = req.params;
        await faqs.remove({ _id: id });
        res.json({
            message: "Success"
        })
    }catch (error) {
        next(error);
    }
});

app.listen(5000, () => {
    console.log("Server is up.")
})
