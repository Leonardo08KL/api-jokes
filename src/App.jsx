import { useState, useEffect } from "react";
import "./App.css";

// eslint-disable-next-line react/prop-types
function Joke({ text, type }) {
  return (
    <p
      className="text"
      style={type === "joke" ? { color: "#61dafb" } : { color: "#428022" }}
    >
      {`${text}`}
    </p>
  );
}

// eslint-disable-next-line react/prop-types
function ErrorMessage({ error }) {
  return (
    <p className="error">{error}</p>
  );
}

const LoadingMessage = () => (
  <p className="text">Espere un momento...</p>
);

const App = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [type, setType] = useState("joke");

  const fetchData = async (url, setTypeCallback) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setText(data.data ? data.data[0].quoteText : data.joke);
      setTypeCallback();
    } catch (error) {
      setError(`Ocurrio un error lo siento.`);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "quote") {
      getQuote();
    } else if (selectedValue === "joke") {
      getNewJoke();
    }
  };

  const getNewJoke = () => {
    fetchData("https://icanhazdajoke.com/", () => setType("joke"));
  };

  const getQuote = () => {
    fetchData("https://quote-garden.onrender.com/api/v3/quotes/random", () =>
      setType("quote")
    );
  };

  useEffect(() => {
    getNewJoke();
  }, []);

  return (
    <>
      <h1>Chiste, chiste, chiste</h1>
      <div>
        <img src="src\img\homero.gif" alt="Homero gif" />
      </div>
      <div className="card">
        <div className="dropdown">
          <select onChange={handleSelectChange}>
            <option value="quote">Dame una frase</option>
            <option value="joke">Dame un chiste</option>
          </select>
        </div>
        {loading ? (
          <LoadingMessage />
        ) : (
          <Joke text={text} type={type} />
        )}
        {error && <ErrorMessage error={error} />}
      </div>
    </>
  );
};

export default App;
