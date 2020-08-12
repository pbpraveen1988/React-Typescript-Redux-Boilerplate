import * as React from "react";
import './EmailBox.scss';
import { Card } from '@blueprintjs/core';
export interface EmailBoxProps {
    subject: string;
    unread?: boolean;
    mId: string;
    content: string;
    flag?: boolean;
    folder?: 'junk' | 'trash' | 'archive' | 'inbox';
    from?: string;
    time?: Date | string;
    onSelect?: (val?: any) => any;
}


export const EmailBox: React.FC<EmailBoxProps> = (props: EmailBoxProps) => {

    return (

        <Card key={props.mId} onClick={() => props.onSelect && props.onSelect(props)} className={`email-box ${props.unread ? 'email-unread' : ''}`}>

            <div className='email-box-from' >{props.from}</div>

            <div className='email-box-subject'>
                {props.subject}
                <span className='email-box-time'>
                    {props.time}
                </span>
            </div>
            <p className='email-box-content'>
                {props.content}

            </p>

        </Card>

    )

}