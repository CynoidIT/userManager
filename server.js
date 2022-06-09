const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const PORT = process.env.PORT || 3000
require('dotenv').config()

let db,
	dbConnectionStr = process.env.DB_STRING,
	dbName = 'MyHometownDB'


MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/',(req, res)=>{
	db.collection('mhtusers').find().toArray()
	.then(data => {
		res.render('index.ejs', { info: data })
	})
	.catch(error => console.error(error))
})

app.post('/addUser', (req, res) => {
	db.collection('mhtusers').insertOne({userName: req.body.userName,
	emailAddress: req.body.emailAddress, accessLevel: 0})
	.then(result => {
		console.log('User Added')
		res.redirect('/')
	})
	.catch(error => console.error(error))
})

app.delete('/deleteUser', (req, res) => {
	db.collection('mhtusers').deleteOne({userName: req.body.userNameS})
	.then(result => {
		console.log('User Deleted')
		res.json('User Deleted')
	})
	.catch(error => console.error(error))

})

app.listen(PORT, ()=>{
	console.log(`Server is running on port ${PORT}`)
})