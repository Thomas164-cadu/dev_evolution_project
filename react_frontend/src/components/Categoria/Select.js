import React, { useEffect, useState, useContext } from "react";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import StoreContext from "../Store/Context";

export default function SelectCategoria(props) {
    const [categorias, setCategorias] = useState();
    const {token} = useContext(StoreContext)

    useEffect(() => {
        fetch('http://localhost:3000/categorias',{
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(response => response.json())
            .then(data => setCategorias(data));
    }, []);

    return (
        <>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Categoria"
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                >
                    {
                        categorias ?
                            categorias.map((categoria) => (
                                <MenuItem value={categoria._id}>{categoria.nome}</MenuItem>
                            ))
                            : null
                    }
                </Select>
            </FormControl>
        </>
    );
}