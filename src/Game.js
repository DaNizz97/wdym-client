import {useLocation} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import configData from "./config.json";

function Game() {
    const {state} = useLocation()
    const {code, name, type, players} = state
    const [img, setImg] = useState('')

    useEffect(() => {
        let serverUrl = configData.SERVER_URL;
        fetch(serverUrl)
            .then(response => response.arrayBuffer())
            .then(data => {
                const blob = new Blob([data], {type: "image/jpeg"});
                let s = URL.createObjectURL(blob);
                console.log(code + ' --- ' + name + ' --- ' + type + ' --- ')
                setImg(s)
            })
    }, [])

    return (
        <div>
            <img className="centerImg"
                 src={img}
                 alt="meme"
            />
        </div>
    )
}

export default Game