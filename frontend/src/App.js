// Imports
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/ProductScreen.js';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import { useContext } from 'react';
import { Store } from './Store.js';

function App() {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar className="color-nav">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand className="color-brand">
                  Creatively Cozy Creations
                </Navbar.Brand>
              </LinkContainer>
              <Nav classLink="me-auto">
                <Link to="/cart" className="nav-Link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="primary">
                      {cart.cartItems.length}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              {/* Modular Routing for Scalability */}
              {/* colon allows us to pull an attribute to use as needed, 
              here we are pulling product.slug */}
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All Rights Reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
