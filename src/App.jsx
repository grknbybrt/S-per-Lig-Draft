
import React, { useState } from 'react';

const teams = [
  "Gaziantep", "Sivasspor", "Samsunspor", "Eyüpspor", "Çaykur Rizespor", "Kayserispor",
  "Galatasaray", "Kasımpaşa", "Antalyaspor", "Hatayspor", "Konyaspor", "Alanyaspor",
  "Fenerbahçe", "Trabzonspor", "Göztepe", "Bodrumspor", "Başakşehir", "Beşiktaş"
];

// Example: Small player list for sample (user will use real list)
const initialPlayers = [
  { name: 'V. Osimhen', positions: ['ST'], ovr: 87, pot: 89 },
  { name: 'L. Torreira', positions: ['MDO', 'MO'], ovr: 83, pot: 83 },
  { name: 'Y. En-Nesyri', positions: ['ST'], ovr: 83, pot: 84 },
  { name: 'Rafa', positions: ['MOO', 'ST'], ovr: 83, pot: 83 },
  { name: 'D. Sánchez', positions: ['STP'], ovr: 82, pot: 82 },
];

const formationNeeds = ['KL', 'STP', 'STP', 'SLB', 'SĞB', 'MDO', 'MDO', 'MOO', 'MOO', 'MOO', 'ST'];

export default function App() {
  const [rosters, setRosters] = useState(Object.fromEntries(teams.map(t => [t, []])));
  const [currentPickIndex, setCurrentPickIndex] = useState(0);
  const [availablePlayers, setAvailablePlayers] = useState(initialPlayers);
  const [lastPickedPlayer, setLastPickedPlayer] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const currentTeam = teams[currentPickIndex % teams.length];
  const currentRound = Math.floor(currentPickIndex / teams.length) + 1;
  const currentPickInRound = (currentPickIndex % teams.length) + 1;

  const handleNextPick = () => {
    if (availablePlayers.length === 0) return;

    const nextPlayer = availablePlayers[0];
    setRosters(prev => ({
      ...prev,
      [currentTeam]: [...prev[currentTeam], nextPlayer],
    }));
    setAvailablePlayers(prev => prev.slice(1));
    setLastPickedPlayer({ ...nextPlayer, team: currentTeam });
    setCurrentPickIndex(prev => prev + 1);
  };

  return (
    <div className={`p-6 font-sans min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Süper Lig Draft Simulator</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 border rounded text-sm shadow hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <div className="mb-6 flex gap-4 items-center">
        <button
          onClick={handleNextPick}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          Next Pick
        </button>
        <span className="text-lg font-medium bg-black text-lime-400 px-2 py-1 rounded">
          <strong>{currentTeam}</strong> - Round {currentRound}, Pick {currentPickInRound}
        </span>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Draft Order</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {teams.map((team, i) => (
            <div key={team} className={`px-3 py-1 rounded-full text-sm border ${i === currentPickIndex % teams.length ? 'bg-yellow-300 font-semibold' : darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
              {i + 1}. {team}
            </div>
          ))}
        </div>
      </div>

      {lastPickedPlayer && (
        <div className="bg-green-200 p-4 rounded mb-6 shadow">
          <p className="font-semibold">Last Pick:</p>
          <p>{lastPickedPlayer.team} selected <strong>{lastPickedPlayer.name}</strong></p>
          <p>{lastPickedPlayer.positions.join(" / ")} ({lastPickedPlayer.ovr}/{lastPickedPlayer.pot})</p>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Available Players</h2>
        <div className="max-h-64 overflow-y-auto border rounded p-2">
          {availablePlayers.map((p, idx) => (
            <div key={idx} className={`border-b py-1 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <p className="font-medium text-sm">{p.name}</p>
              <p className="text-xs">{p.positions.join(" / ")} ({p.ovr}/{p.pot})</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4">
        {teams.map(team => (
          <div key={team} className={`border p-2 rounded shadow ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
            <h2 className="font-semibold text-lg mb-1">{team}</h2>
            <ul>
              {rosters[team].map((p, idx) => (
                <li key={idx}>{idx + 1}. {p.name} - {p.positions.join("/")} ({p.ovr}/{p.pot})</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
