process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import ItemsRoute from '@routes/items.route';
import OrdersRoute from '@routes/orders.route';
import validateEnv from '@utils/validateEnv';


validateEnv();

const app = new App([
    new IndexRoute(), 
    new UsersRoute(), 
    new ItemsRoute(),
    new OrdersRoute()
]);

app.listen();
