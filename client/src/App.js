import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store'; // Changed to named import
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Blogs from './pages/Blogs';
import BlogDetails from './components/Blog/BlogDetails';
import Profile from './pages/Profile';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProtectedRoute from './components/Common/ProtectedRoute';
import BlogForm from './components/Blog/BlogForm';

import './styles/App.css';
import './styles/animations.css';

function App() {
  return (
    <Provider store={store}> {/* Use the named export */}
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/new" element={<ProtectedRoute><BlogForm /></ProtectedRoute>} />
              <Route path="/blogs/:id/edit" element={<ProtectedRoute><BlogForm /></ProtectedRoute>} />
              <Route path="/blogs/:id" element={<BlogDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;