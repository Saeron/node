const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/', (req, res, next) => {
    try {
        console.log(req.body);
        res.json(req.body);
    } catch (error) {
        next(error);
    }
    
});

app.listen(5000, () =>{
    console.log('Listening at http://localhost:5000');
});