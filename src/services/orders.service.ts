import { getConnection } from 'typeorm';
import { CreateOrderDto } from '@dtos/orders.dto';
import { OrderEntity } from '@entity/orders.entity';
import { HttpException } from '@exceptions/HttpException';
import { Order } from '@/interfaces/orders.interface';
import { isEmpty } from '@utils/util';

class OrderService {
  public Orders = OrderEntity;
   
  public async findAllOrder(): Promise<Order[]> {
    const connection = getConnection("ItemsOrders") 
    const OrderRepository = connection.getRepository(OrderEntity);
    const Orders: Order[] = await OrderRepository.find();
    return Orders;
  }

  public async createOrder(OrderData: CreateOrderDto): Promise<Order> {
    const connection = getConnection("ItemsOrders") 
    if (isEmpty(OrderData)) throw new HttpException(400, "Request is empty");

    const OrderRepository = connection.getRepository(this.Orders);
    
    const createOrderData: Order = await OrderRepository.save(OrderData);

    return createOrderData;
  }
  public async updateOrder(OrderId: number): Promise<Order> {
    if (isEmpty(OrderId)) throw new HttpException(400, "OrderData Empty");
    const connection = getConnection("ItemsOrders") 
    const OrderRepository = connection.getRepository(this.Orders);
    console.log(OrderId)
    const order: Order = await OrderRepository.findOne({ where: { id: OrderId } });
    if (!order) throw new HttpException(409, "Order not found");
    await OrderRepository.update(OrderId, { ...order, status: "completed" });

    const updateOrder: Order = await OrderRepository.findOne({ where: { id: OrderId } });
    return updateOrder;
  }
}

export default OrderService;
