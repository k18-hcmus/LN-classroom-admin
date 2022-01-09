import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { joinClassroomByClassCode } from '../../slices/classroom-slice';
import { setJoinClassModalClose } from '../../slices/join-class-modal-slice';


const StyledBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    padding: theme.spacing(8),
    backgroundColor: theme.colors.background.white,
    zIndex: theme.zIndex.modal,
    borderRadius: 16
}));

const StyledTextFiled = styled(TextField)(({ theme }) => ({
    marginTop: theme.spacing(4),
    width: '100%'
}));

const RightAlignContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "right",
    marginTop: theme.spacing(5)
}));

const JoinClassroomModal = () => {
    const open = useAppSelector((state) => state.joinClassModalReducer.isOpen)
    const [classCode, setClassCode] = useState("")
    const dispatch = useAppDispatch()

    const handleClose = () => {
        dispatch(setJoinClassModalClose())
    }

    const handleSubmit = () => {
        dispatch(joinClassroomByClassCode(classCode))
        handleClose()
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClassCode(event.target.value)
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <StyledBox>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Join a classroom
                </Typography>
                <StyledTextFiled
                    variant="filled"
                    required
                    id="outlined-required"
                    label="Class code"
                    placeholder="Type your class code here"
                    onChange={handleOnChange}
                    autoFocus
                />
                <RightAlignContainer>
                    <Button color="inherit" onClick={handleClose}>Cancel</Button>
                    <Box ml={2}></Box>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Join</Button>
                </RightAlignContainer>
            </StyledBox>
        </Modal>
    )

}

export default JoinClassroomModal;