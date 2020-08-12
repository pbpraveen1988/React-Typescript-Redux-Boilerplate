import * as React from 'react';
import { Navbar, NavbarDivider, NavbarGroup, Button, Classes, NavbarHeading, Alignment } from "@blueprintjs/core";
import './Navbar.scss';
import { connect } from "react-redux";
import { Sf } from '../../services';
import { StoreUtils } from '../../store';
export interface NavProps {
    //we can add props to make things dynamic
}

const NavBar: React.FC<NavProps> = (props: NavProps) => {

    window.store = Sf.store.getState();
    sessionStorage.setItem('currentStore', JSON.stringify(Sf.store.getState()));
    const emailList = (StoreUtils.getNewRecord(Sf.store.getState(), 'inbox-emailList') || []);
    const unreadMailCount = emailList.filter((x: any) => x.unread).length;
    return (
        <Navbar className='primary-nav'>
            <NavbarGroup align={Alignment.LEFT}>
                <NavbarHeading>Outlook Mail</NavbarHeading>
                <NavbarDivider />
            </NavbarGroup>
            <NavbarGroup align={Alignment.RIGHT}>
                <Button className={Classes.MINIMAL} icon="envelope" />
                <div className='unread-mail-count'>{unreadMailCount}</div>
            </NavbarGroup>
        </Navbar>

    );

}

const Nav = connect((state: any) => { return { state }; }, null, null, {})(NavBar);
export { Nav };