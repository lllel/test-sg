import * as React from 'react';
import * as ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import store from '../common/redux/store/store';
import App from "./app/pages/App/App";

ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.querySelector('#application'));
