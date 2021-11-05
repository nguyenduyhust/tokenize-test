import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { initializeStore } from '~/redux/with-redux';
import { useStyles } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { sIsGetOrderBookDataPending, sOrderBookData } from '~/redux/selectors/app.selector';
import * as AppActions from '~/redux/actions/app.action';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {
  listenNewOrderBookData,
  removeNewOrderBookDataListener,
} from '~/services/socket.io.service';

interface Props {}

const HomePage: NextPage<Props> = (props) => {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const orderBookData = useSelector(sOrderBookData);
  const loading = useSelector(sIsGetOrderBookDataPending);

  useEffect(() => {
    if (!orderBookData) {
      dispatch(AppActions.getOrderBookData());
    }
  }, [orderBookData]);

  useEffect(() => {
    listenNewOrderBookData((data) => {
      dispatch(AppActions.updateOrderBookData(data));
    });

    return removeNewOrderBookDataListener;
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Size</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>Bid</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(orderBookData?.bids || []).map((bid, index) => (
                    <TableRow key={index}>
                      <TableCell>{bid.size}</TableCell>
                      <TableCell style={{ textAlign: 'right' }}>{bid.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Ask</TableCell>
                    <TableCell>Size</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(orderBookData?.asks || []).map((ask, index) => (
                    <TableRow key={index}>
                      <TableCell>{ask.price}</TableCell>
                      <TableCell>{ask.size}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

HomePage.getInitialProps = async ({ req }) => {
  const reduxStore = initializeStore();

  return {
    title: 'Trang chủ',
    initialReduxState: JSON.stringify(reduxStore.getState()),
  };
};

export default HomePage;
