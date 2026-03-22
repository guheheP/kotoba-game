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
  { word: 'いぬ', emoji: '🐶' }, { word: 'ねこ', emoji: '🐱' }, { word: 'うさぎ', emoji: '🐇' },
  { word: 'らいおん', emoji: '🦁' }, { word: 'とら', emoji: '🐯' }, { word: 'くま', emoji: '🐻' },
  { word: 'ぱんだ', emoji: '🐼' }, { word: 'こあら', emoji: '🐨' }, { word: 'さる', emoji: '🐒' },
  { word: 'きりん', emoji: '🦒' }, { word: 'ぞう', emoji: '🐘' }, { word: 'かば', emoji: '🦛' },
  { word: 'しまうま', emoji: '🦓' }, { word: 'うし', emoji: '🐄' }, { word: 'ぶた', emoji: '🐷' },
  { word: 'うま', emoji: '🐎' }, { word: 'ひつじ', emoji: '🐑' }, { word: 'きつね', emoji: '🦊' },
  { word: 'たぬき', emoji: '🦝' }, { word: 'ねずみ', emoji: '🐭' }, { word: 'かえる', emoji: '🐸' },
  { word: 'へび', emoji: '🐍' }, { word: 'かめ', emoji: '🐢' }, { word: 'とり', emoji: '🐦' },
  { word: 'にわとり', emoji: '🐔' }, { word: 'ひよこ', emoji: '🐥' }, { word: 'ぺんぎん', emoji: '🐧' },
  { word: 'ふくろう', emoji: '🦉' }, { word: 'むし', emoji: '🐛' }, { word: 'ちょう', emoji: '🦋' },
  { word: 'かたつむり', emoji: '🐌' }, { word: 'さかな', emoji: '🐟' }, { word: 'いるか', emoji: '🐬' },
  { word: 'くじら', emoji: '🐳' }, { word: 'さめ', emoji: '🦈' }, { word: 'たこ', emoji: '🐙' },
  { word: 'いか', emoji: '🦑' }, { word: 'かに', emoji: '🦀' }, { word: 'りんご', emoji: '🍎' },
  { word: 'いちご', emoji: '🍓' }, { word: 'ばなな', emoji: '🍌' }, { word: 'みかん', emoji: '🍊' },
  { word: 'ぶどう', emoji: '🍇' }, { word: 'めろん', emoji: '🍈' }, { word: 'すいか', emoji: '🍉' },
  { word: 'もも', emoji: '🍑' }, { word: 'さくらんぼ', emoji: '🍒' }, { word: 'とまと', emoji: '🍅' },
  { word: 'きゅうり', emoji: '🥒' }, { word: 'なす', emoji: '🍆' }, { word: 'にんじん', emoji: '🥕' },
  { word: 'とうもろこし', emoji: '🌽' }, { word: 'たまねぎ', emoji: '🧅' }, { word: 'きのこ', emoji: '🍄' },
  { word: 'ごはん', emoji: '🍚' }, { word: 'おにぎり', emoji: '🍙' }, { word: 'ぱん', emoji: '🍞' },
  { word: 'すし', emoji: '🍣' }, { word: 'にく', emoji: '🍖' }, { word: 'たまご', emoji: '🥚' },
  { word: 'ちーず', emoji: '🧀' }, { word: 'ぴざ', emoji: '🍕' }, { word: 'ぽてと', emoji: '🍟' },
  { word: 'けーき', emoji: '🍰' }, { word: 'ぷりん', emoji: '🍮' }, { word: 'どーなつ', emoji: '🍩' },
  { word: 'くっきー', emoji: '🍪' }, { word: 'あめ', emoji: '🍬' }, { word: 'あいす', emoji: '🍦' },
  { word: 'くるま', emoji: '🚗' }, { word: 'ばす', emoji: '🚌' }, { word: 'とらっく', emoji: '🚚' },
  { word: 'ぱとかー', emoji: '🚓' }, { word: 'きゅうきゅうしゃ', emoji: '🚑' }, { word: 'しょうぼうしゃ', emoji: '🚒' },
  { word: 'たくしー', emoji: '🚕' }, { word: 'でんしゃ', emoji: '🚃' }, { word: 'しんかんせん', emoji: '🚄' },
  { word: 'じてんしゃ', emoji: '🚲' }, { word: 'ふね', emoji: '🚢' }, { word: 'ひこうき', emoji: '✈️' },
  { word: 'へりこぷたー', emoji: '🚁' }, { word: 'ろけっと', emoji: '🚀' }, { word: 'たいよう', emoji: '☀️' },
  { word: 'つき', emoji: '🌙' }, { word: 'ほし', emoji: '⭐' }, { word: 'くも', emoji: '☁️' },
  { word: 'あめ', emoji: '☔' }, { word: 'ゆき', emoji: '⛄' }, { word: 'にじ', emoji: '🌈' },
  { word: 'やま', emoji: '⛰️' }, { word: 'はな', emoji: '🌸' }, { word: 'き', emoji: '🌳' },
  { word: 'はっぱ', emoji: '🍁' }, { word: 'うみ', emoji: '🌊' }, { word: 'とけい', emoji: '⌚' },
  { word: 'かさ', emoji: '☂️' }, { word: 'ぼうし', emoji: '🧢' }, { word: 'めがね', emoji: '👓' },
  { word: 'かばん', emoji: '🎒' }, { word: 'ほん', emoji: '📕' }, { word: 'えんぴつ', emoji: '✏️' },
  { word: 'はさみ', emoji: '✂️' }, { word: 'てれび', emoji: '📺' }, { word: 'でんわ', emoji: '☎️' },
  { word: 'かめら', emoji: '📷' }, { word: 'ふうせん', emoji: '🎈' }, { word: 'ぬいぐるみ', emoji: '🧸' },
  { word: 'いす', emoji: '🪑' }, { word: 'べっど', emoji: '🛏️' }, { word: 'どあ', emoji: '🚪' }
];

