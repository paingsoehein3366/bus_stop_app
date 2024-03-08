import { Box, Button, Dialog, DialogContent, TextField, Typography } from "@mui/material";

interface Porp {
    open: boolean,
    setOpen: () => void,
    removeFunction: () => void,
}

const DeleteApp = ({ open, setOpen, removeFunction }: Porp) => {
    return (
        <Box>
            <Dialog open={open} onClose={setOpen}>
                <DialogContent>
                    <Typography sx={{ fontFamily: "sans-serif" }} variant="h6">Are you sure this table delete?</Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                        <Button onClick={setOpen} variant="outlined">cencle</Button>
                        <Button onClick={removeFunction} variant="contained" color="error">remove</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    )
};
export default DeleteApp;