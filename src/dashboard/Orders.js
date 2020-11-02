import React, { useEffect }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { getPositions } from "../store/actions/positions";
import { useSelector, useDispatch } from "react-redux";
import {getHistoricalData} from '../store/actions/history';


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const Orders = ({positions, instances, getPositions, getHistoricalData}) => {
  useEffect(() => {
    getPositions();
  }, []);

  // useEffect(() => {
  //   getHistoricalData();
  // }, []);
  
  
  
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Portfolio Assets</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Purchase Date</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>Shares</TableCell>
            <TableCell>Purchase Price</TableCell>
            <TableCell>Current Price $</TableCell>
            <TableCell align="right">Percent Change %</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {positions.map((position) => (
            <TableRow key={position.id}>
              <TableCell>{position.createdAt}</TableCell>
              <TableCell>{position.stockSymbol.toUpperCase()}</TableCell>
              <TableCell>{position.stockName}</TableCell>
              <TableCell>{position.shares}</TableCell>
              <TableCell>${position.buyPrice}</TableCell>
              <TableCell >{`$${position.currentPrice}`}</TableCell>
              <TableCell align="right">{((position.currentPrice/position.buyPrice)*100-100).toFixed(0)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Title>Portfolio History</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Purchase Date</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>Shares</TableCell>
            <TableCell>Purchase Price</TableCell>
            <TableCell>Current Price $</TableCell>
            <TableCell align="right">Percent Change %</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {instances.map((instance) => (
            <TableRow key={instance.id}>
              <TableCell>{instance.createdAt}</TableCell>
              <TableCell>{instance.stockSymbol.toUpperCase()}</TableCell>
              <TableCell>{instance.stockName}</TableCell>
              <TableCell>{instance.shares}</TableCell>
              <TableCell>${instance.buyPrice}</TableCell>
              <TableCell >{`$${instance.currentPrice}`}</TableCell>
              <TableCell align="right">{((instance.currentPrice/instance.buyPrice)*100-100).toFixed(0)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
  
    </React.Fragment>
  );
}


const OrdersContainer = () => {
  const positions = useSelector((state) => Object.values(state.positions));
  // const instances = useSelector((state) => Object.values(state.instances));
  const dispatch = useDispatch();
  return (
    <Orders
      positions={positions}
      // instances={instances}
      getPositions={() => dispatch(getPositions())}
      // getHistoricalData={() => dispatch(getHistoricalData())}
      
    />
  );
};

export default OrdersContainer;