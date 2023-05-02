import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchMovies = createAsyncThunk('movies/fetch', async () => {
    const { data } = await axios.get('/api/movies')
    return data
})

const movieSlice = createSlice({
    name: 'movies',
    initialState: [],
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            return action.payload
        })
    },
})

export default movieSlice.reducer
