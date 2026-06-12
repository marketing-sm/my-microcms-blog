'use client'

import { useState } from 'react'

type TypeKey = 'R' | 'I' | 'A' | 'S' | 'E' | 'C'

interface TypeInfo {
  name: string
  tag: string
  color: string
  desc: string
  jobs: string[]
}

const TYPES: Record<TypeKey, TypeInfo> = {
  R: {
    name: '現実型',
    tag: 'リアリスト',
    color: '#4E8C3F',
    desc: '実際に手を動かし、機械・道具・自然を相手に成果を出すことが得意。実直で堅実、結果が目に見える仕事に力を発揮します。',
    jobs: ['エンジニア・技術者', '整備士・機械オペレーター', '建築・施工管理', '料理人・パティシエ', '農業・林業', '職人・ものづくり', 'パイロット・運転士', '自衛官・警察官・消防士'],
  },
  I: {
    name: '研究型',
    tag: 'シンカー',
    color: '#2F6FB0',
    desc: '物事を論理的に分析し、仕組みを解き明かすことに喜びを感じます。知的好奇心が原動力で、専門性を深める仕事が向いています。',
    jobs: ['研究者・大学教員', 'データサイエンティスト・アナリスト', '医師・薬剤師', 'システムエンジニア', 'コンサルタント', '技術開発・品質管理'],
  },
  A: {
    name: '芸術型',
    tag: 'クリエイター',
    color: '#C2477A',
    desc: '独自の感性と発想で、新しいものを生み出すのが得意。自由と個性を大切にし、表現や創作にやりがいを感じます。',
    jobs: ['デザイナー', 'ライター・編集者', '映像・コンテンツ制作', '広告・企画', '建築家・空間デザイナー', 'アーティスト・演奏家'],
  },
  S: {
    name: '社会型',
    tag: 'サポーター',
    color: '#1E9E83',
    desc: '人と関わり、誰かの役に立つことに大きなやりがいを感じます。共感力と面倒見の良さが強みです。',
    jobs: ['教師・講師', '看護師・介護福祉士', 'カウンセラー・心理職', '保育士', '人事・人材', '接客・サービス'],
  },
  E: {
    name: '企業型',
    tag: 'リーダー',
    color: '#D98A1F',
    desc: '目標に向かって人を動かし、成果を出すことが得意。行動力と説得力があり、ビジネスを前に進める仕事に向いています。',
    jobs: ['営業', '経営者・起業家', 'プロジェクトマネージャー', '企画・マーケティング', 'コンサルタント', '店舗・事業運営'],
  },
  C: {
    name: '慣習型',
    tag: 'オーガナイザー',
    color: '#6A5BC4',
    desc: '正確さと計画性を活かして、物事を着実に整えるのが得意。責任感が強く、信頼される存在です。',
    jobs: ['経理・財務', '事務・総務', '公務員', '銀行・金融', '法務・コンプライアンス', '秘書・アシスタント'],
  },
}

const QUESTIONS: { text: string; type: TypeKey }[] = [
  { text: '機械や道具を使って、何かを組み立てたり修理したりするのが好きだ', type: 'R' },
  { text: '物事の仕組みや原因を、とことん突き詰めて考えたい', type: 'I' },
  { text: '自分のアイデアや感性を、自由に表現したい', type: 'A' },
  { text: '人の相談に乗ったり、困っている人を助けるのが好きだ', type: 'S' },
  { text: '人をまとめて、リーダーシップを発揮するのが得意だ', type: 'E' },
  { text: '決められた手順やルールに沿って、正確に進めるのが得意だ', type: 'C' },
  { text: '体を動かしたり、手先を使った作業にやりがいを感じる', type: 'R' },
  { text: 'データや資料を分析して、答えを導き出すのが好きだ', type: 'I' },
  { text: '決まったやり方より、独創的な発想を大切にしたい', type: 'A' },
  { text: '誰かに何かを教えたり、人の成長を支えることにやりがいを感じる', type: 'S' },
  { text: '目標を立てて、成果を上げることに強くやりがいを感じる', type: 'E' },
  { text: '数字や情報を、きちんと整理・管理するのが好きだ', type: 'C' },
  { text: '屋外や現場で、実際にものを扱う仕事に魅力を感じる', type: 'R' },
  { text: '新しい知識を学んだり、調べたりすることが楽しい', type: 'I' },
  { text: 'デザイン・文章・音楽など、何かを創作するのが好きだ', type: 'A' },
  { text: 'チームで協力しながら進める仕事が向いていると思う', type: 'S' },
  { text: '人を説得したり、交渉して物事を動かすのが好きだ', type: 'E' },
  { text: '計画を立てて、コツコツと着実に進めるのが好きだ', type: 'C' },
]

const SCALE: { label: string; value: number }[] = [
  { label: 'とてもそう思う', value: 3 },
  { label: 'ややそう思う', value: 2 },
  { label: 'あまり思わない', value: 1 },
  { label: 'まったく思わない', value: 0 },
]

const MAX_PER_TYPE = QUESTIONS.filter((q) => q.type === 'R').length * 3

