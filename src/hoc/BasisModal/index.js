import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

import thisStyle from "./style.module.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function BasicModal({ costumeStyle, children, isHasCloseBtn = true }, ref) {
  // useState
  const [open, setOpen] = React.useState(false);

  // useImpreativeHandle
  React.useImperativeHandle(ref, () => ({
    open() {
      handleOpen();
    },
  }));

  // Handle Events
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, ...costumeStyle }}>
          {children}
          {isHasCloseBtn && (
            <Button
              className={thisStyle.closeBtn}
              variant="outlined"
              onClick={handleClose}
              startIcon={<CloseIcon />}
            ></Button>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default React.forwardRef(BasicModal);
