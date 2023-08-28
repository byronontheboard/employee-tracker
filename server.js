const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
  
// Starting the server up
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});