const allHiragana = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽきゃきゅきょしゃしゅしょちゃちゅちょにゃにゅにょひゃひゅひょみゃみゅみょりゃりゅりょ".split('');

function generatePuzzle() {
  const item = puzzleWords[Math.floor(Math.random() * puzzleWords.length)];
  const targetChars = item.word.split('');
  const numOptions = Math.max(6, Math.ceil(targetChars.length / 3) * 3);
  const options = targetChars.map(char => ({ char, isTarget: true }));
  
  while (options.length < numOptions) {
    const randomChar = allHiragana[Math.floor(Math.random() * allHiragana.length)];
    if (!options.some(opt => opt.char === randomChar)) {
      options.push({ char: randomChar, isTarget: false });
    }
  }
  
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  
  const optionsWithIds = options.map((opt, id) => ({ ...opt, id }));
  return { ...item, options: optionsWithIds, targetChars };
}

const flagQuizData = [
  // 🌏 アジア
  { sign: '🇯🇵', correct: { text: '日本 (にほん)', emoji: '🍣' }, wrong: [{ text: '中国 (ちゅうごく)', emoji: '🐼' }, { text: '韓国 (かんこく)', emoji: '🍲' }] },
  { sign: '🇰🇷', correct: { text: '韓国 (かんこく)', emoji: '🍲' }, wrong: [{ text: '日本 (にほん)', emoji: '🍣' }, { text: '台湾 (たいわん)', emoji: '🧋' }] },
  { sign: '🇨🇳', correct: { text: '中国 (ちゅうごく)', emoji: '🐼' }, wrong: [{ text: 'ベトナム', emoji: '🍜' }, { text: 'タイ', emoji: '🐘' }] },
  { sign: '🇹🇼', correct: { text: '台湾 (たいわん)', emoji: '🧋' }, wrong: [{ text: '韓国 (かんこく)', emoji: '🍲' }, { text: '中国 (ちゅうごく)', emoji: '🐼' }] },
  { sign: '🇮🇳', correct: { text: 'インド', emoji: '🍛' }, wrong: [{ text: 'エジプト', emoji: '🐪' }, { text: 'タイ', emoji: '🐘' }] },
  { sign: '🇹🇭', correct: { text: 'タイ', emoji: '🐘' }, wrong: [{ text: 'インド', emoji: '🍛' }, { text: 'インドネシア', emoji: '🏝️' }] },
  { sign: '🇻🇳', correct: { text: 'ベトナム', emoji: '🍜' }, wrong: [{ text: 'タイ', emoji: '🐘' }, { text: 'フィリピン', emoji: '🥭' }] },
  { sign: '🇮🇩', correct: { text: 'インドネシア', emoji: '🏝️' }, wrong: [{ text: 'マレーシア', emoji: '🌴' }, { text: 'フィリピン', emoji: '🥭' }] },
  { sign: '🇵🇭', correct: { text: 'フィリピン', emoji: '🥭' }, wrong: [{ text: 'タイ', emoji: '🐘' }, { text: 'インドネシア', emoji: '🏝️' }] },
  { sign: '🇸🇬', correct: { text: 'シンガポール', emoji: '🦁' }, wrong: [{ text: 'マレーシア', emoji: '🌴' }, { text: 'タイ', emoji: '🐘' }] },
  { sign: '🇲🇾', correct: { text: 'マレーシア', emoji: '🌴' }, wrong: [{ text: 'シンガポール', emoji: '🦁' }, { text: 'インドネシア', emoji: '🏝️' }] },
  { sign: '🇲🇳', correct: { text: 'モンゴル', emoji: '🐎' }, wrong: [{ text: 'ロシア', emoji: '🪆' }, { text: '中国 (ちゅうごく)', emoji: '🐼' }] },
  { sign: '🇳🇵', correct: { text: 'ネパール', emoji: '🏔️' }, wrong: [{ text: 'インド', emoji: '🍛' }, { text: 'ブータン', emoji: '🐉' }] },
  { sign: '🇧🇩', correct: { text: 'バングラデシュ', emoji: '🐅' }, wrong: [{ text: 'インド', emoji: '🍛' }, { text: 'パキスタン', emoji: '🕌' }] },
  { sign: '🇱🇰', correct: { text: 'スリランカ', emoji: '🐘' }, wrong: [{ text: 'インド', emoji: '🍛' }, { text: 'モルディブ', emoji: '🏝️' }] },
  { sign: '🇲🇻', correct: { text: 'モルディブ', emoji: '🏝️' }, wrong: [{ text: 'インド', emoji: '🍛' }, { text: 'スリランカ', emoji: '🐘' }] },
  { sign: '🇰🇭', correct: { text: 'カンボジア', emoji: '🛕' }, wrong: [{ text: 'タイ', emoji: '🐘' }, { text: 'ベトナム', emoji: '🍜' }] },
  { sign: '🇲🇲', correct: { text: 'ミャンマー', emoji: '🛕' }, wrong: [{ text: 'タイ', emoji: '🐘' }, { text: 'インド', emoji: '🍛' }] },
  { sign: '🇱🇦', correct: { text: 'ラオス', emoji: '🐘' }, wrong: [{ text: 'タイ', emoji: '🐘' }, { text: 'ベトナム', emoji: '🍜' }] },
  { sign: '🇧🇳', correct: { text: 'ブルネイ', emoji: '🕌' }, wrong: [{ text: 'マレーシア', emoji: '🌴' }, { text: 'インドネシア', emoji: '🏝️' }] },
  
  // 🌎 北・中南米
  { sign: '🇺🇸', correct: { text: 'アメリカ', emoji: '🍔' }, wrong: [{ text: 'イギリス', emoji: '☕' }, { text: 'カナダ', emoji: '🍁' }] },
  { sign: '🇨🇦', correct: { text: 'カナダ', emoji: '🍁' }, wrong: [{ text: 'アメリカ', emoji: '🍔' }, { text: 'スイス', emoji: '🧀' }] },
  { sign: '🇲🇽', correct: { text: 'メキシコ', emoji: '🌮' }, wrong: [{ text: 'スペイン', emoji: '🥘' }, { text: 'ブラジル', emoji: '⚽' }] },
  { sign: '🇧🇷', correct: { text: 'ブラジル', emoji: '⚽' }, wrong: [{ text: 'アルゼンチン', emoji: '🥩' }, { text: 'メキシコ', emoji: '🌮' }] },
  { sign: '🇦🇷', correct: { text: 'アルゼンチン', emoji: '🥩' }, wrong: [{ text: 'ブラジル', emoji: '⚽' }, { text: 'スペイン', emoji: '🥘' }] },
  { sign: '🇨🇱', correct: { text: 'チリ', emoji: '🗿' }, wrong: [{ text: 'ペルー', emoji: '🦙' }, { text: 'ブラジル', emoji: '⚽' }] },
  { sign: '🇵🇪', correct: { text: 'ペルー', emoji: '🦙' }, wrong: [{ text: 'チリ', emoji: '🗿' }, { text: 'メキシコ', emoji: '🌮' }] },
  { sign: '🇨🇴', correct: { text: 'コロンビア', emoji: '☕' }, wrong: [{ text: 'ブラジル', emoji: '⚽' }, { text: 'アルゼンチン', emoji: '🥩' }] },
  { sign: '🇨🇺', correct: { text: 'キューバ', emoji: '⚾' }, wrong: [{ text: 'アメリカ', emoji: '🍔' }, { text: 'メキシコ', emoji: '🌮' }] },
  { sign: '🇯🇲', correct: { text: 'ジャマイカ', emoji: '🏃' }, wrong: [{ text: 'ブラジル', emoji: '⚽' }, { text: 'アメリカ', emoji: '🍔' }] },
  { sign: '🇻🇪', correct: { text: 'ベネズエラ', emoji: '⚾' }, wrong: [{ text: 'コロンビア', emoji: '☕' }, { text: 'ブラジル', emoji: '⚽' }] },
  { sign: '🇪🇨', correct: { text: 'エクアドル', emoji: '🐢' }, wrong: [{ text: 'コロンビア', emoji: '☕' }, { text: 'ペルー', emoji: '🦙' }] },
  { sign: '🇺🇾', correct: { text: 'ウルグアイ', emoji: '🥩' }, wrong: [{ text: 'アルゼンチン', emoji: '🥩' }, { text: 'ブラジル', emoji: '⚽' }] },
  { sign: '🇵🇾', correct: { text: 'パラグアイ', emoji: '🥩' }, wrong: [{ text: 'アルゼンチン', emoji: '🥩' }, { text: 'ボリビア', emoji: '🦙' }] },
  { sign: '🇧🇴', correct: { text: 'ボリビア', emoji: '🦙' }, wrong: [{ text: 'ペルー', emoji: '🦙' }, { text: 'ブラジル', emoji: '⚽' }] },
  { sign: '🇨🇷', correct: { text: 'コスタリカ', emoji: '🐸' }, wrong: [{ text: 'メキシコ', emoji: '🌮' }, { text: 'パナマ', emoji: '🚢' }] },
  { sign: '🇵🇦', correct: { text: 'パナマ', emoji: '🚢' }, wrong: [{ text: 'コロンビア', emoji: '☕' }, { text: 'コスタリカ', emoji: '🐸' }] },

  // 🌍 ヨーロッパ
  { sign: '🇬🇧', correct: { text: 'イギリス', emoji: '☕' }, wrong: [{ text: 'アメリカ', emoji: '🍔' }, { text: 'フランス', emoji: '🥖' }] },
  { sign: '🇫🇷', correct: { text: 'フランス', emoji: '🥖' }, wrong: [{ text: 'イタリア', emoji: '🍕' }, { text: 'ドイツ', emoji: '🌭' }] },
  { sign: '🇩🇪', correct: { text: 'ドイツ', emoji: '🌭' }, wrong: [{ text: 'フランス', emoji: '🥖' }, { text: 'ロシア', emoji: '🪆' }] },
  { sign: '🇮🇹', correct: { text: 'イタリア', emoji: '🍕' }, wrong: [{ text: 'スペイン', emoji: '🥘' }, { text: 'フランス', emoji: '🥖' }] },
  { sign: '🇪🇸', correct: { text: 'スペイン', emoji: '🥘' }, wrong: [{ text: 'メキシコ', emoji: '🌮' }, { text: 'イタリア', emoji: '🍕' }] },
  { sign: '🇷🇺', correct: { text: 'ロシア', emoji: '🪆' }, wrong: [{ text: 'ドイツ', emoji: '🌭' }, { text: 'カナダ', emoji: '🍁' }] },
  { sign: '🇨🇭', correct: { text: 'スイス', emoji: '🧀' }, wrong: [{ text: 'オーストリア', emoji: '⛷️' }, { text: 'スウェーデン', emoji: '🌲' }] },
  { sign: '🇸🇪', correct: { text: 'スウェーデン', emoji: '🌲' }, wrong: [{ text: 'スイス', emoji: '🧀' }, { text: 'ノルウェー', emoji: '🏔️' }] },
  { sign: '🇳🇱', correct: { text: 'オランダ', emoji: '🌷' }, wrong: [{ text: 'ベルギー', emoji: '🧇' }, { text: 'ドイツ', emoji: '🌭' }] },
  { sign: '🇧🇪', correct: { text: 'ベルギー', emoji: '🧇' }, wrong: [{ text: 'オランダ', emoji: '🌷' }, { text: 'フランス', emoji: '🥖' }] },
  { sign: '🇬🇷', correct: { text: 'ギリシャ', emoji: '🏛️' }, wrong: [{ text: 'イタリア', emoji: '🍕' }, { text: 'トルコ', emoji: '🕌' }] },
  { sign: '🇵🇹', correct: { text: 'ポルトガル', emoji: '🚢' }, wrong: [{ text: 'スペイン', emoji: '🥘' }, { text: 'ブラジル', emoji: '⚽' }] },
  { sign: '🇫🇮', correct: { text: 'フィンランド', emoji: '🎅' }, wrong: [{ text: 'スウェーデン', emoji: '🌲' }, { text: 'ノルウェー', emoji: '🏔️' }] },
  { sign: '🇳🇴', correct: { text: 'ノルウェー', emoji: '🏔️' }, wrong: [{ text: 'スウェーデン', emoji: '🌲' }, { text: 'フィンランド', emoji: '🎅' }] },
  { sign: '🇩🇰', correct: { text: 'デンマーク', emoji: '🧜‍♀️' }, wrong: [{ text: 'ノルウェー', emoji: '🏔️' }, { text: 'スイス', emoji: '🧀' }] },
  { sign: '🇦🇹', correct: { text: 'オーストリア', emoji: '⛷️' }, wrong: [{ text: 'ドイツ', emoji: '🌭' }, { text: 'スイス', emoji: '🧀' }] },
  { sign: '🇮🇪', correct: { text: 'アイルランド', emoji: '☘️' }, wrong: [{ text: 'イギリス', emoji: '☕' }, { text: 'スコットランド', emoji: '🏰' }] },
  { sign: '🇵🇱', correct: { text: 'ポーランド', emoji: '🥟' }, wrong: [{ text: 'ドイツ', emoji: '🌭' }, { text: 'ロシア', emoji: '🪆' }] },
  { sign: '🇨🇿', correct: { text: 'チェコ', emoji: '🏰' }, wrong: [{ text: 'ドイツ', emoji: '🌭' }, { text: 'オーストリア', emoji: '⛷️' }] },
  { sign: '🇭🇺', correct: { text: 'ハンガリー', emoji: '🥘' }, wrong: [{ text: 'オーストリア', emoji: '⛷️' }, { text: 'ルーマニア', emoji: '🏰' }] },
  { sign: '🇷🇴', correct: { text: 'ルーマニア', emoji: '🧛' }, wrong: [{ text: 'ハンガリー', emoji: '🥘' }, { text: 'イタリア', emoji: '🍕' }] },
  { sign: '🇺🇦', correct: { text: 'ウクライナ', emoji: '🌻' }, wrong: [{ text: 'ロシア', emoji: '🪆' }, { text: 'ポーランド', emoji: '🥟' }] },
  { sign: '🇮🇸', correct: { text: 'アイスランド', emoji: '🌋' }, wrong: [{ text: 'ノルウェー', emoji: '🏔️' }, { text: 'グリーンランド', emoji: '🧊' }] },
  { sign: '🇭🇷', correct: { text: 'クロアチア', emoji: '🏖️' }, wrong: [{ text: 'イタリア', emoji: '🍕' }, { text: 'ギリシャ', emoji: '🏛️' }] },
  { sign: '🇧🇬', correct: { text: 'ブルガリア', emoji: '🌹' }, wrong: [{ text: 'トルコ', emoji: '🕌' }, { text: 'ギリシャ', emoji: '🏛️' }] },
  { sign: '🇲🇨', correct: { text: 'モナコ', emoji: '🏎️' }, wrong: [{ text: 'フランス', emoji: '🥖' }, { text: 'イタリア', emoji: '🍕' }] },
  { sign: '🇻🇦', correct: { text: 'バチカン', emoji: '⛪' }, wrong: [{ text: 'イタリア', emoji: '🍕' }, { text: 'スペイン', emoji: '🥘' }] },
  
  // 🐨 オセアニア
  { sign: '🇦🇺', correct: { text: 'オーストラリア', emoji: '🐨' }, wrong: [{ text: 'ニュージーランド', emoji: '🥝' }, { text: 'イギリス', emoji: '☕' }] },
  { sign: '🇳🇿', correct: { text: 'ニュージーランド', emoji: '🥝' }, wrong: [{ text: 'オーストラリア', emoji: '🐨' }, { text: 'アイルランド', emoji: '☘️' }] },
  { sign: '🇫🇯', correct: { text: 'フィジー', emoji: '🏝️' }, wrong: [{ text: 'オーストラリア', emoji: '🐨' }, { text: 'ハワイ', emoji: '🏄' }] },
  { sign: '🇵🇼', correct: { text: 'パラオ', emoji: '🐠' }, wrong: [{ text: '日本 (にほん)', emoji: '🍣' }, { text: 'フィリピン', emoji: '🥭' }] },
  { sign: '🇵🇬', correct: { text: 'パプアニューギニア', emoji: '🦜' }, wrong: [{ text: 'インドネシア', emoji: '🏝️' }, { text: 'オーストラリア', emoji: '🐨' }] },
  { sign: '🇹🇻', correct: { text: 'ツバル', emoji: '🏝️' }, wrong: [{ text: 'フィジー', emoji: '🏝️' }, { text: 'ニュージーランド', emoji: '🥝' }] },
  { sign: '🇼🇸', correct: { text: 'サモア', emoji: '🏉' }, wrong: [{ text: 'フィジー', emoji: '🏝️' }, { text: 'ニュージーランド', emoji: '🥝' }] },
  { sign: '🇹🇴', correct: { text: 'トンガ', emoji: '🏉' }, wrong: [{ text: 'サモア', emoji: '🏉' }, { text: 'フィジー', emoji: '🏝️' }] },

  // 🐪 中東・アフリカ
  { sign: '🇹🇷', correct: { text: 'トルコ', emoji: '🕌' }, wrong: [{ text: 'ギリシャ', emoji: '🏛️' }, { text: 'エジプト', emoji: '🐪' }] },
  { sign: '🇪🇬', correct: { text: 'エジプト', emoji: '🐪' }, wrong: [{ text: 'インド', emoji: '🍛' }, { text: 'サウジアラビア', emoji: '🛢️' }] },
  { sign: '🇿🇦', correct: { text: '南アフリカ', emoji: '🦁' }, wrong: [{ text: 'ケニア', emoji: '🦒' }, { text: 'エジプト', emoji: '🐪' }] },
  { sign: '🇰🇪', correct: { text: 'ケニア', emoji: '🦒' }, wrong: [{ text: '南アフリカ', emoji: '🦁' }, { text: 'ナイジェリア', emoji: '🐘' }] },
  { sign: '🇸🇦', correct: { text: 'サウジアラビア', emoji: '🛢️' }, wrong: [{ text: 'エジプト', emoji: '🐪' }, { text: 'トルコ', emoji: '🕌' }] },
  { sign: '🇦🇪', correct: { text: 'アラブ首長国連邦', emoji: '🐪' }, wrong: [{ text: 'サウジアラビア', emoji: '🛢️' }, { text: 'カタール', emoji: '⚽' }] },
  { sign: '🇮🇷', correct: { text: 'イラン', emoji: '🕌' }, wrong: [{ text: 'イラク', emoji: '🏜️' }, { text: 'サウジアラビア', emoji: '🛢️' }] },
  { sign: '🇮🇱', correct: { text: 'イスラエル', emoji: '🕎' }, wrong: [{ text: 'エジプト', emoji: '🐪' }, { text: 'トルコ', emoji: '🕌' }] },
  { sign: '🇲🇦', correct: { text: 'モロッコ', emoji: '🐪' }, wrong: [{ text: 'エジプト', emoji: '🐪' }, { text: 'スペイン', emoji: '🥘' }] },
  { sign: '🇳🇬', correct: { text: 'ナイジェリア', emoji: '🐘' }, wrong: [{ text: 'ケニア', emoji: '🦒' }, { text: '南アフリカ', emoji: '🦁' }] },
  { sign: '🇪🇹', correct: { text: 'エチオピア', emoji: '☕' }, wrong: [{ text: 'ケニア', emoji: '🦒' }, { text: 'エジプト', emoji: '🐪' }] },
  { sign: '🇲🇬', correct: { text: 'マダガスカル', emoji: '🐒' }, wrong: [{ text: '南アフリカ', emoji: '🦁' }, { text: 'モザンビーク', emoji: '🐘' }] },
  { sign: '🇨🇮', correct: { text: 'コートジボワール', emoji: '🐘' }, wrong: [{ text: 'ナイジェリア', emoji: '🐘' }, { text: 'ガーナ', emoji: '🍫' }] },
  { sign: '🇬🇭', correct: { text: 'ガーナ', emoji: '🍫' }, wrong: [{ text: 'コートジボワール', emoji: '🐘' }, { text: 'ナイジェリア', emoji: '🐘' }] },
  { sign: '🇹🇿', correct: { text: 'タンザニア', emoji: '🦁' }, wrong: [{ text: 'ケニア', emoji: '🦒' }, { text: 'ウガンダ', emoji: '🦍' }] },
  { sign: '🇸🇳', correct: { text: 'セネガル', emoji: '⚽' }, wrong: [{ text: 'ナイジェリア', emoji: '🐘' }, { text: 'モロッコ', emoji: '🐪' }] },
  { sign: '🇶🇦', correct: { text: 'カタール', emoji: '⚽' }, wrong: [{ text: 'サウジアラビア', emoji: '🛢️' }, { text: 'アラブ首長国連邦', emoji: '🐪' }] },
  { sign: '🇯🇴', correct: { text: 'ヨルダン', emoji: '🏜️' }, wrong: [{ text: 'シリア', emoji: '🕌' }, { text: 'サウジアラビア', emoji: '🛢️' }] },
  { sign: '🇱🇧', correct: { text: 'レバノン', emoji: '🌲' }, wrong: [{ text: 'シリア', emoji: '🕌' }, { text: 'ヨルダン', emoji: '🏜️' }] },
  
  // 🎌 その他の面白そうな国や地域
  { sign: '🇨🇾', correct: { text: 'キプロス', emoji: '🏝️' }, wrong: [{ text: 'ギリシャ', emoji: '🏛️' }, { text: 'トルコ', emoji: '🕌' }] },
  { sign: '🇲🇹', correct: { text: 'マルタ', emoji: '🏰' }, wrong: [{ text: 'イタリア', emoji: '🍕' }, { text: 'モナコ', emoji: '🏎️' }] },
  { sign: '🇸🇲', correct: { text: 'サンマリノ', emoji: '🏰' }, wrong: [{ text: 'イタリア', emoji: '🍕' }, { text: 'バチカン', emoji: '⛪' }] },
  { sign: '🇫🇴', correct: { text: 'フェロー諸島', emoji: '🐑' }, wrong: [{ text: 'デンマーク', emoji: '🧜‍♀️' }, { text: 'アイスランド', emoji: '🌋' }] },
  { sign: '🇬🇱', correct: { text: 'グリーンランド', emoji: '🧊' }, wrong: [{ text: 'カナダ', emoji: '🍁' }, { text: 'アイスランド', emoji: '🌋' }] },
  { sign: '🇧🇸', correct: { text: 'バハマ', emoji: '🏝️' }, wrong: [{ text: 'ジャマイカ', emoji: '🏃' }, { text: 'キューバ', emoji: '⚾' }] },
  { sign: '🇩🇴', correct: { text: 'ドミニカ共和国', emoji: '⚾' }, wrong: [{ text: 'キューバ', emoji: '⚾' }, { text: 'プエルトリコ', emoji: '🏖️' }] },
  { sign: '🇵🇷', correct: { text: 'プエルトリコ', emoji: '🏖️' }, wrong: [{ text: 'ドミニカ共和国', emoji: '⚾' }, { text: 'アメリカ', emoji: '🍔' }] },
  { sign: '🇬🇮', correct: { text: 'ジブラルタル', emoji: '🐒' }, wrong: [{ text: 'スペイン', emoji: '🥘' }, { text: 'イギリス', emoji: '☕' }] },
  { sign: '🇸🇨', correct: { text: 'セーシェル', emoji: '🐢' }, wrong: [{ text: 'モルディブ', emoji: '🏝️' }, { text: 'マダガスカル', emoji: '🐒' }] },
  { sign: '🇲🇺', correct: { text: 'モーリシャス', emoji: '🦤' }, wrong: [{ text: 'マダガスカル', emoji: '🐒' }, { text: 'セーシェル', emoji: '🐢' }] }
];

