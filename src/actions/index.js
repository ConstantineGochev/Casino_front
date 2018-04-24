import axios from 'axios';
import {FETCH_USER} from './types';

export const get_user = (name, password) => async  dispatch => {
       const res = await axios.get(`https://shrouded-sands-20038.herokuapp.com/new_path/apiv2/entry/current?screenname=${name}&password=${password}`)
           await dispatch({
             type: FETCH_USER,
             payload: res
            })
}
