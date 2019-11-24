const mysql = require('mysql')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

const mysqlConnect = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Zurik21$$',
	database: 'pets',
	multipleStatements: true
})

mysqlConnect.connect(err => {
	if(!err)
	 console.log('Connected Database...')
	else
	 console.log('Connected Failed!')
})

// GET: pets
app.get('/pets', (req, res) => {
	mysqlConnect.query('SELECT * FROM dogs', 
		(err, rows, fields) => {
			if(!err)
			 res.send(rows)
			else
			 console.log(err)
		})
})

app.get('/pets/:id', (req, res) => {
	mysqlConnect.query('SELECT * FROM dogs WHERE id = ?', [req.params.id], (err, rows, fields) => {
		if(!err)
		 res.send(rows)
		else
		 console.log(err)
	})
})
/*
// DELETE:$id pets
app.delete('/pets/:id', (req, res) => {
	mysqlConnect.query('DELETE FROM dogs WHERE name=?',
	[req.params.id], (err, rows, fields) => {
		if(!err)
		 res.send('Removed w/ Successful...')
		else
		 console.log(err)
	})
})
*/
const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Listening ${port}`))

