import { fetchSolarModule } from '@/redux/actions/solarModule';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  setPickedModule,
  setPickedQuantity,
} from '@/redux/reducers/SolarModuleSlice';
import { AppStore, RootReducer, wrapper } from '@/redux/store';
import { SolarModule } from '@/types/SolarModule';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { NextPage } from 'next';
import { useMemo } from 'react';

const Checkout: NextPage = () => {
  const { solarModule, isLoading, error, pickedModule, pickedQuantity } =
    useAppSelector((state) => state.solar);
  const quantity = useAppSelector((state) =>
    state.solar.solarModule && state.solar.pickedModule
      ? state.solar.solarModule[state.solar.pickedModule]?.quantity
      : null
  );
  const totalPrice = useMemo(() => {
    if (solarModule && pickedModule && pickedQuantity) {
      return solarModule[pickedModule].price * pickedQuantity;
    }

    return null;
  }, [pickedModule, pickedQuantity]);
  const dispatch = useAppDispatch();
  if (isLoading) {
    return <Typography variant="h1">Loading</Typography>;
  }
  if (error) {
    return <Typography variant="h1">{error}</Typography>;
  }

  const handleActiveModuleChange = (event: SelectChangeEvent) => {
    dispatch(setPickedModule(event.target.value as keyof SolarModule));
  };

  const handleActiveQuantityChange = (event: SelectChangeEvent) => {
    dispatch(setPickedQuantity(Number(event.target.value)));
  };

  const handleSubmit = () => {
    alert(
      JSON.stringify({
        totalPrice,
        pickedQuantity,
        pickedModule,
      })
    );
  };

  const solarModulesKeys = useMemo(() => {
    return solarModule
      ? (Object.keys(solarModule) as (keyof SolarModule)[])
      : [];
  }, [solarModule]);

  if (solarModule) {
    return (
      <Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Module Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {solarModulesKeys.map((sm) => (
                <TableRow key={sm.toString()}>
                  <TableCell>{sm.toString()}</TableCell>
                  <TableCell>{solarModule[sm].quantity}</TableCell>
                  <TableCell>{solarModule[sm].price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <form>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',

              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <FormControl variant="outlined" sx={{ minWidth: 200, m: 2 }}>
              <InputLabel>Module</InputLabel>
              <Select
                value={pickedModule?.toString()}
                onChange={handleActiveModuleChange}
                input={<OutlinedInput label="Module" />}
              >
                {solarModulesKeys.map((sm) => (
                  <MenuItem key={sm} value={sm}>
                    {sm}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" sx={{ minWidth: 200, m: 2 }}>
              <InputLabel>Quantity</InputLabel>
              <Select
                disabled={!quantity}
                value={pickedQuantity?.toString()}
                onChange={handleActiveQuantityChange}
                input={<OutlinedInput label="Quantity" />}
              >
                {quantity &&
                  Array.from({ length: quantity }).map((_, index) => (
                    <MenuItem key={index} value={index + 1}>
                      {index + 1}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Typography>
              {totalPrice ? `Total Price: ${totalPrice} $` : 'Not picked'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              disabled={!pickedModule || !pickedQuantity}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    );
  }
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store: AppStore) => async () => {
    await store.dispatch(fetchSolarModule());
    return {
      props: {},
    };
  }
);

export default Checkout;
