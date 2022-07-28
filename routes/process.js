const { Router } = require('express');
const { protect } = require('../middleware/protect');
const {
  getAllProcess,
  createProcess,
  getProcess,
  updateProcess,
  deleteProcess,
} = require('../controllers/process');

const router = Router();

router.get('/', protect, getAllProcess);
router.post('/', protect, createProcess);
router.get('/:id', protect, getProcess);
router.put('/:id', protect, updateProcess);
router.delete('/:id', protect, deleteProcess);
module.exports = router;
