import { Box, Button, Dialog, DialogContent, TextField, Typography } from "@mui/material";

interface Porp {
    open: boolean,
    setOpen: () => void,
    updateFunction: () => void,
}

const UpdateApp = ({ open, setOpen, updateFunction }: Porp) => {
    return (
        <Box>
            <Dialog open={open} onClose={setOpen}>
                <DialogContent>
                    <Typography variant="h5">Update App</Typography>
                    <TextField />
                    <TextField />
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                        <Button onClick={setOpen} variant="outlined">cencle</Button>
                        <Button onClick={updateFunction} variant="contained">update</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    )
};
export default UpdateApp;