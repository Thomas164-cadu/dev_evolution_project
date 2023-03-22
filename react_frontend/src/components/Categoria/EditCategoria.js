import React, { useState, useContext} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Form, Row } from "reactstrap";
import StoreContext from "../Store/Context";

function initialState(categoria) {
    return {
        nome: categoria.nome
    }
}

const EditCategoria = (props) => {
    const [values, setValues] = useState(initialState(props.categoria));
    const id = props.categoria._id;
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

        fetch('http://localhost:3000/categorias' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(values)
        }).then((response) => {
            props.setCategorias((previousState) => {
                const newState = previousState.map((categoria) => {
                    if (categoria._id === id) {
                        return {
                            ...categoria,
                            nome: values.nome,
                        }
                    }
                    return categoria
                })
                return newState
            })
            props.handleCloseEdit();
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
            <Row className="buttonsModal">
                <Button variant="contained" className="modalSubmitButton" onClick={onSubmit}>Editar</Button>
                <Button variant="contained" onClick={props.handleCloseEdit} className="modalCloseButton">Voltar</Button>
            </Row>
        </Form>
    )

}


export default EditCategoria;