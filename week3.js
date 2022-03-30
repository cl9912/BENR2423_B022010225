const {faker} = require("@faker-js/faker");
const bcrypt = require("bcryptjs");

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.x8o3y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
	let name = []
	let password = []
	let address = []
	for(let i=0; i<10; i++) {
		fullName = `${faker.name.firstName()} ${faker.name.lastName()}`;
		fake_pass = faker.internet.password();
		fake_pass = bcrypt.hashSync(fake_pass, 10);
		fake_address = faker.address.city()
		name.push(fullName);
		password.push(fake_pass);
		address.push(fake_address);
	}

	console.log(name);
	console.log(password);
	console.log(address);

	try{
		const database = client.db("week3")
		const collection = database.collection("users")

		for(let i=0; i<10; i++) {
			collection.insertOne({
				name: name[i],
				password: password[i],
				address: address[i]
			})
		}
	}
	catch(err) {
		console.log(err);
	}
});