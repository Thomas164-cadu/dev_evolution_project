import React, { useEffect, useState, useContext } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Form, Row, Table } from "reactstrap";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TableCell, Typography } from "@mui/material";
import { TableBody, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import MenuTable from "../Menu/Menu";
import StoreContext from "../Store/Context";

const theme = createTheme({
    palette: {
        primary: {
            main: '#32296a',
        },
        mode: 'light',
    }
});

function initialState() {
    return { nome: '' };
}

export default function Produto() {
    const [categorias, setCategorias] = useState([]);
    const { token } = useContext(StoreContext);

    useEffect(() => {
        fetch('http://localhost:3000/categorias', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((json) => setCategorias(json));
    }, []);

    const CadastroCategoria = () => {
        const [values, setValues] = useState(initialState);

        function onChange(event) {
            const { value, name } = event.target;

            setValues({
                ...values,
                [name]: value
            });
        }

        function onSubmit(event) {
            event.preventDefault();

            fetch('http://localhost:3000/categorias', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                body: JSON.stringify(values)
            }).then((response) => {
                if (response.ok) {
                    setCategorias([...categorias, values])
                } else {
                    alert("Erro ao cadastrar categoria")
                }
            })
        }

        return (
            <ThemeProvider theme={theme}>
                <Row className="formularioSystem">
                    <Row className="titleSystem">
                        <Typography component="h4" variant="h5">
                            Cadastro de Categoria
                        </Typography>
                    </Row>
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
                        <Row className="formularioElement">
                            <Button variant="contained" className="formularioButton" onClick={onSubmit}>Cadastrar</Button>
                        </Row>
                    </Form>
                </Row>
            </ThemeProvider>
        );
    }

    const ListagemCategorias = () => {

        return (
            <ThemeProvider theme={theme}>
                <Row className="controlTable">
                    {categorias ?
                        <TableContainer component={Paper} sx={{ overflowX: "hidden" }}>
                            <Table aria-label="simple table" className="tableSystem">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="headerTable">Nome</TableCell>
                                        <TableCell className="headerTable">Ações</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        categorias.map((categoria) => (
                                            <TableRow
                                                key={categoria.nome}
                                            >
                                                <TableCell>{categoria.nome}</TableCell>
                                                <TableCell><MenuTable props={categoria} origem="categoria" setCategorias={setCategorias} /></TableCell>
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


    return (
        <div className="bodySystem">
            <CadastroCategoria />
            <ListagemCategorias />
        </div>
    );
}