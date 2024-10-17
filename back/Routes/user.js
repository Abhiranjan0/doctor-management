import express from "express";
import { updatedUser,deleteUser,getAllUser,getSingleUser ,getUserProfile ,getMyAppointment } from "../Controllers/userController.js";
import { authenticate, restrict } from "../Auth/verifyToken.js";
const router = express.Router();

router.get('/',authenticate,restrict(['admin']),getAllUser);
router.get('/:id',authenticate,restrict(['patient']),getSingleUser);
router.put('/:id',authenticate,restrict(['patient']),updatedUser)
router.delete('/:id',authenticate,restrict(['patient']),deleteUser)
router.get('/profile/me',authenticate,restrict(['patient']),getUserProfile)
router.get('/appointments/my-appointments',authenticate,restrict(['patient']),getMyAppointment)

export default router;