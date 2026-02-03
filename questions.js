const quizData = [
    // ---------------------------------------------------------
    // 1. 確率・統計・情報理論
    // ---------------------------------------------------------
    {
        category: "確率・統計",
        question: "有病率$P(D)=0.01$、感度$P(+|D)=0.98$、偽陽性率$P(+|\\bar{D})=0.001$の検査で陽性が出た場合、実際に病気である確率$P(D|+)$は？",
        options: ["99%", "91%", "83%", "67%"],
        answer: 1,
        explanation: "ベイズの定理より $P(D|+) = \\frac{P(+|D)P(D)}{P(+)}$。分母 $P(+) = 0.98 \\times 0.01 + 0.001 \\times 0.99 \\approx 0.01079$。分子 $0.0098$ なので、$0.0098 / 0.01079 \\approx 0.908$。"
    },
    {
        category: "確率・統計",
        question: "最尤推定において、データ集合$X$に対するパラメータ$\\theta$の推定値$\\hat{\\theta}$を表す式は？",
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
        question: "事象$x$の生起確率を$P(x)$としたとき、自己情報量$I(x)$の定義は？",
        options: ["$-\\log(1 - P(x))$", "$\\log P(x)$", "$-\\log P(x)$", "$\\log(1 - P(x))$"],
        answer: 2,
        explanation: "情報量は確率の逆数の対数、つまり$-\\log P(x)$で定義されます。"
    },
    {
        category: "情報理論",
        question: "平均情報量（エントロピー）$H(X)$の定義式は？",
        options: ["$\\sum P(x_i) \\log P(x_i)$", "$\\log P(x_i)$", "$-\\sum P(x_i) \\log P(x_i)$", "$-\\log P(x_i)$"],
        answer: 2,
        explanation: "エントロピーは自己情報量の期待値です。"
    },
    {
        category: "情報理論",
        question: "KLダイバージェンス$D_{KL}(P||Q)$の定義式は？",
        options: ["$\\sum P(x) \\log \\frac{Q(x)}{P(x)}$", "$\\sum P(x) (\\log Q(x) - P(x))$", "$\\sum P(x) (\\log P(x) - Q(x))$", "$\\sum P(x) \\log \\frac{P(x)}{Q(x)}$"],
        answer: 3,
        explanation: "$D_{KL}(P||Q) = \\sum P(x) (\\log P(x) - \\log Q(x))$ です。"
    },
    {
        category: "情報理論",
        question: "KLダイバージェンスの非対称性を解消するために用いられる指標は？",
        options: ["マハラノビス距離", "JSダイバージェンス", "交差エントロピー", "ピアソン距離"],
        answer: 1,
        explanation: "Jensen-Shannon (JS) ダイバージェンスはKLダイバージェンスの平均を取り、対称性を持ちます。"
    },

    // ---------------------------------------------------------
    // 2. 機械学習・パターン認識
    // ---------------------------------------------------------
    {
        category: "パターン認識",
        question: "k近傍法(k-NN)の説明として適切なものは？",
        options: ["学習時間が長い", "kを小さくするとノイズにロバストになる", "特徴量のスケーリングに敏感である", "訓練データ数に比例して学習時間が増える"],
        answer: 2,
        explanation: "k-NNは学習を行わず推論時に距離計算するため、スケーリングの影響を強く受けます。kが小さいとノイズの影響を受けやすくなります。"
    },
    {
        category: "パターン認識",
        question: "kd木の説明として不適切なものは？",
        options: ["軸に垂直な平面で分割する", "高次元空間での探索に効果的", "中央値を分割面とする", "深さ優先探索を行う"],
        answer: 1,
        explanation: "kd木は高次元になると探索効率が悪化（次元の呪い）し、全探索と変わらなくなることがあります。"
    },
    {
        category: "パターン認識",
        question: "「座標軸に平行に移動した距離の総和」で表される距離は？",
        options: ["ユークリッド距離", "マハラノビス距離", "コサイン距離", "マンハッタン距離"],
        answer: 3,
        explanation: "$|x_1 - x_2| + |y_1 - y_2|$ で計算されるのはマンハッタン距離（L1ノルム）です。"
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
        explanation: "PCAは線形変換で分散（大域構造）を最大化します。t-SNEは非線形で近傍（局所構造）を保存します。"
    },

    // ---------------------------------------------------------
    // 3. 深層学習基礎 (検証・MLP・最適化)
    // ---------------------------------------------------------
    {
        category: "検証集合",
        question: "時系列データの分割方法として適切なのは？",
        options: ["ランダム分割", "データを収集した順序を保って分割", "クラス比率を保って分割", "ブートストラップ分割"],
        answer: 1,
        explanation: "時系列データは未来の情報を学習に使わないよう、時間を維持して分割（前半を学習、後半をテスト）する必要があります。"
    },
    {
        category: "検証集合",
        question: "分類タスクでクラス割合を等しくする交差検証手法は？",
        options: ["Leave-one-out", "Bootstrap", "Group k-fold", "Stratified k-fold"],
        answer: 3,
        explanation: "層化K分割交差検証（Stratified k-fold）は、各分割のクラス比率を元データと一致させます。"
    },
    {
        category: "検証集合",
        question: "交差検証の分割数Kを2から4に増やしたとき、計算量と訓練データ量の変化は？",
        options: ["計算量3倍, データ1.5倍", "計算量2倍, データ1.75倍", "計算量2倍, データ1.5倍", "計算量3倍, データ3倍"],
        answer: 2,
        explanation: "計算回数はKに比例（2倍）。データ量は $(K-1)/K$ なので $0.5 \\to 0.75$ となり1.5倍です。"
    },
    {
        category: "MLP実装",
        question: "層間の重み定義 `zip(???, ??)` の正解は？（入力:784, 中間:128,64, 出力:10）",
        options: ["zip(num_units[1:], num_units[0:])", "zip(num_units[1:], num_units[1:])", "zip(num_units[0:], num_units[1:])", "zip(num_units, num_units)"],
        answer: 2,
        explanation: "`num_units`を1つずらしてzipすることで、(784,128), (128,64)... という隣接ペアが作れます。"
    },
    {
        category: "MLP実装",
        question: "ソフトマックス関数の定義式は？",
        options: ["$\\frac{e^{-x_i}}{\\sum e^{x_j}}$", "$\\frac{e^{-x_j}}{\\sum e^{-x_j}}$", "$\\frac{e^{x_i}}{\\sum e^{-x_j}}$", "$\\frac{e^{x_i}}{\\sum e^{x_j}}$"],
        answer: 3,
        explanation: "$y_i = \\frac{e^{x_i}}{\\sum_{j} e^{x_j}}$ です。"
    },
    {
        category: "損失関数",
        question: "多クラス分類のクロスエントロピー誤差は？",
        options: ["$-\\sum y_i \\log a_i$", "$-\\sum a_i \\log y_i$", "$\\sum y_i \\log a_i$", "$\\sum a_i \\log y_i$"],
        answer: 1,
        explanation: "正解ラベル $a_i$ と予測確率の対数 $\\log y_i$ の積の総和にマイナスをつけます。"
    },
    {
        category: "MLP実装",
        question: "Softmax + Cross Entropyの逆伝播勾配（$\\frac{\\partial L}{\\partial z}$）の簡略形は？",
        options: ["$y \\times t$", "$(y - t)^2$", "$\\log(y) \\times t$", "$y - t$"],
        answer: 3,
        explanation: "計算過程で項が相殺され、単純な「予測 - 正解」になります。"
    },
    {
        category: "MLP実装",
        question: "バイアス $b$ の勾配をミニバッチで計算する際の集約方法は？",
        options: ["np.sum(dz, axis=1)", "np.sum(u, axis=1)", "np.sum(dz, axis=0)", "np.sum(u, axis=0)"],
        answer: 2,
        explanation: "バッチ方向（axis=0）に誤差 $dz$ を合計します。"
    },
    {
        category: "MLP実装",
        question: "誤差逆伝播で中間層へ戻る際の行列積は？",
        options: ["np.matmul(dz, W.T)", "np.matmul(dz, W)", "np.matmul(W.T, dz)", "np.matmul(W, dz)"],
        answer: 0,
        explanation: "形状を合わせるため、誤差 $dz$ と重みの転置 $W.T$ を掛けます。"
    },
    {
        category: "MLP実装",
        question: "SGDの更新式として正しいのは？",
        options: ["w + lr * grad", "w - lr * grad", "w - lr * grad / batch_size", "w + lr * grad / batch_size"],
        answer: 2,
        explanation: "勾配の逆方向（マイナス）に進みます。勾配が合計値の場合はバッチサイズで割って平均化します。"
    },
    {
        category: "MLP実装",
        question: "正解率計算時の正誤判定コードは？",
        options: ["argmax(y, axis=1) == argmax(t, axis=1)", "argmax(y, axis=0) == argmax(t, axis=0)", "argmin(y, axis=1) == argmin(t, axis=1)", "mean(y) == mean(t)"],
        answer: 0,
        explanation: "各データ（行）ごとの最大確率のインデックスを比較するため `axis=1` を使います。"
    },
    {
        category: "損失関数",
        question: "マルチラベル分類に適した損失関数の項は？",
        options: ["$d \\log(1-y)$", "$(1-d) \\log(1-y)$", "$(1-d)(1-y)$", "$d \\sqrt{y}$"],
        answer: 1,
        explanation: "正解が0（$1-d=1$）のとき、予測が0（$1-y$が1）になるよう学習するため、$(1-d)\\log(1-y)$ を含みます（Binary Cross Entropy）。"
    },
    {
        category: "損失関数",
        question: "順序回帰問題（星1〜5評価など）の適切な解き方は？",
        options: ["回帰問題としてMSE", "多クラス分類としてSoftmax", "複数の2値分類（ランクkより上か？）の和", "教師なし学習"],
        answer: 2,
        explanation: "順序関係を学習させるため、「ランク1より上か？」「2より上か？」という複数の2値分類を解かせ、そのYesの数を合計する手法が有効です。"
    },

    // ---------------------------------------------------------
    // 4. 正則化・ドロップアウト
    // ---------------------------------------------------------
    {
        category: "正則化",
        question: "ドロップアウトは「（あ）的にマスクする」「多数のモデルを（い）したもの」",
        options: ["(あ)確率 (い)アンサンブル", "(あ)決定 (い)アンサンブル", "(あ)数学 (い)サンプリング", "(あ)確率 (い)プーリング"],
        answer: 0,
        explanation: "ドロップアウトは確率的にノードを消去し、擬似的にアンサンブル学習を行う手法です。"
    },
    {
        category: "正則化",
        question: "ドロップアウトの微分項 $w_i \\delta^2 I^2$ などから導かれる等価な正則化は？",
        options: ["L2正則化", "L1正則化", "L0正則化", "Elastic Net"],
        answer: 0,
        explanation: "勾配に重み $w$ そのものが比例して掛かる形になるため、L2正則化（Ridge）と等価な効果を持ちます。"
    },
    {
        category: "正則化",
        question: "ドロップアウトの特徴として不適切なものは？",
        options: ["SGDでも適用可能", "パラメータ数が多い時に有効", "CNN/RNNにも適用可能", "推論時は出力を倍にする"],
        answer: 3,
        explanation: "推論時は全ユニットを使うため、出力を倍にするのではなく、学習時のドロップアウト率に合わせて「スケーリング（1-p倍）」します（または学習時に逆スケーリングする）。"
    },

    // ---------------------------------------------------------
    // 5. CNN (画像処理)
    // ---------------------------------------------------------
    {
        category: "CNN",
        question: "畳み込み層・プーリング層の説明として不適切なものは？",
        options: ["プーリングは位置不変性を持つ", "畳み込み層は回転不変性を持つ", "Maxプーリングは特徴強調", "畳み込みは疎結合で効率的"],
        answer: 1,
        explanation: "通常のCNNは「平行移動」には強いですが、「回転」に対する不変性は持ちません。"
    },
    {
        category: "CNN",
        question: "畳み込み層の出力サイズ計算式は？",
        options: ["$(H - K + 2P)/S + 1$", "$(H - K + P)/S - 1$", "$(H - K + 2P) \\times S + 1$", "$H \\times K + P$"],
        answer: 0,
        explanation: "出力サイズ = (入力 - カーネル + 2×パディング) / ストライド + 1 です。"
    },
    {
        category: "CNN実装",
        question: "入力(32x32)に対し、Conv(K=5)→Pool(2)→Conv(K=5)→Pool(2)を通した後のサイズは？",
        options: ["32x32", "11x11", "5x5", "8x8"],
        answer: 2,
        explanation: "1回目: (32-5)+1=28 -> Poolで14。2回目: (14-5)+1=10 -> Poolで5。よって5x5。"
    },
    {
        category: "CNN実装",
        question: "PyTorchの `model.forward()` に関する説明として正しいのは？",
        options: ["返り値はクラス事後確率である", "正方形画像ならサイズ依存しない", "2回使われるPool層はパラメータを共有しない", "入力画像は正規化されている前提である"],
        answer: 3,
        explanation: "コード内の `transforms.Normalize` により、入力画像は正規化された状態でモデルに入力されます。"
    },

    // ---------------------------------------------------------
    // 6. データ拡張・正規化
    // ---------------------------------------------------------
    {
        category: "データ拡張",
        question: "文字認識タスクで不適切なデータ拡張は？",
        options: ["平行移動", "輝度変更", "左右反転・回転", "拡大縮小"],
        answer: 2,
        explanation: "文字（6と9、bとdなど）は回転や反転で意味が変わるため不適切です。"
    },
    {
        category: "データ拡張",
        question: "`ColorJitter(brightness=0.8)` で白飛び・黒つぶれが発生。修正案は？",
        options: ["brightness=0.2に変更", "contrastを変更", "hueを変更", "flipを削除"],
        answer: 0,
        explanation: "0.8だと画素値が1.8倍や0.2倍になり範囲を超えるため、変動幅を小さく（0.2など）します。"
    },
    {
        category: "正規化",
        question: "Batch Normalizationの `track_running_stats=True` 時の推論（eval）挙動は？",
        options: ["そのバッチの統計量を使用", "学習中に蓄積した移動統計量を使用", "常に0と1を使用", "直前の学習バッチを使用"],
        answer: 1,
        explanation: "推論時は、学習データ全体を反映した「移動平均・分散」を使って安定した正規化を行います。"
    },
    {
        category: "正規化",
        question: "異なる層でBatch Normalizationのインスタンスを共有するとどうなる？",
        options: ["効率的である", "学習済み表現が破壊される", "精度が上がる", "問題ない"],
        answer: 1,
        explanation: "層ごとにデータの分布や最適なスケール（$\gamma, \beta$）が異なるため、共有すると学習が破綻します。"
    },

    // ---------------------------------------------------------
    // 7. ResNet / ViT
    // ---------------------------------------------------------
    {
        category: "ResNet",
        question: "ResNetの学習曲線（層を増やした結果）から読み取れる事実は？",
        options: ["層を増やすと過学習した", "層を増やすと訓練誤差も増えた（劣化）", "ResNetでも劣化は防げなかった", "層数に関係なく性能は同じ"],
        answer: 1,
        explanation: "Plain Netでは層を増やすと訓練誤差すら悪化する「劣化問題」が発生しますが、ResNetはこれを解決しました。"
    },
    {
        category: "ResNet",
        question: "残差ブロック $H(x) = F(x) + x$ が学習するものは？",
        options: ["出力 $H(x)$", "入力 $x$", "残差 $F(x) = H(x) - x$", "入力の逆数"],
        answer: 2,
        explanation: "ResNetは、入力と出力の差分（残差）を学習するように設計されています。"
    },
    {
        category: "ViT",
        question: "Vision Transformer (ViT) の構成要素として正しいのは？",
        options: ["Transformer Decoderのみ", "Transformer Encoderのみ", "CNNとRNNのハイブリッド", "Encoder-Decoder両方"],
        answer: 1,
        explanation: "ViTは画像をパッチに分割し、BERTのようにTransformer Encoderに入力して分類を行います。"
    },
    {
        category: "ViT",
        question: "ViTの入力ベクトル $z_0$ の正しい定義は？",
        options: ["パッチ埋め込みのみ", "パッチ埋め込み + 位置エンコーディング", "クラストークン + パッチ + 位置エンコーディング", "クラストークン + パッチ"],
        answer: 2,
        explanation: "先頭のクラストークンと画像パッチの列に対し、それぞれ位置エンコーディングを加算します。"
    },
    {
        category: "ViT",
        question: "ViTをファインチューニングする際、画像サイズが大きくなった場合の対処は？",
        options: ["パッチサイズを変える", "位置エンコーディングを2次元補間する", "MLPヘッドを固定する", "画像をリサイズして戻す"],
        answer: 1,
        explanation: "パッチサイズを固定するとパッチ数が増えるため、事前学習済みの位置エンコーディングを補間して引き伸ばします。"
    },

    // ---------------------------------------------------------
    // 8. RNN / Transformer / BERT / GPT
    // ---------------------------------------------------------
    {
        category: "RNN",
        question: "BPTT (Backpropagation Through Time) の説明として正しいのは？",
        options: ["メモリ効率が良い", "勾配降下法が使えない", "時間方向に展開して誤差逆伝播を行う", "各時刻で重みが異なる"],
        answer: 2,
        explanation: "BPTTはRNNのループを時間方向に展開し、長いネットワークとみなして学習する手法です。"
    },
    {
        category: "RNN",
        question: "Teacher Forcingの問題点（Exposure Bias）とは？",
        options: ["学習が遅くなる", "精度が過大評価される", "学習時（正解入力）と評価時（自己予測入力）で分布が異なる", "双方向RNNに使えない"],
        answer: 2,
        explanation: "学習時は正解を与えられるが、本番では自分の予測を使わねばならず、一度のミスから崩れやすくなる問題です。"
    },
    {
        category: "Transformer",
        question: "TransformerのDecoderにおけるPositional Encodingの入力箇所は？",
        options: ["各層の直前", "Attentionの中", "入力Embeddingの直後（最初の一回のみ）", "出力層の直前"],
        answer: 2,
        explanation: "Positional Encodingはデータの入り口で1回だけ加算されます。"
    },
    {
        category: "Transformer",
        question: "Self-AttentionがRNNより優れている点は？",
        options: ["計算量が常に少ない", "可変長を扱える", "長距離の依存関係を直接捉えられる", "位置情報が不要"],
        answer: 2,
        explanation: "RNNは距離が離れると情報が薄れますが、Attentionは全ての位置から全ての位置へ直接アクセスできます。"
    },
    {
        category: "BERT",
        question: "BERTの事前学習タスクは？",
        options: ["次単語予測", "Masked LM と Next Sentence Prediction", "翻訳", "要約"],
        answer: 1,
        explanation: "BERTは穴埋め問題（Masked LM）と隣接文予測（NSP）で事前学習を行います。"
    },
    {
        category: "GPT",
        question: "GPTの事前学習タスクは？",
        options: ["言語モデル（次単語予測）", "Masked LM", "機械翻訳", "画像生成"],
        answer: 0,
        explanation: "GPTはTransformer Decoderを使い、前の単語から次の単語を予測する「言語モデル」として学習します。"
    },
    {
        category: "GPT",
        question: "GPT-3のOne-Shot Learningとは？",
        options: ["例題なしで解く", "例題を1つだけプロンプトに含める", "ファインチューニングする", "教師あり学習を行う"],
        answer: 1,
        explanation: "モデルの重みを更新せず、プロンプトの中に1つの例を含めることでタスクを理解させる手法です。"
    },

    // ---------------------------------------------------------
    // 9. 物体検出・セグメンテーション
    // ---------------------------------------------------------
    {
        category: "物体検出",
        question: "Faster R-CNNとYOLOの違いについて、YOLOの特徴は？",
        options: ["Two-stage検出器", "RPNを使用する", "One-stage検出器（グリッド分割）", "推論速度が遅い"],
        answer: 2,
        explanation: "YOLOは候補領域提案（RPN）を行わず、画像全体をグリッドに分けて一度に予測するOne-stage手法です。"
    },
    {
        category: "物体検出",
        question: "Mask R-CNNの特徴は？",
        options: ["物体検出のみ", "セマンティックセグメンテーションのみ", "インスタンスセグメンテーションが可能", "アンカーを使わない"],
        answer: 2,
        explanation: "Mask R-CNNは物体検出に加えて、個体ごとのピクセル単位マスク（インスタンスセグメンテーション）を出力します。"
    },
    {
        category: "物体検出",
        question: "Mask R-CNNでRoI Poolingの代わりに採用された、位置ズレを防ぐ手法は？",
        options: ["Max Pooling", "Average Pooling", "RoI Align", "Global Pooling"],
        answer: 2,
        explanation: "RoI Poolingの丸め誤差（量子化）を避けるため、双一次補間を用いたRoI Alignが導入されました。"
    },
    {
        category: "物体検出",
        question: "FCOSの特徴として適切なものは？",
        options: ["アンカーボックスを事前設定する", "RPNを使用する", "アンカーフリーであり、Center-nessを導入", "Two-stageである"],
        answer: 2,
        explanation: "FCOSはAnchor-freeの手法で、中心からの距離（Center-ness）を用いて予測の質を評価します。"
    },
    {
        category: "セグメンテーション",
        question: "U-Netの「スキップコネクション」の役割は？",
        options: ["勾配消失を防ぐ", "パラメータ数を減らす", "失われた位置情報をデコーダに伝達する", "クラス分類精度を上げる"],
        answer: 2,
        explanation: "エンコーダで圧縮されて失われた位置情報を、デコーダに直接転送して結合（Concatenate）します。"
    },

    // ---------------------------------------------------------
    // 10. 生成モデル・GAN・強化学習
    // ---------------------------------------------------------
    {
        category: "生成モデル",
        question: "フローベース生成モデルの特徴は？",
        options: ["尤度を直接計算できる（可逆変換）", "VAEと同じ構造", "推論が遅い", "非可逆な変換を行う"],
        answer: 0,
        explanation: "フローモデルは可逆関数を用いるため、ヤコビアンを使って尤度を厳密に計算でき、異常検知などに適しています。"
    },
    {
        category: "GAN",
        question: "DCGANの識別器（Discriminator）の損失関数計算において、実画像の正解ラベルは？",
        options: ["0 (Fake)", "1 (Real)", "0.5", "ランダム"],
        answer: 1,
        explanation: "識別器は「本物を本物（1）」と見抜きたいので、実画像のラベルには 1 を使います。"
    },
    {
        category: "GAN",
        question: "生成器（Generator）の損失関数計算において、生成画像の正解ラベルは？",
        options: ["0 (Fake)", "1 (Real)", "0.5", "-1"],
        answer: 1,
        explanation: "生成器は識別器を「騙したい（本物だと思わせたい）」ので、偽画像に対して「1（本物）」と判定されるように学習します。"
    },
    {
        category: "強化学習",
        question: "A3Cの特徴的な学習方法は？",
        options: ["直列・同期", "並列・非同期", "並列・同期", "直列・非同期"],
        answer: 1,
        explanation: "A3Cは複数のエージェントを「並列」に動かし、各々が「非同期」にパラメータを更新します（Asynchronous）。"
    },
    {
        category: "強化学習",
        question: "Actor-Critic法において、Criticが担当するのは？",
        options: ["方策(Policy)の決定", "価値関数(Value)の推定", "報酬の決定", "環境のシミュレーション"],
        answer: 1,
        explanation: "Actorは行動（方策）を決め、Criticはその状態の「価値」を評価（批評）します。"
    },

    // ---------------------------------------------------------
    // 11. 転移学習・軽量化・分散・その他
    // ---------------------------------------------------------
    {
        category: "転移学習",
        question: "転移学習において「共有されない」ものは？",
        options: ["エッジ検出などの下位特徴", "特徴抽出器の構造", "物理法則へのロバスト性", "サンプルそのものの特徴量値"],
        answer: 3,
        explanation: "特徴抽出の「能力（パラメータ）」は共有されますが、入力画像ごとの具体的な「特徴量の値」は画像ごとに異なるため共有されません。"
    },
    {
        category: "転移学習",
        question: "データ分布が時間とともに変化する現象を何と呼ぶ？",
        options: ["ドメイン適応", "ドメインシフト", "コンセプトドリフト", "マルチタスク"],
        answer: 2,
        explanation: "時間経過による分布変化は「コンセプトドリフト」です。異なる領域への適応はドメイン適応です。"
    },
    {
        category: "半教師あり学習",
        question: "半教師あり学習の手法「Consistency Regularization」とは？",
        options: ["エントロピーを最小化する", "ノイズを加えても出力が一致するように学習する", "ラベルありデータのみ使う", "決定境界を遠ざける"],
        answer: 1,
        explanation: "データ拡張を行っても、AIの予測結果（一貫性）が変わらないように学習させる手法です。"
    },
    {
        category: "XAI",
        question: "LIMEの特徴として適切なものは？",
        options: ["画像専用である", "局所的に線形モデルで近似する", "勾配情報が必要", "ゲーム理論に基づく"],
        answer: 1,
        explanation: "LIMEは対象データの周辺でサンプリングを行い、局所的に解釈可能な線形モデルで近似します。"
    },
    {
        category: "XAI",
        question: "Grad-CAMでヒートマップを作成するために勾配を取得する層は？",
        options: ["入力層", "全結合層", "最後の畳み込み層", "出力層"],
        answer: 2,
        explanation: "位置情報（空間情報）を保持している「最後の畳み込み層」を使用します。"
    },
    {
        category: "軽量化",
        question: "「蒸留」において生徒モデルの学習に使えるデータは？",
        options: ["ラベルありデータのみ", "ラベルなしデータも可", "画像データのみ", "教師モデルと同じデータのみ"],
        answer: 1,
        explanation: "教師モデルの出力（Soft Target）を正解として使うため、ラベルなしデータも利用可能です。"
    },
    {
        category: "分散処理",
        question: "「データ並列化」の説明として正しいのは？",
        options: ["モデルを分割して配置", "モデルをコピーし、データを分割して処理", "モデルの層ごとに担当を変える", "巨大モデル学習に必須"],
        answer: 1,
        explanation: "データ並列はモデルのレプリカ（コピー）を全員が持ち、データを手分けして処理します。"
    },
    {
        category: "コンテナ",
        question: "DockerコンテナでGPUを使用する際に必要なオプションは？",
        options: ["--cpu all", "--gpus all", "-v gpu", "--cuda on"],
        answer: 1,
        explanation: "`--gpus all`（またはデバイス指定）でホストのGPUをコンテナに認識させます。"
    }
];