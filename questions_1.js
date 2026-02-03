const part1 = [
    // =================================================================
    // 1. 数学・統計・情報理論
    // =================================================================
    {
        category: "数学・統計",
        question: "行列$A$の特異値分解(SVD) $A = U \\Sigma V^T$ において、$\\Sigma$の対角成分は何と呼ばれるか？",
        options: ["固有値", "特異値", "特異ベクトル", "ランク"],
        answer: 1,
        explanation: "$\\Sigma$の対角成分は「特異値」と呼ばれ、非負の実数です。"
    },
    {
        category: "数学・統計",
        question: "ベイズの定理において、事後確率$P(\\theta|D)$を最大化するパラメータ推定法は？",
        options: ["最尤推定 (MLE)", "最大事後確率推定 (MAP)", "ベイズ推定", "最小二乗法"],
        answer: 1,
        explanation: "事後確率(Posterior)を最大化するのはMAP推定です。尤度(Likelihood)を最大化するのが最尤推定です。"
    },
    {
        category: "情報理論",
        question: "自己情報量 $I(x) = -\\log P(x)$ の意味として正しいのは？",
        options: ["確率が高いほど情報量は大きい", "確率が低い（珍しい）ほど情報量は大きい", "確率0.5のとき最大になる", "常に一定である"],
        answer: 1,
        explanation: "珍しい出来事（確率が低い）ほど、それが起きた時の驚き（情報量）は大きくなります。"
    },
    {
        category: "情報理論",
        question: "KLダイバージェンス $D_{KL}(P||Q)$ の値が 0 になるのはどのような時か？",
        options: ["PとQが完全に一致する時", "PとQが直交する時", "Pが一様分布の時", "常に0以上であり0にはならない"],
        answer: 0,
        explanation: "KLダイバージェンスは2つの分布が完全に一致する場合にのみ 0 となります。"
    },

    // =================================================================
    // 2. 機械学習・パターン認識
    // =================================================================
    {
        category: "機械学習指標",
        question: "適合率(Precision)と再現率(Recall)の調和平均をとった指標は？",
        options: ["正解率 (Accuracy)", "F値 (F-measure)", "特異度 (Specificity)", "AUC"],
        answer: 1,
        explanation: "F値（F1スコア）はPrecisionとRecallの調和平均です。$F = \\frac{2PR}{P+R}$。"
    },
    {
        category: "機械学習指標",
        question: "不均衡データの評価において、ROC曲線の下側の面積を用いた指標は？",
        options: ["AUC (Area Under Curve)", "IoU", "mAP", "MSE"],
        answer: 0,
        explanation: "AUCはROC曲線の下側面積で、ランダム推測なら0.5、完璧な分類なら1.0になります。"
    },
    {
        category: "パターン認識",
        question: "k-means法の手順として正しいのは？",
        options: ["中心決定→割当→中心更新を繰り返す", "全点間の距離を計算して階層を作る", "密度に基づいてクラスタを広げる", "超平面で分割する"],
        answer: 0,
        explanation: "k-meansは「各点を近い中心に割り当て」「中心を平均位置に更新」を繰り返す反復手法です。"
    },
    {
        category: "次元削減",
        question: "t-SNEの特性として正しいものは？",
        options: ["線形変換である", "大域的な構造（遠くの関係）を保つ", "局所的な構造（近くの関係）を保つ", "新たなデータの変換が容易である"],
        answer: 2,
        explanation: "t-SNEは高次元空間で近かったデータ同士を、低次元でも近くに配置することを重視する非線形手法です。"
    },

    // =================================================================
    // 3. 深層学習基礎 (最適化・正則化)
    // =================================================================
    {
        category: "活性化関数",
        question: "勾配消失が起きにくい活性化関数として、現在最も標準的に使われるのは？",
        options: ["Sigmoid", "Tanh", "ReLU", "Step function"],
        answer: 2,
        explanation: "ReLU（Rectified Linear Unit）は正の領域で勾配が常に1であるため、層が深くなっても勾配消失しにくいです。"
    },
    {
        category: "初期化",
        question: "ReLU関数を用いる場合に推奨される、重みの初期化手法は？",
        options: ["Xavier (Glorot) の初期化", "He (Kaiming) の初期化", "標準正規分布", "全ての値を0にする"],
        answer: 1,
        explanation: "ReLUには「Heの初期化（分散 $2/n$）」、Sigmoid/Tanhには「Xavierの初期化（分散 $1/n$）」が適しています。"
    },
    {
        category: "最適化手法",
        question: "Adam (Adaptive Moment Estimation) の特徴は？",
        options: ["学習率を固定する", "過去の勾配の移動平均（Momentum）と二乗平均（RMSProp）の両方を使う", "最も単純なSGDである", "二次微分（ヘッセ行列）を使う"],
        answer: 1,
        explanation: "AdamはMomentumとRMSPropの考え方を組み合わせ、パラメータごとに適応的な学習率調整を行います。"
    },
    {
        category: "正則化",
        question: "L1正則化（Lasso）の最大の特徴は？",
        options: ["重みを滑らかにする", "不要な重みを0にする（スパース化）", "勾配消失を防ぐ", "計算が高速である"],
        answer: 1,
        explanation: "L1ノルム（絶対値）をペナルティにすると、重要でない特徴量の重みが完全に0になりやすく、特徴量選択の効果があります。"
    },
    {
        category: "正規化",
        question: "Batch Normalizationの効果として不適切なものは？",
        options: ["学習率を大きくできる", "初期値依存性を軽減する", "過学習を抑制する", "RNNに適用しやすい"],
        answer: 3,
        explanation: "RNNは時系列長が可変でありバッチ統計量が不安定になるため、Batch NormよりもLayer Normが適しています。"
    },

    // =================================================================
    // 4. MLP実装 (PyTorch/NumPy)
    // =================================================================
    {
        category: "MLP実装",
        question: "Softmax関数とCross Entropy誤差を組み合わせた時の、逆伝播勾配 $\\frac{\\partial L}{\\partial z}$ は？",
        options: ["$y - t$ (予測 - 正解)", "$y \\times t$", "$(y - t)^2$", "$\\log y$"],
        answer: 0,
        explanation: "計算過程が相殺され、非常に単純な「予測値と正解ラベルの差分」になります。"
    },
    {
        category: "MLP実装",
        question: "SGDの実装コード `W -= lr * grad` において、`grad` がバッチ合計値だった場合に必要な修正は？",
        options: ["修正不要", "batch_sizeを掛ける", "batch_sizeで割る", "ルートをとる"],
        answer: 2,
        explanation: "合計値のままだとバッチサイズによって更新幅が変わりすぎるため、平均をとる（バッチサイズで割る）のが一般的です。"
    },
    {
        category: "MLP実装",
        question: "ドロップアウトの学習時（Training）の挙動は？",
        options: ["全ユニットを使用する", "確率 $p$ でユニット出力を0にする", "出力を $p$ 倍する", "重みを固定する"],
        answer: 1,
        explanation: "学習時は指定された確率でランダムにユニットを無効化（0に）します。推論時は全ユニットを使います。"
    }
];