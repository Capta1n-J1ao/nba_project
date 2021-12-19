import React, {useState, useEffect} from "react";
import Axios from 'axios';
import './Pages.css';


function App() {
  const [userID, setUserID] = useState(1);

  const [playersList, setPlayersList] = useState([]);
  useEffect(() => {
    Axios.get(`http://localhost:3002/api/get`)
    .then((response) => {
      console.log(response.data)
      setPlayersList(response.data)
    })
  },[])
  
  const [search, setSearch] = useState('');
  const handleChange = e => {
    setSearch(e.target.value);
  };

  // TODO: Add a new player to the team
  const addPlayerToTeam = (userID, pID) => {
    Axios.put(`http://localhost:3002/api/update/add_player`, {
        userID: userID,
        pID: pID,
    });
  };

  const filteredPlayers = playersList.filter(player =>
    player.pName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <div className='player-search'>
        <h1 className='player-text'>Search for Players</h1>
        <form>
          <input
            className='player-input'
            type='text'
            onChange={handleChange}
            placeholder='Search Player'
          />
        </form>
      </div>

      {filteredPlayers.map(player =>
        <div
          key={player.pID}> 
          <div className = "card1">
            <p> Name <br /> {player.pName}</p>
            <p>Player_ID <br /> {player.pID}</p>
            <p>Season <br /> {player.pAttr}</p>
            <p>TeamID <br /> {player.teamID}</p>
            <p>Position <br /> {player.pPos}</p>
            <p>Overall <br /> {player.overall}</p>
            <p>InsideScore <br /> {player.insideScore}</p>
            <p>OutsideScore <br /> {player.outsideScore}</p>
            <p>Athleticism <br /> {player.athleticism}</p>
            <p>PlayMaking <br /> {player.playMaking}</p>
            <p>Rebounding <br /> {player.rebounding}</p>
            <p>Defending <br /> {player.defending}</p>
            <button onClick={() => { addPlayerToTeam(userID, player.pID) }}> Add to Team</button>
            </div>
        </div>
      )}
    </div>
  );
}

export default App;