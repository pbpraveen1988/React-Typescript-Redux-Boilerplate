import { serviceReducer } from '../store';

export function AppReducer(state: any, action: any) {
    return serviceReducer(state, action);
}
