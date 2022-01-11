import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useAppDispatch } from "../../../app/hooks";
import { getUserDataById } from '../../../services/user';
import { createAlert } from '../../../slices/alert-slice';
import SpinnerLoading from '../../components/spinner-loading';

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

const HorizontalCenterContainer = styled(Box)(({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
}));

const UserProfileMapping: FunctionComponent = () => {
    const { userId } = useParams<{ userId: string }>()

    const [studentInfor, setStudentInfor] = useState<any>(null)
    const [isLoading, setLoading] = useState(true)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const result = await getUserDataById(userId)
                setStudentInfor(result.data);
            }
            catch (err) {
                dispatch(createAlert({
                    message: "Error when trying to fetch information student",
                    severity: "error"
                }))
            }
            finally {
                setLoading(false)
            }

        }
        fetchData()
    }, [dispatch, userId]);

    return (
        isLoading ? (
            <SpinnerLoading />
        ) : (
            studentInfor ?
                (<HorizontalCenterContainer>
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
                                    value={studentInfor.firstName}
                                    disabled={true}
                                    sx={{ mr: 1 }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Last name"
                                    value={studentInfor.lastName}
                                    disabled={true}
                                    sx={{ ml: 1 }}
                                />

                            </RowBox>
                            <Box mt={(theme) => theme.spacing(4)} />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Email"
                                value={studentInfor.email}
                                disabled={true}
                            />
                            <Box mt={(theme) => theme.spacing(4)} />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Username"
                                value={studentInfor.username}
                                disabled={true}
                            />
                            <Box mt={(theme) => theme.spacing(4)} />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Student Id"
                                value={studentInfor.studentId}
                                disabled={true}
                            />
                            <Box mt={(theme) => theme.spacing(4)} />
                        </ColumnBox>
                    </Box>
                </HorizontalCenterContainer >
                ) : <Typography>This user Id does not exist!</Typography>
        )


    );
}

export default UserProfileMapping;