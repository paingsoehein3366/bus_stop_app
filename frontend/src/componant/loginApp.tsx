import { Box, Button, Drawer, TextField, Typography } from "@mui/material"
import { useState } from "react";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DirectionsBusRoundedIcon from '@mui/icons-material/DirectionsBusRounded';
import CircularIndeterminate from "./loadingApp";
import { useNavigate } from "react-router-dom";
import { config } from "../config/config";

interface Prop {
    open: boolean,
    setOpen: () => void
}
const LoginApp = ({ open, setOpen }: Prop) => {
    const [userName, setUserName] = useState({ userName: "" });
    const [password, setPassword] = useState({ password: "" });
    const [loadingOpen, setLoadingOpen] = useState(false);
    const navigate = useNavigate();

    const backOffice = async () => {
        const isValid = userName.userName && password.password;
        if (!isValid) return alert("Write userName and password");
        setLoadingOpen(true);
        const response = await fetch(`${config.apiBaseUrl}/login`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ userName: userName.userName, password: password.password })
        });
        if (response.ok) {
            setUserName({ ...userName, userName: "" });
            setPassword({ ...password, password: "" });
            setLoadingOpen(false);
            navigate("/backOffice");
            const responseJson = await response.json();
            console.log("response : ", responseJson);
        } else {
            setLoadingOpen(false);
            return alert("your password incorrect");
        }
    }
    return (
        <Drawer open={open} onClose={setOpen} anchor="right">
            <Box sx={{ minWidth: 300 }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    bgcolor: "#eaeaec",
                    p: 2,
                    position: "sticky",
                    top: 0
                }}>
                    <DirectionsBusRoundedIcon sx={{ fontSize: 40, color: "#2acfcd" }} />
                    <ClearRoundedIcon onClick={setOpen} sx={{ fontSize: 37, color: "#2acfcd", cursor: "pointer" }} />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around", height: "100vh" }}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Typography sx={{ fontFamily: "monospace", color: "#1876d2" }} variant="h5">Login page</Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                        <TextField
                            type="text"
                            label="User Name"
                            onChange={(evt) => setUserName({ ...userName, userName: evt.target.value })}
                            placeholder="User Name"
                            value={userName.userName}
                        />
                        <TextField
                            sx={{ marginY: 2 }}
                            type="password"
                            label="Password"
                            onChange={(evt) => setPassword({ ...password, password: evt.target.value })}
                            placeholder="Password"
                            value={password.password}
                        />
                        <Button onClick={backOffice} sx={{ mb: 5 }} variant="contained">Log in</Button>
                    </Box>
                    <Box></Box>
                    <Box></Box>
                    <CircularIndeterminate open={loadingOpen} setOpen={() => setLoadingOpen(false)} />
                </Box>
            </Box>
        </Drawer>
    )
};
export default LoginApp;