import * as React from "react";
import './GroupItems.scss';
import {addSubGroup} from "../../../../../../common/redux/action-create/actionCreate";
import {connect} from "react-redux";
import Button from "../../../../../../common/components/button/Button";
import EmployeesItem from "../employees-item/EmployeesItem";

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
        const arrElems = [];

        this.props.groups.forEach((item) => {
            this.props.groups.forEach((it) => {
                if ((item.itemId === dataId) && (item.itemId === it.itemParentId)) {
                    arrElems.push(it);
                }
            });
        });

        let dataIdLastElement;
        let dataParent;

        if (arrElems.length) {
            dataIdLastElement = (arrElems[arrElems.length - 1] as any).itemId;
            dataParent = (arrElems[arrElems.length - 1] as any).itemParentId;

            this.props.addSubGroup(dataId, dataParent, dataIdLastElement);

        } else {
            this.props.addSubGroup(dataId, dataId, undefined);
        }
    }

    render() {
        return (
            <div ref={(r) => this.groupContainerRef = r} className={'groupContainerRef'} onClick={this.onGroupClick.bind(this)}>
                {this.props.groups.map((item) => {
                    if (item.itemId.indexOf('.') !== -1) {
                        return null;
                    }

                    return this.renderGroups(item);
                })}
            </div>
        );
    }

    renderGroups(item) {
        let defaultPadding = 15;
        let padding;

        if (item.itemId.indexOf('.') !== -1) {
            padding = (defaultPadding * item.itemId.split('.').length) - defaultPadding;
        }

        return (
            <div key={item.itemId} data-id={item.itemId} data-parent={item.itemParentId} className={'group-item'}>
                <div className={'employees-description'} style={{paddingLeft: `${padding}px`}}>
                    <p className={'group-title'}>{item.title}</p>
                    <p className={'level-access-title'}>Уровень доступа:</p>
                    <div className={'group-item-buttons-container'}>
                        <Button className={'create-subgroup-button'} title={'Создать подгруппу'} onClick={this.onAddSubGroupClick.bind(this)}/>
                        <Button className={'create-subgroup-add'}/>
                        <Button className={'create-subgroup-delete'}/>
                    </div>
                </div>
                <div className={'employees-in-group-container'}>

                    {this.props.employeesInGroup.map((it, i) => {
                        if ((item.itemId === it.selectGroup)) {
                            return <EmployeesItem key={i} name={it.name} surname={it.surname} patronymic={it.patronymic} accessLevel={it.accessLevel} selectGroup={it.selectGroup}/>;
                        }
                    })}

                </div>

                {this.props.groups.map((it) => {
                    if (item.itemId === it.itemParentId) {
                        return this.renderGroups(it);
                    }
                })}

            </div>
        )
    }
}

export default connect((state: any) => {
    return {
        groups: state.groups,
        employeesInGroup: state.employeesInGroup
    };
}, {addSubGroup})(GroupItems);
