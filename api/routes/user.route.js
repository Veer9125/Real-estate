// import express from 'express';
// import { deleteUser, getUserListings, test, updateUser, getUser } from '../controllers/user.controller.js';
// import { verifyToken } from '../utils/verifiedUser.js';

// const router = express.Router();

// router.get('/test', test)
// router.post('/update/:id',verifyToken, updateUser)
// router.delete('/delete/:id',verifyToken, deleteUser)
// router.get('/listings/:id', verifyToken, getUserListings)
// router.get('/:id', verifyToken, getUser);

// export default router;



import express from 'express';
import { deleteUser, test, updateUser,  getUserListings, getUser} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifiedUser.js';


const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listings/:id', verifyToken, getUserListings)
router.get('/:id', verifyToken, getUser)

export default router;