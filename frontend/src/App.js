import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Container } from 'react-bootstrap';
import { HomeScreen } from './screens/HomeScreen';
import { ProductScreen } from './screens/ProductScreen';
import { CartScreen } from './screens/CartScreen';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path="/" component={HomeScreen} exact />   {/* component says whichone to open when / achieved and exact syas that excact path is needed */}
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} /> {/* ? in any path says that the passed parameter in optional */}
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
