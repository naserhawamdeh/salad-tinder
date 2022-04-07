const express = require('express')
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const { urlencoded } = require('express');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

// assign express function call to 'app' variable
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'salad',
  cookie: {
        // Session will automatically expire in 20 mins
        expires: 20 * 60 * 1000
  },
  resave: false,
  rolling: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  }),
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// establish routes
app.use(routes);

// connection to db and start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));

});


