import express from 'express';

const router = express.Router();

router.use('/', (req, res) => {
	res.render('index.ejs');
	console.log(req.t('page.home.title'));
});

export default router;
