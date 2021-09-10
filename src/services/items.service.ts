import { getRepository, getConnection } from 'typeorm';
import { CreateItemDto } from '@dtos/items.dto';
import { ItemEntity } from '@entity/items.entity';
import { HttpException } from '@exceptions/HttpException';
import { Item } from '@interfaces/items.interface';
import { isEmpty } from '@utils/util';

class ItemService {
  public Items = ItemEntity;
   
  public async findAllItem(): Promise<Item[]> {
    const connection = getConnection("ItemsOrders") 
    const ItemRepository = connection.getRepository(ItemEntity);
    const Items: Item[] = await ItemRepository.find();
    return Items;
  }
  public async findItemById(itemId: number): Promise<Item> {
    const connection = getConnection("ItemsOrders") 
    const ItemRepository = connection.getRepository(ItemEntity);
    const item: Item = await ItemRepository.findOne({ where: { id: itemId } });
    return item;
  }
  public async createItem(ItemData: CreateItemDto): Promise<Item> {
    const connection = getConnection("ItemsOrders") 
    if (isEmpty(ItemData)) throw new HttpException(400, "You're not ItemData");

    const ItemRepository = connection.getRepository(this.Items);
    const findItem: Item = await ItemRepository.findOne({ where: { name: ItemData.name } });
    if (findItem) throw new HttpException(409, `The Item: ${ItemData.name} already exists`);

    const createItemData: Item = await ItemRepository.save(ItemData);

    return createItemData;
  }
  /*
  public async updateItem(ItemId: number, ItemData: CreateItemDto): Promise<Item> {
    if (isEmpty(ItemData)) throw new HttpException(400, "You're not ItemData");

    const ItemRepository = getRepository(this.Items);
    const findItem: Item = await ItemRepository.findOne({ where: { id: ItemId } });
    if (!findItem) throw new HttpException(409, "You're not Item");

    const hashedPassword = await bcrypt.hash(ItemData.password, 10);
    await ItemRepository.update(ItemId, { ...ItemData, password: hashedPassword });

    const updateItem: Item = await ItemRepository.findOne({ where: { id: ItemId } });
    return updateItem;
  }

  public async deleteItem(ItemId: number): Promise<Item> {
    if (isEmpty(ItemId)) throw new HttpException(400, "You're not ItemId");

    const ItemRepository = getRepository(this.Items);
    const findItem: Item = await ItemRepository.findOne({ where: { id: ItemId } });
    if (!findItem) throw new HttpException(409, "You're not Item");

    await ItemRepository.delete({ id: ItemId });
    return findItem;
  }
  */
}

export default ItemService;
