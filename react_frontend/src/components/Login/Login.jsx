import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Row } from 'reactstrap';
import '../../assets/css/autenticacao.css';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import { Link } from 'react-router-dom';
import StoreContext from '../Store/Context';
import { useHistory } from 'react-router-dom';

const theme = createTheme({
    palette: {
        primary: {
            main: '#32296a',
        },
        mode: 'light',
    },
});

export default function SignInSide() {
    const history = useHistory();
    const { setToken } = useContext(StoreContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const login = {
            email: data.get('email'),
            senha: data.get('senha'),
        }

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        }).then((response) => {
            response.json().then((data) => {
                setToken(data)
                return history.push('/');
            });
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
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
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Endereço de Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="senha"
                                label="Senha"
                                type="password"
                                id="senha"
                                autoComplete="current-password"
                            />
                            <Row className='align-buttons'>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ padding: 1.5, marginRight: 1 }}
                                >
                                    Login
                                </Button>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    sx={{ padding: 1.5, marginLeft: 1 }}
                                >
                                    <Link to="/cadastro" className='link-cadastro'>
                                        Cadastre-se
                                    </Link>
                                </Button>
                            </Row>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}