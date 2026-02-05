window.quizData = {
    title: "4-（１〜３）画像認識・物体検出・セグメンテーション",
    
    cheatSheet: `
        <h3>■ 画像認識 (Classification)</h3>
        <ul>
            <li><strong>ResNet</strong>: <strong>残差接続 (Skip Connection)</strong> を導入し、入力を出力に足し合わせる（$x + F(x)$）ことで、100層以上の超深層化を可能にした。</li>
            <li><strong>ViT (Vision Transformer)</strong>: 画像をパッチに分割してTransformerに入力。大量のデータがあればCNNを超える精度を出す。</li>
        </ul>

        <h3>■ 物体検出 (Object Detection)</h3>
        <p>「何が（クラス）」「どこに（Bounding Box）」あるかを当てるタスク。</p>
        <table>
            <tr><th>タイプ</th><th>代表モデル</th><th>特徴</th></tr>
            <tr><td><strong>2ステージ</strong></td><td><strong>Faster R-CNN</strong><br>Mask R-CNN</td><td>候補領域の提案(RPN) → 分類 の2段階。<br>精度は高いが<strong>遅い</strong>。</td></tr>
            <tr><td><strong>1ステージ</strong></td><td><strong>YOLO</strong>, <strong>SSD</strong></td><td>領域提案と分類を同時に行う。<br>精度はやや劣るが<strong>高速</strong>。リアルタイム向け。</td></tr>
            <tr><td><strong>アンカーフリー</strong></td><td><strong>FCOS</strong></td><td>アンカーボックス（事前の枠）を使わず、ピクセルごとに予測する。</td></tr>
        </table>

        <h3>■ セグメンテーション (Segmentation)</h3>
        <p>画像の「ピクセル単位」でクラスを分類するタスク。</p>
        <ul>
            <li><strong>セマンティック</strong>: 「車」「人」などのクラスごとに塗り分ける（個体識別しない）。</li>
            <li><strong>インスタンス</strong>: 「車A」「車B」のように個体まで識別する（Mask R-CNNなど）。</li>
            <li><strong>FCN</strong>: 全結合層を畳み込み層に置き換え、最後にアップサンプリングして画像を復元する。</li>
            <li><strong>U-Net</strong>: エンコーダの特徴マップをデコーダにコピー＆結合（スキップ接続）し、位置情報の精度を高めたモデル。医療画像で有名。</li>
        </ul>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【基礎編】 Q1 - Q10
        // ---------------------------------------------------------
        {
            category: "ResNet",
            question: "ResNet（Residual Network）が、層を深くしても学習が進む（勾配消失しない）主な要因である構造はどれか。",
            options: ["残差接続（Skip Connection / Shortcut Connection）", "Inceptionモジュール", "Dense接続", "Attention機構"],
            answer: 0,
            explanation: "入力を変換せずに出力に足し合わせる（$H(x) = F(x) + x$）ことで、勾配が遮られずに下層へ伝わる「近道」を作りました。"
        },
        {
            category: "物体検出の出力",
            question: "物体検出（Object Detection）タスクにおいて、モデルが出力する情報は主に「クラスラベル」と何か。",
            options: ["バウンディングボックス（位置座標）", "ピクセルごとのマスク画像", "画像の説明文（キャプション）", "物体の3D形状"],
            answer: 0,
            explanation: "物体を囲む長方形の枠（Bounding Box）の座標 $(x, y, w, h)$ を回帰問題として解きます。"
        },
        {
            category: "IoU",
            question: "物体検出の評価指標である「IoU (Intersection over Union)」の計算式として正しい意味はどれか。",
            options: ["(予測と正解の重なった面積) ÷ (予測と正解を合わせた面積)", "(予測と正解の重なった面積) ÷ (画像全体の面積)", "(予測と正解の重なった面積) × 2", "(正解の面積) ÷ (予測の面積)"],
            answer: 0,
            explanation: "重なり（Intersection）を和集合（Union）で割った値です。0〜1の値をとり、重なりが大きいほど1に近づきます。"
        },
        {
            category: "YOLO",
            question: "YOLO (You Only Look Once) の最大の特徴は何か。",
            options: ["画像をグリッドに分割し、領域提案とクラス分類を1つのネットワークで同時に行う（1ステージ）", "RPNを用いて候補領域を抽出してから分類する（2ステージ）", "セグメンテーションと同時に行う", "動画専用のモデルである"],
            answer: 0,
            explanation: "「一度見るだけ」の名前の通り、複雑な処理パイプラインを廃止し、単一のCNNで高速に処理します。"
        },
        {
            category: "NMS",
            question: "物体検出において、同じ物体に対して複数のバウンディングボックスが重複して検出された場合、最も信頼度の高い1つだけを残す処理を何と呼ぶか。",
            options: ["Non-Maximum Suppression (NMS)", "Max Pooling", "Dropout", "Batch Normalization"],
            answer: 0,
            explanation: "非最大値抑制（NMS）。IoUが高い（重なっている）ボックスの中で、スコアが最大のもの以外を削除します。"
        },
        {
            category: "セグメンテーション",
            question: "「セマンティック・セグメンテーション」の説明として正しいものはどれか。",
            options: ["画像の全ピクセルに対してクラスラベルを付与するが、個体（インスタンス）の区別はしない", "画像の全ピクセルにラベルを付け、さらに個体も区別する", "物体の枠（ボックス）だけを検出する", "画像の主要な被写体だけを切り抜く"],
            answer: 0,
            explanation: "例えば、画面に5人の人がいても、全員同じ「人」という色で塗るのがセマンティックです。個々人を「人A」「人B」と分けるのはインスタンス・セグメンテーションです。"
        },
        {
            category: "FCN",
            question: "FCN (Fully Convolutional Network) の特徴はどれか。",
            options: ["全結合層を廃止し、全て畳み込み層で構成することで、任意のサイズの画像を入力できる", "全ての層が全結合層で構成されている", "RNNを組み合わせている", "1次元データしか扱えない"],
            answer: 0,
            explanation: "全結合層（サイズ固定）を使わないため、どんな大きさの画像でも受け入れて、ヒートマップのような出力を返せます。"
        },
        {
            category: "U-Net",
            question: "医療画像診断などで有名な「U-Net」の特徴的な構造はどれか。",
            options: ["エンコーダの特徴マップを、同解像度のデコーダ層にコピー＆結合（Skip Connection）するU字型構造", "入力をピラミッド状に分割する構造", "再帰的なループ構造", "全ての層が独立している構造"],
            answer: 0,
            explanation: "圧縮過程（エンコーダ）で失われた「位置情報」を、スキップ接続で復元側（デコーダ）に直接渡すことで、精細なセグメンテーションを実現しました。"
        },
        {
            category: "Faster R-CNN",
            question: "Faster R-CNNにおいて、候補領域（Region Proposals）を高速に生成するために導入されたネットワークは何か。",
            options: ["RPN (Region Proposal Network)", "Selective Search", "FPN (Feature Pyramid Network)", "GAN"],
            answer: 0,
            explanation: "それまでのSelective Search（CPU処理）を、GPUで動くニューラルネット（RPN）に置き換えることで、ほぼリアルタイムに近い速度を実現しました。"
        },
        {
            category: "ViT",
            question: "Vision Transformer (ViT) は、画像をどのように処理してTransformerに入力するか。",
            options: ["画像を $16 \\times 16$ などのパッチ（小領域）に分割し、それらを単語のように一列に並べて入力する", "画像を1列のピクセル列に変換する", "画像を周波数成分に変換する", "画像をそのまま入力する"],
            answer: 0,
            explanation: "画像を「パッチ」という単位に切り分け、それをNLPにおける「単語（トークン）」とみなしてSelf-Attentionを適用します。"
        },

        // ---------------------------------------------------------
        // 【応用編】 Q11 - Q20
        // ---------------------------------------------------------
        {
            category: "ResNetの仕組み(応用)",
            question: "ResNetの残差ブロック $F(x) + x$ において、もし学習初期に $F(x)$ の重みが全て0だったとしても学習が進む理由は何か。",
            options: ["恒等写像（Identity Mapping）として機能し、入力 $x$ がそのまま次の層へ伝わるから", "活性化関数ReLUのおかげ", "Batch Normalizationがあるから", "バイアス項があるから"],
            answer: 0,
            explanation: "何もしない（$x$をそのまま通す）ことが容易に学習できるため、層を深くしても性能が悪化（劣化問題）しなくなりました。"
        },
        {
            category: "mAP(応用)",
            question: "物体検出の総合評価指標「mAP (mean Average Precision)」を算出する際に用いられる「AP」は、どのグラフの下側面積に相当するか。",
            options: ["Precision-Recall 曲線 (PR曲線)", "ROC曲線", "Loss曲線", "学習曲線"],
            answer: 0,
            explanation: "検出の閾値を変化させたときの適合率と再現率のトレードオフをプロットし、その積分値（面積）をAPとします。"
        },
        {
            category: "アンカーボックス(応用)",
            question: "Faster R-CNNやSSDなどで使われる「アンカーボックス (Anchor Box)」の役割は何か。",
            options: ["様々なアスペクト比（縦横比）やスケールの物体を検出するために用意された、事前の「枠のひな形」", "学習データを増やすための画像処理", "誤検出を削除するためのフィルタ", "特徴マップを保存するメモリ"],
            answer: 0,
            explanation: "「縦長」「横長」「大小」など、あらかじめ決めた複数の枠を画像全体に敷き詰め、そこからの「ズレ」を学習させることで学習を安定させます。"
        },
        {
            category: "RoI Pooling(応用)",
            question: "Fast R-CNNなどで使われる「RoI Pooling」の役割は何か。",
            options: ["様々なサイズの候補領域（RoI）を、全結合層に入力できるよう「固定サイズ」の特徴マップに変換する", "候補領域を削除する", "候補領域を回転させる", "特徴マップのチャンネル数を減らす"],
            answer: 0,
            explanation: "切り出した領域のサイズがバラバラだと全結合層に入力できないため、MaxPoolingを使って無理やり $7 \\times 7$ などに統一します。"
        },
        {
            category: "Mask R-CNN(応用)",
            question: "Mask R-CNNは、Faster R-CNNにどのような機能を追加したモデルか。",
            options: ["インスタンス・セグメンテーション用のマスク予測ブランチ（FCN）を追加した", "画像の生成機能を追加した", "3D検出機能を追加した", "音声認識機能を追加した"],
            answer: 0,
            explanation: "物体検出（箱）と同時に、その中身のピクセル単位のマスク（形）も予測するように拡張したモデルです。RoI Alignという技術も導入されました。"
        },
        {
            category: "FCOS(応用)",
            question: "FCOS (Fully Convolutional One-Stage Object Detection) が、従来のYOLO(v3以前)やSSDと大きく異なる点は何か。",
            options: ["アンカーボックスを使わない「アンカーフリー」な手法である", "2ステージ検出器である", "Transformerを使っている", "セグメンテーション専用である"],
            answer: 0,
            explanation: "アンカーボックスの設計（数やサイズ）は職人芸が必要でしたが、FCOSは各ピクセルが「物体の中か？」「中心からどれくらい離れているか？」を直接予測することでこれを不要にしました。"
        },
        {
            category: "ViTの帰納的バイアス(応用)",
            question: "ViTはCNNに比べて「帰納的バイアス（Inductive Bias）」が少ないと言われる。これは何を意味するか。",
            options: ["「画像の局所性」や「平行移動不変性」といった画像特有の前提知識をモデルが持っていないため、大量のデータで学習しないと精度が出ない", "モデルのパラメータ数が少ない", "学習データに偏りがあっても大丈夫である", "画像以外のデータは扱えない"],
            answer: 0,
            explanation: "CNNは「隣り合う画素は関係ある」という前提（バイアス）を構造に組み込んでいますが、ViTは全パッチが対等な関係からスタートするため、それをデータから学ぶ必要があります。"
        },
        {
            category: "アップサンプリング(応用)",
            question: "セグメンテーション（FCNやU-Net）において、特徴マップの解像度を元に戻すために使われる「学習可能な」アップサンプリング手法はどれか。",
            options: ["転置畳み込み (Transposed Convolution / Deconvolution)", "Bilinear Interpolation", "Nearest Neighbor", "Unpooling"],
            answer: 0,
            explanation: "単なる引き伸ばし（補間）ではなく、拡大する際の重みも学習できるため、より精度の高い復元が可能です。"
        },
        {
            category: "YOLO v1の制約(応用)",
            question: "初期のYOLO (v1) のグリッドベース予測における主な弱点は何だったか。",
            options: ["1つのグリッドセルあたり少数の物体しか予測できないため、密集した小さな物体（鳥の群れなど）の検出に弱い", "処理速度が遅い", "大きな物体が検出できない", "背景を物体と誤認しやすい"],
            answer: 0,
            explanation: "1つのグリッドにつき予測できる物体数に制限があったため、物体が重なり合っている状況などは苦手でした（後のバージョンで改善）。"
        },
        {
            category: "Panoptic Segmentation(応用)",
            question: "「パノプティック・セグメンテーション (Panoptic Segmentation)」とはどのようなタスクか。",
            options: ["セマンティック（背景など）とインスタンス（物体など）の両方を統一的に行うタスク", "360度画像のセグメンテーション", "動画のセグメンテーション", "医療画像専用のセグメンテーション"],
            answer: 0,
            explanation: "「空や道路（数えられない背景）」はセマンティック、「車や人（数えられる物体）」はインスタンスとして、画面内の全てを矛盾なく理解するタスクです。"
        }
    ]
};
