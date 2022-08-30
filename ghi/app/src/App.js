import './App.css';
import {BrowserRouter} from 'react-router-dom';

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, 'lyra/');
  return (
    <BrowserRouter basename={basename}>
      {
      <div className="App">
        <header className="App-header">
          <p>
            LYRA TEST PAGE
          </p>
        </header>
      </div>
      }
    </BrowserRouter>
  );
}

export default App;
