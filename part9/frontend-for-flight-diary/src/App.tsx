import { useEffect, useState } from 'react';
import { DiaryEntry } from './types';
import axios from 'axios';

function App() {
  // const [newDiaryEntry, setNewDiaryEntry] = useState({});
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios
      .get<DiaryEntry[]>('http://localhost:3000/api/diaries')
      .then((response) => {
        setDiaryEntries(response.data);
      });
  }, []);

  return (
    <div>
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
