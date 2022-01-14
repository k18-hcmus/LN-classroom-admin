import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { get } from 'lodash';
import { FunctionComponent, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { createAdminUser } from '../../../slices/user-slice';
import { emailValidation, notEmptyValidation, passwordValidation, usernameValidation, useValidator, useValidatorManagement } from '../../../utils/validator';
import SpinnerLoading from '../../components/spinner-loading';

const HorizontalCenterContainer = styled(Box)(({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
}));

const CreateAdminForm: FunctionComponent<{ backToManagePage: any }> = ({ backToManagePage }) => {
    const [isLoading, setLoading] = useState(false)
    const validatorFields = useValidatorManagement()
    const firstName = useValidator("firstName", notEmptyValidation, "", validatorFields)
    const lastName = useValidator("lastName", notEmptyValidation, "", validatorFields)
    const email = useValidator("email", emailValidation, "", validatorFields)
    const username = useValidator("username", usernameValidation, "", validatorFields)
    const password = useValidator("password", passwordValidation, "", validatorFields)
    const dispatch = useAppDispatch()

    const hasError = validatorFields.hasError()
    const handleSubmit = async () => {

        validatorFields.validate()
        if (!validatorFields.hasError()) {
            const payload = validatorFields.getValuesObject()
            try {
                setLoading(true)
                await dispatch(createAdminUser(payload)).unwrap()
                backToManagePage()
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    const usernameError = get(err.response?.data, "username")
                    const emailError = get(err.response?.data, "email")
                    usernameError && username.setError(usernameError)
                    emailError && email.setError(emailError)
                }
            } finally {
                setLoading(false)
            }
        }
    };

    const handleOnChange = validatorFields.handleOnChange
    return (
        <Container component="main" maxWidth="xs">
            <Typography variant="h4" gutterBottom align='center'>
                Create Admin
            </Typography>
            <HorizontalCenterContainer>
                <Box component="main" sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="First name"
                        error={firstName.hasError()}
                        helperText={firstName.error}
                        onChange={handleOnChange(firstName)}
                        onBlur={() => firstName.validate()}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Last name"
                        error={lastName.hasError()}
                        helperText={lastName.error}
                        onChange={handleOnChange(lastName)}
                        onBlur={() => lastName.validate()}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        autoComplete="email"
                        error={email.hasError()}
                        helperText={email.error}
                        onChange={handleOnChange(email)}
                        onBlur={() => email.validate()}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        error={username.hasError()}
                        helperText={username.error}
                        label="Username"
                        autoComplete="username"
                        onChange={handleOnChange(username)}
                        onBlur={() => username.validate()}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        error={password.hasError()}
                        helperText={password.error}
                        autoComplete="current-password"
                        onChange={handleOnChange(password)}
                        onBlur={() => password.validate()}
                    />
                    <Stack direction="row" alignItems="center" justifyContent="right" mb={5}>
                        {
                            isLoading ? <SpinnerLoading /> :
                                (<Button
                                    type="submit"

                                    variant="contained"
                                    sx={{ borderRadius: 29, mt: 2 }}
                                    onClick={handleSubmit}
                                    disabled={hasError}
                                >
                                    Create
                                </Button>)
                        }
                        <Box ml={4} />
                        <Button

                            variant="contained"
                            sx={{ borderRadius: 29, mt: 2 }}
                            onClick={backToManagePage}
                            color='error'
                        >
                            Cancel
                        </Button>
                    </Stack>
                </Box>
            </HorizontalCenterContainer>
        </Container>

    );
}

export default CreateAdminForm;