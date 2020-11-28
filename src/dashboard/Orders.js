import React, { useEffect, useState }  from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { getPositions } from "../store/actions/positions";
import { useSelector, useDispatch } from "react-redux";
import {getHistoricalData} from '../store/actions/history';
import { DataGrid } from '@material-ui/data-grid';










const Orders = ({positions, history, getPositions, getHistoricalData}) => {
const [rows, setRows] = useState([]);

  useEffect(() => {
    getPositions();
  }, []);

  useEffect(() => {
    getHistoricalData();
  }, []);
  

  useEffect(() => {
    if (!history) {
      return;
    }

 const  mapHistoryToRows = () => {
    const gridRows = history.map((instance) => {
      return ({
        id: instance.id,
        date: instance.createdAt, 
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

  }, [history]); 

  const columns = [
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'transaction', headerName: 'Transaction', width: 130 },
    { field: 'symbol', headerName: 'Symbol', width: 90 },
    { field: 'companyName', headerName: 'Company Name', width: 130 },
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
      width: 130,
    },
    
  ];
  return (
    <React.Fragment>
      <Title>Portfolio Assets</Title>
      <Table size="small" >
        <TableHead>
          <TableRow>
            <TableCell>Purchase Date</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>Shares</TableCell>
            <TableCell>Purchase Price</TableCell>
            <TableCell>Current Price $</TableCell>
            <TableCell align="right">Total Value</TableCell>
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
          <TableCell align="right">${(position.shares * position.currentPrice).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Title>Portfolio History</Title>
      {/* <Table size="small" >
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Transaction</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>Shares</TableCell>
            <TableCell>Purchase Price $</TableCell>
            <TableCell>Sale Price $</TableCell>
            <TableCell>Profit/Loss $</TableCell>
            <TableCell align="right">Percent Change %</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((instance) => (
            <TableRow key={instance.id}>
              <TableCell>{instance.createdAt}</TableCell>
              <TableCell>{instance.deposit > 0 ? 'DEPOSIT: ' + '$'+ instance.deposit : 'SELL'}</TableCell>
              <TableCell>{instance.stockSymbol ? instance.stockSymbol : ''}</TableCell>
              <TableCell>{instance.stockName}</TableCell>
              <TableCell>{instance.shares}</TableCell>
              <TableCell>${instance.boughtPrice}</TableCell>
              <TableCell >{`$${instance.soldPrice}`}</TableCell>
              <TableCell >{`$${((instance.soldPrice*instance.shares)-(instance.boughtPrice*instance.shares)).toFixed(2)}`}</TableCell>
              <TableCell align="right">
                {((instance.soldPrice/instance.boughtPrice)*100-100).toFixed(2) < 0 ? <span style={{color: 'red'}}>{((instance.soldPrice/instance.boughtPrice)*100-100).toFixed(2)}%</span> 
                : 
                <span>{((instance.soldPrice/instance.boughtPrice)*100-100).toFixed(2)}%</span>
                }
                
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
      <div style={{ height: 1000, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={20} checkboxSelection />
    </div>
  
    </React.Fragment>
  );
}


const OrdersContainer = () => {
  const positions = useSelector((state) => Object.values(state.positions));
  const history = useSelector((state) => Object.values(state.history));
  const dispatch = useDispatch();
  return (
    <Orders
      positions={positions}
      history={history}
      getPositions={() => dispatch(getPositions())}
      getHistoricalData={() => dispatch(getHistoricalData())}
      
    />
  );
};

export default OrdersContainer;