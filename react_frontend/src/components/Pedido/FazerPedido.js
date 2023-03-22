import React, { useEffect, useState, useContext } from "react";
import StoreContext from "../Store/Context";
import { FormGroup } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Col, Row } from "reactstrap";
import Button from '@mui/material/Button';

function initialState() {
    return { pedido: [] };
}

export default function FazerPedido(props) {
    const [values, setValues] = useState(initialState);
    const [produtos, setProdutos] = useState();
    const [user, setUser] = useState();
    const { token } = useContext(StoreContext);
    const categoria = props.categoria;

    useEffect(() => {
        fetch('http://localhost:3000/produtos/' + categoria, {
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

    }, [categoria]);

    const addProduto = (event) => {
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

    function onSubmit(e) {
        e.preventDefault();
        const pedido = {
            usuario: user._id,
            produtos: values.pedido,
            idCategoria: categoria,
            categoria: categoria
        }

        fetch('http://localhost:3000/pedidos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(pedido)
        }).then((response) => {
            if (response.ok) {
                alert('Pedido feito com sucesso!');
            }
        })
    }

    return (
        <>
            <FormGroup >
                {
                    produtos ?
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
    );
}