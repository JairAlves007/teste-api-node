const express = require("express");
const cors = require("cors");
const admin = require("./services/firebaseAdminConfig");

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	return res.send("Hello, World!");
});

app.get("/teams", async (req, res) => {
	const mainCollection = "teams";
	const data = [];

	const docs = (await admin.firestore().collection(mainCollection).get()).docs;

	docs.forEach(doc => data.push(doc.data()));

	return res.json(data);
});

app.listen(PORT, () => {
	console.log(`Server running in http://localhost:${PORT}/`);
});
