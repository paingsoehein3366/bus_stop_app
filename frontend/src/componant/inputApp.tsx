import { Box, Button, TextField, Typography } from "@mui/material";
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import { useState } from "react";
import CircularIndeterminate from "./loadingApp";
import busStopImage from "../bus-stop.jpg";

const InputApp = () => {
    const [yourLocation, setYourLocation] = useState({ name: "" });
    const [goingLocation, setGoingLocation] = useState({ name: "" });
    const [data, setData] = useState([{ id: [], firstName: "", lastName: "" }])
    const [open, setOpen] = useState(false);
    console.log("data :", data);


    const searchFunction = async () => {
        const isValid = yourLocation.name && goingLocation.name;
        if (!isValid) return alert("သင်သွားချင်တဲ့ မှတ်တိုင်နာမည်ကို ရေးပေးပါ");
        setOpen(true);
        const response = await fetch("https://bus-stop-app-server.vercel.app/search", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ yourLocation, goingLocation })
        });
        if (response.ok) {
            setOpen(false)
            const responseJson = await response.json();
            setData(responseJson);
            setYourLocation({ ...yourLocation, name: "" });
            setGoingLocation({ ...goingLocation, name: "" });
        } else {
            return null;
        };
    };
    const BusStopNameStyle = {
        fontFamily: "sans-serif",
        background: "skyblue",
        padding: 1.5,
        borderRadius: 2,
        minWidth: 300,
        minHeight: 30
    };
    return (
        <Box sx={{}}>
            <Box>
                <Typography sx={{ fontFamily: "cursive", mt: 5, color: "#1876d2" }} variant="h4">Bus Stop</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 5, flexDirection: "column" }}>
                <TextField
                    value={yourLocation.name}
                    sx={{ minWidth: 300 }}
                    label="Your location BusStop Name"
                    placeholder="Your location BusStop Name"
                    onChange={(evt) => setYourLocation({ ...yourLocation, name: evt.target.value })}
                />
                <Typography sx={{ fontFamily: "sans-serif", color: "red", marginY: 2 }} variant="h6"> မှ </Typography>
                <TextField
                    value={goingLocation.name}
                    sx={{ minWidth: 300, mb: 2 }}
                    label="BusStop Name"
                    placeholder="BusStop Name"
                    onChange={(evt) => setGoingLocation({ ...goingLocation, name: evt.target.value })}
                />
                <Button onClick={searchFunction} variant="contained">search/ရှာဖွေ</Button>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 3 }}>
                <Box sx={{
                    display: "flex"
                }}>
                    {data.map(item => {
                        return (
                            <Box>
                                <Box sx={{ display: "flex", bgcolor: "#2acfcd", minWidth: 300, minHeight: 30, justifyContent: "center", alignItems: "center", borderRadius: 10, p: 2 }}>
                                    <Typography sx={{ fontFamily: "sans-serif" }} variant="h6">{item.firstName}</Typography>
                                    <Typography sx={{ marginX: 2 }} variant="h6">from</Typography>
                                    <Typography sx={{ fontFamily: "sans-serif" }} variant="h6">{item.lastName}</Typography>
                                </Box>
                                <Box>
                                    <Typography sx={{ fontFamily: "sans-serif", marginY: 1 }} variant="h5">Result</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                                    {item.id.map(items => {
                                        return (
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontFamily: "sans-serif",
                                                    bgcolor: "skyblue",
                                                    width: "fit-content",
                                                    p: 2,
                                                    borderRadius: 10,
                                                    color: "",
                                                    ml: 2,
                                                }}
                                            >{items}</Typography>
                                        )
                                    })}
                                </Box>
                            </Box>
                        )
                    })}
                </Box>
                <CircularIndeterminate open={open} setOpen={() => setOpen(false)} />
                <Box>
                    <img style={{ width: 300, marginTop: 20, borderRadius: 10 }} src={busStopImage} alt="" />
                </Box>
            </Box>
        </Box>
    )
};
export default InputApp;