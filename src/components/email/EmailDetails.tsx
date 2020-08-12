import * as React from "react";
import { EmailBoxProps } from './EmailBox';
import { Icon, Card, ButtonGroup } from '@blueprintjs/core';
import { Button } from '@blueprintjs/core';
import { StoreUtils } from '../../store';
import { Sf } from '../../services';


interface EmailDetailsProps {
    email?: EmailBoxProps;
}

export const EmailDetails: React.FC<EmailDetailsProps> = (props: EmailDetailsProps) => {

    if (!props.email) {
        return (
            <div className='email-details-empty full-height'>
                <div className='email-details-content'>
                    <Icon icon='envelope' iconSize={80} />
                    <br />
                    <span>Select an item to read</span>
                    <br />
                    <span>Click here to always select the first item in the list</span>
                </div>

            </div>
        )
    }

    const btnActions = [];
    btnActions.push(<Button icon={props.email.flag ? 'star' : 'star-empty'} onClick={() => updateEmail(props, 'flag')} />);

    if (props.email.folder !== 'trash') {
        btnActions.push(<Button icon={'trash'} intent='danger' text={'Delete'} onClick={() => updateEmail(props, 'trash')} />);
    }
    if (props.email.folder !== 'archive') {
        btnActions.push(<Button icon={'archive'} intent='primary' text={'Archive'} onClick={() => updateEmail(props, 'archive')} />);
    }
    if (props.email.folder !== 'junk') {
        btnActions.push(<Button icon='disable' text='Junk' intent='warning' onClick={() => updateEmail(props, 'junk')} />);
    }



    return (
        <Card className='email-details full-height'>
            <div className='email-details-actions'>
                <ButtonGroup fill style={{ minWidth: 120 }} minimal>
                    {btnActions}
                </ButtonGroup>
            </div>
            <Card>
                <div className='email-details-content'>
                    <div className='email-details-subject'>
                        {props.email.subject}
                    </div>
                    <div className='email-details-time'>
                        {props.email.time}
                    </div>
                    <div className='email-content'>
                        <p dangerouslySetInnerHTML={{ __html: props.email.content }}></p>
                    </div>
                </div>
            </Card>

        </Card>
    )
}

const updateEmail = (props: EmailDetailsProps, moveTo: string) => {
    const type = StoreUtils.getNewRecord(Sf.store.getState(), 'emailType');
    const emailList = StoreUtils.getNewRecord(Sf.store.getState(), `${type}-emailList`);
    if (props.email && props.email) {
        const emailDetails = props.email;
        const selectedIndex = emailList && emailList.findIndex((x: any) => x.mId === emailDetails.mId);
        const _selectedItem = emailList[selectedIndex];



        if (_selectedItem) {

            if (moveTo === 'flag') {
                _selectedItem.flag = !_selectedItem.flag;
                emailList && emailList.splice(selectedIndex, 1, _selectedItem);
                Sf.store.dispatch({
                    type: 'Service_GetNewRecord_Success',
                    object: type + '-emailList',
                    record: emailList
                });
                Sf.store.dispatch({
                    type: 'Service_GetNewRecord_Success',
                    object: 'selected-email',
                    record: _selectedItem
                });
                return;
            }


            switch (moveTo) {
                case 'junk':
                    let _junklist = StoreUtils.getNewRecord(Sf.store.getState(), `junk-emailList`);
                    _selectedItem.folder = 'junk';
                    if (!_junklist) {
                        _junklist = [_selectedItem];
                    } else {
                        _junklist.push(_selectedItem);
                    }
                    Sf.store.dispatch({
                        type: 'Service_GetNewRecord_Success',
                        object: 'junk-emailList',
                        record: _junklist
                    });
                    emailList && emailList.splice(selectedIndex, 1);
                    Sf.store.dispatch({
                        type: 'Service_GetNewRecord_Success',
                        object: type + '-emailList',
                        record: emailList
                    });
                    break;
                case 'trash':
                    _selectedItem.folder = 'trash';
                    let _deltedList = StoreUtils.getNewRecord(Sf.store.getState(), `trash-emailList`);
                    if (!_deltedList) {
                        _deltedList = [_selectedItem];
                    } else {
                        _deltedList.push(_selectedItem);
                    }
                    Sf.store.dispatch({
                        type: 'Service_GetNewRecord_Success',
                        object: 'trash-emailList',
                        record: _deltedList
                    });
                    emailList && emailList.splice(selectedIndex, 1);
                    Sf.store.dispatch({
                        type: 'Service_GetNewRecord_Success',
                        object: type + '-emailList',
                        record: emailList
                    });
                    break;
                case 'archive':
                    _selectedItem.folder = 'archive';
                    let archiveList = StoreUtils.getNewRecord(Sf.store.getState(), `archive-emailList`);
                    if (!archiveList) {
                        archiveList = [_selectedItem];
                    } else {
                        archiveList.push(_selectedItem);
                    }
                    Sf.store.dispatch({
                        type: 'Service_GetNewRecord_Success',
                        object: 'archive-emailList',
                        record: archiveList
                    });
                    emailList && emailList.splice(selectedIndex, 1);
                    Sf.store.dispatch({
                        type: 'Service_GetNewRecord_Success',
                        object: type + '-emailList',
                        record: emailList
                    });
                    break;

            }
            Sf.store.dispatch({
                type: 'Service_GetNewRecord_Success',
                object: 'selected-email',
                record: undefined
            });
        }
    }
}



