import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import EditCategoria from '../Categoria/EditCategoria';
import EditProduto from '../Produto/EditProduto';
import EditPedido from '../Pedido/EditPedido';
import DeleteCategoria from '../Categoria/DeleteCategoria';
import DeleteProduto from '../Produto/DeleteProduto';
import DeletePedido from '../Pedido/DeletePedido';

export default function MenuTable(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openModalEdit, setOpenModalEdit] = React.useState(false);
    const [openModalDelete, setOpenModalDelete] = React.useState(false);
    const open = Boolean(anchorEl);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
    };

    const handleOpenEdit = () => setOpenModalEdit(true);
    const handleCloseEdit = () => setOpenModalEdit(false);

    const handleOpenDelete = () => setOpenModalDelete(true);
    const handleCloseDelete = () => setOpenModalDelete(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const ModalEdit = () => {
        return (
            <Modal
                open={openModalEdit}
                onClose={handleCloseEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {
                        props.origem === "categoria" ?
                            <EditCategoria categoria={props.props} handleCloseEdit={handleCloseEdit} setCategorias={props.setCategorias} />
                            : props.origem === "produto" ?
                                <EditProduto produto={props.props} handleCloseEdit={handleCloseEdit} setProdutos={props.setProdutos} />
                                : props.origem === "pedidos" ?
                                    <EditPedido pedido={props.props} handleCloseEdit={handleCloseEdit} setPedidos={props.setPedidos} />
                                    : null
                    }

                </Box>
            </Modal>
        )
    };

    const ModalDelete = () => {
        return (
            <Modal
                open={openModalDelete}
                onClose={handleCloseDelete}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {props.origem === "categoria" ?
                        <DeleteCategoria categoria={props.props} handleCloseDelete={handleCloseDelete} setCategorias={props.setCategorias} />
                        : props.origem === "produto" ?
                            <DeleteProduto produto={props.props} handleCloseDelete={handleCloseDelete} setProdutos={props.setProdutos} />
                            : props.origem === "pedidos" ?
                                <DeletePedido pedido={props.props} handleCloseDelete={handleCloseDelete} setPedidos={props.setPedidos} />
                                : null
                    }
                </Box>
            </Modal>
        )
    }


    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleOpenEdit}>Editar</MenuItem>
                <MenuItem onClick={handleOpenDelete}>Excluir</MenuItem>
            </Menu>
            <ModalEdit />
            <ModalDelete />
        </div>
    );
}