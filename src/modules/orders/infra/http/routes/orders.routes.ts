import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import OrdersController from '../controller/OrdersController';

const ordersRoutes = Router();
const ordersController = new OrdersController();

ordersRoutes.use(isAuthenticated);

ordersRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ordersController.show,
);

ordersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required(),
    },
  }),
  ordersController.create,
);

export default ordersRoutes;
