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
import { EditScreen } from './screens/EditScreen';
import { ProductEditScreen } from './screens/ProductEditScreen';
import { ProductListAdminScreen } from './screens/ProductListAdminScreen';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/order/:id' component={OrderScreen}></Route>
          <Route path='/shipping' component={ShippingScreen}></Route>
          <Route path='/payment' component={PaymentScreen}></Route>
          <Route path='/placeorder' component={PlaceorderScreen}></Route>
          <Route path='/login' component={LoginScreen}></Route>
          <Route path='/register' component={RegisterScreen}></Route>
          <Route path='/profile' component={ProfileScreen}></Route>
          <Route path='/admin/products' component={ProductListAdminScreen}></Route>
          <Route path='/admin/users' component={UserListScreen}></Route>
          <Route path='/admin/user/:id/edit' component={EditScreen}></Route>
          <Route path='/admin/product/:id/edit' component={ProductEditScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} /> {/* ? in any path says that the passed parameter in optional */}
          <Route path="/" component={HomeScreen} exact />   {/* component says whichone to open when / achieved and exact syas that excact path is needed */}
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
