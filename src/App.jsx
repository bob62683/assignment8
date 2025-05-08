import { useState } from 'react'
import { Routes, Route, Link, useParams } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

//////////////////////////////////////////////////////
/// Random Number is on console for easier testing ///
//////////////////////////////////////////////////////

function MyRouteApp({ maxGuesses, setMaxGuesses, maxNum, setMaxNum, setWins, wins }) {
  const [numGuesses, setNumGuesses] = useState(0);
  const [curGuess, setCurGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(false);
  const [randNum, setRandNum] = useState(Math.floor(Math.random() * maxNum));
  const [totGuesses, setTotGuesses] = useState(0);
  console.log(randNum)

	return (
		<>
			<Routes>
				<Route path="/" element={<Home 
                                  maxGuesses={maxGuesses} 
                                  maxNum={maxNum} 
                                  randNum={randNum}
                                  setRandNum={setRandNum}  
                                  setWins={setWins} 
                                  wins={wins}
                                  numGuesses={numGuesses}
                                  setNumGuesses={setNumGuesses}
                                  curGuess={curGuess}
                                  setCurGuess={setCurGuess}
                                  guesses={guesses}
                                  setGuesses={setGuesses}
                                  gameOver={gameOver}
                                  setGameOver={setGameOver}
                                  totGuesses={totGuesses} 
                                  setTotGuesses={setTotGuesses}
                                  winner={winner}
                                  setWinner={setWinner}
                                />} 
        />
				<Route path="/settings" element={<Settings maxGuesses={maxGuesses} setMaxGuesses={setMaxGuesses} maxNum={maxNum} setMaxNum={setMaxNum}/>} />      
				<Route path="/stats" element={<Stats wins={wins} totGuesses={totGuesses} setTotGuesses={setTotGuesses} />} />
				<Route path="*" element={<My404 />} />
			</Routes>
		</>
	)
}

function Home({maxGuesses, maxNum, randNum, setRandNum, setWins, wins, numGuesses, setNumGuesses, curGuess, setCurGuess, guesses, setGuesses, gameOver, setGameOver, totGuesses, setTotGuesses, winner, setWinner }) {
  return (
    <>
      <Nav />
      <h1>Welcome to the number guessing game!</h1>
      <h2>Rules:</h2>
      <ol className="rules-list">
        <li>Max Guesses: {maxGuesses}</li>
        <li>Value range is: 0 - {maxNum}</li>        
        <li>Guess outside the range, you lose!</li>
      </ol>
      <Game randNum={randNum}
            setRandNum={setRandNum}  
            maxNum={maxNum} 
            maxGuesses={maxGuesses} 
            setWins={setWins} 
            wins={wins}
            numGuesses={numGuesses}
            setNumGuesses={setNumGuesses}
            curGuess={curGuess}
            setCurGuess={setCurGuess}
            guesses={guesses}
            setGuesses={setGuesses}
            gameOver={gameOver}
            setGameOver={setGameOver}
            totGuesses={totGuesses} 
            setTotGuesses={setTotGuesses}
            winner={winner}
            setWinner={setWinner}
      />
      <Footer />
    </>
  )
}

function Settings({ maxGuesses, setMaxGuesses, maxNum, setMaxNum }) {
  return  (    
    <>
      <Nav />
      <h1>Game Settings</h1>
      <div id='max-guesses'>
        <p>Max guesses is: {maxGuesses}</p>
        Set new max guesses: <input id='max-guess-input' type='text' name='name' value ={maxGuesses}
        onChange={(e) => setMaxGuesses(e.target.value)}></input>
      </div>
      <br />
      <div id='max-value'>
        <p>Value range is: 0 - {maxNum}</p>
        Set new max value: <input id='max-value-input' type='text' name='name' value ={maxNum}
        onChange={(e) => setMaxNum(e.target.value)}></input>
      </div>
      <Footer />
    </>

  )
}

function Stats({wins, totGuesses}) {
  //
  return  (    
    <>
      <Nav />
      <h1>Game Stats</h1>
      <div id='stats'>        
        <p>{wins.length} Wins!</p>
        {wins.length > 0 && <p>Average Number of Guesses: {totGuesses/wins.length}</p>} 
        {wins.map((w, i) => <ul className='guess-list' key={i}><li key={i+'a'}>Date: {w.date}</li><li key={i+'b'}>Num Guess: {w.guess}</li><li key={i+'c'}>Result: {w.result}</li></ul>)}  
      </div>
      <Footer />
    </>
  )
}

function My404() {
  return  (
    <>
      <Nav />
      <div id='my404'>
        <h1>404 - Not Found</h1>
      </div>
      <Footer />
    </>
  )
}

function Nav() {
  return (
    <ul id='main-nav'>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/settings'>Game Settings</Link></li>
      <li><Link to='/stats'>Game Stats</Link></li>
    </ul>
  )
}

function Footer() {
  return (
    <footer id="main-footer">
      <p>© 2025 Number Guessing Game. All rights reserved.</p>
    </footer>
  )
}

function Game({ maxGuesses, maxNum, randNum, setRandNum, setWins, numGuesses, setNumGuesses, curGuess, setCurGuess, guesses, setGuesses, gameOver, setGameOver, totGuesses, setTotGuesses, winner, setWinner }) {
  function handleNewGuess(e) {
    e.preventDefault();
    if (gameOver) {
      return;
    }
    const guessNum = parseInt(curGuess);
    if (isNaN(guessNum)) {
      alert('Please enter a valid number!');
      return;
    }
    let result = '';
    if (guessNum < 0 || guessNum > maxNum) {
      result = 'You lose!';
      setGameOver(true);
    } else if (guessNum < randNum && guessNum >= 0) {
      result = 'Too low!';
    } else if (guessNum > randNum && guessNum <= maxNum) {
      result = 'Too high!';
    } else if (guessNum == randNum) {
      result = 'You won!';
      setWins((w) => [...w, { guess: numGuesses + 1, result, date: new Date().toLocaleString()}])
      setTotGuesses((n) => n+numGuesses+1)
      setGameOver(true);
      setWinner(true);
    }
    if (numGuesses + 1 >= maxGuesses && guessNum !== randNum) {
      setGameOver(true);
    }
    setGuesses((g) => [...g, { guess: guessNum, result}])
    setCurGuess('')
    setNumGuesses((n) => n+1) 
    
  }

  function startOver(e) {
    e.preventDefault();
    setNumGuesses(0);
    setCurGuess('');
    setGuesses([]);
    setGameOver(false);
    setWinner(false);
    setRandNum(Math.floor(Math.random() * maxNum))
  }
  return (
    <>
      {winner && <div id='congratulations'>Congratulations!!! You Guessed Correctly!!</div>}
      {gameOver && !winner && <div id='sorry'>Sorry!! You lost!!</div>}
      <div id="game-container">
        <p>My guess is:</p>
        <input type="text" id="guess-input" value={curGuess} onChange={(e) => setCurGuess(e.target.value)}/>
        <br />
        <button id="guess-button" onClick={(e) => handleNewGuess(e)}>Guess!</button>
        {guesses.length > 0 && <ul className='guess-list'>
          {guesses.map((g, i) => <li key={i}>{g.guess} - {g.result}</li>)}
        </ul>}
        {gameOver && !winner &&<p className='game-over'>Random number: {randNum}</p>}
        <p>Number of guesses: {numGuesses}</p>
        <p>Guesses Remaining: {maxGuesses - numGuesses}</p>
        {gameOver && <button id="start-button" onClick={(e) => startOver(e)}>Start Over!</button>}
      </div>
    </>
  );
}

function App() {
  const [maxGuesses, setMaxGuesses] = useState(5);
  const [maxNum, setMaxNum] = useState(100);
  const [wins, setWins] = useState([]);
  //const randNum = Math.floor(Math.random() * maxNum);

  return (    
    <>
      <Router>
          <MyRouteApp 
            maxGuesses={maxGuesses}
            setMaxGuesses={setMaxGuesses}
            maxNum={maxNum}
            setMaxNum={setMaxNum}
            //randNum={randNum}
            setWins={setWins}
            wins={wins}
          />
      </Router>
    </>
  )
}

export default App
