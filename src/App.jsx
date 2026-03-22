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
  // 動物・生き物
  { word: 'いぬ', emoji: '🐶' },
  { word: 'ねこ', emoji: '🐱' },
  { word: 'うさぎ', emoji: '🐇' },
  { word: 'らいおん', emoji: '🦁' },
  { word: 'とら', emoji: '🐯' },
  { word: 'くま', emoji: '🐻' },
  { word: 'ぱんだ', emoji: '🐼' },
  { word: 'こあら', emoji: '🐨' },
  { word: 'さる', emoji: '🐒' },
  { word: 'きりん', emoji: '🦒' },
  { word: 'ぞう', emoji: '🐘' },
  { word: 'かば', emoji: '🦛' },
  { word: 'しまうま', emoji: '🦓' },
  { word: 'うし', emoji: '🐄' },
  { word: 'ぶた', emoji: '🐷' },
  { word: 'うま', emoji: '🐎' },
  { word: 'ひつじ', emoji: '🐑' },
  { word: 'きつね', emoji: '🦊' },
  { word: 'たぬき', emoji: '🦝' },
  { word: 'ねずみ', emoji: '🐭' },
  { word: 'かえる', emoji: '🐸' },
  { word: 'へび', emoji: '🐍' },
  { word: 'かめ', emoji: '🐢' },
  // 鳥・海の生き物・虫
  { word: 'とり', emoji: '🐦' },
  { word: 'にわとり', emoji: '🐔' },
  { word: 'ひよこ', emoji: '🐥' },
  { word: 'ぺんぎん', emoji: '🐧' },
  { word: 'ふくろう', emoji: '🦉' },
  { word: 'むし', emoji: '🐛' },
  { word: 'ちょう', emoji: '🦋' },
  { word: 'かたつむり', emoji: '🐌' },
  { word: 'さかな', emoji: '🐟' },
  { word: 'いるか', emoji: '🐬' },
  { word: 'くじら', emoji: '🐳' },
  { word: 'さめ', emoji: '🦈' },
  { word: 'たこ', emoji: '🐙' },
  { word: 'いか', emoji: '🦑' },
  { word: 'かに', emoji: '🦀' },
  // 果物・野菜
  { word: 'りんご', emoji: '🍎' },
  { word: 'いちご', emoji: '🍓' },
  { word: 'ばなな', emoji: '🍌' },
  { word: 'みかん', emoji: '🍊' },
  { word: 'ぶどう', emoji: '🍇' },
  { word: 'めろん', emoji: '🍈' },
  { word: 'すいか', emoji: '🍉' },
  { word: 'もも', emoji: '🍑' },
  { word: 'さくらんぼ', emoji: '🍒' },
  { word: 'とまと', emoji: '🍅' },
  { word: 'きゅうり', emoji: '🥒' },
  { word: 'なす', emoji: '🍆' },
  { word: 'にんじん', emoji: '🥕' },
  { word: 'とうもろこし', emoji: '🌽' },
  { word: 'たまねぎ', emoji: '🧅' },
  { word: 'きのこ', emoji: '🍄' },
  // 食べ物
  { word: 'ごはん', emoji: '🍚' },
  { word: 'おにぎり', emoji: '🍙' },
  { word: 'ぱん', emoji: '🍞' },
  { word: 'すし', emoji: '🍣' },
  { word: 'にく', emoji: '🍖' },
  { word: 'たまご', emoji: '🥚' },
  { word: 'ちーず', emoji: '🧀' },
  { word: 'ぴざ', emoji: '🍕' },
  { word: 'ぽてと', emoji: '🍟' },
  { word: 'けーき', emoji: '🍰' },
  { word: 'ぷりん', emoji: '🍮' },
  { word: 'どーなつ', emoji: '🍩' },
  { word: 'くっきー', emoji: '🍪' },
  { word: 'あめ', emoji: '🍬' },
  { word: 'あいす', emoji: '🍦' },
  // 乗り物
  { word: 'くるま', emoji: '🚗' },
  { word: 'ばす', emoji: '🚌' },
  { word: 'とらっく', emoji: '🚚' },
  { word: 'ぱとかー', emoji: '🚓' },
  { word: 'きゅうきゅうしゃ', emoji: '🚑' },
  { word: 'しょうぼうしゃ', emoji: '🚒' },
  { word: 'たくしー', emoji: '🚕' },
  { word: 'でんしゃ', emoji: '🚃' },
  { word: 'しんかんせん', emoji: '🚄' },
  { word: 'じてんしゃ', emoji: '🚲' },
  { word: 'ふね', emoji: '🚢' },
  { word: 'ひこうき', emoji: '✈️' },
  { word: 'へりこぷたー', emoji: '🚁' },
  { word: 'ろけっと', emoji: '🚀' },
  // 自然・その他
  { word: 'たいよう', emoji: '☀️' },
  { word: 'つき', emoji: '🌙' },
  { word: 'ほし', emoji: '⭐' },
  { word: 'くも', emoji: '☁️' },
  { word: 'あめ', emoji: '☔' },
  { word: 'ゆき', emoji: '⛄' },
  { word: 'にじ', emoji: '🌈' },
  { word: 'やま', emoji: '⛰️' },
  { word: 'はな', emoji: '🌸' },
  { word: 'き', emoji: '🌳' },
  { word: 'はっぱ', emoji: '🍁' },
  { word: 'うみ', emoji: '🌊' },
  // 身近なもの
  { word: 'とけい', emoji: '⌚' },
  { word: 'かさ', emoji: '☂️' },
  { word: 'ぼうし', emoji: '🧢' },
  { word: 'めがね', emoji: '👓' },
  { word: 'かばん', emoji: '🎒' },
  { word: 'ほん', emoji: '📕' },
  { word: 'えんぴつ', emoji: '✏️' },
  { word: 'はさみ', emoji: '✂️' },
  { word: 'てれび', emoji: '📺' },
  { word: 'でんわ', emoji: '☎️' },
  { word: 'かめら', emoji: '📷' },
  { word: 'ふうせん', emoji: '🎈' },
  { word: 'ぬいぐるみ', emoji: '🧸' },
  { word: 'いす', emoji: '🪑' },
  { word: 'べっど', emoji: '🛏️' },
  { word: 'どあ', emoji: '🚪' }
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
      <button className="btn menu-btn pink" onClick={() => setView('sign')}>
        ひょうしき クイズ 🚥
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

