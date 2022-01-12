import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [BTC, setBTC] = useState("");
  const [selected, setSelected] = useState("");
  const handleSelect = (event) => {
    setSelected(event.target.value);
  };
  const onChange = (event) => {
    setBTC(event.target.value);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers").then((response) =>
      response.json().then((json) => {
        setCoins(json);
        setLoading(false);
      })
    );
  }, []);
  return (
    <div>
      <h1>The Coins! ({coins.length})</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <div>
            <label htmlFor="money">How many coins can I get with: </label>
            <input name="money" value={BTC} onChange={onChange}></input>
          </div>
          <label htmlFor="yourCoin">Select your coin </label>
          <select name="yourCoin" onChange={handleSelect} value={selected}>
            {coins.map((coin) => (
              <option>
                {coin.name}({coin.symbol}): {coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          {selected === "" ? null : (
            <h2>
              {parseInt(BTC / parseFloat(selected.split(":")[1].split(" USD")))}
            </h2>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
