window.quizData = {
    title: "（２）確率モデルにおけるパラメータ推定",
    
    cheatSheet: `
        <h3>主要な推定手法の違い</h3>
        <table>
            <tr><th>手法</th><th>最大化するもの</th><th>特徴</th></tr>
            <tr><td><strong>最尤推定 (MLE)</strong></td><td>尤度 $P(D|\\theta)$</td><td>データに最も適合するパラメータを選ぶ。<br>過学習しやすい。</td></tr>
            <tr><td><strong>MAP推定</strong></td><td>事後確率 $P(D|\\theta)P(\\theta)$</td><td>最尤推定 + <strong>事前確率(正則化)</strong>。<br>過学習を抑える。</td></tr>
            <tr><td><strong>ベイズ推定</strong></td><td>事後分布 $P(\\theta|D)$</td><td>パラメータを「点」ではなく<strong>「分布」</strong>として求める。<br>計算コストが高い。</td></tr>
        </table>
        
        <h3>その他の重要キーワード</h3>
        <ul>
            <li><strong>ベイズの定理</strong>: 結果から原因の確率を逆算する公式。</li>
            <li><strong>ナイーブベイズ</strong>: 特徴量同士が「独立」だと仮定して計算を簡単にする分類器。</li>
            <li><strong>MSE (平均二乗誤差)</strong>: ガウス分布のノイズを仮定した最尤推定と等価。</li>
        </ul>
    `,

    questions: [
        {
            category: "ベイズ則",
            question: "ベイズの定理 P(Y|X) = P(X|Y)P(Y) / P(X) において、P(Y) は何と呼ばれるか。",
            options: ["事後確率", "尤度", "事前確率", "周辺尤度"],
            answer: 2,
            explanation: "P(Y)はデータを観測する前の確率なので「事前確率」です。"
        },
        {
            category: "最尤推定",
            question: "最尤推定(MLE)の説明として、最も適切な数式はどれか。(D:データ, θ:パラメータ)",
            options: ["argmax P(θ|D)", "argmax P(D|θ)", "argmax P(D|θ)P(θ)", "argmax P(D,θ)"],
            answer: 1,
            explanation: "得られたデータDが生成される確率(尤度) P(D|θ) を最大化します。"
        },
        {
            category: "MAP推定",
            question: "MAP推定と最尤推定の決定的な違いは何か。",
            options: ["MAP推定は分布を求める", "MAP推定は「事前確率」も考慮する", "MAP推定は精度が低い", "計算コストが低い"],
            answer: 1,
            explanation: "MAP推定は argmax P(D|θ)P(θ) であり、事前確率 P(θ) を考慮します。"
        },
        {
            category: "平均二乗誤差",
            question: "誤差が「ガウス分布」に従うと仮定して最尤推定を行うことは、何と等価か。",
            options: ["MSE (平均二乗誤差) の最小化", "MAE の最小化", "交差エントロピーの最小化", "KLダイバージェンスの最大化"],
            answer: 0,
            explanation: "ガウス分布の対数尤度を解くと、二乗和誤差の最小化（最小二乗法）が導かれます。"
        },
        {
            category: "ナイーブベイズ",
            question: "ナイーブベイズが「ナイーブ（単純）」と呼ばれる理由は？",
            options: ["計算式が簡単", "特徴量が互いに「独立」だと仮定している", "一様分布を使う", "ニューラルネットを使わない"],
            answer: 1,
            explanation: "実際には関連があっても「独立である」と単純化して仮定するためです。"
        }
    ]
};
