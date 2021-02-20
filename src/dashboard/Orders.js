import React, { useEffect, useState }  from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { getPositions } from "../store/actions/positions";
import { useSelector, useDispatch } from "react-redux";
import {getHistoricalData} from '../store/actions/ledger';
import { DataGrid } from '@material-ui/data-grid';
import '../index.css'
import { NavLink } from 'react-router-dom';









const Orders = ({positions, ledger, getPositions, getHistoricalData}) => {
const [rows, setRows] = useState([]);

  // useEffect(() => {
  //   getPositions();
  // }, []);

  // useEffect(() => {
  //   getHistoricalData();
  // }, []);
  

  useEffect(() => {
    if (!ledger) {
      return;
    }

 const  mapHistoryToRows = () => {
    const gridRows = ledger.slice(0).reverse().map((instance) => {
      return ({
        id: instance.id,
        date: instance.createdAt.substring(0, 10), 
        transaction: instance.deposit > 0 ? 'DEPOSIT: $'+ instance.deposit : (instance.shares !== 0 ?
          'SELL' : 'WITHDRAWAL: $'+ instance.deposit),
        symbol: instance.stockSymbol ? instance.stockSymbol : '',
        companyName: instance.stockName,
        shares: instance.shares,
        purchasePrice: instance.boughtPrice,
        currentPrice: instance.soldPrice,
        percentChange: ((instance.soldPrice*instance.shares)-(instance.boughtPrice*instance.shares)).toFixed(2)
      })

    })
    setRows(gridRows);
  }
  mapHistoryToRows();

  }, [ledger]); 

  const columns = [
    { field: 'date', headerName: 'Date', width: 140 },
    { field: 'transaction', headerName: 'Transaction', width: 90 },
    { field: 'symbol', headerName: 'Symbol', width: 90 },
    { field: 'companyName', headerName: 'Company Name', width: 90 },
    {
      field: 'shares',
      headerName: 'Shares',
      type: 'number',
      width: 90,
    },
    {
      field: 'purchasePrice',
      headerName: 'Purchase Price',
      type: 'number',
      width: 90,
    },
    {
      field: 'currentPrice',
      headerName: 'Sell Price',
      type: 'number',
      width: 90,
    },
    {
      field: 'percentChange',
      headerName: 'Profit',
      type: 'number',
      width: 90,
    },
    
  ];
  return (
    <React.Fragment>
      <Title>Portfolio Assets</Title>
      <Table style={{width: "105%"}} size="small" >
        <TableHead>
          <TableRow>
            <TableCell>Purchase Date</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>Shares</TableCell>
            <TableCell>Purchase Price</TableCell>
            <TableCell>Current Price $</TableCell>
            <TableCell align="center">Profit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {positions.slice(0).reverse().map((position) => (
            <TableRow key={position.id}>
              <TableCell>{position.createdAt.substring(0, 10)}</TableCell>
              <TableCell>
              <NavLink to={`/position/${position.id}`}>
                
                {position.stockSymbol.toUpperCase()}
                </NavLink>
                </TableCell>
              <TableCell>{position.stockName}</TableCell>
              <TableCell>{position.shares}</TableCell>
              <TableCell>${position.buyPrice}</TableCell>
              <TableCell >{`$${position.currentPrice}`}</TableCell>
          <TableCell align="right">
            <div className={`${(position.currentPrice - position.buyPrice).toFixed(2) > 0
            ? "green" : "red"}`}>
              ${(position.shares * (position.currentPrice - position.buyPrice)).toFixed(2)}
            </div>
            
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Title>Portfolio History</Title>
   
      <div style={{ height: 1000, width: '105%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={20} />
    </div>
  
    </React.Fragment>
  );
}


const OrdersContainer = () => {
  const positions = useSelector((state) => Object.values(state.positions));
  const ledger = useSelector((state) => Object.values(state.ledger));
  const dispatch = useDispatch();
  return (
    <Orders
      positions={positions}
      ledger={ledger}
      getPositions={() => dispatch(getPositions())}
      getHistoricalData={() => dispatch(getHistoricalData())}
      
    />
  );
};

export default OrdersContainer;