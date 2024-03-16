import express from 'express';
import { verifyAdmin } from '../utils/verifyToken.js';
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
} from '../controllers/room-controller.js';

const router = express.Router();

router.post('/:hotelId', verifyAdmin, createRoom);

router.put('/:id', verifyAdmin, updateRoom);

router.delete('/:id/:hotelId', verifyAdmin, deleteRoom);

router.get('/:id', getRoom);

router.get('/', getRooms);

export default router;
