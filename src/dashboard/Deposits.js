import * as React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  const year = new Date().getFullYear();
  const month =new Date().getMonth();
  const date = new Date().getDate()
  return (
    <React.Fragment>
      <Title>Portfolio Value</Title>
      <Typography component="p" variant="h4">
        $30,024.00
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
