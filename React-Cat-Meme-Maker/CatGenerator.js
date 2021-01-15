import React, {useState, useEffect} from "react"

function CatGenerator() {
    const [cat, setCat] = useState("https://i.imgur.com/sjL6mS5.gif");
    const [topText, setTopText] = useState("");
    const [botText, setBotText] = useState("");
    
    function fetchCat() {
        return (
            fetch("https://api.thecatapi.com/v1/images/search")
                .then(response => response.json())
                .then(response => setCat(response[0].url))
        )
    }
    
    useEffect(() => {
        fetchCat()
    }, []);
    
    function handleSubmit() {
        event.preventDefault();
        fetchCat();
    }
    
    function handleChange(event) {
        const {name, value} = event.target;
        name === "topText" ? setTopText(value) : setBotText(value);
    }
    
    return (
        <div>
            <form className="text-form" onSubmit={handleSubmit}>
                <input 
                    name="topText" 
                    placeholder="Top Text"
                    value={topText}
                    onChange={handleChange}
                />
                <input 
                    name="botText" 
                    placeholder="Bottom Text"
                    value={botText}
                    onChange={handleChange}
                />
                <button>Next Cat!</button>
            </form>
            <div className="cat-img">
                <img src={cat} />
                <h2 className="top-text">{topText}</h2>
                <h2 className="bot-text">{botText}</h2>
            </div>
        </div>
    )
}

export default CatGenerator