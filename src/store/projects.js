import { createSlice } from '@reduxjs/toolkit';


let projectId = 0

const slice = createSlice({
    name: "projects",
    initialState: [],

    reducers: {
        projectAdded: (projects, action) => {
            // action => action.handler
            projects.push({
                id: ++projectId,
                name: action.payload.name
            })
        }
    }
})


export const {projectAdded} = slice.actions
export default slice.reducer
