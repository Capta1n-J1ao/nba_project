import React, {useState, useEffect} from "react";
import Axios from 'axios';
import './Pages.css';

function App() {
  const [userID, setUserID] = useState(1);

  const [pID, setpID] = useState('');
  const [pAttr, setpAttr] = useState('');
  const [pName, setpName] = useState('');
  const [teamID, setteamID] = useState('');
  const [pPos, setpPos] = useState('');
  const [pHeight, setpHeight] = useState('');
  const [pWeight, setpWeight] = useState('');
  const [overall, setoverall] = useState('');
  const [insideScore, setinsideScore] = useState('');
  const [outsideScore, setoutsideScore] = useState('');
  const [athleticism, setathleticism] = useState('');
  const [playMaking, setplayMaking] = useState('');
  const [rebounding, setrebounding] = useState('');
  const [defending, setdefending] = useState('');

  // Done: Insert/Update a player's information
  const modifyPlayer = (
      pID,
      pAttr,
      pName,
      teamID,
      pPos,
      pHeight,
      pWeight,
      overall,
      insideScore,
      outsideScore,
      athleticism,
      playMaking,
      rebounding,
      defending
    ) => {
    Axios.post(`http://localhost:3002/api/modify/player`, {
        pID: pID,
        pAttr: pAttr,
        pName: pName,
        teamID: teamID,
        pPos: pPos,
        pHeight: pHeight,
        pWeight: pWeight,
        overall: overall,
        insideScore: insideScore,
        outsideScore: outsideScore,
        athleticism: athleticism,
        playMaking: playMaking,
        rebounding: rebounding,
        defending: defending
    });
  };

  // Done: Delete a player from the DataBase
  const deletePlayer = (pID) => {
    Axios.put("http://localhost:3002/api/update/remove_player", {
      pID: pID,
    });
  };


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

  const filteredPlayers = playersList.filter(player =>
    player.pName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h1> Player Modification</h1>
      <div className="player_update">
        <label> Name</label>
        <input type="text" name="pName" onChange={(e) => {
          setpName(e.target.value)
          console.log({pName})
        } }/>
        <label> Player_ID</label>
        <input type="text" name="pID" onChange={(e) => {
          setpID(e.target.value)
          console.log({pID})
        } }/>
        <label> Season</label>
        <input type="text" name="pAttr" onChange={(e) => {
          setpAttr(e.target.value)
          console.log(pAttr)
        }}/>
        <label> teamID</label>
        <input type="text" name="teamID" onChange={(e) => {
          setteamID(e.target.value)
          console.log(teamID)
        }}/>
        <label> Position</label>
        <input type="text" name="pPos" onChange={(e) => {
          setpPos(e.target.value)
          console.log(pPos)
        }}/>
        <label> pHeight</label>
        <input type="text" name="pHeight" onChange={(e) => {
          setpHeight(e.target.value)
          console.log(pHeight)
        }} />
        <label> pWeight</label>
        <input type="text" name="pWeight" onChange={(e) => {
          setpWeight(e.target.value)
          console.log(pWeight)
        }} />
        <label> Overall</label>
        <input type="text" name="overall" onChange={(e) => {
          setoverall(e.target.value)
          console.log(overall)
        }}/>

        <br/>

        <label> InsideScore</label>
        <input type="text" name="insideScore" onChange={(e) => {
          setinsideScore(e.target.value)
          console.log(insideScore)
        }}/>
        <label> OutsideScore</label>
        <input type="text" name="outsideScore" onChange={(e) => {
          setoutsideScore(e.target.value)
          console.log(outsideScore)
        }}/>
        <label> Athleticism</label>
        <input type="text" name="athleticism" onChange={(e) => {
          setathleticism(e.target.value)
          console.log(athleticism)
        }}/>
        <label> PlayMaking</label>
        <input type="text" name="playMaking" onChange={(e) => {
          setplayMaking(e.target.value)
          console.log(playMaking)
        }}/>
        <label> Rebounding</label>
        <input type="text" name="rebounding" onChange={(e) => {
          setrebounding(e.target.value)
          console.log(rebounding)
        }}/>
        <label> Defending</label>
        <input type="text" name="defending" onChange={(e) => {
          setdefending(e.target.value)
          console.log(defending)
        }}/>
        <br/>
        
        <button onClick={() => {
          console.log(
            pID,
            pAttr,
            pName,
            teamID,
            pPos,
            pHeight,
            pWeight,
            overall,
            insideScore,
            outsideScore,
            athleticism,
            playMaking,
            rebounding,
            defending
          )
          modifyPlayer(
            pID,
            pAttr,
            pName,
            teamID,
            pPos,
            pHeight,
            pWeight,
            overall,
            insideScore,
            outsideScore,
            athleticism,
            playMaking,
            rebounding,
            defending
          ); window.location.reload();
        }}> Modify</button>
      </div>

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
            <button onClick={() => { deletePlayer(player.pID); window.location.reload(); }}> Delete</button>
            </div>
        </div>
      )}
    </div>
  );
}

export default App;
