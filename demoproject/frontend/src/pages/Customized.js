import {useContext, useEffect, useState } from 'react';
import { Modal, Button, Alert} from 'react-bootstrap';
import Axios from 'axios';
import './Pages.css';
import AddForm from '../components/AddForm/AddForm.js';
import Pagination from '../components/Pagination/Pagination.js';
// import MaterialIcon from 'react-google-material-icons'
import * as FaIcons from 'react-icons/ri';
import * as AiIcons from 'react-icons/ai';


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

    // by Damon Stage5
    const [showAlert, setShowAlert] = useState(false);

    const [show, setShow] = useState(false);
      
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
  
    const handleShowAlert = () => {
      setShowAlert(true);
      setTimeout(()=> {
          setShowAlert(false);
      }, 2000)
    }
    useEffect(() => {
      handleClose();
  
      return () => {
          handleShowAlert();
      }
    }, [playersList])

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [playerPerPage] = useState(20);
    const indexOfLastPlayer = currentPage * playerPerPage;
    const indexOfFirstPlayer = indexOfLastPlayer - playerPerPage;
    const currentPlayer = playersList.slice(indexOfFirstPlayer, indexOfLastPlayer);
    console.log(currentPlayer);
    const totalPagesNum = Math.ceil(playersList.length / playerPerPage);
  
  const [search, setSearch] = useState('');
  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredPlayers = currentPlayer.filter(player =>
    player.pName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    // <div>
    <div className="App">
    <div className="table-title">
        <div className="row">
            <div className="col-sm-6">
                <h1>Player <b>Modification</b></h1> 
            </div>
            <div className="col-sm-6">
                <Button onClick={handleShow} className="btn btn-act" data-toggle="modal"><AiIcons.AiFillEdit /><span>Player Modification</span></Button>					
            </div>
        </div>
        
    </div>

    <Alert show={showAlert} variant="dark">
        PlayerList has been updated to latest version!
    </Alert>

    


      {/* Button style need optimization */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>
                Customized Player
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <AddForm />
        </Modal.Body>
        <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
        </Modal.Footer>
    </Modal>

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
            {/* <button onClick={() => { deletePlayer(player.pID); window.location.reload(); }}> Delete</button> */}
            <button onClick={() => deletePlayer(player.pID)}  className="btn btn-act" data-toggle="modal"><FaIcons.RiDeleteBin5Line /></button>
            </div>
        </div>
      )}
      <Pagination pages = {totalPagesNum}
                setCurrentPage={setCurrentPage}
                currentPlayer ={currentPlayer}
                playersList = {playersList} />
    </div>
    
    // </div>
  );
}

export default App;
