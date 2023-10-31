import React, { useState } from 'react';
import '../src/styles/admin.css';
import OrderCount from './Ordercount';
import Orders from './Orders';
import AddProducts from './AddProducts';
import AdminView from './AdminView';
import Adminchat from './AdminChat';
import UserDataFetcher from './fetchusers';
import WelcomeAdmin from './components/Dashboard';
import { NavLink } from 'react-router-dom';
function AdminDashboard() {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const renderContent = () => {
    switch (selectedMenuItem) {
      //Add Product case
      case 'addproducts':
        return (
          // Add The Product Component
          <AddProducts />
        );
        //DashBoard case
      case 'DashBoard':
        return (
          // DashBoard Component
          <div style={{ marginLeft: '-200px', marginTop: '-300px' }}>
            <WelcomeAdmin />
          </div>
        );
        //orders case
      case 'orders':
        return (
          //Order Component
          <Orders />
        );
      case 'view':
        return (
          <AdminView />
        );
      case 'Adminchat':
        return (
          <div style={{ marginLeft: '-300px', marginTop: '-50px' }}>
            <Adminchat />
          </div>
        );
      case 'usertable':
        return (
          <UserDataFetcher />
        );
      default:
        return (
          <div style={{ marginLeft: '-200px', marginTop: '-300px' }}>
            <WelcomeAdmin />
          </div>
        );
    }
  };

  return (
    <div className="container-fluid">
      <br />
      <div className="row">
        <div className="col-md-3">
          <div className="bg" id="sidebar-wrapper" style={{ background: 'lightgray' }}>
            <div className="list-group list-group-flush">
              <a
                href="#"
                className="list-group-item list-group-item-action"
                onClick={() => setSelectedMenuItem('DashBoard')}
              >
                DashBoard
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                onClick={() => setSelectedMenuItem('addproducts')}
              >
                Add New Product
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                onClick={() => setSelectedMenuItem('orders')}
              >
                <OrderCount />
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                onClick={() => setSelectedMenuItem('view')}
              >
                view products
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                onClick={() => setSelectedMenuItem('Adminchat')}
              >
                view Quries
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                onClick={() => setSelectedMenuItem('usertable')}
              >
                Registered Users
              </a>
              <a className="list-group-item list-group-item-action"><NavLink to='/adminlogin' className='btn btn-dark'>Logout</NavLink></a>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
