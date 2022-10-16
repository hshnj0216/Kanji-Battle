import {useEffect, useRef} from 'react';
import * as d3 from 'd3';

export const useD3 = (renderGraphFn, dependencies) => {
    const ref = useRef();

    useEffect(() => {
        let destroyFn;

        renderGraphFn(d3.select(ref.current));
        return destroyFn;
    }, dependencies);
    return ref;
}