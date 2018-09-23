import constantsTypes from '../constants-types/constants-type';

const defaultState = [
    {
        name: 'Иванов',
        surname: 'Дмитрий',
        patronymic: 'Иванович',
        accessLevel: 'Гость',
        selectGroup: '2.1'
    }
];

export default function (state = defaultState, action){
    const {type, payload} = action;

    switch (type) {
        case constantsTypes.ADD_EMPLOYEES_IN_GROUP:
            let stateCopy = JSON.parse(JSON.stringify(state));

            stateCopy.push({
                name: payload.name,
                surname: payload.surname,
                patronymic: payload.patronymic,
                accessLevel: payload.accessLevel,
                selectGroup: payload.selectGroup
            });

            return stateCopy;
    }

    return state;
}
