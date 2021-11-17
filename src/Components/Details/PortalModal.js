import { Modal } from "@mui/material";
import { Box } from "@mui/system";

const PortalModal = ({ open, handleClose, style, pagina }) => {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {pagina && (
            <iframe
              src={`${pagina}`}
              frameBorder="0"
              title={"Página / Log"}
              style={{ width: "inherit", height: "inherit" }}
            ></iframe>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default PortalModal;
