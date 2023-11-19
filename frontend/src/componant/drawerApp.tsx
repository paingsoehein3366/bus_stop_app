import { Box, Drawer, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import DirectionsBusRoundedIcon from '@mui/icons-material/DirectionsBusRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

interface Prop {
    open: boolean,
    setOpen: () => void
}

const DrawerApp = ({ open, setOpen }: Prop) => {
    return (
        <Drawer open={open} onClose={setOpen} anchor="right">
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100vh" }}>
                <Box sx={{ minWidth: 250, }}>
                    <Box sx={{ display: "flex", justifyContent: "space-around", mt: 3, alignItems: "center" }}>
                        <DirectionsBusRoundedIcon sx={{ fontSize: 40, color: "#2acfcd" }} />
                        <ClearRoundedIcon onClick={setOpen} sx={{ fontSize: 37, color: "#2acfcd" }} />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 3, color: "#1876d2", alignItems: "center" }}>
                        <LanguageRoundedIcon sx={{ fontSize: 30, mr: 1 }} />
                        <FormControl sx={{ minWidth: 150 }}>
                            <InputLabel>Languages</InputLabel>
                            <Select label="languages" sx={{ border: "none" }} >
                                <MenuItem>Arakan</MenuItem>
                                <MenuItem>Vietnam</MenuItem>
                                <MenuItem>Myanmar</MenuItem>
                                <MenuItem>English</MenuItem>
                                <MenuItem>Japan</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", ml: 3 }}>
                    <img
                        src="https://ih1.redbubble.net/image.5002253424.3075/pp,840x830-pad,1000x1000,f8f8f8.jpg"
                        alt=""
                        style={{ width: 200, borderRadius: 70 }}
                    />
                </Box>
                <Box></Box>
            </Box>
        </Drawer>
    )
};
export default DrawerApp;