const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Chatkit = require('@pusher/chatkit-server');

const app = express();

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:2472bbf8-1b64-4a48-a62c-a5e49c5b6aa6',
  key:
    '55b24e7e-3af4-4a2c-b031-5fb4e42959bf:PWlUj/NwcfToTziFmV+ps9TmpBEHB/k4313PZ+3tW5k='
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// app.post('/users', (req, res) => {
//   const { username } = req.body
//   chatkit
//     .createUser({
//       id: username,
//       name: username
//     })
//     .then(() => res.sendStatus(201))
//     .catch(error => {
//       if (error.error === 'services/chatkit/user_already_exists') {
//         res.sendStatus(200)
//       } else {
//         res.status(error.status).json(error)
//       }
//     })
// })

app.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({ userId: req.query.user_id });
  res.status(authData.status).send(authData.body);
});

const PORT = 3331;
app.listen(PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Running on port ${PORT}`);
  }
});
