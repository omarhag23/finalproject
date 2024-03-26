const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
app.set('view engine', 'ejs');
const path = require('path');
app.set('views', path.join(__dirname, '..','frontend'));
app.use(express.static(path.join(__dirname, '..', 'frontend')));



// Import routes
const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart');




// Middleware
app.use(cookieParser());
app.use(session({
    secret: 'your_secret_key_here',
    resave: false,
    saveUninitialized: true
}));


app.use((req, res, next) => {
    res.locals.username = req.session.username; // Add session data to locals
    next();
});
app.use('/api/shop', shopRoutes);
app.use('/api/user', userRoutes);
app.use('/api/cart', cartRoutes);

const MURL = 'mongodb+srv://omarabbas300:BreezyWave88@cluster0.cj2gpyv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MURL, () => {
    console.log('MongoDB is up and running...');
});


// Route
app.get('/', (req, res) => {
    res.render('index');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is up and running...');
});