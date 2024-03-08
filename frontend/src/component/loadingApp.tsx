import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Backdrop, Typography } from '@mui/material';

interface Prop {
    open: boolean,
    setOpen: () => void
}

export default function CircularIndeterminate({ open, setOpen }: Prop) {
    return (
        <Backdrop open={open} >
            <CircularProgress />
            <Typography sx={{ fontFamily: "sans-serif", ml: 1, color: "#ffffff" }}>ခဏစောင့်ပါ</Typography>
        </Backdrop>
    );
};