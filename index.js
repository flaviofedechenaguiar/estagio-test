const express = require('express');
const app = express();
const connection = require('./database/database');
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const AdminRoutes = require('./routers/admin.routes');
const ClientRoutes = require('./routers/client.routes');


app.use('/admins', AdminRoutes);
app.use('/clients', ClientRoutes);



connection.authenticate().then(() => {
    console.log('Database Connected');
}).catch(err => {
    console.log('Database Error');
})

app.listen(3030, () => {
    console.log('server on localhost: 3030');
});




