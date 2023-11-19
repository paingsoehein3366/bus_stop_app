import { Box, Button, TextField, Typography } from "@mui/material";
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import { useState } from "react";

const InputApp = () => {
    const [yourLocation, setYourLocation] = useState({ name: "" });
    const [goingLocation, setGoingLocation] = useState({ name: "" });
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false);
    console.log("data :", data);


    const searchFunction = async () => {
        const isValid = yourLocation.name && goingLocation.name;
        if (!isValid) return alert("Write, your location and you want to go busStop")
        const response = await fetch("http://localhost:5000/search", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ yourLocation, goingLocation })
        });
        if (response.ok) {
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
        <Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 10, flexDirection: "column" }}>
                <TextField
                    defaultValue={yourLocation.name}
                    sx={{ minWidth: 300 }}
                    label="Your location BusStop Name"
                    placeholder="Your location BusStop Name"
                    onChange={(evt) => setYourLocation({ ...yourLocation, name: evt.target.value })}
                />
                <Typography sx={{ fontFamily: "sans-serif", color: "red", marginY: 2 }} variant="h6"> မှ </Typography>
                <TextField
                    defaultValue={goingLocation.name}
                    sx={{ minWidth: 300, mb: 2 }}
                    label="BusStop Name"
                    placeholder="BusStop Name"
                    onChange={(evt) => setGoingLocation({ ...goingLocation, name: evt.target.value })}
                />
                <Button onClick={searchFunction} variant="contained">search/ရှာဖွေ</Button>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 3 }}>
                {/* <Box >
                    <Typography sx={BusStopNameStyle}>{yourLocation.name}</Typography>

                    <Typography sx={BusStopNameStyle}>{goingLocation.name}</Typography>
                </Box> */}
                <Typography sx={{ fontFamily: "sans-serif", marginY: 3 }} variant="h5">Bus Number</Typography>
                <Box sx={{
                    display: "flex"
                }}>
                    {data.map(item => {
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
                            >{item}</Typography>
                        )
                    })}
                </Box>
            </Box>
        </Box>
    )
};
export default InputApp;