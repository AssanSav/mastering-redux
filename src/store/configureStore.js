import { configureStore } from "@reduxjs/toolkit"
import reducer from './reducer';


const store = () => {
    return configureStore({ reducer })
}

export default store()