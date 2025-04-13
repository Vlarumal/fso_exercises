import { useEffect, useState } from 'react';
import {
  DiaryEntry,
  NewDiaryEntry,
  Visibility,
  Weather,
} from './types';
import {
  createDiaryEntry,
  getAllDiaryEntries,
} from './services/diaryService';
import axios from 'axios';

function App() {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(
    Visibility.Good
  );
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState('');
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    null
  );

  useEffect(() => {
    getAllDiaryEntries().then((data) => {
      setDiaryEntries(data);
    });
  }, []);

  const diaryEntryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiaryEntryToAdd: NewDiaryEntry = {
      date,
      visibility,
      weather,
      comment,
    };
    createDiaryEntry(newDiaryEntryToAdd)
      .then((data) => {
        setDiaryEntries(diaryEntries.concat(data));
        clearFields();
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error)) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            const axiosErrorMessages = error.response.data.error;
            if (Array.isArray(axiosErrorMessages)) {
              const messages = axiosErrorMessages
                .map((error) => error.message)
                .join('; ');
              setErrorMessage(messages);
              setTimeout(() => { setErrorMessage(null) }, 7000)
            }
          }
        }
      });
  };

  const clearFields = () => {
    setDate('');
    setVisibility(Visibility.Good);
    setWeather(Weather.Sunny);
    setComment('');
  };

  return (
    <div>
      <form onSubmit={diaryEntryCreation}>
        <h2>Add new Entry</h2>
        <div style={{ color: 'red' }}>{errorMessage}</div>
        <label htmlFor='date'>date </label>
        <input
          value={date}
          id='date'
          onChange={(event) => setDate(event.target.value)}
        />
        <br />
        <label htmlFor='visibility'>visibility </label>
        <input
          value={visibility}
          id='visibility'
          onChange={(event) =>
            setVisibility(event.target.value as Visibility)
          }
        />
        <br />
        <label htmlFor='weather'>wether </label>
        <input
          value={weather}
          id='weather'
          onChange={(event) =>
            setWeather(event.target.value as Weather)
          }
        />
        <br />
        <label htmlFor='comment'>comment </label>
        <input
          value={comment}
          id='comment'
          onChange={(event) => setComment(event.target.value)}
        />
        <br />
        <button type='submit'>add</button>
      </form>
      <h2>Diary entries</h2>
      <ul>
        {diaryEntries.map((dEntry) => (
          <li key={dEntry.id}>
            <strong>{dEntry.date}</strong>
            <br />
            <div>{dEntry.visibility}</div>
            <div>{dEntry.weather}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
