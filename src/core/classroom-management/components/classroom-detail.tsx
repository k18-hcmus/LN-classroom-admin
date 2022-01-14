import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useAppDispatch } from "../../../app/hooks";
import { createAlert } from '../../../slices/alert-slice';
import { Classroom, getClassroom } from '../../../slices/classroom-slice';
import SpinnerLoading from '../../components/spinner-loading';

const ColumnBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    marginBottom: theme.spacing(5)
}));

const HorizontalCenterContainer = styled(Box)(({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
}));

const ClassroomDetail: FunctionComponent = () => {
    const { classroomId } = useParams<{ classroomId: string }>()

    const [classroom, setClassroom] = useState<Classroom | null>(null)
    const [isLoading, setLoading] = useState(true)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const result = await dispatch(getClassroom(classroomId)).unwrap()
                setClassroom(result);
            }
            catch (err) {
                dispatch(createAlert({
                    message: "Error when trying to fetch classroom's information",
                    severity: "error"
                }))
            }
            finally {
                setLoading(false)
            }

        }
        fetchData()
    }, [dispatch, classroomId]);
    return (
        isLoading ? (
            <SpinnerLoading />
        ) : (
            classroom ?
                (<HorizontalCenterContainer>
                    <Box
                        component="main"
                        sx={{ m: 1, width: "30%" }}
                    >
                        <ColumnBox>
                            <Typography variant='h4' align='center'>
                                Classroom Detail
                            </Typography>
                            <Box mt={(theme) => theme.spacing(4)} />
                            <Typography variant='h6'>
                                Id: {" "}
                                <Typography variant='subtitle1' component='span'>
                                    {classroom._id}
                                </Typography>
                            </Typography>
                            <Box mt={(theme) => theme.spacing(4)} />
                            <Typography variant='h6'>
                                Name: {" "}
                                <Typography variant='subtitle1' component='span'>
                                    {classroom.name}
                                </Typography>
                            </Typography>
                            <Box mt={(theme) => theme.spacing(4)} />
                            <Typography variant='h6'>
                                Owner's username: {" "}
                                <Typography variant='subtitle1' component='span'>
                                    {classroom.owner.username}
                                </Typography>
                            </Typography>
                            <Box mt={(theme) => theme.spacing(4)} />
                            <Typography variant='h6'>
                                Owner's email: {" "}
                                <Typography variant='subtitle1' component='span'>
                                    {classroom.owner.email}
                                </Typography>
                            </Typography>
                            <Box mt={(theme) => theme.spacing(4)} />
                            <Typography variant='h6'>
                                Owner's name: {" "}
                                <Typography variant='subtitle1' component='span'>
                                    {`${classroom.owner.firstName} ${classroom.owner.lastName}`}
                                </Typography>
                            </Typography>
                            <Box mt={(theme) => theme.spacing(4)} />
                            <Typography variant='h6'>
                                School Year: {" "}
                                <Typography variant='subtitle1' component='span'>
                                    {classroom.schoolYear}
                                </Typography>
                            </Typography>
                            <Box mt={(theme) => theme.spacing(4)} />
                            <Typography variant='h6'>
                                Description : {" "}
                                <Typography variant='subtitle1' component='span' >
                                    {classroom.description}
                                </Typography>
                            </Typography>
                            <Box mt={(theme) => theme.spacing(4)} />
                            <Typography variant='h6'>
                                Number of students : {" "}
                                <Typography variant='subtitle1' component='span' >
                                    {classroom.students?.length}
                                </Typography>
                            </Typography>
                            <Box mt={(theme) => theme.spacing(4)} />
                            <Typography variant='h6'>
                                Number of teachers : {" "}
                                <Typography variant='subtitle1' component='span' >
                                    {classroom.teachers?.length}
                                </Typography>
                            </Typography>
                            <Box mt={(theme) => theme.spacing(4)} />
                            <Typography variant='h6'>
                                Created At : {" "}
                                <Typography variant='subtitle1' component='span' >
                                    {new Date(classroom.createdAt!).toLocaleString("en")}
                                </Typography>
                            </Typography>
                        </ColumnBox>
                    </Box>
                </HorizontalCenterContainer >
                ) : <Typography>This classroom Id does not exist!</Typography>
        )
    );
}

export default ClassroomDetail;