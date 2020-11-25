import React, { useEffect }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import {getHistoricalData} from '../store/actions/history';
import { useSelector, useDispatch } from "react-redux";
import { createInstance } from "../store/actions/history";




const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export function Deposits({getHistoricalData, history}) {
  const classes = useStyles();
  const year = new Date().getFullYear();
  const month =new Date().getMonth()+1;
  const date = new Date().getDate()
  const dispatch = useDispatch();

  useEffect(() => {
    getHistoricalData();
  }, []);

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

  const deposits = (history.reduce(function (accumulator, instance){
    return accumulator +  parseFloat(instance.deposit);
  }, 0)).toFixed(2);
  return (
    <React.Fragment>
      <div className= 'userHeader'>
      <Title>Portfolio Value</Title>
      <Typography component="p" variant="h4">
        {/* {history.map((instance) => (
        <div>
          Change: {parseInt(instance.deposit) + (parseInt(instance.soldPrice)*parseInt(instance.shares))-(parseInt(instance.boughtPrice)*parseInt(instance.shares))}
        </div>
        ))} */}
        ${(history.reduce(function (accumulator, instance){
          return accumulator + (instance.soldPrice*instance.shares)-(instance.boughtPrice*instance.shares);
        }, parseFloat(deposits))).toFixed(2)}
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
