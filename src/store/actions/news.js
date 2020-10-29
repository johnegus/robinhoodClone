import polygonApi from '../../util/polygon';

export const RECEIVE_NEWS = 'RECEIVE_NEWS';

const receiveNews = news => ({
  type: RECEIVE_NEWS,
  news
});

export const fetchNews = () => dispatch => (
    polygonApi.fetchNews()
    .then(symbol => dispatch(receiveNews(symbol.title)))
);