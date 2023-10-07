import './App.css';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <>
      <div className="App">
        <h1>Register</h1>
        <Register />
        <hr />
        <h1>Login</h1>
        <Login />
      </div>
    </>
  );
}

export default App;
