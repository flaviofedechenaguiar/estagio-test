require('dotenv').config();
const express = require('express');
const app = express();
const connection = require('./database/database');
const cors = require('cors');
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors());

const AdminRoutes = require('./routers/admin.routes');
const ClientRoutes = require('./routers/client.routes');



app.use('/admins', AdminRoutes);
app.use('/clients', ClientRoutes);



connection.authenticate().then(() => {
    console.log('Database Connected');
}).catch(err => {
    console.log('Database Error');
})

app.listen(process.env.SERVER_PORT, () => {
    console.log('server on localhost: 3030');
});




