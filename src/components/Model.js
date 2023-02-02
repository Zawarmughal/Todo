import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Model(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [edit, setEdit] = useState("");

  const editObj = {
    id: props.id,
    editData: edit,
  };
  function submitHandler(e) {
    e.preventDefault();
    props.updateitem(editObj);
    handleClose();
  }
  return (
    <>
      <Button className="edit-btn" variant="primary" onClick={handleShow}>
        edit
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <form
            id="to-do-form"
            className="text-center"
            onSubmit={submitHandler}
          >
            <input
              type="text"
              placeholder="Enter Text"
              // value={props.value}
              onChange={(e) => setEdit(e.target.value)}
            />
            <button className="white" type="submit">
              <b>Edit</b>
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Model;
