import constantsTypes from '../constants-types/constants-type';

const defaultState = [
    {
        itemId: '1',
        title: 'Группа 1',
        itemParentId: '0'
    },
    {
        itemId: '2',
        title: 'Группа 2',
        itemParentId: '0'
    },
    {
        itemId: '2.1',
        title: 'Группа 2.1',
        itemParentId: '2'
    }
];

export default function (state = defaultState, action){
    const {type, payload} = action;

    switch (type) {
        case constantsTypes.ADD_GROUP:
            let stateCopy = JSON.parse(JSON.stringify(state));

            let groupCount = stateCopy.filter((item) => {
               return (+item.itemId ^ 0) === +item.itemId
            });

            stateCopy.push({
                itemId: `${groupCount.length + 1}`,
                title: `Группа ${groupCount.length + 1}`,
                itemParentId: '0'
            });

            return stateCopy;

        case constantsTypes.ADD_SUBGROUP:
            let stateCopy2 = JSON.parse(JSON.stringify(state));
            let splitElems;

            if (payload.idLastElement) {
                splitElems = payload.idLastElement.split('.');

                const lengthElems = splitElems.length;

                splitElems[lengthElems - 1] = +splitElems[lengthElems - 1] + 1;
                splitElems = splitElems.join('.');
            }

            if (!payload.idLastElement) {
                splitElems = payload.id + '.1';
            }

            if (splitElems.split('.').length <= 5) {
                stateCopy2.push({
                    itemId: splitElems,
                    title: `Группа ${splitElems}`,
                    itemParentId: payload.dataParent
                });
            }

            return stateCopy2;
    }

    return state;
}
