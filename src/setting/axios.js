import axios from 'axios';

let token = JSON.parse(localStorage.getItem('token'));

const headersGet = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + `${token}`
}

export const post_request = (endUrl, postData, Type) =>  {
    const headers = headersGet;
    const PostData = {
        ...postData,
    }
    return axios.post(process.env.REACT_APP_API_URL + endUrl, PostData, { headers })
    .then(res => {
        return res;
    })
    .catch(error => {
        return error.response;
    });
}

export const get_request = (endUrl) =>{
    const headers = headersGet;
    return axios.get(process.env.REACT_APP_API_URL + endUrl, { headers })
    .then(res => {
       return res;
    }).catch(error => {
        return error.response;
    })
}