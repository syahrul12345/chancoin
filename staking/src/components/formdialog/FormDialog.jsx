import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {
  const { header,buttonText,label, open,error, stakeDisabled,balance, handleClickOpen, handleClose, stakeHandler,stakeInput } = props

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        {header}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{buttonText}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            error={error}
            helperText={`Stake amount must be smaller than ${parseInt(balance).toLocaleString()} CHAN`}
            defaultValue={0}
            margin="dense"
            id="name"
            label={label}
            type="number"
            fullWidth
            onChange={stakeInput()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant = "contained" color="primary">
            Cancel
          </Button>
          <Button onClick={stakeHandler} disabled={stakeDisabled} variant = "contained" color="primary">
            {buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}