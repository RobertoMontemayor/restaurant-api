import { Router } from 'express';
import ItemsController from '@controllers/items.controller';
import { CreateItemDto } from '@dtos/items.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class ItemsRoute implements Routes {
  public path = '/items';
  public router = Router();
  public ItemsController = new ItemsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    console.log(this.path)
    this.router.get(`${this.path}`, this.ItemsController.getItems);
    this.router.post(`${this.path}`, validationMiddleware(CreateItemDto, 'body'), this.ItemsController.createItem);
  }
}

export default ItemsRoute;
