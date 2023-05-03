import './App.css';
// import TypingArea from './components/TypingArea';
import Game from './components/Game';

function App() {
  return (
    <div className="App">
      <main className="App-sentence">
        {/* <TypingArea sentence="Hello world bye said good bad sugar honey ice tea sister family country color from at the" cursorPosition={5} /> */}
        <Game />
      </main>
    </div>
  );
}

export default App;
