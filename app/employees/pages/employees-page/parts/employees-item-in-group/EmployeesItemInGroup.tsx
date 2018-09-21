import * as React from "react";
import './EmployeesItemInGroup.scss';
import Button from "../../../../../../common/components/button/Button";

interface IProps {
    name?: string;
    surname?: string;
    patronymic?: string;
    accessLevel?: string;
    selectGroup?: string;
}

interface IState {
}

const userIcon = require('./content/img/anonim-icon.png');

class EmployeesItemInGroup extends React.Component<IProps, IState> {
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

export default EmployeesItemInGroup;
