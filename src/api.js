const express = require('express');
const loginRoute = require('./routes/loginRoutes');
const userRoute = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

// ...

const app = express();

app.use(express.json());

app.use('/login', loginRoute);

app.use('/user', userRoute);

app.use('/categories', categoryRoutes);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
