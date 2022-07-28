const { Router } = require('express');
const { protect } = require('../middleware/protect');

const {
  getAllProcessStep,
  createProcessStep,
  getProcessStep,
  updateProcessStep,
  deleteProcessStep,
} = require('../controllers/processStep');

const router = Router();

router.get('/:process_id', protect, getAllProcessStep);
router.post('/:process_id', protect, createProcessStep);
router.get('/:id/:process_id', protect, getProcessStep);
router.put('/:id/:process_id', protect, updateProcessStep);
router.delete('/:id/:process_id', protect, deleteProcessStep);
module.exports = router;
