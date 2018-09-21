import * as React from 'react';
import * as _ from 'lodash';
import {IComponentProps} from "../../interfaces/components/IComponentProps";
import {IComponentForm} from "../../interfaces/components/IComponentForm";

interface IProps extends IComponentProps {
}

interface IState {
}

export class FormContainer extends React.Component<IProps, IState> implements IComponentForm {
    isOk: boolean;
    formItems: any[];

    constructor(props) {
        super(props);

        if (this.props.formRef) {
            this.props.formRef.addFormItemsInArr(this);
        }

        this.formItems = [];
        this.isOk = true;
    }

    cloneChildren(elements) {
        if (!elements) {
            return;
        }

        if (!_.isArray(elements)) {
            elements = [elements];
        }

        return _.map(elements as any[], (child, index) => {
            if (typeof child.type === 'string') {
                return React.cloneElement(child, {key: index, children: this.cloneChildren(child.props.children)});

            } else {
                if (typeof child === 'string')
                    return child;

                return React.cloneElement(child, {
                    key: index,
                    formRef: this,
                    children: this.cloneChildren(child.props.children)
                });
            }
        });
    }

    addFormItemsInArr(item) {
        this.formItems.push(item);
    }

    checkState(state) {
        let res = true;
        _.forEach(this.formItems, (item) => {
            if (!item.props.name) {
                return null;
            }

            if (item.checkState(state) !== null) {
                res = res && item.checkState(state);
            }
        });
        return res;
    }

    getValue() {
        const items = {};

        this.isOk = true;

        _.forEach(this.formItems, (item) => {
            if (item.getValue() !== null) {
                let value = item.getValue();

                if (item.props.name) {
                    items[item.props.name] = value !== undefined ? value : items[item.props.name];
                }

            } else {
                this.isOk = null;
            }
        });

        return this.isOk === null ? null : items;
    }

    setValue(data) {
        _.forEach(this.formItems, (item) => {
            if (!item.props.name) {
                return null;
            }

            item.setValue(data[item.props.name])
        });
    }
    getStatus(){
        return true; //tmp
    }
    render() {
        const children = this.cloneChildren(this.props.children);

        return (
            <>
                {children}
            </>
        );
    }
}
