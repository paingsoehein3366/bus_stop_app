import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import CircularIndeterminate from "./loadingApp";
import busStopImage from "../bus-stop.jpg";
import DirectionsBusRoundedIcon from '@mui/icons-material/DirectionsBusRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import DrawerApp from "./drawerApp";
import LoginApp from "./loginApp";
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import AirportShuttleRoundedIcon from '@mui/icons-material/AirportShuttleRounded';
import LanguageApp from "./languageApp";
import { config } from "../config/config";

const InputApp = () => {
    const [yourLocation, setYourLocation] = useState({ name: "" });
    const [goingLocation, setGoingLocation] = useState({ name: "" });
    const [data, setData] = useState([{ id: [], firstName: "", lastName: "" }]);
    const [open, setOpen] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [language, setlanguage] = useState({ language1: "အခု မှတ်တိုင်", language2: "လားချင် မှတ်တိုင်" });
    const [search, setSearch] = useState("ရှာဖွေ");
    const [busNumber, setBusNumber] = useState("ဘ(စ်)ကား နံပတ်");
    const [to, setTo] = useState("မှ");
    const [languageApp, setLanguageApp] = useState("Languages");
    console.log("data: ", data);

    const searchFunction = async () => {
        const isValid = yourLocation.name && goingLocation.name;
        if (!isValid) return alert("သင်သွားချင်တဲ့ မှတ်တိုင်နာမည်ကို ရေးပေးပါ");
        setOpen(true);
        const response = await fetch(`${config.apiBaseUrl}/search`, {
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
    const Arakan = () => {
        setlanguage({ language1: "အခု မှတ်တိုင်", language2: "လားချင် မှတ်တိုင်" });
        setSearch("ရှာဖွေ");
        setBusNumber("ဘ(စ်)ကား နံပတ်");
        setTo("မှ");
        setLanguageApp("Arakan");
    };
    const English = () => {
        setlanguage({ language1: "now bus stop", language2: "you want to go bus stop" });
        setSearch("search");
        setBusNumber("Bus Number");
        setTo("To");
        setLanguageApp("English");
    };
    const Myanmar = () => {
        setlanguage({ language1: "ယခု မှတ်တိုင်", language2: "သွားချင်တဲ့ မှတ်တိုင်" });
        setSearch("ရှာဖွေ");
        setBusNumber("ဘ(စ်)ကား နံပတ်");
        setTo("မှ");
        setLanguageApp("Myanmar");
    };
    const Japan = () => {
        setlanguage({ language1: "今の バス停", language2: "行きたい　バス停" });
        setSearch("検索");
        setBusNumber("バス　番号");
        setTo("から");
        setLanguageApp("Japan");
    };
    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: { xs: "space-between", md: "space-around" },
                    bgcolor: "#eaeaec",
                    p: 2,
                    position: "sticky",
                    top: 0
                }}
            >
                <Box sx={{ display: "flex" }}>
                    <DirectionsBusRoundedIcon sx={{ fontSize: 40, color: "#1876d2" }} />
                    <Typography sx={{ fontFamily: "cursive", color: "#1876d2" }} variant="h4">Bus Stop</Typography>
                </Box>
                <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center", alignItems: "center" }}>
                    <Button onClick={() => setLoginOpen(true)} variant="contained">backOffice</Button>
                    <LanguageRoundedIcon sx={{ fontSize: 30, mr: 1, color: "#1876d2", ml: 2, cursor: "pointer" }} />
                    <LanguageApp
                        Arakan={Arakan}
                        English={English}
                        Myanmar={Myanmar}
                        Japan={Japan}
                        language={languageApp}
                        setLanguage={() => setLanguageApp("Language")}
                    />
                </Box>
                <MenuRoundedIcon
                    onClick={() => setOpenDrawer(true)}
                    sx={{
                        fontSize: 35,
                        color: "#199f9d",
                        display: { xs: "flex", md: "none" },
                        transition: "font-size 0.5s",
                        "&&:hover": { fontSize: 45 },
                        cursor: "pointer"
                    }}
                />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 5, flexDirection: "column" }}>
                <TextField
                    value={yourLocation.name}
                    sx={{ minWidth: 300 }}
                    label={language.language1}
                    placeholder={language.language1}
                    onChange={(evt) => setYourLocation({ ...yourLocation, name: evt.target.value })}
                />
                <Typography sx={{ fontFamily: "sans-serif", color: "red", marginY: 2 }} variant="h6">{to}</Typography>
                <TextField
                    value={goingLocation.name}
                    sx={{ minWidth: 300, mb: 2 }}
                    label={language.language2}
                    placeholder={language.language2}
                    onChange={(evt) => setGoingLocation({ ...goingLocation, name: evt.target.value })}
                />
                <Button
                    sx={{
                        width: 70,
                        height: 40,
                        transition: "width 0.5s,height 0.5s",
                        "&&:hover": { width: 74, height: 44 }
                    }}
                    onClick={searchFunction}
                    variant="contained"
                >{search}</Button>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 3 }}>
                <Box
                    sx={{
                        display: "flex"
                    }}
                >
                    {data.map(item => {
                        return (
                            <Box>
                                <Box sx={{
                                    display: "flex",
                                    bgcolor: "#2acfcd",
                                    width: 300,
                                    height: 30,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 10,
                                    p: 2,
                                    transition: "width 0.5s,height 0.5s",
                                    "&&:hover": { width: 310, height: 35 }
                                }}>
                                    <Typography sx={{ fontFamily: "sans-serif" }} variant="h6">{item.firstName}</Typography>
                                    <Typography sx={{ marginX: 2, color: "red" }} variant="h6">{to}</Typography>
                                    <Typography sx={{ fontFamily: "sans-serif" }} variant="h6">{item.lastName}</Typography>
                                </Box>
                                <Box sx={{ marginY: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Typography sx={{ fontFamily: "sans-serif", mr: 1 }} variant="h5">{busNumber}</Typography>
                                    <AirportShuttleRoundedIcon sx={{ fontSize: 30 }} color="primary" />
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
                <DrawerApp
                    open={openDrawer}
                    setOpen={() => setOpenDrawer(false)}
                    Arakan={Arakan}
                    English={English}
                    Myanmar={Myanmar}
                    Japan={Japan}
                    language={languageApp}
                    setLanguage={() => setLanguageApp("Language")}
                />
                <LoginApp open={loginOpen} setOpen={() => setLoginOpen(false)} />
                <Box
                    sx={{
                        display: "flex",
                        width: 300,
                        transition: "width 0.5s,height 0.5s",
                        "&&:hover": { width: 310 },
                    }}
                >
                    <img style={{ width: "100%", marginTop: 20, borderRadius: 10 }} src={busStopImage} alt="" />
                </Box>
            </Box>
        </Box>
    )
};
export default InputApp;