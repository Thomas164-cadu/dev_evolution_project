import React, { useState, useContext } from "react";
import SelectCategoria from '../Categoria/Select';
import { Row } from "reactstrap";
import { Typography } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FazerPedido from "./FazerPedido";
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
    return { categoria: '' };
}

const Pedido = () => {
    const [values, setValues] = useState(initialState);
    const { token } = useContext(StoreContext);
    const [fazerPedido, setFazerPedido] = useState(false);

    function onChange(event) {
        const { value, name } = event.target;

        setValues({
            ...values,
            [name]: value
        });

        setFazerPedido(true);
    }

    return (
        <>
            <div className="contentPedido">
                <ThemeProvider theme={theme}>
                    <Row className="titleSystem">
                        <Typography component="h4" variant="h5">
                            Fazer Pedido
                        </Typography>
                    </Row>
                    <SelectCategoria
                        name="categoria"
                        value={values.categoria}
                        onChange={onChange}
                    />
                    {
                        fazerPedido ? (
                            <FazerPedido categoria={values.categoria} />
                        ) : null
                    }
                </ThemeProvider>
            </div>
        </>
    );
}

export default Pedido;