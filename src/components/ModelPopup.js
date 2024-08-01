import React, { useState } from 'react';
import { Modal, Box, List, ListItem, ListItemText, ListItemIcon, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import EndConsultationIcon from '../assets/images/scheduled-normal1.jpg';
import EndConsultationIconActive from '../assets/images/scheduled-normal1.jpg';
import RescheduleIcon from '../assets/images/scheduled-normal1.jpg';
import RescheduleIconActive from '../assets/images/scheduled-normal1.jpg';
// Import other icons similarly

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
   
    border: '2px solid #000',
   
    
    width: 400,
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    
  },
}));

const ActionModal = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleOpen}>Open Modal</IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box className={classes.paper}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <img src={EndConsultationIcon} alt="End Consultation" className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary="End Consultation" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <img src={RescheduleIcon} alt="Reschedule" className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary="Reschedule" />
            </ListItem>
            {/* Add other list items similarly */}
          </List>
        </Box>
      </Modal>
    </div>
  );
};

export default ActionModal;
