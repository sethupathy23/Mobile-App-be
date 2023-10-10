import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

// const express = require("express");
const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
//connect pandrom
const MONGO_URL = process.env.MONGO_URL;
export const client = new MongoClient(MONGO_URL);
console.log(process.env);
console.log(process.env.MONGO_URL);
await client.connect();

console.log("Mongo is Connected");
//connect end

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

// http://localhost:4003/mobiles
// const mobileList = [
//   {
//     id: "01",
//     model: "OnePlus 9 5G",
//     img: "https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
//     company: "Oneplus",
//   },
//   {
//     model: "Iphone 13 mini",
//     img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-mini-blue-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1645572315986",
//     company: "Apple",
//   },
//   {
//     model: "Samsung s21 ultra",
//     img: "https://m.media-amazon.com/images/I/81kfA-GtWwL._SY606_.jpg",
//     company: "Samsung",
//   },
//   {
//     model: "Xiomi mi 11",
//     img: "https://m.media-amazon.com/images/I/51K4vNxMAhS._AC_SX522_.jpg",
//     company: "Xiomi",
//   },
// ];

app.get("/mobiles", async function (request, response) {
  //db.mobiles.find({});
  const mobiles = await client
    .db("B42WD2")
    .collection("Mobiles")
    .find({})
    .toArray();
  response.send(mobiles);
});

app.post("/mobiles", async function (request, response) {
  //db.mobiles.insertMany(data)
  const data = request.body;
  console.log(data);
  const result = await client
    .db("B42WD2")
    .collection("Mobiles")
    .insertMany(data);
  response.send(result);
});

// app.get("/mobiles/:id", async function (request, response) {
//   const { id } = request.params;
//   console.log(id);
//   const mobile = mobileList.find((mb) => mb.id === id);
//   console.log(mobile);
//   response.send(mobile);
// }); id namma ithula get pannala chumma try panirkom

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
