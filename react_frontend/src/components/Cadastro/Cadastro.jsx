import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Row } from 'reactstrap';
import '../../assets/css/autenticacao.css';
import LogoDevIcon from '@mui/icons-material/LogoDev';

const theme = createTheme({
    palette: {
        primary: {
            main: '#32296a',
        },
        mode: 'light',
    },
});

export default function SignUp() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const cadastro = {
            nome: data.get('nome'),
            email: data.get('email'),
            senha: data.get('senha'),
        }

        fetch('http://localhost:3000/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cadastro)
        }).then((response) => {
            response.json().then((data) => { 
                window.location.href = '/login';
            });
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Row className='align-header'>
                        <LogoDevIcon sx={{ fontSize: 100 }} color='primary' />
                        <Typography component="h1" variant="h5">
                            Evolution
                        </Typography>
                    </Row>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="nome"
                                    required
                                    fullWidth
                                    id="nome"
                                    label="Nome"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Endereço de Email"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="senha"
                                    label="Senha"
                                    type="password"
                                    id="senha"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Row className='align-buttons'>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ padding: 1.5, marginRight: 1 }}
                            >
                                Cadastrar
                            </Button>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ padding: 1.5, marginLeft: 1 }}
                            >
                                <Link to="/login" className='link-cadastro'>
                                    Voltar
                                </Link>
                            </Button>
                        </Row>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}