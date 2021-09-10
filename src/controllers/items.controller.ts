import { NextFunction, Request, Response } from 'express';
import ItemService from '@services/items.service';
import { Item } from '@interfaces/items.interface';
import { CreateItemDto } from '@dtos/items.dto';

class ItemsController {
  public ItemService = new ItemService();

  public getItems = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllItemData: Item[] = await this.ItemService.findAllItem();

      res.status(200).json({ Items: findAllItemData });
    } catch (error) {
      next(error);
    }
  };

  public createItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const itemData: CreateItemDto = req.body;
      const createItemData: Item = await this.ItemService.createItem(itemData);

      res.status(201).json({ data: createItemData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}
export default ItemsController;
