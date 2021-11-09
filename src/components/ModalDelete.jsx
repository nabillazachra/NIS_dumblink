import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function ModalDelete(props) {
  return (
    <>
      <Modal {...props}>
        <Modal.Body className="text-success">
          Are you sure want to remove this data?
        </Modal.Body>
        <div className="text-end m-2">
          <Button
            size="sm"
            className="me-2 w-25"
            variant="danger"
            onClick={() => props.deleteData(props.dataId)}
          >
            Yes
          </Button>
          <Button
            size="sm"
            className="me-2 w-25"
            variant="secondary"
            onClick={props.handleClose}
          >
            No
          </Button>
        </div>
      </Modal>
    </>
  );
}
