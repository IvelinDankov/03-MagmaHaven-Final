import express from "express";
import router from "./routes.js";
import handlebars from 'express-handlebars';

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('views', 'src/views')
app.set('view engine', 'hbs')

/* Static files */
app.use('/static', express.static('src/public'));
/* Body parser */
app.use(express.urlencoded({extended: false}))


app.use(router)

app.listen(3000, () => console.log('Server is listening on port 3000'));

