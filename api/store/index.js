import rootReduser from '../reduser/rootReduser'
import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const store = createStore(
    rootReduser,
    applyMiddleware(thunk)
);

export default store