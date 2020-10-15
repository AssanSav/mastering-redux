// // import reducer from '../reducer';
// // import { createStore } from 're';
// // import { createStore } from 're';


// function createStore(reducer) {
//     let state;
//     let listenners = []

//     function subscribe(listenner) {
//         listenners.push(listenner)
//     }

//     function dispatch(action) {
//         state = reducer(state, action)

//         for(let i = 0; i < listenners.length; i++){
//             listenners[i]()
//         }
//     }

//     function getState() {
//         return state
//     }

//     return {
//         getState,
//         dispatch,
//         subscribe
//     }
// }

// export default createStore