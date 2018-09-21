import {combineReducers} from "redux";
import groups from './groups';
import employeesWithoutGroup from './employeesWithoutGroup';
import employeesInGroup from "./employeesInGroup";

export default combineReducers({
    groups, employeesWithoutGroup, employeesInGroup
});
