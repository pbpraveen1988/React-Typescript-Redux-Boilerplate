import * as React from 'react';
import { Tabs, Tab, Card, Button, MenuItem, Popover, Menu } from '@blueprintjs/core';
import './MailList.scss';
import { EmailBox, EmailBoxProps } from '../../components';
import { connect } from 'react-redux';

interface MailListProps {
    onSelect: (val?: any) => any;
    emailList: EmailBoxProps[];
}
interface MailListState {
    activePane: boolean;
    activeFlag?: boolean;
}


export class MailList extends React.Component<MailListProps, MailListState>
{
    /**
     *
     */
    constructor(props: MailListProps) {
        super(props);
        this.state = {
            activePane: true,
            activeFlag: false,
        }
    }
    public render() {
        console.log('render mail box');
        return (
            <div className='maillist'>
                <Tabs
                    animate
                    id="emailList"
                    key={"horizontal"}
                    renderActiveTabPanelOnly={this.state.activePane}
                >
                    <Tab id="focused" title="Focused" panel={<div>{this.renderMailList()}</div>} />
                    <Tab id="other" title="Other" panel={<div>Other</div>} />
                    <Tabs.Expander />
                    <Popover content={this.renderFilterMenu()}>
                        <Button minimal icon={'filter'} text={'Filter'} />
                    </Popover>
                </Tabs>
            </div>
        )
    }

    private renderMailList() {
        const state = this.state;

        if (this.props.emailList.length === 0) {
            return (
                <Card className={`email-box`}>
                    <p className='email-box-content'>
                        No Mails found
                </p>
                </Card>
            );
        }
        const flag = state.activeFlag;
        if (flag) {
            const _emailList = this.props.emailList.filter((x: any) => x.flag).filter(y => y != undefined);
            if (_emailList.length === 0) {
                return (
                    <Card className={`email-box`}>
                        <p className='email-box-content'>
                            No Mails found
                    </p>
                    </Card>
                );
            }
            return _emailList && _emailList.map((x: any, index: number) => {
                return <EmailBox key={index} onSelect={this.props.onSelect} {...x} />
            })
        }

        return this.props.emailList.map((x: any, index: number) => {
            return <EmailBox key={index} onSelect={this.props.onSelect} {...x} />
        })
    }

    private renderFilterMenu() {
        return (
            <Menu>
                <MenuItem text="Flag Mails" icon={this.state.activeFlag ? 'star' : 'star-empty'} onClick={() => {
                    this.setState({ activeFlag: !this.state.activeFlag })
                }} />
            </Menu>
        )
    }
}

export default connect()(MailList)
