import {useCallback} from 'react';

import {useApiContext} from "../context/ApiContext";
import {useRestResponse} from "./useRestResponse";

const usePut = url => {
    const {getClient} = useApiContext();
    const [restResponseState, restResponseApi] = useRestResponse();
    const {receiveError, receiveResponse, setLoading} = restResponseApi;

    const client = getClient();

    const putData = useCallback(
        (body = {}, params = {}) => {
            const queryBodyStr = JSON.stringify(body);
            const queryParamsStr = JSON.stringify(params);

            // setLoading to true before making the call.
            setLoading(true);

            client.put(url, queryBodyStr, {queryParamsStr})
                .then(({data}) => {
                    receiveResponse(data);
                }).catch(error => {
                    // error is of format error.response.data here.
                    receiveError(error.response.data.error);
                })
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            client,
            url,
            receiveError,
            receiveResponse,
            setLoading
        ]
    );

    return {
        putData,
        ...restResponseState
    };
};

export {usePut};