import customersRoutes from '@modules/customers/infra/http/routes/customers.routes';
import ordersRoutes from '@modules/orders/infra/http/routes/orders.routes';
import productsRoutes from '@modules/products/infra/http/routes/products.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profilesRoutes from '@modules/users/infra/http/routes/profile.routes';
import sessionRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
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