const signQuizData = [
  { sign: '🛑', correct: { text: 'とまれ', emoji: '✋' }, wrong: [{ text: 'すすめ', emoji: '🏃' }, { text: 'みぎ・ひだり', emoji: '↔️' }] },
  { sign: '🚥', correct: { text: 'しんごう', emoji: '👀' }, wrong: [{ text: 'でんわ', emoji: '☎️' }, { text: 'くるま', emoji: '🚗' }] },
  { sign: '🚻', correct: { text: 'といれ', emoji: '🚽' }, wrong: [{ text: 'おふろ', emoji: '🛀' }, { text: 'おみせ', emoji: '🏪' }] },
  { sign: '🚮', correct: { text: 'ごみばこ', emoji: '🗑️' }, wrong: [{ text: 'ぽすと', emoji: '📮' }, { text: 'おもちゃ', emoji: '🧸' }] },
  { sign: '♨️', correct: { text: 'おんせん', emoji: '🛁' }, wrong: [{ text: 'きけん', emoji: '⚠️' }, { text: 'ごはん', emoji: '🍚' }] },
  { sign: '🅿️', correct: { text: 'ちゅうしゃじょう', emoji: '🚙' }, wrong: [{ text: 'こうえん', emoji: '🏞️' }, { text: 'がっこう', emoji: '🏫' }] },
  { sign: '🚧', correct: { text: 'こうじちゅう', emoji: '👷' }, wrong: [{ text: 'あそびば', emoji: '🎪' }, { text: 'がっこう', emoji: '🏫' }] },
  { sign: '🚸', correct: { text: 'あぶない・とまれ', emoji: '👦' }, wrong: [{ text: 'あそんで いいよ', emoji: '⚽' }, { text: 'はしれ！', emoji: '🏃' }] },
  { sign: '〒', correct: { text: 'ゆうびんきょく', emoji: '📮' }, wrong: [{ text: 'びょういん', emoji: '🏥' }, { text: 'けいさつ', emoji: '🚓' }] },
  { sign: '🏥', correct: { text: 'びょういん', emoji: '🧑‍⚕️' }, wrong: [{ text: 'おみせ', emoji: '🏪' }, { text: 'えき', emoji: '🚉' }] },
  { sign: '🚳', correct: { text: 'じてんしゃ だめ', emoji: '🛑' }, wrong: [{ text: 'とめる ところ', emoji: '🚲' }, { text: 'みち', emoji: '🛣️' }] },
  { sign: '♿', correct: { text: 'くるまいす', emoji: '🦽' }, wrong: [{ text: 'じてんしゃ', emoji: '🚲' }, { text: 'とまれ', emoji: '🛑' }] }
];

