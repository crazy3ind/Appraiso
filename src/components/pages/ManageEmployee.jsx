import React, {useState, useEffect, useRef} from "react"
import "../../styles/ManageEmployee.css"
import {useNavigate} from "react-router-dom"
import {DataTable} from "primereact/datatable"
import {Column} from "primereact/column"
import {confirmDialog} from "primereact/confirmdialog"
import {Toast} from "primereact/toast"
import xlIcon from "../../assets/icon/excel.svg"
import AddEmployeeModal from "../modal/AddEmployeeModal"
import {Tooltip} from "primereact/tooltip"

const ManageEmployee = () => {
  const [employees, setEmployees] = useState([])
  const [filteredEmployees, setFilteredEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [globalFilter, setGlobalFilter] = useState("")
  const [visible, setVisible] = useState(false)

  const navigate = useNavigate()
  const toast = useRef(null)

  useEffect(() => {
    setEmployees([
      {
        id: 1,
        name: "Kabita Mahata",
        address: "Jhargram",
        pin: "721101",
        contactNo: "8956458523",
        email: "kabita@gmail.com",
        role: "Developer",
      },
      {
        id: 2,
        name: "Babita Mahata",
        address: "Jhargram",
        pin: "721101",
        contactNo: "8545698545",
        email: "babita@gmail.com",
        role: "Designer",
      },
    ])
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!globalFilter) {
      setFilteredEmployees(employees)
    } else {
      const filter = globalFilter.toLowerCase()
      setFilteredEmployees(
        employees.filter((emp) =>
          Object.values(emp).join(" ").toLowerCase().includes(filter)
        )
      )
    }
  }, [globalFilter, employees])

  const handleDelete = (employee) => {
    confirmDialog({
      message: "Are you sure you want to delete this employee?",
      header: "Confirm Deletion",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        setEmployees(employees.filter((emp) => emp.id !== employee.id))
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Employee deleted successfully",
          life: 3000,
        })
      },
    })
  }

  const handleImport = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Imported successfully",
      life: 3000,
    })
  }

  const columns = [
    {field: "name", header: "Name", sorting: true},
    {field: "email", header: "Email", sorting: true},
    {field: "role", header: "Role", sorting: true},
    {field: "address", header: "Address", sorting: true},
    {field: "contactNo", header: "Contact No", sorting: true},
    {field: "pin", header: "PIN", sorting: true},
    {
      header: "Action",
      style: {width: "120px"},
      headerClassName: "bg-gray-100 font-semibold text-sm",
      bodyClassName: "text-sm",
      body: (rowData) => (
        <div className="flex gap-2">
          <i
            id="editIcon"
            className="pi pi-pencil cursor-pointer"
            onClick={() => navigate(`/employees/edit/${rowData.id}`)}
            style={{fontSize: "1rem", color: "#569cb4"}}
          />
          <Tooltip target="#editIcon" content="Delete" position="right" />
          <i
            id="deleteIcon"
            className="pi pi-trash cursor-pointer"
            onClick={() => handleDelete(rowData)}
            style={{fontSize: "1rem", color: "#569cb4"}}
          />
          <Tooltip target="#deleteIcon" content="Delete" position="right" />
        </div>
      ),
    },
  ]

  const closeEmpModal = () => {
    setVisible(false)
  }

  return (
    <div className="surface-ground min-h-screen p-4">
      <Toast ref={toast} position="top-center" />

      <div className="flex flex-col">
        <div className="text-black text-lg font-bold mb-4">
          Manage Employee
          <span>
            <i
              id="refreshIcon"
              className="pi pi-sync pl-3 cursor-pointer"
              style={{fontSize: "1.1rem", color: "#569cb4"}}
            />
            <Tooltip target="#refreshIcon" content="Refresh" position="right" />
          </span>
        </div>

        <div className="flex justify-end items-center gap-2 mb-2">
          <i
            id="addEmpIcon"
            className="pi pi-plus cursor-pointer mr-3"
            onClick={() => setVisible(true)}
            style={{fontSize: "1.5rem", color: "#569cb4"}}
          />
          <Tooltip
            target="#addEmpIcon"
            content="Add Employee"
            position="left"
          />
          <div id="exportXl" className="flex w-7 h-7 mr-2 cursor-pointer">
            <img src={xlIcon} />
          </div>
          <Tooltip
            target="#exportXl"
            content="Export to Excel"
            position="left"
          />
        </div>

        <DataTable
          value={filteredEmployees}
          first={0}
          rows={10}
          scrollable
          scrollHeight="440px"
          paginator
          rowsPerPageOptions={[10, 20, 30]}
          tableStyle={{minWidth: "50rem"}}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          loading={loading}
          emptyMessage="No results found."
          columnResizeMode="expand"
          resizableColumns
          showGridlines
          className="p-datatable-gridlines"
        >
          {columns.map((col, i) => (
            <Column
              key={i}
              field={col.field}
              header={col.header}
              body={col.body}
              sortable={col.sorting}
            />
          ))}
        </DataTable>
      </div>
      <AddEmployeeModal isOpen={visible} onClose={closeEmpModal} />
    </div>
  )
}

export default ManageEmployee
