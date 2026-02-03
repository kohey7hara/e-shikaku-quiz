const part2 = [
    // =================================================================
    // 5. CNN (画像認識)
    // =================================================================
    {
        category: "CNN",
        question: "畳み込み層の出力サイズ計算式は？ (入力$H$, カーネル$K$, パディング$P$, ストライド$S$)",
        options: ["$(H - K + 2P)/S + 1$", "$(H - K + P)/S - 1$", "$H \\times K + P$", "$(H - K)/S$"],
        answer: 0,
        explanation: "出力サイズ = (入力 - カーネル + 2×パディング) / ストライド + 1 です。"
    },
    {
        category: "CNN",
        question: "Global Average Pooling (GAP) の主な利点は？",
        options: ["解像度を上げる", "全結合層のパラメータ数を削減し、過学習を防ぐ", "エッジを強調する", "計算量を増やす"],
        answer: 1,
        explanation: "特徴マップ全体の平均をとって1つの値にするため、巨大な全結合層パラメータを削除でき、モデルが軽量化されます。"
    },
    {
        category: "ResNet",
        question: "ResNetの残差ブロック $H(x) = F(x) + x$ の目的は？",
        options: ["勾配消失を防ぎ、層を深くできるようにする", "パラメータ数を減らす", "計算速度を上げる", "画像サイズを変える"],
        answer: 0,
        explanation: "スキップ接続（Shortcut Connection）により、勾配が直接下層に伝わるため、100層を超える深層学習が可能になりました。"
    },
    {
        category: "データ拡張",
        question: "文字認識タスクでやってはいけないデータ拡張は？",
        options: ["平行移動", "輝度変更", "左右反転・回転", "ノイズ付加"],
        answer: 2,
        explanation: "「6と9」「bとd」のように、回転や反転で意味が変わるデータがあるため不適切です。"
    },

    // =================================================================
    // 6. 物体検出・セグメンテーション
    // =================================================================
    {
        category: "物体検出",
        question: "YOLO (You Only Look Once) の特徴は？",
        options: ["Two-stage検出器", "Region Proposalを行う", "グリッド分割によるOne-stage検出器", "推論が遅い"],
        answer: 2,
        explanation: "YOLOは候補領域提案を行わず、画像をグリッドに分割して一度にクラスと位置を予測する高速なOne-stage手法です。"
    },
    {
        category: "物体検出",
        question: "IoU (Intersection over Union) の計算式は？",
        options: ["共通部分 / 和集合", "和集合 / 共通部分", "正解 / 全体", "TP / (TP+FP)"],
        answer: 0,
        explanation: "IoU（Jaccard係数）は、予測ボックスと正解ボックスの「重なり面積」を「合わせた面積」で割った値です。"
    },
    {
        category: "物体検出",
        question: "同じ物体に対して複数のバウンディングボックスが出た際、重複を取り除く処理は？",
        options: ["NMS (Non-Maximum Suppression)", "Batch Normalization", "Dropout", "MaxPooling"],
        answer: 0,
        explanation: "NMSは、信頼度スコアが高いボックスを残し、それとIoUが高い（重なっている）他のボックスを削除する処理です。"
    },
    {
        category: "セグメンテーション",
        question: "セマンティックセグメンテーションとインスタンスセグメンテーションの違いは？",
        options: ["違いはない", "セマンティックは個体を区別しない、インスタンスは個体を区別する", "セマンティックは四角形で囲む", "インスタンスは画素単位ではない"],
        answer: 1,
        explanation: "「人」というクラスを塗る際、セマンティックは全て同じ色で塗りますが、インスタンスは「Aさん」「Bさん」を別の色（ID）で区別します。"
    },
    {
        category: "セグメンテーション",
        question: "U-Netの「スキップコネクション」の役割は？",
        options: ["位置情報の復元", "パラメータ削減", "クラス分類", "ノイズ除去"],
        answer: 0,
        explanation: "エンコーダで失われた位置情報を、デコーダ側に直接転送（結合）することで、精細なセグメンテーションを実現します。"
    },

    // =================================================================
    // 7. RNN・自然言語処理
    // =================================================================
    {
        category: "RNN",
        question: "LSTMが勾配消失を防ぐために導入した仕組みは？",
        options: ["ゲート機構（忘却ゲート等）", "マックスプーリング", "ドロップアウト", "ReLU"],
        answer: 0,
        explanation: "入力・出力・忘却のゲートとセル状態（Cell State）を用いることで、長期的な依存関係を保持します。"
    },
    {
        category: "NLP",
        question: "Word2VecのSkip-gramモデルは何を予測するか？",
        options: ["周辺語から中心語", "中心語から周辺語", "次の文", "品詞"],
        answer: 1,
        explanation: "Skip-gramは「ある単語（中心語）」から「その周りにある単語（周辺語）」を予測するように学習します。（逆はCBOW）"
    },
    {
        category: "Transformer",
        question: "TransformerのSelf-Attentionにおいて、類似度（重み）を計算するベクトルのペアは？",
        options: ["Query と Key", "Key と Value", "Query と Value", "Query と Query"],
        answer: 0,
        explanation: "検索クエリ(Query)と検索対象の鍵(Key)の内積で類似度を計算し、その重みでValueを合成します。"
    },
    {
        category: "Transformer",
        question: "TransformerにおけるPositional Encodingの役割は？",
        options: ["単語の意味を表す", "単語の順序（位置）情報を埋め込む", "文法を解析する", "ノイズを除去する"],
        answer: 1,
        explanation: "Transformerは並列処理であり、RNNのように順序を自動認識できないため、位置情報を明示的に足し合わせる必要があります。"
    },
    {
        category: "BERT",
        question: "BERTの事前学習タスクは？",
        options: ["次単語予測", "Masked LM と Next Sentence Prediction", "翻訳", "要約"],
        answer: 1,
        explanation: "BERTは文中の穴埋め（MLM）と、2文が連続しているかの判定（NSP）で双方向の文脈を学習します。"
    },
    {
        category: "GPT",
        question: "GPT-3のFew-shot Learning（In-context Learning）とは？",
        options: ["再学習を行う", "プロンプトに少数の例示を含めて推論させる", "ラベルなしデータを使う", "強化学習を行う"],
        answer: 1,
        explanation: "重み更新（ファインチューニング）を行わず、入力プロンプトに例を与えるだけでタスクを解かせる手法です。"
    }
];