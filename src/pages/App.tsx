import * as React from 'react';
import { Provider } from 'react-redux';
import { Sf } from '../services';
import { AppReducer } from './AppReducer';
import { Nav, SecondaryNav } from '../features';
import { MailBox } from './MailBox';

const inbox = require('../data/inbox.json');
const junk = require('../data/junk.json');
const trash = require('../data/trash.json');

const rootStore = Sf.store.initStore(AppReducer, {});
export interface AppProps {

}

export interface AppState {

}

export class App extends React.Component<AppProps, AppState>
{
    public componentWillMount() {

        const store = sessionStorage.getItem('currentStore');
        if (!store) {
            Sf.store.dispatch({
                type: 'Service_GetNewRecord_Success',
                object: 'emailType',
                record: 'inbox'
            });
            Sf.store.dispatch({
                type: 'Service_GetNewRecord_Success',
                object: 'inbox-emailList',
                record: inbox
            });
            Sf.store.dispatch({
                type: 'Service_GetNewRecord_Success',
                object: 'junk-emailList',
                record: junk
            });
            Sf.store.dispatch({
                type: 'Service_GetNewRecord_Success',
                object: 'trash-emailList',
                record: trash
            });
        }
    }

    public render() {
        let reduxStore = rootStore;
        const store = sessionStorage.getItem('currentStore');
        if (store) {
            reduxStore = Sf.store.initStore(AppReducer, JSON.parse(store));
        }
        return (
            <Provider store={reduxStore}>
                <Nav />
                <SecondaryNav />
                <MailBox />
            </Provider>
        )


    }
}