function computeResult(answers: (number | null)[]) {
  const scores: Record<TypeKey, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }
  QUESTIONS.forEach((q, i) => {
    scores[q.type] += answers[i] ?? 0
  })
  const ranked = (Object.keys(scores) as TypeKey[]).sort((a, b) => scores[b] - scores[a])
  return { scores, ranked }
}

export default function DiagnosticPage() {
  const [screen, setScreen] = useState<'start' | 'quiz' | 'result'>('start')
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => new Array(QUESTIONS.length).fill(null),
  )

  const start = () => {
    setAnswers(new Array(QUESTIONS.length).fill(null))
    setIndex(0)
    setScreen('quiz')
  }

  const answer = (value: number) => {
    const next = [...answers]
    next[index] = value
    setAnswers(next)
    if (index < QUESTIONS.length - 1) setIndex(index + 1)
    else setScreen('result')
  }

  return (
    <main className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center px-4 py-12">
      {screen === 'start' && (
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-3xl text-indigo-600">
            🧭
          </div>
          <h1 className="mb-3 text-2xl font-bold text-slate-800">適職診断</h1>
          <p className="mb-7 text-sm leading-relaxed text-slate-500">
            {QUESTIONS.length}問の質問に、直感で答えてください。
            <br />
            あなたの興味タイプと、向いている仕事の傾向がわかります。所要時間は約3分です。
          </p>
          <button
            onClick={start}
            className="rounded-lg bg-indigo-600 px-8 py-3 font-medium text-white transition hover:bg-indigo-700 active:scale-95"
          >
            診断を始める
          </button>
          <p className="mt-6 text-xs text-slate-400">
            ※ 心理学者ジョン・ホランドの「RIASEC理論」にもとづく簡易診断です。
          </p>
        </div>
      )}

      {screen === 'quiz' && (
        <div className="w-full">
          <div className="mb-4 flex items-center gap-3 px-1">
            <span className="min-w-14 text-sm font-medium text-indigo-600">
              {index + 1} <span className="font-normal text-slate-400">/ {QUESTIONS.length}</span>
            </span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${(index / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="mb-7 min-h-[3.5rem] text-lg font-medium leading-relaxed text-slate-800">
              {QUESTIONS[index].text}
            </p>
            <div className="flex flex-col gap-2.5">
              {SCALE.map((option) => {
                const selected = answers[index] === option.value
                return (
                  <button
                    key={option.value}
                    onClick={() => answer(option.value)}
                    className={`rounded-lg border px-5 py-3.5 text-left text-[15px] transition ${
                      selected
                        ? 'border-indigo-500 bg-indigo-50 font-medium text-indigo-700'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
            {index > 0 && (
              <button
                onClick={() => setIndex(index - 1)}
                className="mt-5 text-sm text-slate-500 transition hover:text-slate-800"
              >
                ← 戻る
              </button>
            )}
          </div>
        </div>
      )}

      {screen === 'result' && (() => {
        const { scores, ranked } = computeResult(answers)
        const top = TYPES[ranked[0]]
        const second = TYPES[ranked[1]]
        return (
          <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-center text-sm text-slate-500">あなたのタイプは</p>
            <div className="mt-3 mb-5 flex flex-col items-center">
              <div
                className="mb-3 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white"
                style={{ background: top.color }}
              >
                {ranked[0]}
              </div>
              <h1 className="text-3xl font-bold" style={{ color: top.color }}>
                {top.name}
              </h1>
              <p className="mt-1 text-sm text-slate-500">{top.tag}</p>
            </div>

            <p className="mb-4 text-[15px] leading-loose text-slate-700">{top.desc}</p>
            <p className="text-sm text-slate-500">
              次に強い傾向：
              <span className="font-medium" style={{ color: second.color }}>
                {second.name}（{second.tag}）
              </span>
            </p>

            <section className="mt-6 border-t border-slate-200 pt-6">
              <h2 className="mb-3.5 text-[15px] font-bold text-slate-800">向いている仕事の傾向</h2>
              <div className="flex flex-wrap gap-2">
                {top.jobs.map((job) => (
                  <span key={job} className="rounded-full bg-slate-100 px-3.5 py-1.5 text-[13px] text-slate-700">
                    {job}
                  </span>
                ))}
              </div>
            </section>

            <section className="mt-6 border-t border-slate-200 pt-6">
              <h2 className="mb-4 text-[15px] font-bold text-slate-800">6タイプのスコア</h2>
              <div className="flex flex-col gap-3">
                {ranked.map((key) => {
                  const pct = Math.round((scores[key] / MAX_PER_TYPE) * 100)
                  return (
                    <div key={key} className="flex items-center gap-3">
                      <span className="min-w-[4.5rem] text-[13px] text-slate-500">{TYPES[key].name}</span>
                      <div className="h-3.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${pct}%`, background: TYPES[key].color }}
                        />
                      </div>
                      <span className="min-w-10 text-right text-[13px] font-medium text-slate-700">{pct}%</span>
                    </div>
                  )
                })}
              </div>
            </section>

            <button
              onClick={start}
              className="mt-7 w-full rounded-lg bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700 active:scale-95"
            >
              もう一度診断する
            </button>
          </div>
        )
      })()}
    </main>
  )
}