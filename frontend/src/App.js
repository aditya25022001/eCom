import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Container } from 'react-bootstrap';
import { HomeScreen } from './screens/HomeScreen';
import { ProductScreen } from './screens/ProductScreen';
import { CartScreen } from './screens/CartScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegistersScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { ShippingScreen } from './screens/ShippingScreen';
import { PaymentScreen } from './screens/PaymentScreen';
import { PlaceorderScreen } from './screens/PlaceorderScreen';
import { OrderScreen } from './screens/OrderScreen';
import { UserListScreen } from './screens/UserListScreen';
import { OrderListScreen } from './screens/OrderListScreen';
import { OrderEditScreen } from './screens/OrderEditScreen';
import { OrderScreenById } from './screens/OrderScreenById';
import { EditScreen } from './screens/EditScreen';
import { ProductEditScreen } from './screens/ProductEditScreen';
import { ProductListAdminScreen } from './screens/ProductListAdminScreen';
import { CreateProductScreen } from './screens/CreateProductScreen'
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/order/:id' component={OrderScreen} exact></Route>
          <Route path='/shipping' component={ShippingScreen} exact></Route>
          <Route path='/payment' component={PaymentScreen} exact></Route>
          <Route path='/placeorder' component={PlaceorderScreen} exact></Route>
          <Route path='/login' component={LoginScreen} exact></Route>
          <Route path='/register' component={RegisterScreen} exact></Route>
          <Route path='/profile' component={ProfileScreen} exact></Route>
          <Route path='/admin/products' component={ProductListAdminScreen} exact></Route>
          <Route path='/admin/users' component={UserListScreen} exact></Route>
          <Route path='/admin/orders' component={OrderListScreen} exact></Route>
          <Route path='/admin/view/order/:id/:name' component={OrderScreenById} exact></Route>
          <Route path='/admin/user/:id/edit' component={EditScreen} exact></Route>
          <Route path='/admin/update/order/:id' component={OrderEditScreen} exact></Route>
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} exact></Route>
          <Route path="/product/:id" component={ProductScreen} exact/>
          <Route path="/admin/addproduct" component={CreateProductScreen} exact></Route>
          <Route path="/cart/:id?" component={CartScreen} /> {/* ? in any path says that the passed parameter in optional */}
          <Route path="/" component={HomeScreen} exact />   {/* component says whichone to open when / achieved and exact syas that excact path is needed */}
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
