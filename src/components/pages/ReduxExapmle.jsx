import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  decrement,
  increment,
  setName,
  addElement,
  editElement,
  deleteElement,
} from "../../redux/ExampleSlice"

function ReduxExapmle() {
  const data = useSelector((state) => state.poc)
  const dispatch = useDispatch()
  const [Id, setid] = useState("")
  const [Name, setname] = useState("")
  const [editId, setEditId] = useState(null)

  const addOrEditName = () => {
    if (editId !== null) {
      dispatch(editElement({ id: Number(Id), name: Name }))
      setEditId(null)
    } else {
      dispatch(addElement({ id: Number(Id), name: Name }))
    }
    setid("")
    setname("")
  }

  const handleEdit = (obj) => {
    setEditId(obj.id)
    setid(obj.id)
    setname(obj.name)
  }

  const handleDelete = (id) => {
    dispatch(deleteElement(id))
    if (editId === id) {
      setEditId(null)
      setid("")
      setname("")
    }
  }

  return (
    <div className="flex flex-col p-4 gap-4">
      <p>Name: {data.name}</p>
      <p>Count: {data.count}</p>
      <div className="flex gap-2">
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => dispatch(increment())}
        >
          increment
        </button>
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => dispatch(decrement(1))}
        >
          decrement
        </button>
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => dispatch(setName("Santu Paul"))}
        >
          Update name
        </button>
      </div>

      <table className="min-w-full border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">Id</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.arrayOfobjects.map((dataobj) => (
            <tr key={dataobj.id} className="text-center">
              <td className="border px-4 py-2">{dataobj.id}</td>
              <td className="border px-4 py-2">{dataobj.name}</td>
              <td className="border px-4 py-2 flex gap-2 justify-center">
                <button
                  className="bg-yellow-400 text-white px-2 py-1 rounded"
                  onClick={() => handleEdit(dataobj)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(dataobj.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-2 mt-4">
        <input
          type="number"
          placeholder="Enter Id"
          value={Id}
          onChange={(e) => setid(e.target.value)}
          className="border px-2 py-1 rounded"
          disabled={editId !== null}
        />
        <input
          type="text"
          placeholder="Enter Name"
          value={Name}
          onChange={(e) => setname(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <button
          onClick={addOrEditName}
          className="bg-green-500 text-white px-4 py-1 rounded"
        >
          {editId !== null ? "Update" : "Add"}
        </button>
        {editId !== null && (
          <button
            onClick={() => {
              setEditId(null)
              setid("")
              setname("")
            }}
            className="bg-gray-400 text-white px-4 py-1 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  )
}

export default ReduxExapmle
