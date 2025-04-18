import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, feedback }) => {
  return <button onClick={onClick}>{feedback}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ clicks, total }) => {
  if (!total) return <p>No feedback given.</p>;

  const calculateAverage = () => {
    const average =
      (clicks.good * 1 + clicks.neutral * 0 + clicks.bad * -1) /
      total;
    return average;
  };

  const calculatePositive = () => {
    const positive = (clicks.good / total) * 100;
    return positive;
  };

  return (
    <table>
      <tbody>
        <StatisticLine
          text='good'
          value={clicks.good}
        />
        <StatisticLine
          text='neutral'
          value={clicks.neutral}
        />
        <StatisticLine
          text='bad'
          value={clicks.bad}
        />
        <StatisticLine
          text='all'
          value={total}
        />
        <StatisticLine
          text='average'
          value={calculateAverage()}
        />
        <StatisticLine
          text='positive'
          value={`${calculatePositive()} %`}
        />
      </tbody>
    </table>
  );
};

const App = () => {
  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const [total, setTotal] = useState(0);

  const increaseTotalByOne = () => {
    setTotal(total + 1);
  };

  const handleGoodClick = () => {
    setClicks({
      ...clicks,
      good: clicks.good + 1,
    });
    increaseTotalByOne();
  };

  const handleNeutralClick = () => {
    setClicks({
      ...clicks,
      neutral: clicks.neutral + 1,
    });
    increaseTotalByOne();
  };

  const handleBadClick = () => {
    setClicks({
      ...clicks,
      bad: clicks.bad + 1,
    });
    increaseTotalByOne();
  };

  return (
    <div>
      <Header text='give feedback' />
      <Button
        onClick={handleGoodClick}
        feedback='good'
      />
      <Button
        onClick={handleNeutralClick}
        feedback='neutral'
      />
      <Button
        onClick={handleBadClick}
        feedback='bad'
      />
      <Header text='statistics' />
      <Statistics
        clicks={clicks}
        total={total}
      />
    </div>
  );
};

export default App;
