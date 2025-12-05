const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getMyProfile, updateMyProfile } = require('../controllers/userController');

router.route('/profile')
  .get(protect, getMyProfile)
  .put(protect, updateMyProfile);

module.exports = router;