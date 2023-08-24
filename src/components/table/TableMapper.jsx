import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { BiTrashAlt, BiEdit } from "react-icons/bi";
const TableMapper = ({
  showForm,
  setShowForm,
  data,
  setData,
  tableData,
  addToTableData,
  setTableData,
  editMode,
  setEditMode,
}) => {
  const [mode, setMode] = useState("dark");

  function editHandler(id) {
    console.log(id);
    let oldData = tableData.find((data) => data.id === id);
    setData(oldData);
    setEditMode(true)

    setShowForm(true);
  }

  function deleteHandler(id) {
    console.log(id);
    setTableData(tableData.filter((data) => data.id !== id));
  }

  return (
    <div className="d-flex justify-content-center align-items-center flex-column mt-5">
      {/* Start color bar section to select the mode color for table. */}
      <div
        className="color-bar d-flex justify-content-between align-items-center w-100 mb-2"
        style={{ cursor: "pointer" }}
      >
        <span>
          <button
            className="btn btn-secondary"
            onClick={() => setShowForm(true)}
          >
            Create
          </button>
        </span>
        <span className="d-flex justify-content-center align-items-center">
          <h6 className="text-secondary mx-2 my-1">Mode: </h6>

          <div
            className="dark bg-dark rounded-circle"
            style={{ width: "20px", height: "20px" }}
            onClick={() => setMode("dark")}
          ></div>
          <div
            className="light bg-light border rounded-circle mx-2"
            style={{
              width: "20px",
              height: "20px",
            }}
            onClick={() => setMode("light")}
          ></div>
        </span>
      </div>
      {/* End color bar section to select the mode color for table. */}

      {/* Start mapping the data into the table */}
      {tableData.length === 0 ? (
        <div>
          <h1 className="text-secondary bg-body-secondary justify-content-center w-100 text-center mt-lg-5">
            No data to show.
          </h1>
        </div>
      ) : (
        <Table
          striped
          bordered
          hover
          variant={mode === "dark" ? "dark" : "light"}
          className="text-center table-sm"
        >
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Username</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, key) => (
              <tr key={item.id} className="text-center">
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.about}</td>
                <td>{item.email}</td>
                <td className="d-flex justify-content-around align-items-center">
                  <span>
                    <BiEdit onClick={() => editHandler(item.id)} />
                  </span>
                  <span>
                    <BiTrashAlt onClick={() => deleteHandler(item.id)} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default TableMapper;
