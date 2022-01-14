import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as classroomApi from '../services/classroom';
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
    classrooms: Classroom[],
    searchResult: Classroom[],
    isLoading: boolean
}

const initialState: ClassroomState = {
    classrooms: [],
    searchResult: [],
    isLoading: false
};

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
        builder.addCase(getAllClassroom.fulfilled, (state, action) => {
            state.classrooms = action.payload
            state.isLoading = false
        });
    }
})

export default classroomSlice.reducer;