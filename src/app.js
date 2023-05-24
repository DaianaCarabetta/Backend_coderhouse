import express from 'express';
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import ProductsSockets from './sockets/products.sockets.js'
import handlebarsRouter from './routes/handlebars.router.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';

const app = express();
const httpServer = app.listen(8080, () => console.log('Server running on port: 8080'));
const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/', handlebarsRouter);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname+'/public'));

socketServer.on('connection', client=>{
    ProductsSockets.attachEvents(client)
})
