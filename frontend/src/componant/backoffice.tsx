import { Box, Button, Dialog, DialogContent, DialogContentText, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { config } from "../config/config";
import DeleteApp from "./deleteApp";

const BackOfficeApp = () => {
    const [busStopName, setBusStopName] = useState({ inputFromBusStopName: "" });
    const [busNumber, setBusNumber] = useState({ inputFromBusNumber: "" });
    const [busStopNameFromDb, setBusStopNameFromDb] = useState([{ id: 0, name: "" }]);
    const [busNumberFromDb, setBusNumberFromDb] = useState([{ id: 0, number: "" }]);
    const [buses, setbuses] = useState([{ id: 0, bus_stop_name_id: 0, bus_number_id: 0 }]);
    const [runTime, setRunTime] = useState({ counter: 1 });
    const [open, setOpen] = useState(false);
    const [openRemove, setOpenRemove] = useState(false);
    const [removeId, setRemoveId] = useState({ id: 0 });
    const [updateData, setUpdateData] = useState({ id: 0, name: "" });
    const [updateName, setUpdateName] = useState({ name: "", number: 0 });

    useEffect(() => {
        fromDataBusStopName();
        fromDataBusNumber();
        fromDataBuses();
    }, [runTime]);
    const data = busStopNameFromDb && busNumberFromDb && buses
    if (!data) return null;

    // update data check
    const updateDateCheck = buses.filter(item => item.bus_stop_name_id === updateData.id);

    const dataFunction = async () => {
        const data = busStopName.inputFromBusStopName && busNumber.inputFromBusNumber;
        if (!data) return alert(" Write busNumber and busStopName!");
        await fetch(`${config.apiBaseUrl}/busData`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ busStopName, busNumber })
        });
        setBusStopName({ ...busStopName, inputFromBusStopName: "" });
        setBusNumber({ ...busNumber, inputFromBusNumber: "" });
        setRunTime({ ...runTime, counter: +1 })
        console.log("busStopName :", busStopName, "busNumber :", busNumber);
    };
    // from data database
    const fromDataBusStopName = async () => {
        const response = await fetch(`${config.apiBaseUrl}/fromDataBusStopName`, {
            method: "GET",
            headers: { "content-type": "application/json" }
        });
        const responseData = await response.json();
        setBusStopNameFromDb(responseData);
    };
    // from data database
    const fromDataBusNumber = async () => {
        const response = await fetch(`${config.apiBaseUrl}/fromDataBusNumber`, {
            method: "GET",
            headers: { "content-type": "application/json" }
        });
        const responseData = await response.json();
        setBusNumberFromDb(responseData);
    };
    // from data database
    const fromDataBuses = async () => {
        const response = await fetch(`${config.apiBaseUrl}/fromDataBuses`, {
            method: "GET",
            headers: { "content-type": "application/json" }
        });
        const responseData = await response.json();
        setbuses(responseData);
    };

    return (
        <Box>
            <Box sx={{ mt: 3 }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography sx={{ fontFamily: "sans-serif", minWidth: 300, display: "flex" }}> ကားမှတ်တိုင် အမည်</Typography>
                    <TextField
                        value={busStopName.inputFromBusStopName}
                        onChange={(evt) => setBusStopName({ ...busStopName, inputFromBusStopName: evt.target.value })}
                        sx={{ minWidth: 300, mt: 1 }} placeholder="BusStop Name"
                    />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginY: 3 }}>
                    <Typography sx={{ fontFamily: "sans-serif", minWidth: 300, display: "flex" }}>ဘ(စ်)ကား အမည်</Typography>
                    <TextField
                        value={busNumber.inputFromBusNumber}
                        onChange={(evt) => setBusNumber({ ...busNumber, inputFromBusNumber: evt.target.value })}
                        sx={{ minWidth: 300, mt: 1 }} placeholder="Bus Number" type="number"
                    />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button onClick={dataFunction} sx={{ minWidth: 300 }} variant="contained">Add</Button>
                </Box>
                <Box sx={{ mt: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography sx={{ fontFamily: "sans-serif", mb: 1, display: "flex", justifyContent: "center" }} variant="h5">Result Data</Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", width: { xs: 300, sm: 350, md: 500 } }}>
                        <input
                            type="search"
                            placeholder="ကားမှတ်တိုင်အမည်"
                            style={{
                                minWidth: "50%",
                                minHeight: 25,
                                borderTopLeftRadius: 20,
                                borderBottomLeftRadius: 20,
                                border: "1px solid",
                                padding: 15,
                                fontSize: 17
                            }}
                        />
                        <input
                            type="submit"
                            style={{
                                minWidth: 100,
                                minHeight: 50,
                                borderTopRightRadius: 20,
                                borderBottomRightRadius: 20,
                                border: "1px solid",
                                fontSize: 17,
                                cursor: "pointer"
                            }}
                        />
                    </Box>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                        {busStopNameFromDb.map((item) => {
                            const busStopNameId = buses.filter(items => items.bus_stop_name_id === item.id);
                            const BSNid = busStopNameId.map(y => y.bus_number_id);
                            const busNumberId = busNumberFromDb.filter(x => BSNid.includes(x.id));
                            return (
                                <Box>
                                    <Box
                                        key={item.id}
                                        sx={{
                                            mt: 4,
                                            mb: 1,
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            border: "1px solid",
                                            borderRadius: 3,
                                            p: 2,
                                        }}
                                    >
                                        <Typography sx={{
                                            fontFamily: "sans-serif",
                                            bgcolor: "lightblue",
                                            width: "fit-content",
                                            p: 1.5,
                                            borderRadius: 5,
                                            mb: 1
                                        }}>{item.name} မှတ်တိုင်</Typography>
                                        <Box sx={{ display: "", }}>
                                            {busNumberId.map(z => {
                                                return (
                                                    <Box sx={{}}>
                                                        <Typography
                                                            variant="h5"
                                                            sx={{
                                                                fontFamily: "sans-serif",
                                                                p: 2,
                                                                m: 1,
                                                                border: "1px solid skyblue",
                                                                borderRadius: 10,
                                                                bgcolor: "skyblue"
                                                            }}
                                                        >{z.number}</Typography>
                                                    </Box>
                                                )
                                            })}
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Button onClick={() => {
                                            setOpen(true);
                                            setUpdateData({ ...updateData, id: item.id, name: item.name });
                                        }} variant="contained" sx={{ mr: 1 }}>update</Button>
                                        <Button onClick={() => {
                                            setOpenRemove(true);
                                            setRemoveId({ ...removeId, id: item.id });
                                        }} variant="contained" color="error">delete</Button>
                                    </Box>
                                </Box>
                            );
                        })};
                    </Box>
                    <Dialog open={open} onClose={() => setOpen(false)}>
                        <DialogContent>
                            <DialogContentText>
                                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                                    <TextField
                                        onChange={(evt) => setUpdateName({ ...updateName, name: evt.target.value })}
                                        defaultValue={updateData.name}
                                        sx={{ minWidth: 200 }}
                                    />
                                    <TextField
                                        defaultValue={updateName.number}
                                        onChange={(evt) => setUpdateName({ ...updateName, number: Number(evt.target.value) })}
                                        sx={{ minWidth: 200, marginY: 1.5 }} placeholder="bus number" />
                                    <Button onClick={async () => {
                                        if (updateName.number === 0) return alert("write number...")
                                        await fetch(`${config.apiBaseUrl}/update`, {
                                            method: "POST",
                                            headers: { "content-type": "application/json" },
                                            body: JSON.stringify({ busUpdateNumber: updateName.number, busStopNameId: updateData.id })
                                        });
                                        setUpdateName({ ...updateName, number: 0 });
                                        setRunTime({ ...runTime, counter: +1 });
                                    }} variant="contained">add</Button>
                                </Box>
                                <Box sx={{ mt: 3 }}>
                                    {updateDateCheck.map(item => {
                                        const checkBusNumber = busNumberFromDb.filter(items => items.id === item.bus_number_id);
                                        return (
                                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                {checkBusNumber.map(items => {
                                                    return (
                                                        <Box>
                                                            <Typography
                                                                variant="h5"
                                                                sx={{
                                                                    fontFamily: "sans-serif",
                                                                    p: 2,
                                                                    m: 1,
                                                                    border: "1px solid skyblue",
                                                                    borderRadius: 10,
                                                                    bgcolor: "skyblue"
                                                                }}
                                                            >{items.number}</Typography>
                                                            <Button onClick={async () => {
                                                                await fetch(`${config.apiBaseUrl}/busNumberRemove`, {
                                                                    method: "POST",
                                                                    headers: { "content-type": "application/json" },
                                                                    body: JSON.stringify({ id: item.bus_number_id })
                                                                });
                                                                setRunTime({ ...runTime, counter: +1 });
                                                            }} color="error">remove</Button>
                                                        </Box>
                                                    )
                                                })}
                                            </Box>
                                        )
                                    })}
                                </Box>
                            </DialogContentText>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                                <Button onClick={() => setOpen(false)} variant="outlined">cencle</Button>
                                <Button
                                    variant="contained"
                                    onClick={async () => {
                                        if (!updateName.name) return setOpen(false);
                                        await fetch(`${config.apiBaseUrl}/updateName`, {
                                            method: "POST",
                                            headers: { "content-type": "application/json" },
                                            body: JSON.stringify({ newName: updateName.name, id: updateData.id })
                                        });
                                        setRunTime({ ...runTime, counter: +1 });
                                        setOpen(false);
                                    }}
                                >update</Button>
                            </Box>
                        </DialogContent>
                    </Dialog>
                    <DeleteApp
                        open={openRemove}
                        setOpen={() => setOpenRemove(false)}
                        removeFunction={async () => {
                            await fetch(`${config.apiBaseUrl}/remove`, {
                                method: "POST",
                                headers: { "content-type": "application/json" },
                                body: JSON.stringify({ removeId })
                            });
                            setRunTime({ ...runTime, counter: +1 })
                            setOpenRemove(false);
                        }}
                    />
                </Box>
            </Box>
        </Box >
    )
};
export default BackOfficeApp;