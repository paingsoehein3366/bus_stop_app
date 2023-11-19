import express, { json } from "express";
import cors from "cors";
import { db } from "./db/db";
const app = express();
const port = 5000;
app.use(json());
app.use(cors());

app.post("/busData", async (req, res) => {
    const { busStopName, busNumber } = req.body;
    const isVaild = busStopName && busNumber;
    if (!isVaild) return res.send(400);
    const busStopNames = busStopName.inputFromBusStopName;
    const busNumbers = Number(busNumber.inputFromBusNumber);
    //bus stop name db from data
    const fromDataBusStopName = await db.query("select * from bus_stop_names where is_archived = false");
    const fromDataBusStopNames = fromDataBusStopName.rows.map(item => item);
    const fromDataName = fromDataBusStopNames.filter(item => item.name === busStopNames);
    const fromDataNameId = fromDataName.map(item => item.id);

    if (fromDataName.length > 0) {
        //bus number
        const busNumberFromDb = await db.query("insert into bus_number(number) values($1) returning *", [busNumbers]);
        const busNumberFromDbId = busNumberFromDb.rows.map(item => item.id);

        //bus stop id and bus number id insert in buses table
        await db.query("insert into buses(bus_stop_name_id,bus_number_id) values($1,$2)", [
            Number(fromDataNameId), Number(busNumberFromDbId)
        ]);
    } else {
        //bus stop name
        const busStopNameFromDb = await db.query("insert into bus_stop_names(name) values($1) returning *", [String(busStopNames)]);
        const busStopNameFromDbId = busStopNameFromDb.rows.map(item => item.id);

        //bus number
        const busNumberFromDb = await db.query("insert into bus_number(number) values($1) returning *", [busNumbers]);
        const busNumberFromDbId = busNumberFromDb.rows.map(item => item.id);


        //bus stop id and bus number id insert in busestable
        await db.query("insert into buses(bus_stop_name_id,bus_number_id) values($1,$2)", [
            Number(busStopNameFromDbId), Number(busNumberFromDbId)
        ]);
    }

    res.send(200);
});
//from Data Bus Stop Name
app.get("/fromDataBusStopName", async (req, res) => {
    const busStopName = await db.query("select * from bus_stop_names where is_archived = false");
    const busStopNames = busStopName.rows;
    if (!busStopNames) return res.send(400);
    res.send(busStopNames);
});
//from Data Bus Number
app.get("/fromDataBusNumber", async (req, res) => {
    const busNumber = await db.query("select * from bus_number where is_archived = false");
    const busNumbers = busNumber.rows;
    res.send(busNumbers);
});
//from Data buses
app.get("/fromDataBuses", async (req, res) => {
    const buses = await db.query("select * from buses");
    const busesData = buses.rows;
    res.send(busesData);
});
// remove
app.post("/remove", async (req, res) => {
    const { removeId } = req.body;
    const removeIdFromUser = removeId.id;
    if (!removeIdFromUser) return res.send(400);
    await db.query("update bus_stop_names set is_archived = true where id = $1", [removeIdFromUser]);
    res.send(200);
});
// bus number remove
app.post("/busNumberRemove", async (req, res) => {
    const { id } = req.body;
    if (!id) return res.send(400);
    await db.query("update bus_number set is_archived = true where id = $1", [id]);
    res.send(200);
});
// update  number
app.post("/update", async (req, res) => {
    const { busUpdateNumber, busStopNameId } = req.body;
    const isVaild = busUpdateNumber && busStopNameId;
    if (!isVaild)
        console.log("busUpdateNumber :", busUpdateNumber, " busStopNameId :", busStopNameId);
    const updateBusNumber = await db.query("insert into bus_number(number) values($1) returning *", [busUpdateNumber]);
    const updateBusNumberId = updateBusNumber.rows.map(item => item.id);
    await db.query("insert into buses (bus_stop_name_id,bus_number_id) values($1,$2)", [busStopNameId, Number(updateBusNumberId)]);
    // if (!busUpdateName) res.send(400);
    // await db.query("update bus_stop_names set name = $1 where id = $2", [busUpdateName, busStopNameId]);
    res.send(200);
});
//updateName
app.post("/updateName", async (req, res) => {
    const { newName, id } = req.body;
    if (!newName) return res.send(400);
    await db.query("update bus_stop_names set name = $1 where id = $2", [newName, Number(id)]);
    res.send(200);
});
// search
app.post("/search", async (req, res) => {
    const { yourLocation, goingLocation } = req.body;
    console.log(yourLocation, goingLocation);

    if (!yourLocation.length && goingLocation.length) return res.send(400);
    const busStopRows = await db.query("select * from bus_stop_names");
    const busStopData = busStopRows.rows;
    const busesRows = await db.query("select * from buses");
    const buses = busesRows.rows;
    const yourLocationOne = busStopData.filter(item => item.name === yourLocation.name);
    const goingLocationOne = busStopData.filter(item => item.name === goingLocation.name);

    const yourLocationOneId = yourLocationOne.map(item => item.id);
    const goingLocationOneId = goingLocationOne.map(item => item.id);

    const busesStopOne = buses.filter(item => item.bus_stop_name_id === Number(yourLocationOneId));
    const busesStopTwo = buses.filter(item => item.bus_stop_name_id === Number(goingLocationOneId));

    const busNumberIdOne = busesStopOne.map(item => item.bus_number_id);
    const busNumberIdTwo = busesStopTwo.map(item => item.bus_number_id);

    const busNumberRows = await db.query("select * from bus_number");
    const busNumber = busNumberRows.rows;

    const busNumberId = busNumber.filter(item => busNumberIdOne.includes(item.id)).map(item => Number(item.number));
    const busNumberIds = busNumber.filter(item => busNumberIdTwo.includes(item.id)).map(item => Number(item.number));
    const result = busNumberId.filter(item => busNumberIds.includes(item));
    console.log("result", result);
    // const busesBusStopIds = buses.filter(item => busStopIds.includes(item.bus_stop_name_id));
    res.send(result);
})

app.listen(port, () => {
    console.log("server is running...");
});