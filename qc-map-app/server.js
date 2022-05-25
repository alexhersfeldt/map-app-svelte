const express = require("express");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 5000

const app = express();
app.use(cors());

app.use(express.static('public'));
app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});


app.listen(port, () => {
    console.log(`Server is up at port ${port}`);
});