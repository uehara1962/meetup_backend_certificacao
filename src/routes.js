// const { Router } = require('express')

// const routes = new Router()

// routes.get('/', (req, res) => {
//   return res.json({ message: 'Hello World'})
// })

// module.exports = routes

// S>----------------------------------------------------------------------------------------<//

// import { Router } from 'express';

// const routes = new Router();

// routes.get('/', (req, res) => {
//   return res.json({ message: 'Hello World' });
// });

// export default routes;

// S>----------------------------------------------------------------------------------------<//

// import { Router } from 'express';
// import User from './app/models/User';

// const routes = new Router();

// routes.get('/', async (req, res) => {
//   // return res.json({ message: "Hello World"})
//   const user = await User.create({
//     name: 'Carlos Uehara',
//     email: 'ca_uehara@hotmail.com',
//     password_hash: '123456'
//   });
//   return res.json(user);
// });

// export default routes;

// S>----------------------------------------------------------------------------------------<//

// import { Router } from 'express';
// import UserController from './app/controllers/UserController';
// import SessionController from './app/controllers/SessionController';

// import authMiddleware from './app/middlewares/auth';

// const routes = new Router();

// routes.get('/users', UserController.listUsers);

// routes.post('/users', UserController.store);
// routes.post('/sessions', SessionController.store);

// routes.use(authMiddleware);

// routes.put('/users', UserController.update);

// export default routes;

// S>----------------------------------------------------------------------------------------<//

import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import SubscriptionController from './app/controllers/SubscriptionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.listUsers);
routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/meetups', MeetupController.index);
routes.post('/meetups', MeetupController.store);
routes.put('/meetups', MeetupController.update);
routes.delete('/meetups/:id', MeetupController.delete);

routes.post('/meetups/:meetupId/subscriptions', SubscriptionController.store);
routes.get('/subscriptions', SubscriptionController.index);
routes.delete('/subscription/:id', SubscriptionController.delete);

export default routes;
