import express from 'express';

const router = express.Router();

router.get('/login', login);
router.get('/register', register);
router.get('/logout', logout);

export default router;