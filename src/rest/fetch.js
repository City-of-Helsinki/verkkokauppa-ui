import axios from 'axios';
import qs from 'qs';

const defaultOptions = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
};

axios.defaults.paramsSerializer = (params) =>
    qs.stringify(params, {arrayFormat: 'repeat'});

const client = axios.create(defaultOptions);

const getClient = () => {
    return client;
};

export {getClient};
export default client;
