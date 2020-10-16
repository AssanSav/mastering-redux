import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import reducer from './reducer';
import logger from './middleware/logger';
import func from "./middleware/func";
import toast from "./middleware/toast";
import api from "./middleware/api"

const store = () => {
  return configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware(),
      // logger,
      // func,
      // toast,
      api
    ]
  })
}

export default store()