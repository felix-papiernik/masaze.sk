"use client";

import { IconButton, Snackbar, SnackbarCloseReason } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface CustomSnackbarProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    closeInMs?: number;
    message: string;
}

export default function CustomSnackbar(props: CustomSnackbarProps) {

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        props.setOpen(false);
    };

    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    )

    return (
        <Snackbar
            open={props.open}
            autoHideDuration={props.closeInMs ?? 6000}
            onClose={handleClose}
            message={props.message}
            action={action}
        />
    )
}
