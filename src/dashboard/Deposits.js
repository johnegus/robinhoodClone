import React, { useEffect, useState }  from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import {getHistoricalData} from '../store/actions/history';
import { getPositions } from "../store/actions/positions";
import { useSelector, useDispatch } from "react-redux";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export function Deposits({getHistoricalData, history}) {
  const classes = useStyles();
  const year = new Date().getFullYear();
  const month =new Date().getMonth();
  const date = new Date().getDate()
  // const [stockChartXValues, setstockChartXValues] = useState([]);
  // const [stockChartYValues, setstockChartYValues] = useState([]);

  useEffect(() => {
    getHistoricalData();
  }, []);

  //alphavantage stock fetch -------------------------------------------------------------
  // useEffect(() => {
  //   if (!history) {
  //     return;
  //   }
  //   let stockChartXValuesFunction = [];
  //   let stockChartYValuesFunction = [];
  //   const fetchLivePositions = () =>{
      
        
  //       history.map((instance) => {
          
  //         stockChartYValuesFunction.push(instance.deposit + (instance.soldPrice*instance.shares)-(instance.boughtPrice*instance.shares))
  //         stockChartXValuesFunction.push(instance.createdAt)
  //       })
    
  //       }
              
  
  //       setstockChartXValues(stockChartXValuesFunction)
  //       setstockChartYValues(stockChartYValuesFunction)
  //       console.log(stockChartXValues)
  //       console.log(stockChartYValues)
            
        
      
  //     fetchLivePositions();
    
  
  // }, [history]);

  return (
    <React.Fragment>
      <Title>Portfolio Value</Title>
      <Typography component="p" variant="h4">
        {/* {history.map((instance) => (
        <div>
          Change: {parseInt(instance.deposit) + (parseInt(instance.soldPrice)*parseInt(instance.shares))-(parseInt(instance.boughtPrice)*parseInt(instance.shares))}
        </div>
        ))} */}
        ${(history.reduce(function (accumulator, instance){
          return accumulator + (instance.soldPrice*instance.shares)-(instance.boughtPrice*instance.shares);
        }, 10000)).toFixed(2)}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {month + '/' + date + '/' + year}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}

const DepositsContainer = () => {
  const history = useSelector((state) => Object.values(state.history));
  const dispatch = useDispatch();
  return (
    <Deposits
      history={history}
      getHistoricalData={() => dispatch(getHistoricalData())}
      
    />
  );
};

export default DepositsContainer;
