import React, { useContext, useEffect, useState } from 'react';
import StoreContext from "../Store/Context";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Row } from 'reactstrap';
import MenuTable from '../Menu/Menu';

const theme = createTheme({
    palette: {
        primary: {
            main: '#32296a',
        },
        mode: 'light',
    }
});

const ListagemPedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const { token } = useContext(StoreContext);

    useEffect(() => {
        fetch('http://localhost:3000/usuario', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(response => response.json())
            .then(data => {
                fetch('http://localhost:3000/pedidos/' + data._id, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }).then(response => response.json())
                    .then(data => setPedidos(data))
            });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Row className="controlTable">
                {pedidos ?
                    <TableContainer component={Paper} sx={{ overflowX: "hidden" }}>
                        <Table aria-label="simple table" className="tableSystem">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="headerTable">Número do pedido</TableCell>
                                    <TableCell className="headerTable">Valor</TableCell>
                                    <TableCell className="headerTable">Categoria</TableCell>
                                    <TableCell className="headerTable">Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    pedidos.map((pedido, index) => (
                                        <TableRow
                                            key={pedido._id}
                                        >
                                            <TableCell>{index}</TableCell>
                                            <TableCell>{pedido.valor}</TableCell>
                                            <TableCell>{pedido.categoria}</TableCell>
                                            <TableCell><MenuTable props={pedido} origem="pedidos" setPedidos={setPedidos} /></TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                    : null
                }

            </Row>
        </ThemeProvider>
    );
}

export default function Produto() {
    return (
        <div className="bodySystem">
            <ListagemPedidos />
        </div>
    );
}