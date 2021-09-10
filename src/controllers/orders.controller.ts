import { NextFunction, Request, Response } from 'express';
import OrderService from '@services/orders.service';
import OrderItemService from '@services/ordersItems.service';
import ItemService from '@services/items.service';
import { Order } from '@/interfaces/orders.interface';
import { Item } from '@interfaces/items.interface';
import { CreateOrderDto } from '@dtos/orders.dto';
import { CreateOrderItemDto } from '@dtos/orderItem.dto';
import { OrderEntity } from '@/entity/orders.entity';
class OrdersController {
  public OrderService = new OrderService();
  public ItemService = new ItemService();
  public OrderItemService = new OrderItemService();
  public getOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllOrderData: Order[] = await this.OrderService.findAllOrder();
      res.status(200).json({ Orders: findAllOrderData });
    } catch (error) {
      next(error);
    }
  };

  public createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productsIds : number[] = req.body.products
      let items: Item[] = []
      let orderData : CreateOrderDto = {
        subtotal: 0,
        vat: 0,
        total: 0,
        token: "",
        total_items: 0,
        customer_name: req.body.customer_name,
        status: "pending"
      }
      
      let promises = []
      productsIds.forEach(productId=>{
        let itemPromise = new Promise<void>((resolve, reject)=>{
          this.ItemService.findItemById(productId).then(item=>{
            items.push(item)
            orderData.total += item.price
            orderData.total_items += 1
            resolve()
          })
        })
        promises.push(itemPromise)
      })
      await Promise.all(promises)

      const createOrderData: Order = await this.OrderService.createOrder(orderData);
      let {id} = createOrderData
      let orderItemPromises = []
      let index = 0
      productsIds.forEach(productId =>{
        let orderItemPromise = new Promise<void>((resolve, reject)=>{
          this.OrderItemService.createOrderItem({
            order: id, item: items[index].id
          }).then(()=>{
            resolve()
          })
        })
        orderItemPromises.push(orderItemPromise)
        index++
      })
      await Promise.all(orderItemPromises)
      res.status(201).json({ data: {...createOrderData, items}, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
  public updateOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const OrderId = Number(req.params.id);
      const updateOrderData: Order = await this.OrderService.updateOrder(OrderId);

      res.status(200).json({ data: updateOrderData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}
export default OrdersController;
