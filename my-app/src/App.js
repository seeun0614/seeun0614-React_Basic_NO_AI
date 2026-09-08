import { useState } from 'react';

function Square({value, onSquareClick}) {
  return (<button className="square" onClick={onSquareClick}>{value}</button>)
}

function Board({squares, xIsNext, onPlay}) {

  function handleClick(i) {
    const nextSquares = squares.slice();
    if (squares[i] || calculateWinner(squares)) return;
    if (xIsNext) {
      nextSquares[i] = 'X';
    }
    else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = "Winner: " + winner;
  }
  else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
  <>
    <div className = "status">{status}</div>
    <div className="board-row">
{/* 화살표 함수를 사용하는 이유: handleClick(0)을 실행하면 setSquares가 호출되어 컴포넌트가 리랜더링 되고 handleClick(0)가 다시 호출되는 무한 루프에 빠지게 된다. */}
      <Square value = {squares[0]} onSquareClick={() => handleClick(0)}/>
      <Square value = {squares[1]} onSquareClick={() => handleClick(1)}/>
      <Square value = {squares[2]} onSquareClick={() => handleClick(2)}/>
    </div>
    <div className="board-row">
      <Square value = {squares[3]} onSquareClick={() => handleClick(3)}/>
      <Square value = {squares[4]} onSquareClick={() => handleClick(4)}/>
      <Square value = {squares[5]} onSquareClick={() => handleClick(5)}/>
    </div>
    <div className="board-row">
      <Square value = {squares[6]} onSquareClick={() => handleClick(6)}/>
      <Square value = {squares[7]} onSquareClick={() => handleClick(7)}/>
      <Square value = {squares[8]} onSquareClick={() => handleClick(8)}/>
    </div>
  </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]); //history[0] == [null, null, null ...]
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove+1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }
  
  function jumpTo(nextMove){
    // currentMove를 변경하면 currentMove를 사용하는 currentSquares가 변경되고 결과적으로 Board가 리렌더링 된다. 
    // state가 변할때 Game 컴포넌트 전체가 리렌더링 되지만 해당 함수에서 history 값은 변하지 않으므로 
    // history.map()으로 그려지는 list는 변하지 않는것이 정상이다.
    setCurrentMove(nextMove); 
    setXIsNext(nextMove%2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    }
    else {
      description = "Go to game start";
    }

    return (
    <li key={move}>
      <button onClick={() => jumpTo(move)}>{description}</button>
    </li>
    )
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} xIsNext={xIsNext} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  ) 

}
