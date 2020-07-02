import * as ServiceActions from './ServiceActions';
import { StoreUtils } from './StoreUtils';

// tslint:disable:export-name
// tslint:disable:max-func-body-length
// tslint:disable:cyclomatic-complexity
export function serviceReducer(state: any, action: any) {
    let newState = state;

    if (action.type === ServiceActions.GetRecord_Success) {
        newState = StoreUtils.setRecord(state, action.object, action.record);
        return newState;
    }

    if (action.type === ServiceActions.GetNewRecord_Success) {
        newState = StoreUtils.setNewRecord(state, action.object, action.record);
        return newState;
    }
    return state;
}
