import React, { useState, useContext} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Form, Row } from "reactstrap";
import StoreContext from "../Store/Context";

function initialState(produto) {
    return {
        nome: produto.nome,
        preco: produto.preco,
    }
}

const EditProduto = (props) => {
    const [values, setValues] = useState(initialState(props.produto));
    const id = props.produto._id;
    const { token } = useContext(StoreContext);

    function onChange(event) {
        const { value, name } = event.target;

        setValues({
            ...values,
            [name]: value
        });
    }

    function onSubmit(event) {
        event.preventDefault();

        fetch('http://localhost:3000/produtos/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(values)
        }).then((response) => {
            response.json().then((data) => {
                if (data.matchedCount === 1) {
                    props.setProdutos((previousState) => {
                        const newState = previousState.map((produto) => {
                            if (produto._id === id) {
                                return {
                                    ...produto,
                                    nome: values.nome,
                                    preco: values.preco
                                }
                            }
                            return produto
                        })
                        return newState
                    })
                    props.handleCloseEdit()
                } else {
                    alert("Erro ao editar produto")
                }
            })
        })
    }

    return (
        <Form onSubmit={onSubmit}>
            <Row className="formularioElementDoubleInput">
                <TextField
                    required
                    id="outlined-required"
                    label="Nome"
                    defaultValue="Nome"
                    name="nome"
                    value={values.nome}
                    onChange={onChange}
                    className="inputFormulario"
                />
            </Row>
            <Row className="formularioElementDoubleInput">
                <TextField
                    required
                    type={"number"}
                    id="outlined-required"
                    label="Preço"
                    defaultValue="Preço"
                    name="preco"
                    value={values.preco}
                    onChange={onChange}
                    className="inputFormulario"
                />
            </Row>
            <Row className="buttonsModal">
                <Button variant="contained" className="modalSubmitButton" onClick={onSubmit}>Editar</Button>
                <Button variant="contained" onClick={props.handleCloseEdit} className="modalCloseButton">Voltar</Button>
            </Row>
        </Form>
    )

}


export default EditProduto;