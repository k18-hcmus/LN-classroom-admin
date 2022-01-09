import { Alert, Snackbar } from "@mui/material";
import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ALERT_DURATION } from "../../shared/styles";
import { closeAlert } from "../../slices/alert-slice";


const AlertSnackBar: FunctionComponent = () => {
    const dispatch = useAppDispatch()
    const { isOpen, message, severity } = useAppSelector((state) => state.alertReducer)
    const handleClose = () => {
        dispatch(closeAlert())
    }

    return (<Snackbar open={isOpen} autoHideDuration={ALERT_DURATION} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
        </Alert>
    </Snackbar>);
}

export default AlertSnackBar;