const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/coords', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});
const Coord = mongoose.model('coord',{
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number,
    timestamp: Date
});


const app = express();
app.use(express.json());
app.use(cors());

app.post('/', (req, res, next) => {
    try {
        const newCoord = new Coord(req.body);
        newCoord.save();
    }catch(error){
        next(error);
    }
    res.json(req.body);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});