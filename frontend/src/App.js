import React from 'react'
import {useEffect} from 'react';
import { useSelector } from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/product/SearchScreen'
import ProductScreen from './screens/product/ProductScreen'
import CartScreen from './screens/cart/CartScreen'
import ShippingScreen from './screens/cart/ShippingScreen'
import PaymentScreen from './screens/cart/PaymentScreen'
import PlaceOrderScreen from './screens/cart/PlaceOrderScreen'

import LoginScreen from './screens/user/LoginScreen'
import RegisterScreen from './screens/user/RegisterScreen'
import ProfileScreen from './screens/user/ProfileScreen'
import UpdateProfileScreen from './screens/user/UpdateProfileScreen'
import MyOrdersScreen from './screens/order/MyOrdersScreen'
import OrderScreen from './screens/order/OrderScreen'

import UserListScreen from './screens/admin/UserListScreen'
import UserEditScreen from './screens/admin/UserEditScreen'
import ProductListScreen from './screens/admin/ProductListScreen'
import ProductCreateScreen from './screens/admin/ProductCreateScreen'
import ProductUpdateScreen from './screens/admin/ProductUpdateScreen'
import OrderListScreen from './screens/admin/OrderListScreen'
import OrderUpdateScreen from './screens/admin/OrderUpdateScreen'

import store from './store'
import {getUserProfile} from './actions/userActions';
import setAuthToken from './utils/setAuthToken';
import {USER_LOGOUT} from './constants/userConstants'

const App = () => {

  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    store.dispatch(getUserProfile());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: USER_LOGOUT });
    });
  }, []);

  const { user, isAuthenticated, loading } = useSelector(state => state.auth);

  return (
    <Router>
        <Header />
        <main className='py-3'>
          <Container>
            <Route path='/' component={HomeScreen} exact />
            <Route path="/search/:keyword" component={SearchScreen} />
            
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart' component={CartScreen} />
            <ProtectedRoute path='/shipping' component={ShippingScreen} />
            <ProtectedRoute path='/payment' component={PaymentScreen} />
            <ProtectedRoute path='/placeorder' component={PlaceOrderScreen} />
            <ProtectedRoute path='/order/:id' component={OrderScreen} />

            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <ProtectedRoute path='/profile' component={ProfileScreen} exact/>
            <ProtectedRoute path='/profile/update' component={UpdateProfileScreen} exact/>
            <ProtectedRoute path='/orders/me' component={MyOrdersScreen} exact/>        

          </Container>
          <div className='no-margin'>
            <ProtectedRoute path="/admin/users" isAdmin={true} component={UserListScreen} exact />  
            <ProtectedRoute path="/admin/user/:id" isAdmin={true} component={UserEditScreen} exact />
            <ProtectedRoute path="/admin/products" isAdmin={true} component={ProductListScreen} exact />
            <ProtectedRoute path="/admin/product" isAdmin={true} component={ProductCreateScreen} exact />  
            <ProtectedRoute path="/admin/product/:id" isAdmin={true} component={ProductUpdateScreen} exact />
            <ProtectedRoute path="/admin/orders" isAdmin={true} component={OrderListScreen} exact />
            <ProtectedRoute path="/admin/order/:id" isAdmin={true} component={OrderUpdateScreen} exact />

          </div>
          
        </main>
        
      {!loading && (!isAuthenticated || !user.isAdmin) && (
          <Footer />
      )}
    </Router>
    
  );
}

export default App;
