import React from 'react';

interface PanelProps {
    active: boolean;
    onClick(): void;
    submit(): void;
    cancel(): void;
    children: JSX.Element;
}

const Panel: React.SFC<PanelProps> = (props: PanelProps) => (
    <fieldset disabled={!props.active} className={`${props.active ? 'wrapper-panel-open' : 'wrapper-panel'} row`} 
        style={props.active ? {zIndex: 10} : {}}
        onClick={props.onClick}>
            {props.active ?                                     
                <div className="panel-controls">
                    <i className="panel-control-item fa fa-ban fa-lg" onClick={() => props.cancel()}></i>
                    <i className="panel-control-item fa fa-check fa-lg" onClick={() => props.submit()}></i>
                </div> 
            : 
                <div className="panel-controls">
                    <i className="panel-control-item fa fa-pencil fa-lg"></i>
                </div> }
            {props.children}
    </fieldset>
)

export default Panel;