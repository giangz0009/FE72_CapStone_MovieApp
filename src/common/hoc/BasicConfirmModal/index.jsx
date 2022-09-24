import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";

import "./globalStyles.scss";

function BasicConfirmModal(
  {
    handleClickSubmit,
    isHaveSubmitBtn = true,
    confirmContent = {
      heading: "Thống báo",
      content: "Nội dung",
      cancelBtn: "Hủy",
      submitBtn: "Tiếp tục",
    },
  },
  ref
) {
  // useImperativeHandle
  useImperativeHandle(ref, () => ({
    open() {
      handleClickOpen();
    },
    close() {
      handleClose();
    },
  }));
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    handleClickSubmit();
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} className="basicConfirmModal">
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {confirmContent.heading}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{confirmContent.content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            {confirmContent.cancelBtn}
          </Button>
          <Button
            sx={{ display: isHaveSubmitBtn ? "inline-block" : "none" }}
            onClick={handleSubmit}
          >
            {confirmContent.submitBtn}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default forwardRef(BasicConfirmModal);
