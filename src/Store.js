import {configureStore} from "@reduxjs/toolkit"
import ExampleSlice from "./redux/ExampleSlice"

export default configureStore({
  reducer: {poc: ExampleSlice},
})
