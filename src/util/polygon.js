import apisauce from 'apisauce';

import {POLYGON_URL, POLYGON_KEY} from '../config';

const polygonApi = (baseURL = POLYGON_URL) => {

    const api = apisauce.create({
        baseURL: POLYGON_URL,
        timeout: 5000
    })
    const params = {
        apiKey: POLYGON_KEY
    } 
    const getQuote = symbol => api.get(`https://api.polygon.io/v1/meta/symbols/${symbol}/news?perpage=50&page=1&apiKey=VkrkWBmpkEzcfu554MV9td_zILRqS2w8`);

    return {
        getQuote
    }
};

export default polygonApi;