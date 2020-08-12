
import * as React from 'react';
import * as classNames from 'classnames';
import 'flexboxgrid/dist/flexboxgrid.css';
import './GridStyles.scss';
import { GridHorizontalAlign } from './GridHorizontalAlign';
import { GridVerticalAlign } from './GridVerticalAlign';
import { GridColumnsType } from './GridColumnsType';


export interface GridProps {
    className?: string;
    columns?: GridColumnsType;
    gutter?: boolean;
    halign?: GridHorizontalAlign;
    valign?: GridVerticalAlign;
    equalWidth?: boolean;
    onClick?: (e: any) => any;
    onBlur?: (e: any) => any;
    backgroundImage?: string;
    ref?: any;
    height?: string;

    // new props 
    collapse?: boolean;
    header?: string;
    isOpen?: boolean;
    enableInlineStyle?: boolean;
    inlineStyle?: any;
}

export const Grid: React.SFC<GridProps> = (props) => {


    const classes = classNames(
        'rtrb-grid',

        props.className,
        {
            'rtrb-grid-gutter': props.gutter,
            [`rtrb-grid-cols-${props.columns}`]: props.columns,
            [`rtrb-grid-halign-${props.halign}`]: props.halign,
            [`rtrb-grid-valign-${props.valign}`]: props.valign,
        },
    );

    let style = props.enableInlineStyle ? props.inlineStyle : {};
    return (
        <div ref={props.ref} style={style} onClick={props.onClick} onBlur={props.onBlur} className={classes}>
            {props.children}
        </div>
    );

};
