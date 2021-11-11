import React from "react";
import Button from "@restart/ui/esm/Button";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../actions/productActions";

const DeleteModal = ({ showDelete, handleCloseDelete, productId, userId }) => {
  const dispatch = useDispatch();

  const deleteAction = () => {
    dispatch(deleteProduct(productId));
    handleCloseDelete();
  };

  return (
    <>
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure to delete the product?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="button" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button className="button" onClick={deleteAction}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
