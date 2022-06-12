import express from 'express';

const router = express.Router();

router.use('/', (req, res) => {
	res.render('index.ejs');
});

export default router;
