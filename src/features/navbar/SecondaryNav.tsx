import * as React from 'react';
import { InputGroup, Button, NavbarDivider, ButtonGroup } from '@blueprintjs/core';
import { Grid, GridColumn, GridRow } from '../../components';
import { Sf } from '../../services';
import { StoreUtils } from '../../store';
export interface SecondaryNavProps {
    //we can add props to make things dynamic
}

export const SecondaryNav: React.FC<SecondaryNavProps> = (props: SecondaryNavProps) => {

    return (
        <nav className="bp3-navbar secondary-nav">
            <div className='full-width'>
                <Grid gutter columns={12}>
                    <GridRow columns={12}>
                        <GridColumn columns={3}>
                            <InputGroup
                                fill
                                onChange={() => { }}
                                placeholder="Search Mail and People"
                                rightElement={
                                    <Button
                                        icon={"search"}
                                        minimal={true}
                                        onClick={() => { }}
                                    />
                                }
                            />
                        </GridColumn>
                        <NavbarDivider className='full-height' />
                        <GridColumn columns={8} >
                            <ButtonGroup style={{ minWidth: 200 }} minimal>
                                <Button icon="add">New</Button>
                                <Button icon="inbox" onClick={() => markAsRead()}>Mark all as read</Button>
                            </ButtonGroup>
                        </GridColumn>
                    </GridRow>
                </Grid>
            </div>
        </nav>

    );



}


const markAsRead = () => {
    const type = StoreUtils.getNewRecord(Sf.store.getState(), `emailType`);
    const emailList = StoreUtils.getNewRecord(Sf.store.getState(), `${type}-emailList`);
    const _updatedList = emailList && emailList.map((x: any) => {
        x.unread = false;
        return x;
    })
    Sf.store.dispatch({
        type: 'Service_GetNewRecord_Success',
        object: 'emailList',
        record: _updatedList
    });

}