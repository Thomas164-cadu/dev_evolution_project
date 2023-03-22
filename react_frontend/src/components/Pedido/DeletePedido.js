import { Typography } from "@mui/material";
import React from "react";
import { Row } from "reactstrap";
import Button from "@mui/material/Button";
import { useContext } from "react";
import StoreContext from "../Store/Context";

const DeletePedido = (props) => {
    const { token } = useContext(StoreContext)

    function onSubmit(event) {
        event.preventDefault();

        fetch('http://localhost:3000/pedidos/' + props.pedido._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
        }).then((response) => {
            if (response.ok) {
                props.setPedidos((previousState) => {
                    const newState = previousState.filter((pedido) => {
                        return pedido._id !== props.pedido._id
                    })
                    return newState
                });
                props.handleCloseDelete();
            } else {
                alert("Erro ao excluir pedido")
            }
        })
    }

    return (
        <>
            <Typography>
                Você deseja excluir o pedido no valor de R${props.pedido.valor} na categoria {props.pedido.categoria}?
            </Typography>
            <Row className="buttonsModal">
                <Button variant="contained" className="modalSubmitButton" onClick={onSubmit}>Confirmar</Button>
                <Button variant="contained" onClick={props.handleCloseDelete} className="modalCloseButton">Voltar</Button>
            </Row>
        </>
    )
}

export default DeletePedido;