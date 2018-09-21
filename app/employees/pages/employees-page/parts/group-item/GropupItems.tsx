import * as React from "react";
import './GroupItems.scss';
import {addSubGroup} from "../../../../../../common/redux/action-create/actionCreate";
import {connect} from "react-redux";
import Button from "../../../../../../common/components/button/Button";
import EmployeesItemInGroup from "../employees-item-in-group/EmployeesItemInGroup";

interface IProps {
    addSubGroup?: (id: string | number, dataParent: string | number, idLastElement: string | number) => void;
    itemId?: string | number;
    itemParentId?: string | number;
    title?: string;
    groups?: any;
    employeesInGroup?: any;
}

interface IState {
}

class GroupItems extends React.Component<IProps, IState> {
    groupContainerRef: any;

    constructor(props) {
        super(props);
    }

    onGroupClick(evt) {
        if (evt.target.classList.contains('group-title')) {
            if (evt.target.closest('.group-item').classList.contains('employees-hidden')) {
                evt.target.closest('.group-item').classList.remove('employees-hidden');
                evt.target.classList.remove('employees-title-icon-hidden');

            } else {
                evt.target.closest('.group-item').classList.add('employees-hidden');
                evt.target.classList.add('employees-title-icon-hidden');
            }
        }
    }

    onAddSubGroupClick(evt) {
        const dataId = evt.target.closest('[data-id]').getAttribute('data-id');
        let elems = evt.target.closest(`[data-id]`).querySelectorAll(`[data-parent="${dataId}"]`);
        const arrElems = Array.from(elems);
        let dataIdLastElement;
        let dataParent;

        if (arrElems.length) {
            dataIdLastElement = (arrElems[arrElems.length - 1] as any).getAttribute('data-id');
            dataParent = (arrElems[arrElems.length - 1] as any).getAttribute('data-parent');

            this.props.addSubGroup(dataId, dataParent, dataIdLastElement);

        } else {
            this.props.addSubGroup(dataId, dataId, undefined);
        }
    }

    sortEmployeesInGroups() {

        // СОРТИРОВКА СОТРУДНИКОВ В ПОДГРУППЫ

        // this.props.employeesInGroup.forEach((item) => {
        //     let container = this.groupContainerRef.querySelectorAll(`[data-id="${item.selectGroup}"]`);
        //
        //     if (container[1] && !container[1].closest('.group-item')) {
        //         for (let i = 1; i < container.length; i++) {
        //             container[0].querySelector('.employees-in-group-container').append(container[i])
        //         }
        //     }
        // });
    }

    componentDidMount() {
        this.renderSubGroup(this.props.groups);
        this.sortEmployeesInGroups();
    }

    componentDidUpdate() {
        this.renderSubGroup(this.props.groups);
        this.sortEmployeesInGroups();
    }

    render() {
        return (
            <div ref={(r) => this.groupContainerRef = r} className={'groupContainerRef'} onClick={this.onGroupClick.bind(this)}>
                {this.renderGroups()}
                {this.renderEmployeesInGroup()}
            </div>
        );
    }

    renderGroups() {
        return this.props.groups.map((item, index) => {
            return (
                <div key={index} data-id={item.itemId} data-parent={item.itemParentId} className={'group-item'}>
                    <p className={'group-title'}>{item.title}</p>
                    <p className={'level-access-title'}>Уровень доступа:</p>
                    <div className={'group-item-buttons-container'}>
                        <Button className={'create-subgroup-button'} title={'Создать подгруппу'} onClick={this.onAddSubGroupClick.bind(this)}/>
                        <Button className={'create-subgroup-add'}/>
                        <Button className={'create-subgroup-delete'}/>
                    </div>
                    <div className={'employees-in-group-container'}/>
                </div>
            )});

    }

    renderSubGroup(data) {
        data.forEach((item, index) => {
            data.forEach((it, i) => {
                let item1 = data[index];
                let item2 = data[i];

                if (item1.itemId === item2.itemParentId) {
                    let elem1 = this.groupContainerRef.querySelector(`[data-id="${item1.itemId}"]`);
                    let elem2 = this.groupContainerRef.querySelector(`[data-id="${item2.itemId}"]`);

                    elem2.style.paddingLeft = '15px';
                    elem1.appendChild(elem2);
                }
            });
        });
    }

    renderEmployeesInGroup() {
        return this.props.employeesInGroup.map((item, index) => {
            return <EmployeesItemInGroup key={index} name={item.name} surname={item.surname} patronymic={item.patronymic} accessLevel={item.accessLevel} selectGroup={item.selectGroup}/>;
        });
    }
}

export default connect((state: any) => {
    return {
        groups: state.groups,
        employeesInGroup: state.employeesInGroup
    };
}, {addSubGroup})(GroupItems);
