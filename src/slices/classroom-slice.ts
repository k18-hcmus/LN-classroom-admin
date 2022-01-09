import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as classroomApi from '../services/classroom';
import { ERROR_MESSAGE, NO_MESSAGE } from "../shared/messages";
import { copyToClipboard } from "../utils/function";
import { createAlert } from "./alert-slice";
import { User } from "./user-slice";

export interface GradeStructureDetail {
    _id?: string,
    title: string,
    description?: string,
    point: number,
    isFinalized?: boolean
}
export interface GradeStructure {
    _id?: string,
    gradeStructuresDetails?: GradeStructureDetail[]
}

export enum Role {
    OWNER = 'owner',
    STUDENT = 'student',
    TEACHER = 'teacher',
}
export interface Classroom {
    _id?: string,
    name: string,
    owner: User,
    schoolYear: string,
    teachers?: User[],
    students?: User[],
    classCode?: string,
    gradeStructure?: GradeStructure
    description?: string,
    createdAt?: Date,
};

interface ClassroomState {
    enrolledClassrooms: Classroom[],
    teachingClassrooms: Classroom[],
    searchResult: Classroom[],
    isLoading: boolean
}

const initialState: ClassroomState = {
    enrolledClassrooms: [],
    teachingClassrooms: [],
    searchResult: [],
    isLoading: false
};


const updateClassroomById = (classId: string, state: ClassroomState, newClassroom: Classroom) => {
    const enrollIndex = state.enrolledClassrooms.findIndex(classroom => classroom._id === classId)
    if (enrollIndex >= 0)
        state.enrolledClassrooms[enrollIndex] = newClassroom
    const teachingIndex = state.teachingClassrooms.findIndex(classroom => classroom._id === classId)
    if (teachingIndex >= 0)
        state.teachingClassrooms[teachingIndex] = newClassroom
}

export const getAllClassroom = createAsyncThunk(
    'classrooms/getAllClassroom',
    async (_, thunkApi) => {
        try {
            const response = await classroomApi.getAllClassroom()
            return response.data
        } catch (err) {
            return thunkApi.rejectWithValue(err)
        }
    }
)

export const createClassroom = createAsyncThunk(
    'classrooms/createClassroom',
    async (info: Classroom | any, thunkApi) => {
        try {
            const response = await classroomApi.createClassroom({
                name: info.name,
                schoolYear: info.schoolYear,
                owner: info.owner,
                description: info.description,
            })
            thunkApi.dispatch(createAlert({
                message: `Created class ${info.name} successfully!`,
                severity: 'success'
            }))
            thunkApi.dispatch(getAllClassroom())
            return response.data
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const statusCode = err.response?.status || NO_MESSAGE
                const statusText = err.response?.statusText || NO_MESSAGE
                const message = `Error: ${statusCode} ${statusText}` || ERROR_MESSAGE
                thunkApi.dispatch(createAlert({
                    message,
                    severity: 'error'
                }))
            }
            return thunkApi.rejectWithValue(err)
        }
    }
)

export const copyInviteLink = createAsyncThunk(
    'classrooms/copyInviteLink',
    async (payload: { classId: string | undefined, isStudent: boolean }, thunkApi) => {
        try {
            const response = await classroomApi.getInviteLink(payload.classId, payload.isStudent)
            await copyToClipboard(response.data || "")
            thunkApi.dispatch(createAlert({
                message: "Copy class invite link successfully!",
                severity: "success"
            }))
            return response.data
        } catch (err) {
            thunkApi.dispatch(createAlert({
                message: "There're errors when trying to copy invite link!",
                severity: "error"
            }))
            return thunkApi.rejectWithValue(err)
        }
    }
)

export const joinClassroomByClassCode = createAsyncThunk(
    'classrooms/joinClassroomByClassCode',
    async (classCode: string, thunkApi) => {
        try {
            const response = await classroomApi.joinClassroomByClassCode(classCode)
            thunkApi.dispatch(createAlert({
                message: `Join class ${response.data.name} successfully!`,
                severity: 'success'
            }))
            thunkApi.dispatch(getAllClassroom())
            return response.data
        } catch (err) {
            thunkApi.dispatch(createAlert({
                message: `Cannot join classroom using ${classCode}`,
                severity: 'error'
            }))
            return thunkApi.rejectWithValue(err)
        }
    }
)

export const resetClassCode = createAsyncThunk(
    'classrooms/resetClassCode',
    async (classId: string | undefined, thunkApi) => {
        try {
            const response = await classroomApi.resetClassCode(classId)
            thunkApi.dispatch(createAlert({
                message: "Reset class code successfully!",
                severity: "success"
            }))
            return response.data
        } catch (err) {
            thunkApi.dispatch(createAlert({
                message: "There're errors when trying to reset class code!",
                severity: "error"
            }))
            return thunkApi.rejectWithValue(err)
        }
    }
)

export const getClassroom = createAsyncThunk(
    'classrooms/getClassroom',
    async (classId: string | undefined, thunkApi) => {
        try {
            const response = await classroomApi.getClassroom(classId!)
            return response.data
        } catch (err) {
            return thunkApi.rejectWithValue(err)
        }
    }
)


const classroomSlice = createSlice({
    name: 'Classroom',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAllClassroom.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getAllClassroom.fulfilled, (state, action) => {
            state.enrolledClassrooms = action.payload.enrolledClassrooms
            state.teachingClassrooms = action.payload.teachingClassrooms
            state.isLoading = false
        });
        builder.addCase(getAllClassroom.rejected, (state) => {
            state.isLoading = false
        });
        builder.addCase(getClassroom.fulfilled, (state, action) => {
            const classroom = action.payload as Classroom
            updateClassroomById(classroom._id!, state, classroom)

        });
        // builder.addCase(createClassroom.fulfilled, (state, action) => {
        //     state.teachingClassrooms.push(action.payload)
        // });
        // builder.addCase(joinClassroomByClassCode.fulfilled, (state, action) => {
        //     state.enrolledClassrooms.push(action.payload)
        // });
        builder.addCase(resetClassCode.fulfilled, (state, action) => {
            const result = action.payload
            const index = state.teachingClassrooms.findIndex(classroom => classroom._id === result._id)
            if (index >= 0) {
                state.teachingClassrooms[index] = { ...state.teachingClassrooms[index], classCode: result.classCode }
            }
        });
    }
})

export default classroomSlice.reducer;