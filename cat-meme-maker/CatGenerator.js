import React, {useState, useEffect} from "react"

function CatGenerator() {
    const [cat, setCat] = useState("https://i.imgur.com/sjL6mS5.gif");
    const [topText, setTopText] = useState("");
    const [botText, setBotText] = useState("");
    const [allBreeds, setAllBreeds] = useState([{label: "Random Breed", value: "Random Breed"}]);
    const [breed, setBreed] = useState("Random Breed");
    
    function fetchBreeds() {
        return (
            fetch("https://api.thecatapi.com/v1/breeds")
                .then(response => response.json())
                .then(response => setAllBreeds(
                    response.map(({name, id}) => ({label: name, value: id}))
                )
            )
        )
    }
    
    function fetchCat() {
        if (breed === "Random Breed") {
            return (
                fetch("https://api.thecatapi.com/v1/images/search")
                    .then(response => response.json())
                    .then(response => setCat(response[0].url))
            )
        } else {
            return (
                fetch("https://api.thecatapi.com/v1/images/search?breed_id=" + breed)
                    .then(response => response.json())
                    .then(response => setCat(response[0].url))
            )
        }
    }
    
    useEffect(() => {
        fetchBreeds();
        fetchCat();
    }, []);
    
    function handleSubmit() {
        event.preventDefault();
        fetchCat();
    }
    
    function handleText(event) {
        const {name, value} = event.target;
        name === "topText" ? setTopText(value) : setBotText(value);
    }
    
    function handleBreed(event) {
        setBreed(event.currentTarget.value);
    }
    
    return (
        <div>
            <form className="text-form" onSubmit={handleSubmit}>
                <input 
                    name="topText" 
                    placeholder="Top Text"
                    value={topText}
                    onChange={handleText}
                />
                <input 
                    name="botText" 
                    placeholder="Bottom Text"
                    value={botText}
                    onChange={handleText}
                />
                <button>Next Cat!</button>
                <div className="break"> </div>
                <select 
                    value={breed}
                    onChange={handleBreed}
                >
                    <option key="Random Breed" value="Random Breed">
                        Random Breed
                    </option>
                    {allBreeds.map(({label, value}) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
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