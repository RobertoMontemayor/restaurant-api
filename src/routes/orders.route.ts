import { Router } from 'express';
import OrdersController from '@controllers/orders.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class OrdersRoute implements Routes {
  public path = '/Orders';
  public router = Router();
  public OrdersController = new OrdersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    console.log(this.path)
    this.router.get(`${this.path}`, this.OrdersController.getOrders);
    this.router.post(`${this.path}`, this.OrdersController.createOrder);
    this.router.put(`${this.path}/:id`, this.OrdersController.updateOrder);
  }
}

export default OrdersRoute;
