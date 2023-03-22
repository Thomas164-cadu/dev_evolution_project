import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Produto from './Produto/Produto';
import Categoria from './Categoria/Categoria';
import Pedido from './Pedido/Pedido';
import PedidosRealizados from './Pedido/PedidosRealizados';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import StoreContext from './Store/Context';
import { Button } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#32296a',
    },
    mode: 'light',
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const [value, setValue] = React.useState(0);
  const { setToken } = React.useContext(StoreContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const Logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ width: '100%', bgcolor: '#fff' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Gerenciar Produtos" {...a11yProps(0)} />
              <Tab label="Gerenciar Categorias" {...a11yProps(1)} />
              <Tab label="Fazer Pedido" {...a11yProps(2)} />
              <Tab label="Pedidos" {...a11yProps(3)} />
            </Tabs>
            <Button variant="contained" onClick={Logout}>Logout</Button>
          </Box>
        </Box>
        {
          value === 0 ?
            <Produto />
            : value === 1 ?
              <Categoria />
              : value === 2 ?
                <Pedido />
                : value === 3 ?
                  <PedidosRealizados />
                  : null

        }
      </ThemeProvider>
    </>
  );
}