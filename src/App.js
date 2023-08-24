import { useState } from "react";
import "./App.css";
import Submitform from "./components/form/Submitform";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableMapper from "./components/table/TableMapper";
import { v4 as uuidv4 } from "uuid";
import { tab } from "@testing-library/user-event/dist/tab";
function App() {
  const [showForm, setShowForm] = useState(true);
  let [data, setData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    password: "dummyPassword123",
    confirmPassword: "dummyPassword123",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    gender: "male",
  });
  const [tableData, setTableData] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const addToTableData = (newData) => {
    if (editMode) {
      for (let i = 0; i < tableData.length; i++) {
        if (tableData[i].id === newData.id) {
          tableData[i].email = newData.email;
          tableData[i].password = newData.password;
          tableData[i].about = newData.about;
          tableData[i].gender = newData.gender;
        }
      }
      setEditMode(false);
    }
    // Generate a new UUID for the object
    const newObjectWithId = { ...newData, id: uuidv4() };

    // Update the tableData state
    setTableData((prevTableData) => [...prevTableData, newObjectWithId]);
  };
  return (
    <div className="App d-flex justify-content-center align-items-center">
      <ToastContainer />

      {showForm && (
        <Submitform
          showForm={showForm}
          setShowForm={setShowForm}
          setData={setData}
          data={data}
          addToTableData={addToTableData}
          tableData={tableData}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      )}
      <TableMapper
        showForm={showForm}
        setShowForm={setShowForm}
        setData={setData}
        data={data}
        addToTableData={addToTableData}
        tableData={tableData}
        setTableData={setTableData}
        editMode={editMode}
        setEditMode={setEditMode}
      />
    </div>
  );
}

export default App;
