require('dotenv').config()
const express = require('express')
const messagesCtrl = require('./messagesCtrl')

const {SERVER_PORT, SESSION_SECRET} = process.env

const app = express()

app.use((req, res, next) => {
    let badWords = ['knucklehead', 'jerk', 'internet explorer'];
    if (req.body.message) {
      for (let i = 0; i < badWords.length; i++) {
        let regex = new RegExp(badWords[i], 'g');
        req.body.message = req.body.message.replace(regex, '****');
      }
      next();
    } else {
      next();
    }
  });

app.use(express.json())
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUnintialized: false
    })
)

app.get('/api/messages', messagesCtrl.getAllMessages)
app.post('/api/message', messagesCtrl.createMessage)
app.get('/api/messages/history', messagesCtrl.history)

app.listen(SERVER_PORT, () => {
    console.log('Server is Running')
})