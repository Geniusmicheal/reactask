import './App.css';
import Header from './components/header/Header';
import Alert from './components/Alert';
import Body from './components/body/Body';
import ServiceContextState_ from './Service';



function App() {
  return (
    <div className="container">
      <ServiceContextState_>
        <Header/>
        <Alert/>
        <Body/>
      </ServiceContextState_>
    </div>
  );
}

export default App;
