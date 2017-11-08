const express = require('express');

const app = express();
app.set('port', (process.env.PORT || 3000));
app.get('/', (req, res) => res.send("Hello World!!"));

app.listen(3000, () => console.log("Server listening on port", app.get('port')));
