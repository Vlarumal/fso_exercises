import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, feefback }) => {
  return <button onClick={onClick}>{feefback}</button>;
};

const App = () => {
  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleGoodClick = () => {
    setClicks({
      ...clicks,
      good: clicks.good + 1,
    });
  };

  const handleNeutralClick = () => {
    setClicks({
      ...clicks,
      neutral: clicks.neutral + 1,
    });
  };

  const handleBadClick = () => {
    setClicks({
      ...clicks,
      bad: clicks.bad + 1,
    });
  };

  return (
    <div>
      <Header text='give feedback' />
      <Button
        onClick={handleGoodClick}
        feefback='good'
      />
      <Button
        onClick={handleNeutralClick}
        feefback='neutral'
      />
      <Button
        onClick={handleBadClick}
        feefback='bad'
      />
      <Header text='statistics' />
      <p>good {clicks.good}</p>
      <p>neutral {clicks.neutral}</p>
      <p>bad {clicks.bad}</p>
    </div>
  );
};

export default App;
