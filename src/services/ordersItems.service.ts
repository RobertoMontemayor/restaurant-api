import { getConnection } from 'typeorm';
import { ItemEntity } from '@entity/items.entity';
import { OrderItemEntity } from '@entity/orderItem.entity';
import { HttpException } from '@exceptions/HttpException';
import { Item } from '@/interfaces/items.interface';
import { isEmpty } from '@utils/util';

class OrderItemService {
  public OrdersItems = OrderItemEntity;
  public Items = ItemEntity;
  public async createOrderItem(orderItemData): Promise<void> {
    try{
      const connection = getConnection("ItemsOrders"); 
      if (isEmpty(orderItemData)) throw new HttpException(400, "No data found");
      const OrderItemRepository = connection.getRepository(this.OrdersItems);
      const ItemRepository = connection.getRepository(this.Items);
      const item: Item = await ItemRepository.findOne({ where: { id: orderItemData.item} })
      console.log(item)
      if(isEmpty(item)) throw new HttpException(400, "Item not found");
      await OrderItemRepository.save(orderItemData);
    }catch(error){
      console.log(error)
    }
  }
}

export default OrderItemService;
