import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

(window as any).routerHistory = history;

export default history;
