'use client'; // 画面をピコピコ動かす（状態管理をする）ための呪文です

import { useState } from 'react';
import Link from 'next/link';

// 診断の質問データ
const questions = [
  {
    id: 1,
    text: '1. 休日の過ごし方として、理想に近いのはどちらですか？',
    options: [
      { text: '家で黙々とモノづくりやゲームをする', type: 'A' },
      { text: '外に出かけて人と話したり、新しい場所へ行く', type: 'B' },
    ],
  },
  {
    id: 2,
    text: '2. トラブルが起きたとき、あなたが最初に取る行動は？',
    options: [
      { text: '原因をじっくり分析して、一人で解決策を考える', type: 'A' },
      { text: '周りの人にすぐに相談して、みんなで協力して解決する', type: 'B' },
    ],
  },
  {
    id: 3,
    text: '3. 仕事や勉強を進めるとき、モチベーションが上がるのは？',
    options: [
      { text: '自分のこだわりやスキルを極められるとき', type: 'A' },
      { text: '自分の成果で、誰かが笑顔になって喜んでくれたとき', type: 'B' },
    ],
  },
];

export default function DiagnosticPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState({ A: 0, B: 0 });
  const [isFinished, setIsFinished] = useState(false);

  // 選択肢をクリックしたときの処理
  const handleAnswer = (type: 'A' | 'B') => {
    // スコアを増やす
    setScore((prev) => ({ ...prev, [type]: prev[type] + 1 }));

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setIsFinished(true);
    }
  };

  // 診断結果の計算
  const getResult = () => {
    if (score.A > score.B) {
      return {
        title: '黙々と極める「スペシャリスト」タイプ',
        description: 'エンジニアやクリエイターなど、一つの専門スキルを深く追求する仕事が向いています！',
      };
    } else {
      return {
        title: '人と人を繋ぐ「コミュニケーター」タイプ',
        description: 'ディレクター、営業、カスタマーサクセスなど、人と関わりながらチームを引っ張る仕事が向いています！',
      };
    }
  };

  const result = getResult();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased flex flex-col justify-between">
      {/* ヘッダー */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900">
            <Link href="/" className="hover:text-blue-600 transition-colors">Tech & Life Blog</Link>
          </h1>
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">← ブログへ</Link>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-2xl mx-auto px-4 py-12 flex-grow w-full flex items-center">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm w-full">
          {!isFinished ? (
            /* 質問中の画面 */
            <div>
              <div className="mb-6">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  質問 {questions[currentQuestion].id} / {questions.length}
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-8 leading-relaxed">
                {questions[currentQuestion].text}
              </h2>
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.type as 'A' | 'B')}
                    className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all font-medium text-slate-700 hover:text-blue-700"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* 結果表示の画面 */
            <div className="text-center py-4">
              <span className="text-3xl mb-4 block">🎉</span>
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">診断結果</h2>
              <p className="text-2xl font-extrabold text-blue-600 mb-6">{result.title}</p>
              <p className="text-slate-600 leading-relaxed mb-8 max-w-md mx-auto">{result.description}</p>
              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setScore({ A: 0, B: 0 });
                  setIsFinished(false);
                }}
                className="bg-slate-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors text-sm"
              >
                もう一度診断する
              </button>
            </div>
          )}
        </div>
      </main>

      {/* フッター */}
      <footer className="py-6 text-center text-xs text-slate-400 border-t border-slate-200 bg-white">
        <p>© Tech & Life Blog 適職診断</p>
      </footer>
    </div>
  );
}