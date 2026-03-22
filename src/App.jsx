import { useState, useEffect } from 'react';
import './App.css';

const hiraganaData = [
  { char: 'あ', word: 'あり', emoji: '🐜' },
  { char: 'い', word: 'いぬ', emoji: '🐶' },
  { char: 'う', word: 'うさぎ', emoji: '🐇' },
  { char: 'え', word: 'えんぴつ', emoji: '✏️' },
  { char: 'お', word: 'おにぎり', emoji: '🍙' },
  { char: 'か', word: 'かさ', emoji: '☂️' },
  { char: 'き', word: 'きりん', emoji: '🦒' },
  { char: 'く', word: 'くるま', emoji: '🚗' },
  { char: 'け', word: 'けーき', emoji: '🍰' },
  { char: 'こ', word: 'こま', emoji: '🪀' },
  { char: 'さ', word: 'さる', emoji: '🐒' },
  { char: 'し', word: 'しまうま', emoji: '🦓' },
  { char: 'す', word: 'すいか', emoji: '🍉' },
  { char: 'せ', word: 'せっぱんだ', emoji: '🐼' }, // ぱんだ
  { char: 'そ', word: 'そら', emoji: '☁️' }
];

const puzzleData = [
  { word: 'いぬ', emoji: '🐶', options: ['あ', 'い', 'う', 'ぬ', 'め', 'つ'] },
  { word: 'くるま', emoji: '🚗', options: ['く', 'ろ', 'ま', 'め', 'る', 'あ'] },
  { word: 'りんご', emoji: '🍎', options: ['り', 'ん', 'み', 'ご', 'こ', 'る'] },
  { word: 'いちご', emoji: '🍓', options: ['ち', 'い', 'と', 'ご', 'ば', 'あ'] },
];

function Home({ setView }) {
  return (
    <div className="home-menu anim-pop-in">
      <h1 className="title anim-bounce">あそぼう！</h1>
      <button className="btn menu-btn blue" onClick={() => setView('hiragana')}>
        ひらがな タッチ ✨
      </button>
      <button className="btn menu-btn green" onClick={() => setView('puzzle')}>
        ことば パズル 🧩
      </button>
    </div>
  );
}

function HiraganaTap({ onBack }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="app-container anim-pop-in">
      <div className="header">
        <button className="back-btn" onClick={onBack}>⬅</button>
        <h2 style={{color: "var(--primary-color)", fontSize: "2rem"}}>タッチしてね</h2>
        <div style={{width: '60px'}}></div>
      </div>
      
      <div className="hiragana-grid">
        {hiraganaData.map((item, i) => (
          <button 
            key={i} 
            className="btn hiragana-btn"
            style={{backgroundColor: `hsl(${(i * 30) % 360}, 100%, 90%)`}}
            onClick={() => setSelected(item)}
          >
            {item.char}
          </button>
        ))}
      </div>

      {selected && (
        <div className="popup-overlay" onClick={() => setSelected(null)}>
          <div className="popup-content anim-pop-in" onClick={e => e.stopPropagation()}>
            <div className="popup-emoji anim-bounce">{selected.emoji}</div>
            <div className="popup-word">{selected.word}</div>
            <button className="btn" style={{marginTop: '20px'}} onClick={() => setSelected(null)}>
              とじる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function WordPuzzle({ onBack }) {
  const [level, setLevel] = useState(0);
  const [slots, setSlots] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const currentPuzzle = puzzleData[level % puzzleData.length];
  const targetChars = currentPuzzle.word.split('');

  useEffect(() => {
    setSlots([]);
    setIsSuccess(false);
  }, [level]);

  const handlePieceClick = (char) => {
    if (slots.length < targetChars.length && !isSuccess) {
      const newSlots = [...slots, char];
      setSlots(newSlots);

      if (newSlots.length === targetChars.length) {
        if (newSlots.join('') === currentPuzzle.word) {
          setIsSuccess(true);
          setTimeout(() => {
            setLevel(prev => prev + 1);
          }, 2000);
        } else {
          setTimeout(() => setSlots([]), 500);
        }
      }
    }
  };

  return (
    <div className="app-container anim-pop-in">
      <div className="header">
        <button className="back-btn" onClick={onBack}>⬅</button>
        <h2 style={{color: "var(--accent-color)", fontSize: "2rem"}}>ことばをつくろう</h2>
        <div style={{width: '60px'}}></div>
      </div>

      <div className="puzzle-container">
        <div className="puzzle-image-area">
          <div className="puzzle-emoji anim-pulse">{currentPuzzle.emoji}</div>
        </div>

        <div className="puzzle-slots">
          {targetChars.map((_, i) => (
            <div key={i} className={`puzzle-slot ${slots[i] ? 'filled' : ''}`}>
              {slots[i] || ''}
            </div>
          ))}
        </div>

        <div className="puzzle-options">
          {currentPuzzle.options.map((char, i) => (
            <button 
              key={i} 
              className="puzzle-piece"
              onClick={() => handlePieceClick(char)}
              disabled={isSuccess || slots.includes(char)}
            >
              {char}
            </button>
          ))}
        </div>
      </div>

      {isSuccess && (
        <div className="success-banner anim-pop-in anim-bounce">
          せいかい！✨
        </div>
      )}
    </div>
  );
}

function App() {
  const [view, setView] = useState('home');

  return (
    <div className="app-root">
      {view === 'home' && <Home setView={setView} />}
      {view === 'hiragana' && <HiraganaTap onBack={() => setView('home')} />}
      {view === 'puzzle' && <WordPuzzle onBack={() => setView('home')} />}
    </div>
  );
}

export default App;
