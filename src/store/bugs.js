import moment from "moment"
import { createAction, createReducer, createSlice } from "@reduxjs/toolkit"
import { createSelector } from "reselect"
import { apiCallBegan } from './api';


// Reducers

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null
  },

  reducers: {
    bugsRequested: (bugs, action) => {
      bugs.loading = true
    },

    bugsRequestFailled: (bugs, action) => {
      bugs.loading = false
    },

    bugsReceived: (bugs, action) => {
      bugs.list = action.payload,
        bugs.loading = false,
        bugs.lastFetch = Date.now()
    },

    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload)
    },

    bugResolved: (bugs, action) => {
      let bug = bugs.list.find(bug => bug.id === action.payload.id)
      bug.resolved = true
    },

    bugRemoved: (bugs, action) => {
      bugs.list.filter(bug => bug.id !== action.payload.id)
    },

    bugAssignedToUser: (bugs, action) => {
      const { id: bugId, userId } = action.payload
      let index = bugs.list.findIndex(bug => bug.id === bugId)
      bugs.list[index].userId = userId
    }
  },

})


const { bugAssignedToUser, bugAdded, bugResolved, bugRemoved, bugsRequested, bugsRequestFailled, bugsReceived } = slice.actions
export default slice.reducer


// Action creators
const url = "/bugs"

export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes")
  if (diffInMinutes < 10) return;
  dispatch(apiCallBegan({
    url,
    onStart: bugsRequested.type,
    onSuccess: bugsReceived.type,
    onError: bugsRequestFailled.type,
  }))
}

export const addBug = (bug) => apiCallBegan({
  url,
  method: "post",
  data: bug,
  onSuccess: bugAdded.type
})

export const assignBugToUser = (bug, user) => apiCallBegan({
  url: `${url}/${bug.id}`,
  method: "patch",
  data: {id: bug.id, userId: user.id},
  onSuccess: bugAssignedToUser.type
})

export const resolveBug = id => apiCallBegan({
  url: `${url}/${id}`,
  method: "patch",
  data: { resolved: true },
  onSuccess: bugResolved.type
})


// Memorization
export const getUnresolvedBugs = createSelector(
  state => state.entities.bugs,
  state => state.entities.projects,
  (bugs, projects) => bugs.filter(bug => !bug.resolved)
)

export const getBugsByUser = userId => createSelector(
  state => state.entities.bugs,
  bugs => bugs.filter(bug => bug.userId === userId)
)

// Selector
// export const getUnresolvedBugs = (state) => state.entities.bugs.filter(bug => !bug.resolved)



// export default createReducer([], {

//   [bugAdded.type]: (bugs, action) => {
//     bugs.push({
//       id: bugId++,
//       description: action.payload.description,
//       resolved: false
//     })
//   },

//   [bugResolved.type]: (bugs, action) => {
//     let bug = bugs.find(bug => bug.id === action.payload.id)
//     bug.resolved = true
//   },

//   [bugRemoved.type]: (bugs, action) => {
//     bugs.filter(bug => bug.id !== action.payload.id)
//   }

// })

// export default function reducer(state = [], action) {
//   switch (action.type) {
//     case bugAdded.type: {
//       return [
//         ...state,
//         {
//           id: bugId++,
//           description: action.payload.description,
//           resolved: false
//         },
//       ]
//     }
//     case bugRemoved.type: {
//       return state.filter(bug => bug.id !== action.payload.id)
//     }
//     case bugResolved.type: {
//       return state.map(bug => bug.id !== action.payload.id ? bug : { ...bug, resolved: true })
//     }
//     default:
//       return state
//   }
// }
// let bugId = 1

// export default function reducer(state = [], action) {
//     switch (action.type) {
//         case actions.BUG_ADDED: {
//             return [
//                 ...state,
//                 {
//                     id: bugId++,
//                     description: action.payload.description,
//                     resolved: false
//                 },
//             ]
//         }
//         case actions.BUG_REMOVED: {
//             return state.filter(bug => bug.id !== action.payload.id)
//         }
//         case actions.BUG_RESOLVED: {
//             return state.map(bug => bug.id !== action.payload.id ? bug : { ...bug, resolved: true })
//         }
//         default:
//             return state
//     }
// }

// Actions
// export const BUG_ADDED = "bugAdded"
// export const BUG_REMOVED = "bugRemoved"
// export const BUG_RESOLVED = "bugResolved"


// // Actions creators 
// export const bugAdded = createAction("bugAdded")
// export const bugResolved = createAction("bugResolved")
// export const bugRemoved = createAction("bugRemoved")
// export const bugAdded = (description) => ({
//     type: BUG_ADDED,
//     payload: {
//         description
//     }
// })

// export const bugResolved = (id) => ({
//     type: BUG_RESOLVED,
//     payload: {
//         id
//     }
// })

// export const bugRemoved = (id) => ({
//     type: BUG_REMOVED,
//     payload: {
//         id
//     }
// })

