export interface State {
    min: number;
    max: number;
    rangeStartPosition: number;
    rangeEndPosition: number;
}

export type Action =
    | { type: 'SET_MIN'; payload: number }
    | { type: 'SET_MAX'; payload: number }
    | { type: 'SET_RANGE_START_POSITION'; payload: number }
    | { type: 'SET_RANGE_END_POSITION'; payload: number };

const initialState: State = {
    min: 0,
    max: 0,
    rangeStartPosition: 0,
    rangeEndPosition: 0,
};

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'SET_MIN':
            return { ...state, min: action.payload };
        case 'SET_MAX':
            return { ...state, max: action.payload };
        case 'SET_RANGE_START_POSITION':
            return { ...state, rangeStartPosition: action.payload };
        case 'SET_RANGE_END_POSITION':
            return { ...state, rangeEndPosition: action.payload };

        default:
            return state;
    }
};

let state = initialState;
const dispatch = (action: Action) => {
    state = reducer(state, action);
};

export const getState = (): State => {
    return state;
};

export const setState = (action: Action) => {
    dispatch(action);
};

