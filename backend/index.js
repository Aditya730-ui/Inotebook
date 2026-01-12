
const connectToMongo = require("./db");
const express = require('express');
const cors=require("cors")
const app = express();
const port = 5000;

// Connect to MongoDB
connectToMongo();
app.use(cors())
// Middleware to parse JSON bodies (optional but recommended if using req.body)
app.use(express.json());

// Use the auth router
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
