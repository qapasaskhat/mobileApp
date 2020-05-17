import { combineReducers } from 'redux';
import product from './productReduser';


const rootReduser = combineReducers({
    product,
});
export default rootReduser;