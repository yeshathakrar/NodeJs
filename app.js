const cors = require('cors');
var express = require("express");
const http = require('http');
const bodyParser = require('body-parser');
var app = express();

//var JsonData = ["Tony","Lisa","Michael","Ginger","Food"];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

var names = [
	{
		"id": 1,
		"name": "A"
	},
	{
		"id": 2,
		"name": "B"
	}
];


app.use(cors());
app.options('*', cors());

app.get("/url", (req, res) => {
 res.json(names);
});

app.post("/PostName", (req, res) => {
	const data = {
		id: names.length + 1,
		name: req.body.name
	}
	names.push(data);
	res.send(data);
});

app.put('/url/:id', (request, response) => {

  let nameId = request.params.id;

  let name = names.filter(n => {
    return n.id == nameId;
  })[0];

  const index = names.indexOf(name);

  let keys = Object.keys(request.body);

  keys.forEach(key => {
    name[key] = request.body[key];
  });

  names[index] = name;

  // response.json({ message: `User ${contactId} updated.`});
  response.json(names[index]);
});

app.delete('/url/:id', (req, res) => {
	let nameId = req.params.id;

	let name = names.filter(n => {
		return n.id == nameId;
	})[0];

	const index = names.indexOf(name);

	names.splice(index, 1);
	res.json({message: `name ${nameId} deleted`});
});

app.listen(3000, () => {
 console.log("Server running on port 3000");
});