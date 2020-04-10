import { Effect } from 'dva-core';
import { Reducer } from 'redux';

export interface HelloModelState {
    count?: number
}

export interface HelloModelType {
    namespace: 'test'
    state: HelloModelState,
    effects: {
        add: Effect
        minus: Effect
    },
    reducers: {
        updateState: Reducer<HelloModelState>
    }
}


const helloModel: HelloModelType = {
    namespace: 'test',
    state: { 
        count: 0
    },
    effects: {
        *add(param, { put, select }) {
            const { count } = yield select(state => state.test);
            
            yield put({
                type: 'updateState',
                payload: {
                    count: count + 1
                }
            })
        },
        *minus(param, { put, select }) {
            const { count } = yield select(state => state.test);
            yield put({
                type: 'updateState',
                payload: {
                    count: count - 1
                }
            })
        },
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload};
        },
    },
};

export default helloModel;

