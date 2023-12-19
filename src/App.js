import './App.css';
import React from 'react';

function Box({value,pressed}){
  return(
      <button onClick={pressed}>{value}</button>
  )
}

const winningIndexes =[[0,1,2],[3,4,5],[6,7,8], [0,3,6],[1,4,7],[2,5,8], [0,4,8], [2,4,6]];

function App() {

  const [moves, setMoves] = React.useState([]); // saving the number of moves
  const [array, setArray] = React.useState(Array(9).fill('')); // current state
  const [history, setHistory] = React.useState(null); // to erase the history from move .
  const [xValue, setxValue] = React.useState(false); // checks the turn
  const [winner, setWinner] = React.useState(''); 

  const count = React.useRef(0);

  React.useEffect(()=>{

      (function result(){
        console.log(array)
        console.log(moves);
        console.log(count.current)
          for(let each of winningIndexes){
            if(array[each[0]] === array[each[1]] && array[each[1]] === array[each[2]]) {
              setWinner(array[each[0]]) ;
              break;
            }
          }
          
          if (count.current === 9 && winner === '') setWinner('Draw');
      })()
    
  },[array])

  function restart(){
    setMoves([]);
    setArray(Array(9).fill(''));
    setxValue(false);
    setWinner('');
    count.current = 0 ;
  }

  function handleClick(index){

    if(history){

      let movesArray = [...moves] ;
      let slicedArray = movesArray.slice(0,history) ;
      count.current = slicedArray.length ;
      setMoves(slicedArray);
      setArray(slicedArray[slicedArray.length-1].stage) 

      if (xValue){
        let newArray = [...array]; 
        newArray[index] = 'O'
        setArray(newArray);
        setxValue(false)
        
      } 
      else{
        let newArray = [...array]; 
        newArray[index] = 'X'
        setArray(newArray) ;
        setxValue(true)
      } 
      setHistory(null)

    }else{


      if (xValue){
        let newArray = [...array]; 
        newArray[index] = 'O'
        setArray(newArray);
        setxValue(false)
        let newObj = { stage : newArray, roll: count.current+1}
        setMoves([...moves, newObj]);
        
      } 
      else{
        let newArray = [...array]; 
        newArray[index] = 'X'
        setArray(newArray) ;
        setxValue(true)
        let newObj = { stage : newArray, roll: count.current+1}
        setMoves([...moves, newObj]);
      } 

      count.current++ ;
      
      
    }
  }

  function getSelectedMove(roll){
    setHistory(roll)
    const filteredObj = moves.find(each => each.roll === roll)
    console.log(roll)
    setArray(filteredObj.stage);
  }

  return (
    <div className="App">
      <header className="App-header">
      <div className='App'>
        <div className='game'>
          <div>
            <h1>Tic Tac Toe Game</h1>
          </div>
        
          {winner !== '' ?
            <div>
              {winner === 'Draw' ? <h1> Match is Draw </h1> : 
                <h1> Winner is <span style={{color: 'green'}}>{winner}</span></h1>
              }
              
              <button onClick={restart} style={{
              width: '160px',
              marginTop: '20px',
              borderRadius: '10px',
              backgroundColor: 'green'}}> Restart </button>
            </div>
            : 
            <div className='boxContainer'>
              <div className='boxes'>
                <div className='row' >  
                  <Box value={array[0]}  pressed={()=> handleClick(0)}/>
                  <Box value={array[1]} pressed={()=> handleClick(1)}/>
                  <Box value={array[2]}  pressed={()=> handleClick(2)}/>
                </div>
                <div className='row' >
                  <Box value={array[3]} pressed={()=> handleClick(3)}/>
                  <Box value={array[4]} pressed={()=> handleClick(4)}/>
                  <Box value={array[5]} pressed={()=> handleClick(5)}/>
                </div>
                <div className='row' >
                  <Box value={array[6]}  pressed={()=> handleClick(6)}/>
                  <Box value={array[7]} pressed={()=> handleClick(7)}/>
                  <Box value={array[8]}pressed={()=> handleClick(8)}/>
                </div>
                <div>
                  <button onClick={restart} style={{
                    width: '160px',
                    marginTop: '20px',
                    borderRadius: '10px',
                    backgroundColor: 'green'}}> Restart </button>
                </div>
              </div> 

              <div className='moveContainer'>
                {
                  moves.map(each =>(
                    <div key={each.roll}>
                      <button className='move' onClick={()=> getSelectedMove(each.roll)}>{`${each.roll}. Move #${each.roll}`}</button>
                    </div>
                  ))
                }
              </div>

            </div>
            
          }

        </div>
        
       </div>
      </header>
    </div>
  );
}

export default App; 

// list = [{'move':[]},  {'move':{}}]

// history is maintained 
// when button is clicked , it shows the stage. 
// when went back & click new, history got deleted