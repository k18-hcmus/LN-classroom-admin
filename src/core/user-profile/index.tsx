import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Avatar, Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FunctionComponent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RouteName } from '../../app/routes';
import { selectRoute } from '../../slices/route-slice';
import { changePassword, updateProfile } from '../../slices/user-slice';
import { notEmptyValidation, passwordValidation, useValidator, useValidatorManagement } from '../../utils/validator';
import { HorizontalCenterContainer } from '../components/container';

const ColumnBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    marginBottom: theme.spacing(5)
}));

const RowBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
}));

const ChangePass = styled(Link)(({ theme }) => ({
    marginLeft: theme.spacing(3),
}))

const FormChangePass = styled(Box)(({ theme }) => ({
    width: "90%",
    marginLeft: theme.spacing(5),
    marginTop: theme.spacing(3)
}))

const Label = styled(Typography)(({ theme }) => ({
    color: theme.colors.texting.textLabel,
    fontSize: theme.fontSizes.sizeLabel,
}))

const ButtonChangePass = styled(Button)(({ theme }) => ({
    width: theme.spacing(25),
    height: theme.spacing(10),
    marginLeft: `${theme.spacing(3)}`
}))

const GridButton = styled(Grid)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
}))

const GridButtonChangePass = styled(Grid)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: theme.spacing(-8)
}))

const AvatarProfile = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(50),
    height: theme.spacing(50),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto",
}))

const IconAvatar = styled(PermIdentityIcon)(({ theme }) => ({
    width: "100%",
    height: "100%"
}))

const ChangeAvatarButton = styled(Button)(({ theme }) => ({
    marginBottom: theme.spacing(5),
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: theme.spacing(1)
}))

const UserProfile: FunctionComponent = () => {
    const user = useAppSelector((state) => state.userReducer.user)
    const [changePass, setChangePass] = useState(false)
    const profileValidatorManagement = useValidatorManagement()
    const firstName = useValidator("firstName", notEmptyValidation, user?.firstName, profileValidatorManagement)
    const lastName = useValidator("lastName", notEmptyValidation, user?.lastName, profileValidatorManagement)
    const handleOnChangeProfile = profileValidatorManagement.handleOnChange

    const passwordValidatorManagement = useValidatorManagement()
    const oldPassword = useValidator("oldPassword", notEmptyValidation, "", passwordValidatorManagement)
    const newPassword = useValidator("newPassword", passwordValidation, "", passwordValidatorManagement)
    const retypePassword = useValidator("newPassword", passwordValidation, "", passwordValidatorManagement)
    const handleOnChangePassword = passwordValidatorManagement.handleOnChange

    const handleChangePassword = async () => {
        passwordValidatorManagement.validate()
        if (!passwordValidatorManagement.hasError() && isRetypePasswordSame()) {
            const { retypePassword, ...payload } = passwordValidatorManagement.getValuesObject()
            try {
                await dispatch(changePassword(payload)).unwrap()
                passwordValidatorManagement.reset()
                setChangePass(false)
            } catch (err) {
                // ignore
            }
        }
    };

    const dispatch = useAppDispatch()
    const handleChangePassButton = () => {
        setChangePass(!changePass)
    }

    const isRetypePasswordSame = () => {
        return retypePassword.value === newPassword.value
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        profileValidatorManagement.validate()
        if (!profileValidatorManagement.hasError()) {
            const payload = profileValidatorManagement.getValuesObject()
            try {
                await dispatch(updateProfile(payload)).unwrap()
            } catch (err) {
                // ignore
            }
        }
    };

    useEffect(() => {
        dispatch(selectRoute(RouteName.PROFILE))
    }, [dispatch])

    const canChangePassword = !passwordValidatorManagement.hasError() && isRetypePasswordSame()

    return (
        <HorizontalCenterContainer>
            <Box
                component="main"
                sx={{ m: 1, width: "30%" }}
            >
                <ColumnBox>
                    <AvatarProfile>
                        <IconAvatar></IconAvatar>
                    </AvatarProfile>
                    <ChangeAvatarButton variant="outlined">Change Avatar</ChangeAvatarButton>
                    <RowBox>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="First name"
                            error={firstName.hasError()}
                            helperText={firstName.error}
                            onChange={handleOnChangeProfile(firstName)}
                            onBlur={() => firstName.validate()}
                            value={firstName.value}
                            sx={{ mr: 1 }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Last name"
                            error={lastName.hasError()}
                            helperText={lastName.error}
                            onChange={handleOnChangeProfile(lastName)}
                            value={lastName.value}
                            onBlur={() => lastName.validate()}
                            sx={{ ml: 1 }}
                        />
                    </RowBox>
                    <Box mt={(theme) => theme.spacing(4)} />
                    <TextField
                        disabled
                        id="outlined-read-only-input"
                        label="Email"
                        defaultValue={user?.email}
                        InputLabelProps={{ style: { fontSize: 18, fontWeight: 550 } }}
                    />
                    <Box mt={(theme) => theme.spacing(4)} />
                    <TextField
                        disabled
                        id="realonly"
                        label="Username"
                        defaultValue={user?.username}
                        InputLabelProps={{ style: { fontSize: 18, fontWeight: 550 } }}
                    />
                    <Box mt={(theme) => theme.spacing(4)} />

                    {
                        user?.provider === 'local' &&
                        (!changePass ? (
                            <>
                                <ChangePass
                                    href="#"
                                    underline="always"
                                    onClick={handleChangePassButton}
                                >
                                    {'Change Password?'}
                                </ChangePass>
                            </>)
                            :
                            (
                                <FormChangePass>
                                    <Label>Change Password</Label>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Old Password"
                                        type="password"
                                        autoComplete="current-password"
                                        onChange={handleOnChangePassword(oldPassword)}
                                        error={oldPassword.hasError()}
                                        helperText={oldPassword.error}
                                        onBlur={() => oldPassword.validate()}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="New Password"
                                        type="password"
                                        autoComplete="current-password"
                                        error={newPassword.hasError()}
                                        helperText={newPassword.error}
                                        onChange={handleOnChangePassword(newPassword)}
                                        onBlur={() => newPassword.validate()}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Confirm Password"
                                        type="password"
                                        autoComplete="current-password"
                                        error={!isRetypePasswordSame()}
                                        helperText={!isRetypePasswordSame() ? "This field and new password must be the same!" : ""}
                                        onChange={handleOnChangePassword(retypePassword)}
                                    />
                                    <GridButton>
                                        <ButtonChangePass
                                            variant="contained"
                                            color="success"
                                            disabled={!canChangePassword}
                                            onClick={handleChangePassword}
                                        >
                                            Change
                                        </ButtonChangePass>
                                        <ButtonChangePass
                                            variant="outlined"
                                            color="error"
                                            onClick={handleChangePassButton}
                                        >
                                            Cancel
                                        </ButtonChangePass>
                                    </GridButton>
                                </FormChangePass>
                            ))
                    }
                </ColumnBox>
                {
                    <GridButtonChangePass>
                        <ButtonChangePass
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={handleSubmit}
                            disabled={profileValidatorManagement.hasError()}
                        >
                            Save
                        </ButtonChangePass>
                    </GridButtonChangePass>
                }
            </Box>
        </HorizontalCenterContainer >

    );
}

export default UserProfile;