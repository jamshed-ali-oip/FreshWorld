

// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import toast from 'react-hot-toast'

// ** Employee Service Imports
// import { ProjectServices } from 'src/services'
import { exampleService } from '../../../services'



export const QueryAction = createAsyncThunk(
    'example/query',
    async (query, { getState, dispatch }) => {
        dispatch(Slice.actions.handleQuery(query))
        return query;
    }
)

export const fetchOneAction = createAsyncThunk(
    'example/fetchOne',
    async (id) => {
        console.log("response",response)
        const response = await exampleService.getById(id);
        return response.data
    }
)

export const fetchAllAction = createAsyncThunk(
    'example/fetchAll',
    async (params, { getState, dispatch }) => {
        const { query } = params;
     console.log("hiiii")
        const response = await exampleService.getAll(); // { query }
        console.log("ghanta",response)
        return response.data
    }
)

export const addAction = createAsyncThunk(
    'example/add',
    async (data, { getState, dispatch }) => {
        dispatch(Slice.actions.handleStatus('pending'))
        try {
            const response = await exampleService.add(data);
            const query = getState().example.params.query;
            dispatch(fetchAllAction({ query }))
            // toast.success("Added succesfully!")
            console.log("Added succesfully!")
            dispatch(Slice.actions.handleStatus('success'))
            return response.data;
        } catch (error) {
            // toast.error(error.response.data.message || "Something went wrong!")
            dispatch(Slice.actions.handleStatus('error'))
            return error.response.data;
        }
    }
)

export const updateAction = createAsyncThunk(
    'example/update',
    async ({ id, data }, { getState, dispatch }) => {
        dispatch(Slice.actions.handleStatus('pending'))
        try {
            const response = await exampleService.update(id, data);
            const query = getState().entity.params.query;
            dispatch(fetchAllAction({ query }))
            // toast.success("updated succesfully!")
            dispatch(Slice.actions.handleStatus('success'))
            return response.data;
        } catch (error) {
            // toast.error(error.response.data.message || "Something went wrong!")
            dispatch(Slice.actions.handleStatus('error'))
            return error.response.data;
        }
    }
)

export const deleteAction = createAsyncThunk(
    'example/delete',
    async (id, { getState, dispatch }) => {
        dispatch(Slice.actions.handleStatus('pending'))
        try {
            const response = await exampleService.delete(id);
            const query = getState().entity.params.query;
            dispatch(fetchAllAction({ query }))
            // toast.success("deleted succesfully!")
            dispatch(Slice.actions.handleStatus('success'))
            return response.data
        } catch (error) {
            // toast.error(error.response.data.message || "Something went wrong!")
            dispatch(Slice.actions.handleStatus('error'))
            return error.response.data;
        }
    }
)

// @ts-ignore
export const Slice = createSlice({
    name: 'example',
    initialState: {
        entities: [],
        entity: {},
        total: 0,
        params: {},
    } ,
    reducers: {
        handleStatus: (state, action) => {
            state.status = action.payload;
        },
        handleQuery: (state, action) => {
            state.params.query = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchAllAction.fulfilled, (state, action) => {
            const { data } = action.payload;

            state.entities = data.entities || []
            state.total = data.entities?.length || 0
        })
        builder.addCase(fetchOneAction.fulfilled, (state, action) => {
            const { data } = action.payload;
            state.entity = data.entity || {};
        })
    }
})

export default Slice.reducer