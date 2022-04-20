import React from 'react';
import './App.css';
import { get_request, post_request } from './setting/axios';
import { useQuery } from 'react-query';
import LayoutComponent from './components/cardComponant/LayoutComponent';

const App = () => {
  const userLogin = async () => {
    const payload = {
      "email":"whessel@example.com",
      "password": "password"
    }
    const response = await (post_request('auth/login', payload));
    return response.data.data;
  }
  const { isLoading, error, data } = useQuery("UpcomingMovie", userLogin);
    if( isLoading ){
      return <div>User Login Loading...</div>
    }

    localStorage.setItem('token', JSON.stringify(data.token));
  return (
    <div className="App">
      <LayoutComponent/>
    </div>
  )
}

export default App
