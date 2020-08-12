import * as React from 'react';
import * as classNames from 'classnames';
import { GridHorizontalAlign } from './GridHorizontalAlign';
import { GridVerticalAlign } from './GridVerticalAlign';
import { GridColumnsType } from './GridColumnsType';


export interface GridRowProps {
    className?: string;
    halign?: GridHorizontalAlign;
    valign?: GridVerticalAlign;
    columns?: GridColumnsType;
    equalWidth?: boolean;
    onClick?: (e: any) => any;
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

export const GridRow: React.SFC<GridRowProps> = (props) => {
    
    const classes = classNames(
        'rtrb-grid-row',
        'row',
       
        props.className,
        {
            'rtrb-grid-equal-width': props.equalWidth,
            [`rtrb-grid-cols-${props.columns}`]: props.columns,
            [`rtrb-grid-halign-${props.halign}`]: props.halign,
            [`rtrb-grid-valign-${props.valign}`]: props.valign,
        },
    );

    let style = props.enableInlineStyle ? props.inlineStyle : {};
    
        return (
            <div ref={props.ref} style={style} onClick={props.onClick} className={classes}>
                {props.children}
            </div>
        );
    
};
