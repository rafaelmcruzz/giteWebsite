require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const houseSchema = new mongoose.Schema({
  rules: String,
  gallery: [String]
});

const House = mongoose.model('House', houseSchema);

app.get('/house', async (req, res) => {
  const house = await House.findOne();
  res.json(house);
});

app.post('/house', async (req, res) => {
  const newHouse = new House(req.body);
  await newHouse.save();
  res.status(201).send(newHouse);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
