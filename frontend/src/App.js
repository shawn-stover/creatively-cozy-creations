// Imports
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Link to="/">Creatively Cozy Creations</Link>
        </header>
        <main>
          <Routes>
            {/* Modular Routing for Scalability */}
            {/* colon allows us to pull an attribute to use as needed, 
            here we are pulling product.slug */}
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
