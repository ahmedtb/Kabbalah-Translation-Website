
import { usePromiseTracker } from "react-promise-tracker";

import { TailSpin } from 'react-loader-spinner';

export default function LoadingIndicator(props) {
    const { promiseInProgress } = usePromiseTracker();

    return (
        promiseInProgress && <div
            className='d-flex justify-content-center align-items-center w-100 m-3'
        >
            <TailSpin type="TailSpin" color="blue" height="100" width="100" />
        </div>
    );
}