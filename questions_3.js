const part3 = [
    // 8. 物体検出・セグメンテーション
    {
        category: "物体検出",
        question: "Faster R-CNNとYOLOの違いについて、YOLOの特徴は？",
        options: ["Two-stage", "RPNを使用", "One-stage（グリッド分割）", "推論が遅い"],
        answer: 2,
        explanation: "YOLOは候補領域提案を行わず、一度の処理で予測するOne-stage手法です。"
    },
    {
        category: "物体検出",
        question: "YOLO v1の出力テンソルサイズは？(S:グリッド, B:BOX数, C:クラス)",
        options: ["$S \\times S \\times (B \\times 5 + C)$", "$S \\times S \\times (B + C)$", "$S \\times B \\times C$", "750"],
        answer: 0,
        explanation: "各グリッドで $B$ 個のBOX（各5値）と $C$ 個のクラス確率を出力します。"
    },
    {
        category: "物体検出",
        question: "YOLO v3での改良点は？",
        options: ["Softmax廃止・ロジスティック回帰", "ResNetに変更", "Batch Norm廃止", "Two-stage化"],
        answer: 0,
        explanation: "マルチラベル対応のためSoftmaxを廃止しました。"
    },
    {
        category: "Mask R-CNN",
        question: "Mask R-CNNの特徴は？",
        options: ["物体検出のみ", "セマンティックのみ", "インスタンスセグメンテーション", "アンカーなし"],
        answer: 2,
        explanation: "物体検出＋ピクセル単位のマスク予測を行います。"
    },
    {
        category: "Mask R-CNN",
        question: "Mask R-CNNで導入された、位置ズレを防ぐ手法は？",
        options: ["Max Pooling", "RoI Pooling", "RoI Align", "Global Pooling"],
        answer: 2,
        explanation: "RoI Poolingの量子化誤差（丸め）を防ぐため、双一次補間を用いたRoI Alignが導入されました。"
    },
    {
        category: "FCOS",
        question: "FCOSの特徴は？",
        options: ["アンカーベース", "RPN使用", "アンカーフリー・Center-ness", "Two-stage"],
        answer: 2,
        explanation: "アンカーボックスを使わず、中心からの距離（Center-ness）で質を評価します。"
    },
    {
        category: "FCOS",
        question: "FCOSのCenter-ness数式の意味は？",
        options: ["面積", "IoU", "中心に近いほど1、端は0", "クラス確率"],
        answer: 2,
        explanation: "予測ボックスの品質を保つため、中心度を0~1でスコア化します。"
    },
    {
        category: "セグメンテーション",
        question: "セマンティックセグメンテーションで、ピクセルごとの独立判定を補正する従来手法は？",
        options: ["CRF (Conditional Random Fields)", "RNN", "SVM", "k-means"],
        answer: 0,
        explanation: "隣接ピクセルとの関係性を考慮して出力を滑らかにする後処理です。"
    },
    {
        category: "セグメンテーション",
        question: "U-Netのスキップコネクションの役割は？",
        options: ["勾配消失防止", "パラメータ削減", "位置情報の復元", "クラス分類"],
        answer: 2,
        explanation: "エンコーダで失われた位置情報をデコーダに転送して結合します。"
    },

    // 9. 生成モデル・GAN
    {
        category: "生成モデル",
        question: "フローベース生成モデルの特徴は？",
        options: ["尤度を直接計算可能（可逆）", "VAEと同じ", "推論が遅い", "非可逆"],
        answer: 0,
        explanation: "可逆変換を用いるため、尤度を厳密に計算でき異常検知などに適しています。"
    },
    {
        category: "生成モデル",
        question: "拡散モデルの特徴は？",
        options: ["尤度直接計算", "GANより高品質だが計算コスト大", "次元圧縮する", "学習が不安定"],
        answer: 1,
        explanation: "高品質な画像生成が可能ですが、反復計算が必要で生成に時間がかかります。"
    },
    {
        category: "GAN",
        question: "DCGANの識別器（Discriminator）の損失関数での正解ラベル設定は？",
        options: ["Fake=0, Real=1", "Fake=1, Real=0", "すべて1", "すべて0"],
        answer: 0,
        explanation: "識別器は正しく見分けたいので、本物を1、偽物を0とします。"
    },
    {
        category: "GAN",
        question: "DCGANの生成器（Generator）の損失関数での正解ラベル設定は？",
        options: ["Fake=0", "Fake=1", "Real=0", "ランダム"],
        answer: 1,
        explanation: "生成器は「騙したい」ので、偽画像を「本物(1)」と判定されるように学習します。"
    },
    {
        category: "GAN",
        question: "GAN学習時のオプティマイザの実装は？",
        options: ["1つを共有", "2つ独立して定義", "生成器のみ", "不要"],
        answer: 1,
        explanation: "2つのネットワークは目的が異なるため、オプティマイザ（Adam等）も別々に必要です。"
    },

    // 10. 強化学習
    {
        category: "強化学習",
        question: "A3C (Asynchronous Advantage Actor-Critic) の学習方法は？",
        options: ["直列・同期", "並列・非同期", "並列・同期", "直列・非同期"],
        answer: 1,
        explanation: "複数のエージェントが並列・非同期に勾配を更新します。"
    },
    {
        category: "強化学習",
        question: "Actor-CriticのCriticが推定するものは？",
        options: ["方策", "価値関数(Value)", "報酬", "環境"],
        answer: 1,
        explanation: "Actorは行動（方策）、Criticは状態の価値を評価します。"
    },
    {
        category: "強化学習",
        question: "アドバンテージ関数 $Q(s,a) - b(s)$ の $b(s)$ は？",
        options: ["報酬合計", "状態価値関数 V(s)", "方策", "割引率"],
        answer: 1,
        explanation: "平均的な価値（ベースライン）として状態価値関数を使います。"
    },
    {
        category: "強化学習",
        question: "A3Cの最大の功績は？",
        options: ["RNN不可", "GPU必須", "マルチコアCPUで高速化・経験再生不要", "DQNより遅い"],
        answer: 2,
        explanation: "CPU並列化により、経験再生なしで高速かつ安定した学習を実現しました。"
    },

    // 11. 転移学習・XAI・軽量化・その他
    {
        category: "転移学習",
        question: "転移学習で共有「されない」ものは？",
        options: ["下位特徴", "特徴抽出器", "物理法則へのロバスト性", "サンプルそのものの特徴量"],
        answer: 3,
        explanation: "画像ごとの具体的な特徴量の値は共有されません。"
    },
    {
        category: "転移学習",
        question: "データ分布が時間とともに変化する現象は？",
        options: ["ドメイン適応", "ドメインシフト", "コンセプトドリフト", "マルチタスク"],
        answer: 2,
        explanation: "時間経過による変化はコンセプトドリフトです。"
    },
    {
        category: "半教師あり学習",
        question: "「データ拡張しても出力は変わらないはず」という考えの手法は？",
        options: ["Entropy minimization", "Consistency regularization", "Wrapper", "Label propagation"],
        answer: 1,
        explanation: "一貫性（Consistency）正則化です。"
    },
    {
        category: "半教師あり学習",
        question: "Contrastive Learning（自己教師あり）で正例となるペアは？",
        options: ["自分自身の加工画像のみ", "同じクラスの画像", "全ての画像", "ランダムな画像"],
        answer: 0,
        explanation: "ラベルを使わないため、自分自身のAugmentation画像のみを正例とします。"
    },
    {
        category: "XAI",
        question: "Grad-CAMで注目すべき層は？",
        options: ["入力層", "全結合層", "最後の畳み込み層", "出力層"],
        answer: 2,
        explanation: "位置情報を保持している最後の畳み込み層を使います。"
    },
    {
        category: "XAI",
        question: "LIMEの特徴は？",
        options: ["画像専用", "局所的に線形近似", "勾配が必要", "ゲーム理論"],
        answer: 1,
        explanation: "対象データの周辺を線形モデルで近似して説明します。"
    },
    {
        category: "XAI",
        question: "SHAPの「一貫性(Consistency)」とは？",
        options: ["合計が一致", "無いならゼロ", "重要度が増せば値も増える", "計算が速い"],
        answer: 2,
        explanation: "モデルが変化して寄与が増えたなら、SHAP値も減ってはならないという性質です。"
    },
    {
        category: "軽量化",
        question: "蒸留で教師モデルが出力する確率分布を何と呼ぶ？",
        options: ["Hard Target", "Soft Target", "Ground Truth", "Prediction"],
        answer: 1,
        explanation: "暗黙の知識を含む確率分布をSoft Targetと呼びます。"
    },
    {
        category: "軽量化",
        question: "量子化のメリットで正しいのは？",
        options: ["推論高速化・メモリ削減", "学習精度向上", "学習時間短縮", "過学習防止"],
        answer: 0,
        explanation: "ビット数を減らすことでサイズダウンと高速化を図ります。"
    },
    {
        category: "分散処理",
        question: "「データ並列化」とは？",
        options: ["モデル分割", "モデルをコピーしデータを分割", "層ごとにGPU変更", "ハイパラ探索"],
        answer: 1,
        explanation: "全GPUがモデルのコピーを持ち、データを手分けして処理します。"
    },
    {
        category: "コンテナ",
        question: "Dockerコンテナの特徴は？",
        options: ["ホストカーネル共有で軽量", "OS丸ごと起動", "起動が遅い", "GUI必須"],
        answer: 0,
        explanation: "カーネルを共有するためハイパーバイザー型より軽量です。"
    },
    {
        category: "コンテナ",
        question: "DockerでGPUを使うオプションは？",
        options: ["--cpu", "--gpus all", "-v gpu", "--cuda"],
        answer: 1,
        explanation: "`--gpus all` でGPUを有効化します。"
    }
];
