import * as React from "react";
import './EmployeesItem.scss';
import Button from "../../../../../../common/components/button/Button";

interface IProps {
    name?: string;
    surname?: string;
    patronymic?: string;
    accessLevel?: string;
    selectGroup?: string;
    id?: any;
}

interface IState {
}

const userIcon = require('./content/img/anonim-icon.png');

class EmployeesItem extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'employees-item-container'} data-id={this.props.selectGroup}>
                <img src={userIcon}/>
                <div>
                    <p>{this.props.name + ' ' + this.props.surname + ' ' + this.props.patronymic}</p>
                    <p>Уровень доступа: {this.props.accessLevel}</p>
                </div>
                <div className={'group-item-buttons-container'}>
                    <Button className={'create-subgroup-add'}/>
                    <Button className={'create-subgroup-delete'}/>
                </div>
            </div>
        );
    }
}

export default EmployeesItem;
