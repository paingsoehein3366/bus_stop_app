import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { Box } from "@mui/system";
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import { useState } from "react";

interface Prop {
    Arakan: () => void,
    English: () => void,
    Myanmar: () => void,
    Japan: () => void,
    setLanguage: () => void,
    language: String
}

const LanguageApp = ({ Arakan, English, Myanmar, Japan, setLanguage, language }: Prop) => {
    return (
        <Box>
            <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>{language}</InputLabel>
                <Select label="languages" sx={{ border: "none" }} >
                    <MenuItem onClick={Arakan}>Arakan</MenuItem>
                    <MenuItem onClick={Myanmar}>Myanmar</MenuItem>
                    <MenuItem onClick={English}>English</MenuItem>
                    <MenuItem onClick={Japan}>Japan</MenuItem>
                </Select>
            </FormControl>

        </Box>
    )
};
export default LanguageApp;