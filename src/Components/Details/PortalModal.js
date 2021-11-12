import ReactDOM from "react-dom";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";

const PortalModal = ({ open, handleClose, style, pagina }) => {
  return ReactDOM.createPortal(
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <iframe
            src={`${pagina}`}
            frameborder="0"
            title="página web elegida"
            style={{ width: "inherit", height: "inherit" }}
          ></iframe>
        </Box>
      </Modal>
    </>,
    document.getElementById("modal")
  );
};

export default PortalModal;
