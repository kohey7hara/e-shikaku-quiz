window.quizData = {
    title: "4-（１〜３）画像認識・物体検出・セグメンテーション",
    
    cheatSheet: `
        <style>
            .task-container { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 20px; }
            .task-box { border: 1px solid #ccc; border-radius: 8px; padding: 10px; width: 30%; min-width: 250px; background: #fff; text-align: center; }
            .task-icon { font-size: 2em; margin-bottom: 5px; }
            .task-title { font-weight: bold; border-bottom: 2px solid #333; display: inline-block; margin-bottom: 5px; }
            
            .model-table { width: 100%; border-collapse: collapse; font-size: 0.85em; margin-top: 10px; }
            .model-table th { background: #eee; border: 1px solid #ccc; padding: 5px; }
            .model-table td { border: 1px solid #ccc; padding: 5px; }
            
            .pros { color: #27ae60; font-weight: bold; }
            .cons { color: #c0392b; font-weight: bold; }
            
            .tech-badge { display: inline-block; padding: 2px 5px; font-size: 0.75em; border-radius: 4px; color: white; margin: 2px; }
            .bg-blue { background-color: #3498db; }
            .bg-green { background-color: #27ae60; }
            .bg-orange { background-color: #f39c12; }

            .calc-box { background:#f9f9f9; padding:5px; border:1px dashed #999; margin-top:5px; font-size:0.9em; text-align:left; }
        </style>

        <h3>■ 3大タスクの比較と出力</h3>
        <div class="task-container">
            <div class="task-box">
                <div class="task-icon">🖼️</div>
                <div class="task-title" style="border-color:#3498db;">画像認識</div>
                <small>Classification</small>
                <p style="font-size:0.8em; text-align:left;">
                    <strong>「これは何？」</strong><br>
                    出力：クラスラベル<br>
                    対象：画像全体で1つ
                </p>
            </div>
            <div class="task-box">
                <div class="task-icon">📦</div>
                <div class="task-title" style="border-color:#f39c12;">物体検出</div>
                <small>Object Detection</small>
                <p style="font-size:0.8em; text-align:left;">
                    <strong>「どこに何がある？」</strong><br>
                    出力：Box座標 + クラス<br>
                    対象：複数の物体
                </p>
            </div>
            <div class="task-box">
                <div class="task-icon">✂️</div>
                <div class="task-title" style="border-color:#27ae60;">セグメンテーション</div>
                <small>Segmentation</small>
                <p style="font-size:0.8em; text-align:left;">
                    <strong>「画素ごとの意味は？」</strong><br>
                    出力：画素単位のマスク<br>
                    対象：精密な領域
                </p>
            </div>
        </div>

        <h3>■ 1. 画像認識 (代表的モデル)</h3>
        <table class="model-table">
            <tr><th>モデル</th><th>特徴・強み</th><th>キーワード</th></tr>
            <tr>
                <td><strong>VGG</strong></td>
                <td>$3 \\times 3$ の小さなフィルタを深く重ねた単純な構造。</td>
                <td>シンプル、パラメータ多</td>
            </tr>
            <tr>
                <td><strong>ResNet</strong></td>
                <td><strong>残差結合 (Skip Connection)</strong> で $x+F(x)$ を計算。<br>152層などの超深層でも勾配消失しない。</td>
                <td>Residual Block<br>デファクトスタンダード</td>
            </tr>
            <tr>
                <td><strong>MobileNet</strong></td>
                <td><strong>Depthwise Separable Conv</strong> を採用。<br>精度を保ちつつ計算量を劇的に削減（スマホ向け）。</td>
                <td>軽量化、高速化</td>
            </tr>
            <tr>
                <td><strong>ViT</strong><br>(Vision Transformer)</td>
                <td>画像をパッチ（16x16等）に分割し、Transformerに入力。<br>CNNを超えうる精度だが大量データが必要。</td>
                <td>Attention、Patch</td>
            </tr>
        </table>

        <h3>■ 2. 物体検出 (2段階 vs 1段階)</h3>
        <p>「精度重視」か「速度重視」かでアーキテクチャが分かれます。</p>
        <table class="model-table">
            <tr><th>タイプ</th><th>モデル名</th><th>仕組み・特徴</th></tr>
            <tr>
                <td rowspan="2" style="background:#eef;"><strong>2ステージ</strong><br><small>精度◎ 速度△</small></td>
                <td><strong>R-CNN</strong>系</td>
                <td>①候補領域を提案 → ②CNNで分類 の2段階。<br>初期は遅かったが進化している。</td>
            </tr>
            <tr>
                <td><strong>Faster R-CNN</strong></td>
                <td>候補提案もNNで行う <strong>RPN (Region Proposal Network)</strong> を導入し、ほぼEnd-to-End化して高速化。</td>
            </tr>
            <tr>
                <td rowspan="2" style="background:#fef9e7;"><strong>1ステージ</strong><br><small>精度○ 速度◎</small></td>
                <td><strong>YOLO</strong><br>(You Only Look Once)</td>
                <td>画像をグリッドに分割し、領域とクラスを<strong>同時</strong>に推定。<br>非常に高速（リアルタイム向き）。</td>
            </tr>
            <tr>
                <td><strong>SSD</strong><br>(Single Shot MultiBox Detector)</td>
                <td>異なる解像度の特徴マップ（マルチスケール）を使って、大小様々な物体を検出する。</td>
            </tr>
        </table>
        
        <div class="calc-box">
            <strong>【重要用語】</strong><br>
            <strong>IoU (Intersection over Union)</strong>: 重なり率。正解Boxと予測Boxの「積集合 ÷ 和集合」。<br>
            <strong>NMS (Non-Maximum Suppression)</strong>: 同じ物体に対する重複した枠を除去する後処理。<br>
            <strong>mAP (mean Average Precision)</strong>: 物体検出の総合的な評価指標。
        </div>

        <h3>■ 3. セグメンテーション</h3>
        <p>「ピクセル単位」の分類です。</p>
        <table class="model-table">
            <tr><th>タスク名</th><th>違い</th><th>代表モデル</th></tr>
            <tr>
                <td><strong>Semantic</strong><br>Segmentation</td>
                <td>「空」「道路」「車」などクラスごとに塗る。<br><span class="cons">※「車A」と「車B」は区別しない。</span></td>
                <td><strong>FCN</strong> (Fully Convolutional)<br><strong>U-Net</strong> (医療用・形状維持)<br><strong>DeepLab</strong> (Dilated Conv)</td>
            </tr>
            <tr>
                <td><strong>Instance</strong><br>Segmentation</td>
                <td>物体検出 + 領域分割。<br><span class="pros">※「車A」「車B」を個別に識別する。</span></td>
                <td><strong>Mask R-CNN</strong><br>(Faster R-CNNにマスク枝を追加)</td>
            </tr>
        </table>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【基礎編】 Q1 - Q15
        // ---------------------------------------------------------
        {
            category: "ResNet",
            question: "ResNet (Residual Network) が「残差結合（スキップコネクション）」を導入することで解決した、深層学習における最大の問題は何か。",
            options: ["層を深くしすぎると、勾配消失や劣化問題（Degradation）により逆に精度が落ちてしまう問題", "計算量が爆発的に増える問題", "過学習しやすくなる問題", "画像サイズが小さくなりすぎる問題"],
            answer: 0,
            explanation: "入力 $x$ を出力に足し合わせる（$H(x) = F(x) + x$）ことで、勾配の抜け道を作り、100層以上でも学習可能にしました。"
        },
        {
            category: "Faster R-CNN",
            question: "Faster R-CNNにおいて、画像のどこに物体がありそうか（候補領域）を推定するために導入されたネットワークは何か。",
            options: ["RPN (Region Proposal Network)", "FPN (Feature Pyramid Network)", "GAN (Generative Adversarial Network)", "CNN"],
            answer: 0,
            explanation: "それ以前（Fast R-CNNなど）は外部アルゴリズム（Selective Search）を使っていましたが、RPNにより候補提案も学習可能にし、高速化しました。"
        },
        {
            category: "YOLO",
            question: "物体検出モデル「YOLO (You Only Look Once)」の最大の特徴は何か。",
            options: ["画像をグリッドに分割し、各グリッドでバウンディングボックスとクラス確率を「一度のCNN処理」で同時に回帰問題として解く", "候補領域を提案してから分類する2段階処理を行う", "セグメンテーションを行ってから枠を決める", "動画専用のモデルである"],
            answer: 0,
            explanation: "1ステージ系（One-stage detector）の代表格です。領域提案のプロセスを省くことで、圧倒的な推論速度を実現しました。"
        },
        {
            category: "IoU",
            question: "物体検出の評価で使われる「IoU (Intersection over Union)」の計算式として正しいものはどれか。（A: 正解ボックス、B: 予測ボックス）",
            options: ["$\\frac{A \\cap B}{A \\cup B}$ (重なり部分の面積 ÷ 両方を合わせた面積)", "$\\frac{A \\cap B}{A}$", "$\\frac{A \\cup B}{A \\cap B}$", "$|A - B|$"],
            answer: 0,
            explanation: "Jaccard係数とも呼ばれます。完全に一致すれば1.0、全く重ならなければ0.0になります。"
        },
        {
            category: "FCN",
            question: "セマンティックセグメンテーションの先駆けとなった「FCN (Fully Convolutional Network)」の特徴は何か。",
            options: ["全結合層を排除し、すべて畳み込み層で構成することで、任意のサイズの画像を入力可能にした", "全て全結合層で作られている", "RNNを使用している", "入力画像を固定サイズにする必要がある"],
            answer: 0,
            explanation: "位置情報を失う全結合層を使わず、最後に「逆畳み込み（アップサンプリング）」を行って元の画像サイズに戻して予測します。"
        },
        {
            category: "Semantic vs Instance",
            question: "「Semantic Segmentation」と「Instance Segmentation」の違いについて正しい記述はどれか。",
            options: ["Semanticは「クラス（例：人）」単位で塗り分けるが、Instanceは「個体（例：Aさん、Bさん）」まで区別して塗り分ける", "Semanticは個体を区別するが、Instanceは区別しない", "Semanticは背景のみ、Instanceは物体のみを扱う", "両者は全く同じ意味である"],
            answer: 0,
            explanation: "Semanticは「ピクセルが何か」だけを見ます。Instanceは「物体検出」の拡張版で、検出した箱の中身を塗るイメージです。"
        },
        {
            category: "NMS",
            question: "物体検出の後処理で使われる「NMS (Non-Maximum Suppression)」は何をする処理か。",
            options: ["同じ物体に対して重複して検出されたバウンディングボックスのうち、スコアが最大のものを残して他を削除する", "スコアが低いものを全て削除する", "検出されなかった物体を補完する", "画像をリサイズする"],
            answer: 0,
            explanation: "YOLOなどは1つの物体に複数のグリッドが反応してしまうため、重複除去（Suppression）が必要です。"
        },
        {
            category: "SSD",
            question: "物体検出モデル「SSD (Single Shot MultiBox Detector)」が、大小様々な大きさの物体を検出するために採用した工夫は何か。",
            options: ["CNNの途中の異なる解像度（スケール）の特徴マップそれぞれから、物体検出を行う", "画像をリサイズして何度も入力する", "アンカーボックスの数を極端に増やす", "Attention機構を使う"],
            answer: 0,
            explanation: "浅い層（高解像度）で小さい物体を、深い層（低解像度）で大きい物体を検出することで、YOLO v1の「小さい物体に弱い」弱点を克服しました。"
        },
        {
            category: "U-Net",
            question: "医療画像診断などで有名な「U-Net」の特徴的な構造である、Encoderの特徴マップをDecoder側の同サイズの層に結合する仕組みを何と呼ぶか。",
            options: ["スキップ接続 (Skip Connection) / コピー＆クロップ", "残差結合 (Residual Connection)", "高密度結合 (Dense Connection)", "リカレント結合"],
            answer: 0,
            explanation: "Encoderで失われた位置情報を、Decoderに直接バイパスして渡すことで、精細なセグメンテーションを可能にしています。"
        },
        {
            category: "MobileNet",
            question: "MobileNetで採用されている、通常の畳み込みよりも計算量を大幅に削減する手法は何か。",
            options: ["Depthwise Separable Convolution", "Dilated Convolution", "Transposed Convolution", "Group Convolution"],
            answer: 0,
            explanation: "「空間方向の畳み込み(Depthwise)」と「チャンネル方向の畳み込み(Pointwise)」に分割することで、精度を保ちつつパラメータを削減します。"
        },

        // ---------------------------------------------------------
        // 【応用編】 Q11 - Q20
        // ---------------------------------------------------------
        {
            category: "mAP",
            question: "物体検出の評価指標「mAP (mean Average Precision)」を計算する際に用いられる曲線はどれか。",
            options: ["Precision-Recall 曲線 (PR曲線)", "ROC曲線", "損失関数の減少曲線", "ヒストグラム"],
            answer: 0,
            explanation: "各クラスごとにPR曲線の下側の面積（Average Precision）を計算し、全クラスで平均を取ったものがmAPです。"
        },
        {
            category: "Mask R-CNN",
            question: "インスタンスセグメンテーションモデル「Mask R-CNN」は、Faster R-CNNにどのような変更を加えたものか。",
            options: ["RoI Poolingを「RoI Align」に変更し、マスク予測用のブランチ（FCN）を追加した", "YOLOの構造を取り入れた", "全結合層を削除した", "3次元畳み込みに変更した"],
            answer: 0,
            explanation: "RoI Poolingでの量子化誤差（位置ズレ）を解消するためにRoI Align（双線形補間）を導入し、ピクセル単位のマスク生成を可能にしました。"
        },
        {
            category: "Dilated Conv",
            question: "DeepLabなどのセグメンテーションモデルで使われる「Dilated Convolution (Atrous Conv)」の利点は何か。",
            options: ["パラメータ数を増やさずに、受容野（Receptive Field）を広げることができる", "画像サイズを縮小できる", "計算が高速化する", "ノイズを除去できる"],
            answer: 0,
            explanation: "プーリングで解像度を落とすと位置情報が消えてしまうため、解像度を維持したまま広い範囲を見るために「穴あき畳み込み」を使います。"
        },
        {
            category: "アンカーボックス",
            question: "Faster R-CNNやSSDなどで使われる「Anchor Box（アンカーボックス）」とは何か。",
            options: ["あらかじめ定義された、様々なアスペクト比やサイズの「枠のひな形」", "画像の四隅のこと", "正解データのボックス", "誤検出したボックス"],
            answer: 0,
            explanation: "モデルは「何もないところから枠を作る」のではなく、「既存のひな形（アンカー）をどれくらい変形させるか」を学習します。"
        },
        {
            category: "FPN",
            question: "「FPN (Feature Pyramid Network)」の役割は何か。",
            options: ["深い層の「強い意味情報」と浅い層の「強い位置情報」を結合し、全てのスケールで高精度な検出を行う", "画像をピラミッド状にリサイズして入力する", "特徴量を圧縮する", "3次元物体を検出する"],
            answer: 0,
            explanation: "異なる解像度の特徴マップをトップダウンパスと横方向接続で統合し、小さな物体から大きな物体までロバストに検出できるようにします。"
        },
        {
            category: "GAPの利点",
            question: "画像分類モデル（ResNet等）の最後で、全結合層の直前に「Global Average Pooling (GAP)」を入れる主な利点は何か。",
            options: ["パラメータ数を大幅に削減し、過学習を防ぐとともに、任意の入力画像サイズに対応できる", "計算精度が上がる", "クラス数を増やせる", "画像が鮮明になる"],
            answer: 0,
            explanation: "特徴マップのサイズに関わらず1つの値（平均）に変換するため、入力画像サイズが可変でも固定長のベクトルを取り出せます。"
        },
        {
            category: "FCOS",
            question: "「FCOS (Fully Convolutional One-Stage Object Detection)」などのアンカーフリー（Anchor-free）モデルの特徴は何か。",
            options: ["事前に定義したアンカーボックスを使わず、ピクセルごとに「物体の中心からの距離」などを直接予測する", "アンカーボックスを大量に使う", "2ステージ検出器である", "セグメンテーションしかできない"],
            answer: 0,
            explanation: "アンカーボックスの設計（ハイパーパラメータ）の手間を省き、よりシンプルで柔軟な検出を可能にする近年のトレンドです。"
        },
        {
            category: "Panoptic Segmentation",
            question: "「Panoptic Segmentation（パノプティックセグメンテーション）」とはどのようなタスクか。",
            options: ["Semantic Segmentation（背景など）と Instance Segmentation（物体）を統合し、画像の全画素にラベルとIDを振る", "動画のセグメンテーション", "3D画像のセグメンテーション", "医療用セグメンテーション"],
            answer: 0,
            explanation: "「空や道路（数えられないもの）」と「人や車（数えられるもの）」の両方を統一的に扱う、最も包括的なセグメンテーションタスクです。"
        },
        {
            category: "ViTの構造",
            question: "Vision Transformer (ViT) において、CNNの「局所的な特徴抽出」の代わりとなるTransformerの特性は何か。",
            options: ["Self-Attentionによる、画像全体のパッチ間の大域的な関係性の学習", "畳み込み演算", "再帰的な処理", "プーリングによる圧縮"],
            answer: 0,
            explanation: "ViTは帰納的バイアス（局所性など）を持たないため、大量のデータで学習することで、離れたパッチ同士の関係も含めた強力な表現を獲得します。"
        },
        {
            category: "EfficientNet",
            question: "EfficientNetが提案した「Compound Scaling」とはどのような手法か。",
            options: ["深さ（層数）、幅（チャンネル数）、解像度の3要素を、バランス良く同時にスケールアップする", "とにかく層を深くする", "画像解像度だけを上げる", "ネットワーク探索（NAS）だけで構造を決める"],
            answer: 0,
            explanation: "どれか1つだけを強化しても効率が悪いことを示し、最適なバランス係数 $\phi$ を用いてモデルを拡大する手法を提案しました。"
        }
    ]
};
