import customersRoutes from '@modules/customers/routes/customers.routes';
import ordersRoutes from '@modules/orders/routes/orders.routes';
import productsRoutes from '@modules/products/routes/products.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import profilesRoutes from '@modules/users/routes/profile.routes';
import sessionRouter from '@modules/users/routes/sessions.routes';
import usersRoutes from '@modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profilesRoutes);
routes.use('/customers', customersRoutes);
routes.use('/orders', ordersRoutes);

export default routes;
