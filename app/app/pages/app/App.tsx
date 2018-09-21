import * as React from "react";
import "./App.scss";
import {connect} from "react-redux";
import EmployeesPage from "../../../employees/pages/employees-page/EmployeesPage";
import AppHeader from "./parts/AppHeader";

interface IProps {
}

interface IState {
}

class App extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <AppHeader/>
                <EmployeesPage/>
            </>
        );
    }
}

export default App;
