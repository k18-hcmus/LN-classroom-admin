import { Edit } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
// material
import {
    Card, Container, IconButton, Input, Stack, Table, TableBody,
    TableCell, TableContainer,
    TablePagination, TableRow, Typography
} from '@mui/material';
import { sentenceCase } from 'change-case';
import { filter, get } from 'lodash';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RouteName } from '../../app/routes';
import { USER_STATUS } from '../../shared/constant';
import { NO_MESSAGE, STUDENT_ID_WRONG } from '../../shared/messages';
import { createAlert } from '../../slices/alert-slice';
import { selectRoute } from '../../slices/route-slice';
// components
import { getAllMember, mapStudentId, User } from '../../slices/user-slice';
import { studentIdValidation } from '../../utils/validator';
import Label from '../components/label';
import Page from '../components/page';
import SearchNotFound from '../components/search-not-found';
import SpinnerLoading from '../components/spinner-loading';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/user';
//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'username', label: 'Username', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'firstName', label: 'Name', alignRight: false },
    { id: 'studentId', label: 'Student Id', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'createdAt', label: 'Created At', alignRight: false },
    { id: '', label: '', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a: any, b: any, orderBy: string) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order: string, orderBy: string) {
    return order === 'desc'
        ? (a: any, b: any) => descendingComparator(a, b, orderBy)
        : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

function doSearch(values: string[], query: string) {
    if (values) {
        for (const value of values) {
            if (value.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
                return true;
            }
        }
    }
    return false;
}

function applySortFilter(array: any[], comparator: any, query: string) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(
            array,
            (_user) => doSearch([_user.username, _user.email, _user.firstName, _user.lastName], query)
        );
    }
    return stabilizedThis.map((el: any) => el[0]);
}

export default function UserManagement() {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc' as const);
    const [orderBy, setOrderBy] = useState('username');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [studentIdEdit, setStudentIdEdit] = useState<any>({});
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.userReducer.managementUsers);

    const isUserEditting = (id: string) => {
        return get(studentIdEdit, `${id}.isEdit`, false)
    }

    const isEditSending = (id: string) => {
        return get(studentIdEdit, `${id}.isLoading`, false)
    }

    const handleSaveStudentId = async (id: string, defaultStudentId: string) => {
        const studentId = studentIdEdit[id].value !== undefined ? studentIdEdit[id].value : defaultStudentId
        const error = studentId.length === 0 ? NO_MESSAGE : studentIdValidation(studentId)

        if (error.length > 0) {
            return dispatch(createAlert({
                message: STUDENT_ID_WRONG,
                severity: 'error'
            }))
        }
        setStudentIdEdit({
            ...studentIdEdit, [id]: {
                ...studentIdEdit[id], isLoading: true
            }
        })
        try {
            await dispatch(mapStudentId({ id, studentId })).unwrap()
            setStudentIdEdit({
                ...studentIdEdit, [id]: {
                    isEdit: false,
                    isLoading: false
                }
            })
        } catch (err) {
            setStudentIdEdit({
                ...studentIdEdit, [id]: {
                    isEdit: true,
                    isLoading: false
                }
            })
        }

    }

    const handleOnChangeStudentId = (id: string) => (event: any) => {
        setStudentIdEdit({
            ...studentIdEdit, [id]: {
                ...studentIdEdit[id], value: event.target.value
            }
        })
    }

    const handleEditStudentId = (id: string) => {
        setStudentIdEdit({
            ...studentIdEdit, [id]: {
                ...studentIdEdit[id], isEdit: true
            }
        })
    }

    useEffect(() => {
        dispatch(selectRoute(RouteName.USER))
        if (users.length === 0) {
            dispatch(getAllMember());
        }
    }, [dispatch, users]);

    const handleRequestSort = (event: React.MouseEvent<HTMLElement>, property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? ('desc' as const) : ('asc' as const));
        setOrderBy(property);
    };

    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (event: any) => {
        setFilterName(event.target.value);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

    const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;

    return (
        <Page title="Users">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Users Management
                    </Typography>
                </Stack>

                <Card>
                    <UserListToolbar
                        filterName={filterName}
                        onFilterName={handleFilterByName}
                    />
                    <TableContainer sx={{ minWidth: 1000 }}>
                        <Table>
                            <UserListHead
                                order={order}
                                orderBy={orderBy}
                                headLabel={TABLE_HEAD}
                                rowCount={users.length}
                                onRequestSort={handleRequestSort}
                            />
                            <TableBody>
                                {filteredUsers
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row: User) => {
                                        const {
                                            _id,
                                            username,
                                            status,
                                            email,
                                            firstName,
                                            studentId,
                                            lastName,
                                            createdAt
                                        } = row;

                                        return (
                                            <TableRow
                                                hover
                                                key={_id}
                                                tabIndex={-1}
                                                role="checkbox"
                                            >
                                                <TableCell align="left">{username}</TableCell>
                                                <TableCell align="left">{email}</TableCell>
                                                <TableCell align="left">{`${firstName} ${lastName}`}</TableCell>
                                                <TableCell align="left">
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Input defaultValue={studentId} sx={{ width: 85 }}
                                                            disabled={!isUserEditting(_id!)} onChange={handleOnChangeStudentId(_id!)} />

                                                        {isEditSending(_id!) ? <SpinnerLoading /> : (!isUserEditting(_id!) ?
                                                            (
                                                                <IconButton sx={{ width: '20px', height: '20px' }} onClick={() => handleEditStudentId(_id!)}>
                                                                    <Edit sx={{ width: '16px', height: '16px' }} />
                                                                </IconButton>
                                                            )
                                                            :
                                                            (
                                                                <IconButton sx={{ width: '20px', height: '20px' }} onClick={() => handleSaveStudentId(_id!, studentId || "")}>
                                                                    <SaveIcon sx={{ width: '16px', height: '16px' }} />
                                                                </IconButton>
                                                            ))
                                                        }
                                                    </Stack>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Label
                                                        variant="ghost"
                                                        color={(status !== USER_STATUS.ACTIVATED && 'error') || 'success'}
                                                    >
                                                        {sentenceCase(status!)}
                                                    </Label>
                                                </TableCell>
                                                <TableCell align="left">{new Date(createdAt!).toLocaleString("en")}</TableCell>
                                                <TableCell align="right">
                                                    <UserMoreMenu id={_id!} />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                            {isUserNotFound && (
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" colSpan={12}>
                                            <SearchNotFound searchQuery={filterName} />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>
        </Page >
    );
}