function generateFlagQuiz() {
  const item = flagQuizData[Math.floor(Math.random() * flagQuizData.length)];
  const options = [{ ...item.correct, isCorrect: true, id: 0 }, { ...item.wrong[0], isCorrect: false, id: 1 }, { ...item.wrong[1], isCorrect: false, id: 2 }];
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return { ...item, options };
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
      <button className="btn menu-btn yellow" onClick={() => setView('flag')}>
        こっき クイズ 🌍
      </button>
    </div>
  );
}

function HiraganaTap({ onBack }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="app-container anim-pop-in">
      <div className="header">
        <button className="back-btn" onClick={onBack}>⬅もどる</button>
        <h2 style={{color: "var(--primary-color)", fontSize: "clamp(1.5rem, 5vw, 2.5rem)"}}>タッチしてね</h2>
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
  const [slots, setSlots] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

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
            setCurrentPuzzle(generatePuzzle());
            setSlots([]);
            setIsSuccess(false);
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
        <button className="back-btn" onClick={onBack}>⬅もどる</button>
        <h2 style={{color: "var(--accent-color)", fontSize: "clamp(1.5rem, 5vw, 2.5rem)"}}>ことばをつくろう</h2>
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
        <div className="success-banner-wrapper">
          <div className="success-banner anim-pop-in anim-bounce">
            だいせいかい！✨
          </div>
        </div>
      )}
    </div>
  );
}

