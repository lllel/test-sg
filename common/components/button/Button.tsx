import * as React from 'react';

import "./Button.scss"

interface IProps {
    title?:string;
    disabled?:boolean;
    visible?:boolean;
    onClick?:() => void;
    className?:string;
}

interface IState {

}

export default class Button extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button
                className={this.props.className}
                disabled={this.props.disabled}
                onClick={this.props.onClick? this.props.onClick : null}>

                {this.props.children? this.props.children : this.props.title}

                </button>
        )
    }
}
