const express = require('express');
const app = express();

app.use(express.static('./'));
app.use(express.static('dist'));

app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`);
});

const port = process.env.PORT || 37038;

app.listen(port, () => {
    console.log('app listening on', port);
});
