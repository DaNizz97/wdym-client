import * as React from "react";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import "./App.css";
import configData from "./config.json"
import Game from "./Game";
import PageNotFound from "./PageNotFound";

function App() {
    return (<div className="App">
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="game/create" element={<CreateGame/>}/>
            <Route path="game/join" element={<JoinGame/>}/>
            <Route path="game/:id" element={<Game/>}/>
            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    </div>);
}

function Main() {
    return (<div className="container">
        <Link to="game/create">
            <button className="custom-btn btn-16">
                Create Game
            </button>
        </Link>
        <Link to="game/join">
            <button className="custom-btn btn-16">
                Join Game
            </button>
        </Link>
    </div>);
}

function CreateGame() {
    const [name, setName] = React.useState('');
    const [type, setType] = React.useState('memes');

    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault();
        let serverUrl = configData.SERVER_URL + 'game/create';
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: name, type: type})
        }
        fetch(serverUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                navigate('/game/' + data.code, {
                    state: {
                        code: data.code,
                        name: name,
                        type: type,
                        players: data.players
                    }
                })
            })
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <br/>
                    <input
                        minLength={3}
                        required={true}
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}/>
                </div>
                <br/>
                <div>
                    <label>Type</label>
                    <br/>
                    <label><input
                        type="radio"
                        name="type"
                        value="memes"
                        checked={type === "memes"}
                        onChange={(e) => setType(e.target.value)}/> Memes </label><br/>
                    <label><input
                        type="radio"
                        name="type"
                        value="situation"
                        checked={type === "situation"}
                        onChange={(e) => setType(e.target.value)}/> Situation </label><br/>
                </div>
                <br/>
                <input className="custom-btn btn-16" type="submit" value="Create"/>
            </form>
        </div>);
}

function JoinGame() {
    return null;
}

export default App