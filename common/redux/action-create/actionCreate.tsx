import constantsTypes from '../constants-types/constants-type';

export function addGroup() {
    return (dispatch) => {
        dispatch({
            type: constantsTypes.ADD_GROUP
        });
    }
}

export function addSubGroup(id, dataParent, idLastElement) {
    return (dispatch) => {
        dispatch({
            type: constantsTypes.ADD_SUBGROUP,
            payload: {
                id,
                dataParent,
                idLastElement
            }
        });
    }
}

export function addEmployeesWithoutGroup(employees) {
    return (dispatch) => {
        dispatch({
            type: constantsTypes.ADD_EMPLOYEES_WITHOUT_GROUP,
            payload: {
                name: employees.name,
                surname: employees.surname,
                patronymic: employees.patronymic,
                accessLevel: employees.accessLevel
            }
        });
    }
}

export function addEmployeesInGroup(employees) {
    return (dispatch) => {
        dispatch({
            type: constantsTypes.ADD_EMPLOYEES_IN_GROUP,
            payload: {
                name: employees.name,
                surname: employees.surname,
                patronymic: employees.patronymic,
                accessLevel: employees.accessLevel,
                selectGroup: employees.selectValue
            }
        });
    }
}
