import * as React from "react";
import './AppHeader.scss';

interface IProps {
}

interface IState {
    currentMenuItem?: string;
}

export default class AppHeader extends React.Component<IProps, IState> {
    menuItems: any[];

    constructor(props) {
        super(props);

        this.state = {
          currentMenuItem: 'employees'
        };

        this.menuItems = [
            {
                title: 'Журнал',
                name: 'journal'
            },
            {
                title: 'Пользователи',
                name: 'members'
            },
            {
                title: 'Сотрудники',
                name: 'employees'
            },
            {
                title: 'Уровни доступа',
                name: 'levelsOfAccess'
            }
        ];
    }

    render() {
        return (
            <ul className={'main-menu-items'}>
                {this.renderMenuItems()}
            </ul>
        );
    }

    renderMenuItems() {
        return this.menuItems.map((item, index) => {
            return (
              <li key={index} className={`${this.state.currentMenuItem === item.name ? 'main-menu-item main-menu-item--active' : 'main-menu-item'}`}>{item.title}</li>
            );
        });
    }
}
