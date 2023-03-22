import { Typography } from '@mui/material';
import React, { useEffect, useState, useContext } from 'react';
import StoreContext from '../Store/Context';
import { FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';
import { Row, Col } from 'reactstrap';

function initialState() {
    return { pedido: [] };
}

const EditPedido = (props) => {
    const [values, setValues] = useState(initialState);
    const [produtos, setProdutos] = useState([]);
    const [user, setUser] = useState();
    const { token } = useContext(StoreContext);

    useEffect(() => {
        fetch('http://localhost:3000/produtos/' + props.pedido.idCategoria, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(response => response.json())
            .then(data => setProdutos(data));

        fetch('http://localhost:3000/usuario', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(response => response.json())
            .then(data => setUser(data));
    }, []);

    function addProduto(event) {
        const { value } = event.target;

        if (values.pedido.includes(value)) {
            const index = values.pedido.indexOf(value);
            values.pedido.splice(index, 1);
            setValues({
                ...values,
                pedido: values.pedido
            });
        } else {
            values.pedido.push(value);
            setValues({
                ...values,
                pedido: values.pedido
            });
        }
    }


    function onSubmit(event) {
        event.preventDefault();
        const pedido = {
            usuario: user._id,
            produtos: values.pedido,
            idCategoria: props.pedido.idCategoria,
            categoria: props.pedido.categoria
        }

        console.log(pedido)

        fetch('http://localhost:3000/pedidos/'+ props.pedido._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(pedido)
        }).then((response) => {
            if (response.ok) {
                props.setPedidos((previousState) => {
                    const newState = previousState.map((pedido) => {
                        if (pedido._id === props.pedido._id) {
                            return {
                                ...pedido,
                                produtos: values.pedido
                            }
                        }
                        return pedido
                    })
                    return newState
                })
                props.handleCloseEdit()
            }else{
                alert('Erro ao fazer pedido!');
            }
        })
    }

    return (
        <>
            <Typography>
                {props.pedido.categoria}
            </Typography>
            <FormGroup >
                {
                    produtos[0] ?
                        produtos.map((produto) => (
                            <FormControlLabel
                                control={<Checkbox value={produto._id} onClick={addProduto} />}
                                label={'R$' + produto.preco + ' - ' + produto.nome}
                            />
                        ))
                        : null
                }
                <Col md='2'>
                    <Button variant="contained" onClick={onSubmit}>Fazer Pedido</Button>
                </Col>
            </FormGroup>
        </>
    )

}

export default EditPedido;