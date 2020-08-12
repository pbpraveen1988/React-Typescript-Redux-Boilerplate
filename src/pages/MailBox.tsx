import * as React from 'react';
import { Sidebar } from '../features';
import { Grid, GridRow, GridColumn, EmailBoxProps, EmailDetails } from '../components';
import { MailList } from '../features';
import { Sf } from '../services';
import { StoreUtils } from '../store';
import { connect } from 'react-redux';




export const MailBoxClass: React.FC = () => {
    const type = StoreUtils.getNewRecord(Sf.store.getState(), 'emailType');
    const emailList = StoreUtils.getNewRecord(Sf.store.getState(), `${type}-emailList`) || [];
    const selectedEmail = StoreUtils.getNewRecord(Sf.store.getState(), 'selected-email');

    return (
        <Grid className='full-height'>
            <GridRow columns={12} className='full-height'>
                <GridColumn columns={3}>
                    <Sidebar />
                </GridColumn>

                <GridColumn columns={4}>
                    <MailList emailList={emailList} onSelect={(selectedEmail: EmailBoxProps) => handleOnSelectEmail(selectedEmail)} />
                </GridColumn>
                <GridColumn columns={5}>
                    <EmailDetails email={selectedEmail} />
                </GridColumn>
            </GridRow>
        </Grid>
    )
}

const handleOnSelectEmail = (selectedEmail: EmailBoxProps) => {
    let _selectedEmail = Object.assign({}, selectedEmail);
    const type = StoreUtils.getNewRecord(Sf.store.getState(), 'emailType');
    const emailList = StoreUtils.getNewRecord(Sf.store.getState(), `${type}-emailList`);
    const selectedIndex = emailList && emailList.findIndex((x: any) => x.mId === selectedEmail.mId);
    if (selectedIndex !== undefined && selectedIndex > -1) {
        _selectedEmail.unread = false;
        emailList.splice(selectedIndex, 1, _selectedEmail);
    }

    Sf.store.dispatch({
        type: 'Service_GetNewRecord_Success',
        object: `${type}-emailList`,
        record: emailList
    });
    Sf.store.dispatch({
        type: 'Service_GetNewRecord_Success',
        object: 'selected-email',
        record: selectedEmail
    });
    // this.setState({ selectedEmail });
}


const MailBox = connect((state: any) => { return { state }; }, null, null, {})(MailBoxClass);
export { MailBox };

