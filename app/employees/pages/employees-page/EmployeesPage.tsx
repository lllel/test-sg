import * as React from "react";
import './EmployeesPage.scss';
import {InputText} from "../../../../common/components/input_text/InputText";
import Button from "../../../../common/components/button/Button";
import {connect} from "react-redux";
import {addGroup} from "../../../../common/redux/action-create/actionCreate";
import GroupItems from './parts/group-item/GropupItems';
import EmployeesItems from "./parts/employees-card/EmployeesCard";
import EmployeesItem from "./parts/employees-item/EmployeesItem";

interface IProps {
    addGroup?: () => void;
    employeesWithoutGroup?: any;
}

interface IState {
    employeesCardIsEmpty: boolean;
}

class EmployeesPage extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.state = {
          employeesCardIsEmpty: false
        };
    }

    addGroup() {
        this.props.addGroup();
    }

    clearUserCard() {
        this.setState({
            employeesCardIsEmpty: true
        });

        setTimeout(() => {
            this.setState({
                employeesCardIsEmpty: false
            });
        }, 1000);
    }

    render() {
        return (
            <>
                <div className={'top-container'}>
                    <InputText className={'search-input'} placeholder={'Поиск группы или сотрудника'}/>
                    <Button className={'create-button create-employees-button'} title={'+ Создать сотрудника'} onClick={this.clearUserCard.bind(this)}/>
                    <Button className={'create-button create-group-button'} title={'+ Создать группу'} onClick={this.addGroup.bind(this)}/>
                </div>
                <EmployeesItems employeesCardIsEmpty={this.state.employeesCardIsEmpty}/>
                <h2 className={'employees-group-title'}>Сотрудники по группам</h2>
                <GroupItems/>
                <div className={'employees-group-container'}>
                    <h2 className={'employees-group-title'}>Сотрудники без группы</h2>
                    {this.renderEmployeesItemsWithoutGroups()}
                </div>
            </>
        );
    }

    renderEmployeesItemsWithoutGroups() {
        return this.props.employeesWithoutGroup.map((item, index) => {
            return (
                <EmployeesItem key={index} name={item.name} surname={item.surname} patronymic={item.patronymic} accessLevel={item.accessLevel} selectGroup={item.selectGroup}/>
            );
        });
    }
}

export default connect((state: any) => {
    return {
        employeesWithoutGroup: state.employeesWithoutGroup
    };
}, {addGroup})(EmployeesPage);
