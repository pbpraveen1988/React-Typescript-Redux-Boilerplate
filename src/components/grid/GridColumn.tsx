import { GridVerticalAlign } from './GridVerticalAlign';
import { GridHorizontalAlign } from './GridHorizontalAlign';
import * as React from 'react';
import * as classNames from 'classnames';
import { GridBump } from './GridBump';
import { GridColumnsType } from './GridColumnsType';
import './GridColumnStyles.scss';


export interface GridColumnProps {
    className?: string;
    offset?: number;
    bump?: GridBump;
    size?: string;
    columns?: GridColumnsType;
    xs?: GridColumnsType;
    sm?: GridColumnsType;
    md?: GridColumnsType;
    lg?: GridColumnsType;
    halign?: GridHorizontalAlign;
    valign?: GridVerticalAlign;
    onClick?: (e: any) => any;
    padding?: string;
    backgroundImage?: string;
    ref?: any;
    height?: string
    innerHTML?: boolean;

    // new props 
    collapse?: boolean;
    header?: string;
    isOpen?: boolean;

    enableInlineStyle?: boolean;
    inlineStyle?: any;
}

export const GridColumn: React.SFC<GridColumnProps> = (props) => {

    const classes = classNames(
        'rtrb-grid-col',
        props.className,

        'rtrb-halign-' + props.halign,
        'rtrb-valign-' + props.valign,
        {
            [`rtrb-grid-bump-${props.bump}`]: props.bump,
            [`rtrb-grid-col-width-${props.columns}`]: props.columns,
            [`col-xs-${props.xs}`]: props.xs,
            [`col-sm-${props.sm}`]: props.sm,
            [`col-md-${props.md}`]: props.md,
            [`col-lg-${props.lg}`]: props.lg,
        },
    );

    let columnStyle = { padding: props.padding };
    if (props.enableInlineStyle && props.inlineStyle) {
        columnStyle = Object.assign(columnStyle, props.inlineStyle)
    }

    if (props.innerHTML) {
        return (
            <div ref={props.ref} onClick={props.onClick} className={classes} style={columnStyle} />
        );
    }


    return (
        <div ref={props.ref} style={columnStyle} onClick={props.onClick} className={classes} >
            {props.children}
        </div>
    );

};
