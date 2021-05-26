import axios from 'axios';
import qs from 'qs';

// noinspection JSUnresolvedVariable
axios.defaults.headers.common['Content-type'] = 'application/json';

axios.defaults.paramsSerializer = (params) =>
    qs.stringify(params, {arrayFormat: 'repeat'});

const client = axios.create();

const getClient = () => {
    return client;
};

export {getClient};
export default client;
