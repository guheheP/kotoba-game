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
  { char: 'せ', word: 'せみ', emoji: '🪲' }, 
  { char: 'そ', word: 'そら', emoji: '☁️' }
];

const puzzleWords = [
  { word: 'いぬ', emoji: '🐶' },
  { word: 'ねこ', emoji: '🐱' },
  { word: 'うさぎ', emoji: '🐇' },
  { word: 'くるま', emoji: '🚗' },
  { word: 'りんご', emoji: '🍎' },
  { word: 'いちご', emoji: '🍓' },
  { word: 'ばなな', emoji: '🍌' },
  { word: 'みかん', emoji: '🍊' },
  { word: 'ぶどう', emoji: '🍇' },
  { word: 'めろん', emoji: '🍈' },
  { word: 'すいか', emoji: '🍉' },
  { word: 'もも', emoji: '🍑' },
  { word: 'きゅうり', emoji: '🥒' },
  { word: 'とまと', emoji: '🍅' },
  { word: 'ひこうき', emoji: '✈️' },
  { word: 'でんしゃ', emoji: '🚃' },
  { word: 'ふね', emoji: '🚢' },
  { word: 'じてんしゃ', emoji: '🚲' },
  { word: 'ぱんだ', emoji: '🐼' },
  { word: 'らいおん', emoji: '🦁' },
  { word: 'しまうま', emoji: '🦓' },
  { word: 'いるか', emoji: '🐬' },
  { word: 'かえる', emoji: '🐸' },
  { word: 'さかな', emoji: '🐟' },
  { word: 'とけい', emoji: '⌚' },
  { word: 'めがね', emoji: '👓' },
  { word: 'かさ', emoji: '☂️' },
  { word: 'ぼうし', emoji: '🧢' },
  { word: 'かばん', emoji: '👜' },
  { word: 'くつ', emoji: '👞' },
  { word: 'ほん', emoji: '📕' },
  { word: 'てれび', emoji: '📺' },
  { word: 'はさみ', emoji: '✂️' },
  { word: 'えんぴつ', emoji: '✏️' },
  { word: 'おにぎり', emoji: '🍙' },
  { word: 'けーき', emoji: '🍰' },
  { word: 'あいす', emoji: '🍦' },
  { word: 'たいよう', emoji: '☀️' },
  { word: 'つき', emoji: '🌙' },
  { word: 'ほし', emoji: '⭐' }
];

const allHiragana = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽきゃきゅきょしゃしゅしょちゃちゅちょにゃにゅにょひゃひゅひょみゃみゅみょりゃりゅりょ".split('');

function generatePuzzle() {
  const item = puzzleWords[Math.floor(Math.random() * puzzleWords.length)];
  const targetChars = item.word.split('');
  
  // スマホで3列に綺麗に収まるよう、選択肢の数は最低6個（文字数が多い場合は9個など）にする
  const numOptions = Math.max(6, Math.ceil(targetChars.length / 3) * 3);
  
  // まずは正解の文字を選択肢に入れる
  const options = targetChars.map(char => ({ char, isTarget: true }));
  
  // ダミーの文字を補充
  while (options.length < numOptions) {
    const randomChar = allHiragana[Math.floor(Math.random() * allHiragana.length)];
    // 追加済みのダミーやターゲット文字と被らないようにする
    if (!options.some(opt => opt.char === randomChar)) {
      options.push({ char: randomChar, isTarget: false });
    }
  }
  
  // 選択肢の順番をシャッフル
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  
  // 選択肢ごとに一意のIDを付与（同じ文字が複数ある場合に対応するため）
  const optionsWithIds = options.map((opt, id) => ({ ...opt, id }));
  
  return { ...item, options: optionsWithIds, targetChars };
}

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
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [slots, setSlots] = useState([]); // Array of {id, char}
  const [isSuccess, setIsSuccess] = useState(false);

  // 初期化時にランダムな問題をセット
  useEffect(() => {
    setCurrentPuzzle(generatePuzzle());
  }, []);

  if (!currentPuzzle) return null;

  const targetChars = currentPuzzle.targetChars;

  const handlePieceClick = (piece) => {
    if (slots.length < targetChars.length && !isSuccess) {
      const newSlots = [...slots, piece];
      setSlots(newSlots);

      if (newSlots.length === targetChars.length) {
        const formedWord = newSlots.map(s => s.char).join('');
        if (formedWord === currentPuzzle.word) {
          setIsSuccess(true);
          setTimeout(() => {
            // 次のランダムな問題へ移行
            setCurrentPuzzle(generatePuzzle());
            setSlots([]);
            setIsSuccess(false);
          }, 2000);
        } else {
          // 不正解の場合は少し待ってからリセット
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
              {slots[i] ? slots[i].char : ''}
            </div>
          ))}
        </div>

        <div className="puzzle-options">
          {currentPuzzle.options.map((piece) => {
            const isUsed = slots.some(s => s.id === piece.id);
            return (
              <button 
                key={piece.id} 
                className="puzzle-piece"
                onClick={() => handlePieceClick(piece)}
                disabled={isSuccess || isUsed}
              >
                {piece.char}
              </button>
            );
          })}
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