function FlagQuiz({ onBack }) {
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [failOption, setFailOption] = useState(null);

  useEffect(() => { setCurrentQuiz(generateFlagQuiz()); }, []);
  if (!currentQuiz) return null;

  const handleOptionClick = (opt) => {
    if (isSuccess) return;
    if (opt.isCorrect) {
      setIsSuccess(true);
      setTimeout(() => {
        setCurrentQuiz(generateFlagQuiz());
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
        <button className="back-btn" onClick={onBack}>⬅もどる</button>
        <h2 style={{color: "#ff8c00", fontSize: "clamp(1.5rem, 5vw, 2.5rem)"}}>どこの くに？</h2>
        <div style={{width: '60px'}}></div>
      </div>
      <div className="puzzle-container" style={{ gap: '20px' }}>
        <div className="puzzle-image-area" style={{ flex: '0 1 auto', margin: '0' }}>
          <div className="puzzle-emoji anim-pulse" style={{ fontSize: 'clamp(5rem, 15vh, 10rem)', filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.15))' }}>
            {currentQuiz.sign}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '600px', alignItems: 'center' }}>
          {currentQuiz.options.map((opt) => (
            <button 
              key={opt.id} 
              className="btn"
              style={{
                backgroundColor: failOption === opt ? '#ffcccc' : 'white',
                fontSize: 'clamp(1.1rem, 4.5vw, 2.2rem)',
                padding: '10px 10px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                transform: failOption === opt ? 'translateX(10px)' : 'none',
                transition: 'transform 0.1s, background-color 0.2s',
                boxShadow: failOption === opt ? '0 0 0 transparent' : '0 4px 0 var(--text-color)',
                whiteSpace: 'nowrap'
              }}
              onClick={() => handleOptionClick(opt)}
            >
              <span style={{fontSize: '1.5em'}}>{opt.emoji}</span>
              <span>{opt.text}</span>
            </button>
          ))}
        </div>
      </div>
      {isSuccess && (
        <div className="success-banner-wrapper">
          <div className="success-banner anim-pop-in anim-bounce">だいせいかい！✨</div>
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
      {view === 'flag' && <FlagQuiz onBack={() => setView('home')} />}
    </div>
  );
}

export default App;
