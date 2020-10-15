import store from './store/configureStore';
import { bugAdded, bugResolved, bugRemoved, getUnresolvedBugs, bugAssignedToUser, getBugsByUser } from './store/bugs';
import { projectAdded } from './store/projects'
import { userAdded } from "./store/users"


const unsubscribe = () => store.subscribe(() => console.log("Store has changed", store.getState()))
unsubscribe()


store.dispatch(userAdded({ name: "User 1" }))
store.dispatch(userAdded({ name: "User 2" }))

store.dispatch(projectAdded({ name: "Project 1" }))

store.dispatch(bugAdded({ description: "Bug 1" }))
store.dispatch(bugAdded({ description: "Bug 2" }))
store.dispatch(bugAdded({ description: "Bug 3" }))
store.dispatch(bugResolved({ id: 1 }))
store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }))
// store.dispatch(bugRemoved({id: 2}))


const userBugs = getBugsByUser(2)(store.getState())

const unresolvedBugs = getUnresolvedBugs(store.getState())

console.log("User bugs", userBugs)
console.log("Unresolved bugs", unresolvedBugs)