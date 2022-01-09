import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createClassroom } from '../../slices/classroom-slice';
import { setCreateClassModalClose } from '../../slices/create-class-modal-sclice';
import { notEmptyValidation, useValidator, useValidatorManagement } from '../../utils/validator';


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

const CreateClassroomModal = () => {
    const validatorFields = useValidatorManagement()
    const classname = useValidator("name", notEmptyValidation, "", validatorFields)
    const schoolYear = useValidator("schoolYear", notEmptyValidation, "", validatorFields)
    const description = useValidator("description", null, "", validatorFields)

    const open = useAppSelector((state) => state.createClassModalReducer.isOpen)
    const user = useAppSelector((state) => state.userReducer.user)
    const dispatch = useAppDispatch()

    const hasError = validatorFields.hasError()
    const handleClose = () => {
        validatorFields.reset()
        dispatch(setCreateClassModalClose())
    }

    const handleOnChange = validatorFields.handleOnChange

    const handleSubmit = () => {
        validatorFields.validate()
        if (!validatorFields.hasError()) {
            const payload = { ...validatorFields.getValuesObject(), owner: user?._id }
            dispatch(createClassroom(payload))
            handleClose()
        }
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
                    Create your classroom
                </Typography>
                <StyledTextFiled
                    variant="filled"
                    error={classname.hasError()}
                    required
                    id="outlined-required"
                    label="Class name"
                    placeholder="Type your classroom's name here"
                    onChange={handleOnChange(classname)}
                    helperText={classname.error}
                    onBlur={() => classname.validate()}
                    autoFocus
                />
                <StyledTextFiled
                    variant="filled"
                    error={schoolYear.hasError()}
                    required
                    id="outlined-required"
                    label="School Year"
                    placeholder="Type your school year's section here"
                    onChange={handleOnChange(schoolYear)}
                    helperText={schoolYear.error}
                    onBlur={() => schoolYear.validate()}
                />
                <StyledTextFiled
                    variant="filled"
                    id="outlined-multiline-static"
                    label="Description"
                    placeholder="Type your classroom's description here"
                    multiline
                    rows={5}
                    onChange={handleOnChange(description)}
                />
                <RightAlignContainer>
                    <Button color="inherit" onClick={handleClose}>Cancel</Button>
                    <Box ml={2}></Box>
                    <Button variant="contained" color="success" disabled={hasError} onClick={handleSubmit}>Create</Button>
                </RightAlignContainer>
            </StyledBox>
        </Modal>
    )

}

export default CreateClassroomModal;