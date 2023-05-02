import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchSingleMovie = createAsyncThunk(
    'singleMovie/fetch',
    async (id) => {
        try {
            const { data } = await axios.get(`/api/movies/${id}`)
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

const singleMovieSlice = createSlice({
    name: 'singleMovie',
    initialState: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSingleMovie.fulfilled, (state, action) => {
            return action.payload
        })
    },
})

export default singleMovieSlice.reducer