function generateSignQuiz() {
  const item = signQuizData[Math.floor(Math.random() * signQuizData.length)];
  const options = [{ ...item.correct, isCorrect: true, id: 0 }, { ...item.wrong[0], isCorrect: false, id: 1 }, { ...item.wrong[1], isCorrect: false, id: 2 }];
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return { ...item, options };
}

function SignQuiz({ onBack }) {
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [failOption, setFailOption] = useState(null);

  useEffect(() => { setCurrentQuiz(generateSignQuiz()); }, []);
  if (!currentQuiz) return null;

  const handleOptionClick = (opt) => {
    if (isSuccess) return;
    if (opt.isCorrect) {
      setIsSuccess(true);
      setTimeout(() => {
        setCurrentQuiz(generateSignQuiz());
        setIsSuccess(false);
        setFailOption(null);
      }, 2000);
    } else {
      setFailOption(opt);
      setTimeout(() => setFailOption(null), 1000);
    }
  };

  return (
    <div className="app-container anim-pop-in">
      <div className="header">
        <button className="back-btn" onClick={onBack}>⬅</button>
        <h2 style={{color: "var(--primary-color)", fontSize: "2rem"}}>これは なあに？</h2>
        <div style={{width: '60px'}}></div>
      </div>
      <div className="puzzle-container" style={{justifyContent: 'center', gap: '40px'}}>
        <div className="puzzle-image-area" style={{ flex: '0 1 auto', margin: '20px 0' }}>
          <div className="puzzle-emoji anim-pulse" style={{ fontSize: 'clamp(8rem, 25vw, 16rem)' }}>
            {currentQuiz.sign}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '500px', alignItems: 'center' }}>
          {currentQuiz.options.map((opt) => (
            <button 
              key={opt.id} 
              className="btn"
              style={{
                backgroundColor: failOption === opt ? '#ffcccc' : 'white',
                fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                padding: '20px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px',
                transform: failOption === opt ? 'translateX(10px)' : 'none',
                transition: 'transform 0.1s, background-color 0.2s',
                boxShadow: failOption === opt ? '0 0 0 transparent' : '0 6px 0 var(--text-color)'
              }}
              onClick={() => handleOptionClick(opt)}
            >
              <span style={{fontSize: '1.2em'}}>{opt.emoji}</span>
              <span>{opt.text}</span>
            </button>
          ))}
        </div>
      </div>
      {isSuccess && <div className="success-banner anim-pop-in anim-bounce">だいせいかい！✨</div>}
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
      {view === 'sign' && <SignQuiz onBack={() => setView('home')} />}
    </div>
  );
}

export default App;
