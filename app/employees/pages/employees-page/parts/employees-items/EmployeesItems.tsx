import * as React from "react";
import './EmployeesItems.scss';
import {connect} from "react-redux";
import {FormContainer} from "../../../../../../common/components/form_container/FormContainer";
import Button from "../../../../../../common/components/button/Button";
import {InputText} from "../../../../../../common/components/input_text/InputText";
import {addEmployeesInGroup, addEmployeesWithoutGroup} from "../../../../../../common/redux/action-create/actionCreate";

interface IProps {
    addEmployeesWithoutGroup?: (data) => void;
    addEmployeesInGroup?: (data) => void;
    groups?: any;
    employeesCardIsEmpty?: boolean;
}

interface IState {
}

class EmployeesItems extends React.Component<IProps, IState> {
    formRef: FormContainer;
    selectValue: any;
    userDataInputs: any[];
    selectRef: any;

    constructor(props) {
        super(props);

        this.userDataInputs = [
            {
                id: 'user-data-surname',
                name: 'surname',
                label: 'Фамилия'
            },
            {
                id: 'user-data-name',
                name: 'name',
                label: 'Имя'
            },
            {
                id: 'user-data-patronymic',
                name: 'patronymic',
                label: 'Отчество'
            },
            {
                id: 'user-data-unique-feature',
                name: 'uniqueFeature',
                label: 'Уникальный признак',
                placeholder: 'Номер пропуска'
            },
            {
                id: 'user-data-access-level',
                name: 'accessLevel',
                label: 'Уровень доступа',
                placeholder: 'Гость, посетитель, партнер'
            }
        ];
    }

    componentDidUpdate() {
        this.formRef.setValue({
            name: '',
            surname: '',
            patronymic: '',
            accessLevel: '',
            selectGroup: ''
        });

        this.selectRef.children[0].selected = true;
    }

    onGroupSelectChange(evt) {
        this.selectValue = evt.target.value;
    }

    getEmployeesCardData() {
        const data = this.formRef.getValue();

        data['selectValue'] = this.selectValue;

        if (!data['selectValue'] || (data['selectValue'] === 'Выберите из списка созданных групп')) {
            this.props.addEmployeesWithoutGroup(data);
        }

        if (data['selectValue']) {
            this.props.addEmployeesInGroup(data);
        }

        return data;
    }

    render() {
        return (
            <>
                <h2>Создание сотрудника</h2>
                <div className={'create-employees-container'}>
                    <FormContainer ref={(r) => this.formRef = r}>
                        {this.renderUserDataInputs()}
                    </FormContainer>
                    <div className={'create-employees-input-container'}>
                        <select ref={(r) => this.selectRef = r} className={'create-employees-input'} name="groupSelect" onChange={this.onGroupSelectChange.bind(this)}>
                            <option>Выберите из списка созданных групп</option>
                            {this.renderGroupSelect()}
                        </select>
                        <label className={'create-employees-label'}>Группа</label>
                    </div>
                    <Button className={'create-button create-employees-card'} title={'Создать карточку сотрудника'} onClick={this.getEmployeesCardData.bind(this)}/>
                </div>
            </>
        );
    }

    renderUserDataInputs() {
        return this.userDataInputs.map((item, index) => {
            return (
                <div key={index} className={'create-employees-input-container'}>
                    <InputText id={item.id} className={'create-employees-input'} name={item.name} placeholder={item.placeholder || ''}/>
                    <label htmlFor={item.id} className={'create-employees-label'}>{item.label}</label>
                </div>
            );
        });
    }

    renderGroupSelect() {
        return this.props.groups.map((item, index) => {
            return <option key={index} value={item.itemId}>{item.title}</option>
        });
    }
}

export default connect((state: any) => {
    return {
        groups: state.groups
    };
}, {addEmployeesWithoutGroup, addEmployeesInGroup})(EmployeesItems);
