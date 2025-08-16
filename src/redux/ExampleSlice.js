import {createSlice} from "@reduxjs/toolkit"

const InitialState = {
  count: 0,
  arrayOfobjects: [
    {id: 1, name: "jack"},
    {id: 2, name: "olivia"},
  ],
  name: "bibek",
}

const ExampleSlice = createSlice({
  name: "Oggy",
  initialState: InitialState,
  reducers: {
    increment: (state) => {
      state.count += 1
    },
    decrement: (state, action) => {
      state.count -= action.payload
    },
    setName: (state, action) => {
      state.name = action.payload
    },
    addElement: (state, action) => {
      state.arrayOfobjects.push({
        id: action.payload.id,
        name: action.payload.name,
      })
    },
    editElement: (state, action) => {
      const {id, name} = action.payload
      const index = state.arrayOfobjects.findIndex((obj) => obj.id === id)
      if (index !== -1) {
        state.arrayOfobjects[index].name = name
      }
    },
    deleteElement: (state, action) => {
      state.arrayOfobjects = state.arrayOfobjects.filter(
        (obj) => obj.id !== action.payload
      )
    },
  },
})

export const {
  increment,
  decrement,
  setName,
  addElement,
  editElement,
  deleteElement,
} = ExampleSlice.actions
export default ExampleSlice.reducer
