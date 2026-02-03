const part1 = [
    // 1. 確率・統計・情報理論
    {
        category: "確率・統計",
        question: "感度98%、偽陽性率0.1%の検査で、有病率1%の病気の陽性判定が出た。実際に病気である確率は？",
        options: ["99%", "91%", "83%", "67%"],
        answer: 1,
        explanation: "ベイズの定理より $P(D|+) = \\frac{P(+|D)P(D)}{P(+)}$。$0.98 \\times 0.01 / (0.98 \\times 0.01 + 0.001 \\times 0.99) \\approx 0.91$。"
    },
    {
        category: "確率・統計",
        question: "最尤推定において、データ集合$X$に対するパラメータ$\\theta$の推定値を表す式は？",
        options: ["$\\arg \\max_{\\theta} P(X, \\theta)$", "$\\arg \\max_{\\theta} P(\\theta | X)$", "$\\arg \\max_{\\theta} P(X | \\theta)P(\\theta)$", "$\\arg \\max_{\\theta} P(X | \\theta)$"],
        answer: 3,
        explanation: "最尤推定(MLE)は尤度$P(X|\\theta)$を最大化します。事後確率を最大化するのはMAP推定です。"
    },
    {
        category: "確率・統計",
        question: "コイントス（二項分布）のパラメータ推定における共役事前分布は？",
        options: ["二項分布", "ベータ分布", "ガウス分布", "ポアソン分布"],
        answer: 1,
        explanation: "ベルヌーイ分布や二項分布の共役事前分布はベータ分布です。"
    },
    {
        category: "情報理論",
        question: "自己情報量 $I(x)$ の定義式は？",
        options: ["$-\\log(1 - P(x))$", "$\\log P(x)$", "$-\\log P(x)$", "$\\log(1 - P(x))$"],
        answer: 2,
        explanation: "確率の逆数の対数 $-\\log P(x)$ で定義されます。確率が低いほど情報量は大きくなります。"
    },
    {
        category: "情報理論",
        question: "エントロピー（平均情報量）$H(X)$ の定義式は？",
        options: ["$\\sum P(x) \\log P(x)$", "$\\log P(x)$", "$-\\sum P(x) \\log P(x)$", "$-\\log P(x)$"],
        answer: 2,
        explanation: "自己情報量の期待値です。"
    },
    {
        category: "情報理論",
        question: "KLダイバージェンス $D_{KL}(P||Q)$ の定義式は？",
        options: ["$\\sum P \\log (Q/P)$", "$\\sum P (\\log Q - P)$", "$\\sum P (\\log P - \\log Q)$", "$\\sum P \\log (P/Q)$"],
        answer: 3,
        explanation: "$D_{KL}(P||Q) = \\sum P(x) \\log \\frac{P(x)}{Q(x)}$ です。"
    },
    {
        category: "情報理論",
        question: "KLダイバージェンスの非対称性を解消した指標は？",
        options: ["マハラノビス距離", "JSダイバージェンス", "交差エントロピー", "ピアソン距離"],
        answer: 1,
        explanation: "Jensen-Shannon (JS) ダイバージェンスはKLの平均を取り、対称性を持ちます。"
    },
    {
        category: "情報理論",
        question: "ニューラルネットの損失関数として使われる、確率分布$P$と$Q$の差異を表す式（交差エントロピー）に相当する概念は？",
        options: ["エントロピー + KLダイバージェンス", "エントロピー - KLダイバージェンス", "KLダイバージェンスのみ", "JSダイバージェンス"],
        answer: 0,
        explanation: "交差エントロピー $H(P,Q) = H(P) + D_{KL}(P||Q)$ です。"
    },

    // 2. パターン認識・機械学習
    {
        category: "パターン認識",
        question: "k近傍法(k-NN)の特徴として適切なものは？",
        options: ["学習時間が長い", "kを小さくするとノイズに強くなる", "特徴量のスケーリングに敏感である", "データ数に比例して学習時間が増える"],
        answer: 2,
        explanation: "推論時に距離計算を行うため、スケーリングの影響を強く受けます。学習（Training）自体はデータを保持するだけなので時間はかかりません。"
    },
    {
        category: "パターン認識",
        question: "kd木の説明として不適切なものは？",
        options: ["軸に垂直な平面で分割する", "高次元空間で計算量を抑える効果が高い", "中央値を分割面とする", "深さ優先探索を行う"],
        answer: 1,
        explanation: "kd木は高次元（次元の呪い）では探索効率が悪化し、全探索と変わらなくなることがあります。"
    },
    {
        category: "パターン認識",
        question: "「座標軸に平行に移動した距離の総和」で表される距離は？",
        options: ["ユークリッド距離", "マハラノビス距離", "コサイン距離", "マンハッタン距離"],
        answer: 3,
        explanation: "$|x_1 - x_2| + |y_1 - y_2|$ で計算されるのはマンハッタン距離です。"
    },
    {
        category: "機械学習",
        question: "決定木の特徴として不適切なものは？",
        options: ["不純度が小さくなるように分割する", "エントロピーやジニ係数を用いる", "過学習を防ぐため深さを制限する", "分類タスクにのみ適用可能"],
        answer: 3,
        explanation: "決定木は回帰タスク（回帰木）にも適用可能です。"
    },
    {
        category: "機械学習",
        question: "PCA（主成分分析）とt-SNEの違いとして適切な組み合わせは？",
        options: ["PCA:非線形/局所, t-SNE:線形/大域", "PCA:線形/大域, t-SNE:非線形/局所", "PCA:線形/局所, t-SNE:非線形/大域", "PCA:非線形/大域, t-SNE:線形/局所"],
        answer: 1,
        explanation: "PCAは線形・大域構造（分散最大化）、t-SNEは非線形・局所構造（近傍保存）です。"
    },

    // 3. 検証・MLP・最適化
    {
        category: "検証集合",
        question: "時系列データの分割方法として適切なのは？",
        options: ["ランダム分割", "時系列順に分割", "クラス比率を保って分割", "ブートストラップ"],
        answer: 1,
        explanation: "未来の情報を学習に使わないよう、時間を維持して分割する必要があります。"
    },
    {
        category: "検証集合",
        question: "分類タスクでクラス割合を等しくする交差検証手法は？",
        options: ["Leave-one-out", "Bootstrap", "Group k-fold", "Stratified k-fold"],
        answer: 3,
        explanation: "層化K分割交差検証（Stratified k-fold）です。"
    },
    {
        category: "検証集合",
        question: "交差検証の分割数Kを2から4に増やしたとき、計算量と訓練データ量の変化は？",
        options: ["計算量3倍, データ1.5倍", "計算量2倍, データ1.75倍", "計算量2倍, データ1.5倍", "計算量3倍, データ3倍"],
        answer: 2,
        explanation: "計算回数はK倍（2倍）。データ量は $(3/4) / (1/2) = 1.5$倍。"
    },
    {
        category: "MLP実装",
        question: "層間の重み定義 `zip(???, ??)` の正解は？",
        options: ["zip(nums[1:], nums[0:])", "zip(nums[1:], nums[1:])", "zip(nums[0:], nums[1:])", "zip(nums, nums)"],
        answer: 2,
        explanation: "前の層と今の層をペアにするため `zip(nums[0:], nums[1:])` です。"
    },
    {
        category: "MLP実装",
        question: "ソフトマックス関数の定義式は？",
        options: ["$\\frac{e^{-x_i}}{\\sum e^{x_j}}$", "$\\frac{e^{-x_j}}{\\sum e^{-x_j}}$", "$\\frac{e^{x_i}}{\\sum e^{-x_j}}$", "$\\frac{e^{x_i}}{\\sum e^{x_j}}$"],
        answer: 3,
        explanation: "$y_i = \\frac{e^{x_i}}{\\sum e^{x_j}}$ です。"
    },
    {
        category: "MLP実装",
        question: "多クラス分類のクロスエントロピー誤差は？",
        options: ["$-\\sum y_i \\log a_i$", "$-\\sum a_i \\log y_i$", "$\\sum y_i \\log a_i$", "$\\sum a_i \\log y_i$"],
        answer: 1,
        explanation: "正解ラベル $a$ と予測 $y$ の対数の積のマイナス和です。"
    },
    {
        category: "MLP実装",
        question: "Softmax + Cross Entropyの逆伝播勾配 $\\frac{\\partial L}{\\partial z}$ は？",
        options: ["$y \\times t$", "$(y - t)^2$", "$\\log y \\times t$", "$y - t$"],
        answer: 3,
        explanation: "予測値 $y$ と正解 $t$ の差分になります。"
    },
    {
        category: "MLP実装",
        question: "バイアス $b$ の勾配をミニバッチで計算する際の集約方法は？",
        options: ["sum(axis=1)", "sum(axis=1)", "sum(axis=0)", "sum(axis=0)"],
        answer: 2,
        explanation: "バッチ方向（axis=0）に誤差を合計します。"
    },
    {
        category: "MLP実装",
        question: "誤差逆伝播で中間層へ戻る際の行列積は？",
        options: ["matmul(dz, W.T)", "matmul(dz, W)", "matmul(W.T, dz)", "matmul(W, dz)"],
        answer: 0,
        explanation: "形状を合わせるため `dz` と重みの転置 `W.T` を掛けます。"
    },
    {
        category: "MLP実装",
        question: "SGDの更新式として正しいのは？",
        options: ["w + lr * grad", "w - lr * grad", "w - lr * grad / batch_size", "w + lr * grad / batch_size"],
        answer: 2,
        explanation: "勾配の逆方向へ更新します。勾配が合計値ならバッチサイズで割って平均化します。"
    },
    {
        category: "MLP実装",
        question: "正解率計算時の正誤判定コード `np.equal(np.argmax(y, ??), np.argmax(t, ??))` の `??` は？",
        options: ["axis=1", "axis=0", "axis=-1", "指定なし"],
        answer: 0,
        explanation: "各データ（行）ごとに判定するため `axis=1` です。"
    },
    {
        category: "損失関数",
        question: "マルチラベル分類に適した損失関数の項は？",
        options: ["$d \\log(1-y)$", "$(1-d) \\log(1-y)$", "$(1-d)(1-y)$", "$d \\sqrt{y}$"],
        answer: 1,
        explanation: "正解が0のときに予測が0になるよう学習するため、$(1-d)\\log(1-y)$ を含みます。"
    },
    {
        category: "損失関数",
        question: "順序回帰問題の適切な解き方は？",
        options: ["回帰問題としてMSE", "多クラス分類としてSoftmax", "複数の2値分類（ランクkより上か？）の和", "教師なし学習"],
        answer: 2,
        explanation: "ランク間の順序関係を学習させるため、複数の2値分類の和を用います。"
    },

    // 4. 正則化・CNN
    {
        category: "正則化",
        question: "ドロップアウトは「（あ）的にマスクする」「多数のモデルを（い）したもの」",
        options: ["(あ)確率 (い)アンサンブル", "(あ)決定 (い)アンサンブル", "(あ)数学 (い)サンプリング", "(あ)確率 (い)プーリング"],
        answer: 0,
        explanation: "確率的にノードを消去し、擬似的にアンサンブル学習を行います。"
    },
    {
        category: "正則化",
        question: "ドロップアウトの微分項 $w_i \\delta^2 I^2$ から導かれる等価な正則化は？",
        options: ["L2正則化", "L1正則化", "L0正則化", "Elastic Net"],
        answer: 0,
        explanation: "重み $w$ に比例する項が出るため、L2正則化と等価です。"
    },
    {
        category: "正則化",
        question: "ドロップアウトの特徴として不適切なものは？",
        options: ["SGDでも適用可能", "パラメータ数が多い時に有効", "CNN/RNNにも適用可能", "推論時は出力を倍にする"],
        answer: 3,
        explanation: "推論時は全ユニットを使うため、出力を学習時の確率 $p$ に合わせてスケーリング（弱める）します。"
    },
    {
        category: "CNN",
        question: "畳み込み層・プーリング層の説明として不適切なものは？",
        options: ["プーリングは位置不変性を持つ", "畳み込み層は回転不変性を持つ", "Maxプーリングは特徴強調", "畳み込みは疎結合"],
        answer: 1,
        explanation: "通常のCNNは回転不変性を持ちません。"
    },
    {
        category: "CNN",
        question: "畳み込み層の出力サイズ計算式は？",
        options: ["$(H - K + 2P)/S + 1$", "$(H - K + P)/S - 1$", "$(H - K + 2P) \\times S + 1$", "$H \\times K + P$"],
        answer: 0,
        explanation: "出力サイズ = (入力 - カーネル + 2×パディング) / ストライド + 1 です。"
    }
];
