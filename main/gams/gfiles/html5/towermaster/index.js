const express = require('express');
const path = require('path');
const opn = require('opn');

const app = express();
const port = 8082;
const host = `http://localhost:${port}`;

app.use('/assets', express.static(path.join(process.cwd(), 'assets')));
app.use('/dist', express.static(path.join(process.cwd(), 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'index.html'));
});

app.listen(port, () => {
  console.log(`Server started at ${host}`);
  opn(host)
    .catch((err) => {
      console.error(`Failed to open ${host} in the default browser: ${err}`);
    });
});
