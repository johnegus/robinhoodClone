import React, { useEffect, useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CountUp from 'react-countup';
import Title from './Title';
import {getHistoricalData} from '../store/actions/ledger';
import { useSelector, useDispatch } from "react-redux";
import { createInstance } from "../store/actions/ledger";




const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export function Deposits({getHistoricalData, ledger}) {
  const classes = useStyles();
  const year = new Date().getFullYear();
  const month =new Date().getMonth()+1;
  const date = new Date().getDate()
  const dispatch = useDispatch();
  const [accumulation, setAccumulation] = useState(0)

  useEffect(() => {
    if(!ledger)
      getHistoricalData();
  });

  useEffect(() => {
    if(ledger){
      const deposits = (ledger.reduce(function (accumulator, instance){
        return accumulator +  parseFloat(instance.deposit);
      }, 0)).toFixed(2);
    
      const cumulative = ledger.reduce(function (accumulator, instance){
        return accumulator + (instance.soldPrice*instance.shares)-(instance.boughtPrice*instance.shares);
      }, parseFloat(deposits)).toFixed(2);

      setAccumulation(parseInt(cumulative))
    }
  }, [ledger]);

  const handleClick = async (e) => {
    const deposit = 10000;
    
    const payload ={
    deposit
    };
    await dispatch(createInstance(payload));
  }

  const takeOut = async (e) => {
    const deposit = -10000;
    
    const payload ={
    deposit
    };
    await dispatch(createInstance(payload));
  }

  

  return (
    <React.Fragment>
      <div className= 'userHeader'>
      <Title>Portfolio Value</Title>
      <Typography component="p" variant="h4">
      $<CountUp start={0} decimals={2} end={accumulation} duration={1.00} separator="," />
        
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {month + '/' + date + '/' + year}
      </Typography>
      <div>
        <button onClick={handleClick} >Deposit $10000</button>
        <button onClick={takeOut} >Withdrawal $10000</button>
      </div>
      </div>
    </React.Fragment>
  );
}

const DepositsContainer = () => {
  const ledger = useSelector((state) => Object.values(state.ledger));
  const dispatch = useDispatch();
  return (
    <Deposits
      ledger={ledger}
      getHistoricalData={() => dispatch(getHistoricalData())}
      
    />
  );
};

export default DepositsContainer;
