import * as React from "react";
import './EmployeesItem.scss';
import {connect} from "react-redux";
import Button from "../../../../../../common/components/button/Button";

interface IProps {
    employeesWithoutGroup?: any;
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
            <>
                {this.renderEmployeesItem()}
            </>
        );
    }

    renderEmployeesItem() {
        return this.props.employeesWithoutGroup.map((item, index) => {
            return (
                <div key={index} className={'employees-item-container'}>
                    <img src={userIcon}/>
                    <div>
                        <p>{item.name + ' ' + item.surname + ' ' + item.patronymic}</p>
                        <p>Уровень доступа: {item.accessLevel}</p>
                    </div>
                    <div className={'group-item-buttons-container'}>
                        <Button className={'create-subgroup-add'}/>
                        <Button className={'create-subgroup-delete'}/>
                    </div>
                </div>
            );
        });
    }
}

export default connect((state: any) => {
    return {
        employeesWithoutGroup: state.employeesWithoutGroup
    };
})(EmployeesItem);
