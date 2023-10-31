const express = require('express');
const router = express.Router();
const adminController=require('../controllers/admincontrollers')
const productController = require('../controllers/admincontrollers');
const userController = require('../controllers/usercontroller');
const paymentController = require('../controllers/paymentscontroller'); 
const orderController = require('../controllers/ordercontroller');
const { createPayPalPayment } = require('../controllers/paymentscontroller');
const validateToken=require('../Middlewares/authenticate');
const {getUserData} = require('../controllers/usercontroller')
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'D:/ecommerce/server/public/images');
},
  filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Generate a unique file name
  }
});
const upload = multer({ storage: storage });





//Admin Routes 
router.post('/adminlogin', adminController.adminLogin);
router.post('/products', productController.createProduct);
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);
router.delete('/products/:id', adminController.deleteProductById);
router.put('/products/:id', adminController.updateProductById);
//User Routes
router.post('/register', upload.single('avatar'), userController.registerUser);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.delete('/users/:id', userController.deleteUserById);
router.put('/users/:id', userController.updateUserById);
router.post('/signin', userController.signInUser);
router.get('/user-data', validateToken, getUserData);
//Payment Routes
router.post('/create-payment-intent', paymentController.createPaymentIntent);
router.post('/create-payment', (req, res) => {
  createPayPalPayment(req, res);
}); 
//order routes
router.post('/api/store-user-details', orderController.storeUserDetails);
router.get('/api/get-orders', orderController.getOrders);
router.get('/api/get-ordersname', orderController.getOrdersByName);
router.delete('/api/delete-order/:orderId', orderController.deleteOrderById);

//Logout End Point
router.get('/logout', (req, res) => {
  res.clearCookie('jwtoken', { path: '/' });
  res.status(200).send('user Logout');
})

module.exports = router;
