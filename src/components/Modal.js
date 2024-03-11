import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styled from "./Modal.module.css"
import Main from '../store/ctx';
import { useNavigate } from "react-router-dom"

export default function BasicModal({ state, message }) {

    const [open, setOpen] = React.useState(state)

    const ctx = React.useContext(Main)

    const navigate = useNavigate()

    const handleLogin = () => {
        setOpen(false)
        ctx.getToken()
            ?
            window.location.replace("/")
            :
            navigate("/login")
    }

    const handleClose = () => {
        window.location.reload()
    }

    return (
        <div className={styled.modal}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
            >
                <Box className={styled.info}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {message}
                    </Typography>
                </Box>
            </Modal>
            <div className={styled.btns}>
                <button onClick={handleLogin}>Log in</button>
                <button onClick={handleClose}>Cancel</button>
            </div>
        </div>
    );
}