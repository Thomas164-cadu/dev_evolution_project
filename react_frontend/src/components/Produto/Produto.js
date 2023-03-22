import React, { useEffect, useState, useContext } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Form, Row, Table } from "reactstrap";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TableCell, Typography } from "@mui/material";
import { TableBody, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import Select from "../Categoria/Select";
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
    return { nome: '', preco: '', categoria: '' };
}

export default function Produto() {
    const [produtos, setProdutos] = useState([]);
    const { token } = useContext(StoreContext);

    useEffect(() => {
        fetch('http://localhost:3000/produtos', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((json) => setProdutos(json));
    }, []);

    const CadastroProduto = () => {
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

            fetch('http://localhost:3000/produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                body: JSON.stringify(values)
            }).then((response) => {
                if (response.ok) {
                    setProdutos([...produtos, values])
                } else {
                    alert("Erro ao cadastrar produto")
                }
            })
        }

        function produtosGenerate() {
            fetch('http://localhost:3000/generate', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            }).then((response) => {
                if (response.ok) {
                    alert("Produtos gerados com sucesso");
                    window.location.reload();
                } else {
                    alert("Erro ao gerar produtos")
                }
            })
        }

        return (
            <ThemeProvider theme={theme}>
                <Row className="formularioSystem">
                    <Row className="titleSystem">
                        <Typography component="h4" variant="h5">
                            Cadastro de Produto
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
                        <Row className="formularioElement">
                            <Select
                                name="categoria"
                                value={values.categoria}
                                onChange={onChange}
                            />
                        </Row>
                        <Row className="formularioElement">
                            <Button variant="contained" className="formularioButton" onClick={onSubmit}>Cadastrar</Button>
                        </Row>
                    </Form>
                </Row>
                {produtos[0] ? null :
                    <Row className="formularioElement">
                        <Button variant="contained" onClick={produtosGenerate}>Gerar Produtos</Button>
                    </Row>
                }
            </ThemeProvider>
        );
    }

    const ListagemProdutos = () => {

        return (
            <ThemeProvider theme={theme}>
                <Row className="controlTable">
                    {produtos ?
                        <TableContainer component={Paper} sx={{ overflowX: "hidden" }}>
                            <Table aria-label="simple table" className="tableSystem">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="headerTable">Nome</TableCell>
                                        <TableCell className="headerTable">Preço</TableCell>
                                        <TableCell className="headerTable">Ações</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        produtos.map((produto) => (
                                            <TableRow
                                                key={produto.nome}
                                            >
                                                <TableCell>{produto.nome}</TableCell>
                                                <TableCell>{produto.preco}</TableCell>
                                                <TableCell><MenuTable props={produto} origem="produto" setProdutos={setProdutos} /></TableCell>
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
            <CadastroProduto produtos={produtos} setProdutos={setProdutos} />
            <ListagemProdutos setProdutos={setProdutos} />
        </div>
    );
}