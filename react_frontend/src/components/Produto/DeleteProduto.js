import { Typography } from "@mui/material";
import React, { useContext } from "react";
import { Row } from "reactstrap";
import Button from '@mui/material/Button';
import StoreContext from "../Store/Context";

const DeleteProduto = (props) => {
    const { token } = useContext(StoreContext);

    function onSubmit(event) {
        event.preventDefault();

        fetch('http://localhost:3000/produtos/' + props.produto._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(props.produto)
        }).then((response) => {
            if (response.ok) {
                props.setProdutos((previousState) => {
                    const newState = previousState.filter((produto) => {
                        return produto._id !== props.produto._id
                    })
                    return newState
                });
                props.handleCloseDelete();
            }else{
                alert("Erro ao excluir produto")
            }
        })
    }

    return (
        <>
            <Typography>
                Você deseja excluir o produto {props.produto.nome}?
            </Typography>
            <Row className="buttonsModal">
                <Button variant="contained" className="modalSubmitButton" onClick={onSubmit}>Confirmar</Button>
                <Button variant="contained" onClick={props.handleCloseDelete} className="modalCloseButton">Voltar</Button>
            </Row>
        </>
    )
}

export default DeleteProduto;