import Authentication from '../controllers/authentication';

const router = require('express').Router();

router.get('/', (req, res)=>{
    res.send('connected');
    console.log(res);
})

router.get('/users', (req, res)=>{
    res.send(req.user);
})

router.post('/userProfile', Authentication.updateProfile)

export default router;