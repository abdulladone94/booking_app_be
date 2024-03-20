import Hotel from '../models/Hotel.js';

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const saveHotel = await newHotel.save();
    res.status(201).json(saveHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
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
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json('Hotel has been deleted');
  } catch (err) {
    next(err);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const getHotelById = await Hotel.findById(req.params.id);
    res.status(200).json(getHotelById);
  } catch (err) {
    next(err);
  }
};

export const getHotels = async (req, res, next) => {
  try {
    const getAllHotels = await Hotel.find();
    res.status(200).json(getAllHotels);
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(',');
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: 'Hotel' });
    const apartmentCount = await Hotel.countDocuments({ type: 'Apartment' });
    const resortCount = await Hotel.countDocuments({ type: 'Resort' });
    const villaCount = await Hotel.countDocuments({ type: 'Villa' });
    const cabinCount = await Hotel.countDocuments({ type: 'Cabin' });

    res.status(200).json([
      { type: 'hotel', count: hotelCount },
      { type: 'apartment', count: apartmentCount },
      { type: 'resort', count: resortCount },
      { type: 'villa', count: villaCount },
      { type: 'cabin', count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};
