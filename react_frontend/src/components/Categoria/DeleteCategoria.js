import { Typography } from "@mui/material";
import React from "react";
import { Row } from "reactstrap";
import Button from "@mui/material/Button";
import { useContext } from "react";
import StoreContext from "../Store/Context";

const DeleteCategoria = (props) => {
    const { token } = useContext(StoreContext)

    function onSubmit(event) {
        event.preventDefault();

        fetch('http://localhost:3000/categorias/' + props.categoria._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(props.categoria)
        }).then((response) => {
            if (response.ok) {
                props.setCategorias((previousState) => {
                    const newState = previousState.filter((categoria) => {
                        return categoria._id !== props.categoria._id
                    })
                    return newState
                });
                props.handleCloseDelete();
            } else {
                alert("Erro ao excluir categoria")
            }
        })
    }

    return (
        <>
            <Typography>
                Você deseja excluir a categoria {props.categoria.nome}?
            </Typography>
            <Row className="buttonsModal">
                <Button variant="contained" className="modalSubmitButton" onClick={onSubmit}>Confirmar</Button>
                <Button variant="contained" onClick={props.handleCloseDelete} className="modalCloseButton">Voltar</Button>
            </Row>
        </>
    )
}

export default DeleteCategoria;