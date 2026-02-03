const part2 = [
    // 5. CNN実装・データ拡張・正規化
    {
        category: "CNN実装",
        question: "入力32x32に対し、Conv(K=5,S=1)→Pool(2,S=2)→Conv(K=5,S=1)→Pool(2,S=2)後のサイズは？",
        options: ["32x32", "11x11", "5x5", "8x8"],
        answer: 2,
        explanation: "1回目: (32-5)+1=28 -> Poolで14。2回目: (14-5)+1=10 -> Poolで5。"
    },
    {
        category: "CNN実装",
        question: "PyTorchの `model.forward()` の説明として正しいのは？",
        options: ["返り値は確率である", "正方形ならサイズ依存しない", "2回使うPool層はパラメータを共有する", "入力は正規化されている前提"],
        answer: 3,
        explanation: "前処理で正規化（Normalize）を行ってから入力するのが一般的です。"
    },
    {
        category: "データ拡張",
        question: "文字認識タスクで不適切なデータ拡張は？",
        options: ["平行移動", "輝度変更", "左右反転・回転", "拡大縮小"],
        answer: 2,
        explanation: "「6と9」のように意味が変わるため不適切です。"
    },
    {
        category: "データ拡張",
        question: "ColorJitterで白飛びが発生した。修正案は？",
        options: ["brightnessの変動幅を小さくする", "contrastを変更", "hueを変更", "flipを削除"],
        answer: 0,
        explanation: "brightnessの係数が大きすぎると画素値が飽和します。"
    },
    {
        category: "正規化",
        question: "Batch Normalizationの `track_running_stats=True` 時の推論（eval）挙動は？",
        options: ["そのバッチの統計量を使用", "学習中の移動統計量を使用", "常に0と1を使用", "直前の学習バッチを使用"],
        answer: 1,
        explanation: "推論時は安定した結果を出すため、学習中に蓄積した移動平均・分散を使います。"
    },
    {
        category: "正規化",
        question: "異なる層でBatch Normalizationのインスタンスを共有するとどうなる？",
        options: ["効率的である", "学習済み表現が破壊される", "精度が上がる", "問題ない"],
        answer: 1,
        explanation: "層ごとに分布やパラメータ（γ, β）が異なるため、共有すると学習できません。"
    },
    {
        category: "アンサンブル",
        question: "アンサンブル学習の説明として不適切なものは？",
        options: ["異なる原理のモデルは組み合わせられない", "バギングは並列学習", "スタッキングはメタモデルを使う", "ブースティングは直列学習"],
        answer: 0,
        explanation: "原理の異なるモデル（NNと決定木など）を組み合わせることで精度向上が期待できます。"
    },
    {
        category: "アンサンブル",
        question: "GBDT、RF、バギング、ブースティングの組み合わせ。（あ）直列修正 （う）並列多数決",
        options: ["(あ)RF (う)GBDT", "(あ)GBDT (う)RF", "(あ)RF (う)バギング", "(あ)GBDT (う)ブースティング"],
        answer: 1,
        explanation: "直列・修正はブースティング（GBDT）、並列・多数決はバギング（Random Forest）です。"
    },
    {
        category: "アンサンブル",
        question: "XGBoostの正則化項 $\\gamma T$ の $\\gamma$ を小さくするとどうなる？",
        options: ["過学習抑制", "木の葉の数が増えやすくなる", "L2正則化が強まる", "L1正則化が強まる"],
        answer: 1,
        explanation: "葉を増やすペナルティが減るため、木が複雑になりやすくなります。"
    },

    // 6. ResNet / ViT
    {
        category: "ResNet",
        question: "ResNetの学習曲線（層を増やした結果）から読み取れる事実は？",
        options: ["過学習した", "Plain Netは層を増やすと訓練誤差も増えた（劣化）", "ResNetでも劣化は防げなかった", "層数に関係なく性能は同じ"],
        answer: 1,
        explanation: "Plain Netでは層を深くすると訓練誤差が悪化する「劣化」が起きますが、ResNetはこれを解決しました。"
    },
    {
        category: "ResNet",
        question: "残差ブロック $H(x) = F(x) + x$ が学習するものは？",
        options: ["出力 $H(x)$", "入力 $x$", "残差 $F(x) = H(x) - x$", "入力の逆数"],
        answer: 2,
        explanation: "入力と出力の差分（残差）を学習します。"
    },
    {
        category: "ResNet",
        question: "20層程度の浅いモデルでの比較結果は？（不適切なものを選ぶ）",
        options: ["ResNetの方が誤差が小さい", "PlainもResNetも誤差は同じ", "層数が小さいモデルでは汎化性能を向上できていない", "訓練誤差はResNetの方が小さい"],
        answer: 2,
        explanation: "浅い層でもResNetの方がわずかに性能が良いため、「向上できていない」という記述は不適切です。"
    },
    {
        category: "ViT",
        question: "Vision Transformer (ViT) の構成要素として正しいのは？",
        options: ["Decoderのみ", "Encoderのみ", "CNNとRNNのハイブリッド", "Encoder-Decoder"],
        answer: 1,
        explanation: "ViTはTransformerのEncoder部分のみを使用します。"
    },
    {
        category: "ViT",
        question: "ViTの入力ベクトル $z_0$ の正しい定義は？（$E_{pos}$のサイズに注目）",
        options: ["パッチのみ", "パッチ + 位置(N個)", "クラストークン + パッチ + 位置(N+1個)", "クラストークン + パッチ"],
        answer: 2,
        explanation: "クラストークンを含めた $N+1$ 個のベクトルに対し、それぞれ位置エンコーディングを加算します。"
    },
    {
        category: "ViT",
        question: "ViTをファインチューニングする際、画像サイズが大きくなった場合の対処は？",
        options: ["パッチサイズを変える", "位置エンコーディングを2次元補間する", "MLPヘッドを固定する", "画像をリサイズして戻す"],
        answer: 1,
        explanation: "パッチサイズを固定するとパッチ数が増えるため、位置エンコーディングを補間して引き伸ばします。"
    },

    // 7. RNN / NLP
    {
        category: "RNN",
        question: "BPTTの説明として正しいのは？",
        options: ["メモリ効率が良い", "勾配降下法が使えない", "時間方向に展開して誤差逆伝播を行う", "各時刻で重みが異なる"],
        answer: 2,
        explanation: "RNNを時間方向に展開し、長いネットワークとみなして学習します。"
    },
    {
        category: "RNN",
        question: "双方向RNN（LSTMユニット数64）の出力サイズは？",
        options: ["64", "128", "32", "256"],
        answer: 1,
        explanation: "順方向64 + 逆方向64 = 128 です。"
    },
    {
        category: "RNN",
        question: "Teacher Forcingの問題点（Exposure Bias）とは？",
        options: ["学習が遅くなる", "精度過大評価", "学習時（正解入力）と評価時（自己予測入力）で分布が異なる", "双方向RNNに使えない"],
        answer: 2,
        explanation: "本番では自分の予測を使わねばならず、一度のミスから崩れやすくなる問題です。"
    },
    {
        category: "Transformer",
        question: "TransformerのDecoderにおけるPositional Encodingの入力箇所は？",
        options: ["各層の直前", "Attentionの中", "入力Embeddingの直後（最初の一回のみ）", "出力層の直前"],
        answer: 2,
        explanation: "データの入り口で1回だけ加算されます。"
    },
    {
        category: "Transformer",
        question: "Self-AttentionがRNNより優れている点は？（不適切なものを除く）",
        options: ["離れた単語の依存関係を学習しやすい", "計算量が常に少ない", "可変長を扱える", "並列処理が可能"],
        answer: 2,
        explanation: "「可変長を扱える」のはRNNも同じです。Transformerの利点は並列性と長距離依存です。"
    },
    {
        category: "Transformer",
        question: "学習コスト（FLOPs）の比較表から読み取れることは？",
        options: ["Transformerはデータ量が増えてもコストが一定", "Transformerが一番遅い", "RNNの方が効率的", "精度は低い"],
        answer: 0,
        explanation: "ステップ数固定で学習するため、データセットの大小にかかわらず計算量は一定になります。"
    },
    {
        category: "BERT",
        question: "BERTの事前学習タスクは？",
        options: ["次単語予測", "Masked LM と Next Sentence Prediction", "翻訳", "要約"],
        answer: 1,
        explanation: "穴埋め問題（MLM）と隣接文予測（NSP）です。"
    },
    {
        category: "BERT",
        question: "BERTが「次の単語予測」を行わない理由は？",
        options: ["コストが高いから", "双方向Attentionにより未来の単語が見えてしまうから", "精度が低いから", "RNNだから"],
        answer: 1,
        explanation: "双方向性ゆえに、単純な次単語予測ではカンニングになってしまうためです。"
    },
    {
        category: "GPT",
        question: "GPT-1の事前学習タスクは？",
        options: ["言語モデル（次単語予測）", "Masked LM", "機械翻訳", "画像生成"],
        answer: 0,
        explanation: "Transformer Decoderを用いた単方向の言語モデルです。"
    },
    {
        category: "GPT",
        question: "GPT-3のOne-Shot Learningとは？",
        options: ["例題なし", "例題を1つだけプロンプトに含める", "転移学習", "教師あり学習"],
        answer: 1,
        explanation: "ファインチューニングせず、プロンプトに1つの例を含めて推論させる手法です。"
    },
    {
        category: "GPT",
        question: "GPT-3のパラメータ数と計算量の関係は？",
        options: ["サイズが大きいほど計算量は増える", "サイズと計算量は無関係", "175Bモデルは計算量が少ない", "BERTより計算量が少ない"],
        answer: 0,
        explanation: "モデルサイズ（パラメータ数）に比例して、訓練に必要な計算量は増大します。"
    }
];
