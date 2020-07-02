import { createStore, applyMiddleware, Store } from 'redux';

// tslint:disable-next-line:import-name
//import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

export class StoreService {
    private store: any;

    public initStore = (reducer: any, initalState: any): Store<Object> => {
        this.store = createStore(
            reducer,
            initalState || {},
            //applyMiddleware(thunk, reduxImmutableStateInvariant()),
            applyMiddleware(thunk),
        );
        const store: any = this.store;
        return store;
    }

    public getStore(): Store<Object> {
        if (!this.store) {
            throw new Error('Store is not initialized yet!');
        }

        return this.store;
    }

    public dispatch(action: any): any {
        return this.getStore().dispatch(action);
    }

    public getState(): any {
        return this.getStore().getState() as any;
    }
}
