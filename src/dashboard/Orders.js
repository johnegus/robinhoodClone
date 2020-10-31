import React, { useEffect }  from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { getPositions } from "../store/actions/positions";
import { useSelector, useDispatch } from "react-redux";


// Generate Order Data
// function createData(id, date, name, shipTo, paymentMethod, amount, ) {
//   return { id, date, name, shipTo, paymentMethod, amount };
// }



// const rows = [
//   createData(
//     0,
//     '16 Mar, 2019',
//     'Elvis Presley',
//     'Tupelo, MS',
//     'VISA ⠀•••• 3719',
//     positions,
//   ),
//   createData(
//     1,
//     '16 Mar, 2019',
//     'Paul McCartney',
//     'London, UK',
//     'VISA ⠀•••• 2574',
//     866.99,
//   ),
//   createData(
//     2,
//     '16 Mar, 2019',
//     'Tom Scholz',
//     'Boston, MA',
//     'MC ⠀•••• 1253',
//     100.81,
//   ),
//   createData(
//     3,
//     '16 Mar, 2019',
//     'Michael Jackson',
//     'Gary, IN',
//     'AMEX ⠀•••• 2000',
//     654.39,
//   ),
//   createData(
//     4,
//     '15 Mar, 2019',
//     'Bruce Springsteen',
//     'Long Branch, NJ',
//     'VISA ⠀•••• 5919',
//     212.79,
//   ),
// ];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const Orders = ({positions, getPositions}) => {
  useEffect(() => {
    getPositions();
  }, []);
  
  
  
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Order Date</TableCell>
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
              <TableCell>{position.stockSymbol}</TableCell>
              <TableCell>{position.stockName}</TableCell>
              <TableCell>{position.shares}</TableCell>
              <TableCell>{position.buyPrice}</TableCell>
              <TableCell >{`$${position.currentPrice}`}</TableCell>
              <TableCell align="right">{((position.currentPrice/position.buyPrice)*100-100).toFixed(0)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}


const OrdersContainer = () => {
  const positions = useSelector((state) => Object.values(state.positions));
  const dispatch = useDispatch();
  return (
    <Orders
      positions={positions}
      getPositions={() => dispatch(getPositions())}
      
    />
  );
};

export default OrdersContainer;