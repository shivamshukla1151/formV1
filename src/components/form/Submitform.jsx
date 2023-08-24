import React, { useState, useEffect } from "react";
import { Button, CloseButton, Container, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Submitform = ({
  showForm,
  setShowForm,
  data,
  setData,
  tableData,
  addToTableData,
  editMode, 
  setEditMode
}) => {
  const [errorData, setErrorData] = useState({
    isError: false,
    errorData: null,
  });

  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const storedData = JSON.parse(localStorage.getItem("tableData") || "[]");
  //   setTableData(storedData);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("tableData", JSON.stringify(tableData));
  // }, [tableData]);

  //handle change
  const handleChange = (event, property) => {
    // console.log(event)
    // console.log(property)
    setData({
      ...data,
      [property]: event.target.value,
    });
  };

  //clear data
  const clearData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      about: "",
      gender: "",
    });

    setErrorData({
      errorData: null,
      isError: false,
    });
  };
  console.log(data);

  //do signup function
  const submitForm = (event) => {
    event.preventDefault();
    // console.log(tableData);
    // //validate client side
    if (data.name === undefined || data.name.trim() === "") {
      toast.error("Name is required !!");
      return;
    }

    if (data.email === undefined || data.email.trim() === "") {
      toast.error("Email is required !!");
      return;
    }

    //basics...

    if (data.password === undefined || data.password.trim() === "") {
      toast.error("Password is required !!");
      return;
    }

    if (
      data.confirmPassword === undefined ||
      data.confirmPassword.trim() === ""
    ) {
      toast.error("Confirm Password is required !!");
      return;
    }

    if (data.password != data.confirmPassword) {
      toast.error("Password and Confirm password not matched !!");
      return;
    }
    setData((prevData) => ({ ...prevData, id: uuidv4() }));
    
    addToTableData(data);
    clearData();
    setShowForm(false);
    // console.log(tableData);
  };
  // setLoading(true);
  return (
    <div className="form w-50 mt-5 p-5 shadow-lg p-3 rounded bg-white position-absolute">
      <span className="">
        <CloseButton onClick={() => setShowForm(false)} />
      </span>
      <h1 className="mb-5 text-center">Detail Form </h1>
      <Form noValidate onSubmit={submitForm} className="h-50">
        {/* name field  */}

        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Enter your name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            onChange={(event) => handleChange(event, "name")}
            value={data.name}
            // isInvalid={errorData.errorData?.response?.data?.name}
          />
          {/* <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.name}</Form.Control.Feedback> */}
        </Form.Group>

        {/* email field      */}
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Enter your email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => handleChange(event, "email")}
            value={data.email}
            // isInvalid={errorData.errorData?.response?.data?.email}
          />

          {/* <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.email}</Form.Control.Feedback> */}
        </Form.Group>

        {/* password field  */}

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Enter new password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            onChange={(event) => handleChange(event, "password")}
            value={data.password}
            // isInvalid={errorData.errorData?.response?.data?.password}
          />

          {/* <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.password}</Form.Control.Feedback> */}
        </Form.Group>

        {/* confim password  */}

        <Form.Group className="mb-3" controlId="formConfigPassword">
          <Form.Label>Re enter password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re Enter password"
            onChange={(event) => handleChange(event, "confirmPassword")}
            value={data.confirmPassword}
          />
        </Form.Group>

        {/* gender radio buttons  */}

        <Form.Group className="mb-3">
          <Form.Label>Select Gender</Form.Label>

          <div>
            <Form.Check
              inline
              name="gender"
              label="Male"
              type={"radio"}
              id={`gender`}
              value={"male"}
              checked={data.gender === "male"}
              onChange={(event) => handleChange(event, "gender")}
            />

            <Form.Check
              inline
              name="gender"
              label="Female"
              type={"radio"}
              id={`gender`}
              value={"female"}
              checked={data.gender === "female"}
              onChange={(event) => handleChange(event, "gender")}
            />
          </div>
        </Form.Group>

        {/* about field  */}

        <Form.Group className="mb-2">
          <Form.Label>Write something about yourself</Form.Label>
          <Form.Control
            as={"textarea"}
            rows="6"
            placeholder="write here"
            onChange={(event) => handleChange(event, "about")}
            value={data.about}
            isInvalid="It is required"
          />
          <Form.Control.Feedback type="invalid">
            "Form control feedbac"
          </Form.Control.Feedback>
        </Form.Group>

        <Container className="text-center">
          <Button
            type="submit"
            className="text-uppercase"
            variant="success"
            disabled={loading}
          >
            <Spinner
              animation="border"
              size="sm"
              className="me-2"
              hidden={!loading}
            />
            <span hidden={!loading}>Wait...</span>
            <span hidden={loading}>Register</span>
          </Button>
          <Button
            className="ms-2 text-uppercase"
            variant="danger"
            onClick={clearData}
          >
            Reset
          </Button>
        </Container>
      </Form>
    </div>
  );
};

export default Submitform;
