import * as React from 'react';
import { Provider } from 'react-redux';
import { Home } from './Home';
import { Sf } from '../services';
import { AppReducer } from './AppReducer';
export interface AppProps {

}

export interface AppState {

}




const rootStore = Sf.store.initStore(AppReducer, {});
export class App extends React.Component<AppProps, AppState>
{

    public componentDidMount()
    {
        Sf.store.dispatch({
            type: 'Service_GetNewRecord_Success',
            object: 'addedstore',
            record: "praveen",
        });
      
        window.store = Sf.store.getState();
    }

    public render() {
        console.log(Sf.store.getState());
        return (
            <Provider store={rootStore}>
                <Home />
            </Provider>
        )


    }
}