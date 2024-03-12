import express from 'express';
import Hotel from '../models/Hotel.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const saveHotel = await newHotel.save();
    res.status(201).json(saveHotel);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const editHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(editHotel);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json('Hotel has been deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/:id', async (req, res) => {
  try {
    const getHotelById = await Hotel.findById(req.params.id);
    res.status(200).json(getHotelById);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const getAllHotels = await Hotel.find();
    res.status(200).json(getAllHotels);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
