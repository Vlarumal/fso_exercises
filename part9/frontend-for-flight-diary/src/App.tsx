import React, { useEffect, useState } from 'react';
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

  const notify = (message: string, duration: number = 5000) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, duration);
  };

  const diaryEntryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!date || !visibility || !weather) {
      notify('Please check for empty fields');
      return;
    }

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
              notify(messages, 7000);
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

  const handleVisibilityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const valueOfVisibility = event.target.value;
    if (
      Object.values(Visibility).includes(
        valueOfVisibility as Visibility
      )
    )
      setVisibility(valueOfVisibility as Visibility);
  };

  const handleWeatherChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const valueOfWeather = event.target.value;
    if (Object.values(Weather).includes(valueOfWeather as Weather))
      setWeather(valueOfWeather as Weather);
  };

  return (
    <div>
      <form onSubmit={diaryEntryCreation}>
        <h2>Add new Entry</h2>
        <div style={{ color: 'red' }}>{errorMessage}</div>
        <label htmlFor='date'>date </label>
        <input
          value={date}
          type='date'
          id='date'
          onChange={(event) => setDate(event.target.value)}
        />
        <br />
        <div>
          Visibility:{' '}
          {Object.values(Visibility).map((value) => (
            <span key={value}>
              <label htmlFor={value}> {value}</label>
              <input
                type='radio'
                id={value}
                name='visibility'
                value={value}
                checked={visibility === value}
                onChange={handleVisibilityChange}
              />
            </span>
          ))}
        </div>
        <div>
          Weather:{' '}
          {Object.values(Weather).map((value) => (
            <span key={value}>
              <label htmlFor={value}> {value}</label>
              <input
                type='radio'
                id={value}
                name='weather'
                value={value}
                checked={weather === value}
                onChange={handleWeatherChange}
              />
            </span>
          ))}
        </div>
        <label htmlFor='comment'>comment: </label>
        <input
          type='text'
          id='comment'
          name='comment'
          value={comment}
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
