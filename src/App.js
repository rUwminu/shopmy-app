import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import SingleProduct from './pages/SingleProduct'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Profile from './pages/Profile'
import LikedProduct from './pages/LikedProduct'
import ShippingAddress from './pages/ShippingAddress'
import Order from './pages/Order'
import OrderHistory from './pages/OrderHistory'
import OrderAll from './pages/OrderAll'
import Error from './pages/Error'
import { Navbar } from './components/index'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import PrivateAdminRoute from './components/PrivateAdminRoute/PrivateAdminRoute'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/shopmy-app' exact component={Home} />

        <Route path='/product/:id' component={SingleProduct} />

        <Route path='/cart/:id?' component={Cart} />

        <Route path='/login' component={Login} />

        <PrivateRoute path='/profile' component={Profile} />

        <PrivateRoute path='/likedproduct' component={LikedProduct} />

        <Route path='/shipping' component={ShippingAddress} />

        <PrivateRoute path='/order/:id' component={Order} />

        <PrivateRoute path='/orderhistory' component={OrderHistory} />

        <PrivateAdminRoute path='/allorder' component={OrderAll} />

        <Route path='*' component={Error} />
      </Switch>
    </Router>
  )
}

export default App
