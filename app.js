require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
	res.status(200).json({
		status: true,
		message: "wellcome chalange 6",
		err: null,
		data: null
	});
});

app.use((req, res, next) => {
	res.status(404).json({
		status: false,
		message: "bad request",
		err: 'page not found!',
		data: null,
	});
});

const galery = require("./routes/galery.routes");

app.use("/api/v1/galery", galery);

app.listen(PORT, () => console.log("APP LISTEN ON PORT : ", PORT));
