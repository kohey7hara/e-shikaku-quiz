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
            .syllabus-note { background:#eef7ff; border-left:5px solid #3498db; padding:12px 14px; margin:12px 0; line-height:1.7; }
            .history-core { background:#fff8df; }
            .model-formula { white-space:nowrap; font-weight:bold; }
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

        <h3>■ 1. 画像認識モデルの歴史：「何を解決したか」でつなぐ</h3>
        <div class="syllabus-note">
            <strong>2026シラバスの直接対象：</strong>ResNet・WideResNetの「残差接続、Residual Block、ボトルネック構造」と、Vision Transformerの「Shifted Window、CLS token、Position embedding」です。<br>
            <strong>VGG・AlexNetなど：</strong>シラバスの直接キーワードではありませんが、ResNetが登場した理由を理解するための歴史的な比較モデルとして学びます。
        </div>
        <table class="model-table">
            <tr><th>年</th><th>モデル</th><th>何を進歩させた？</th><th>試験での識別ポイント</th></tr>
            <tr>
                <td>1998</td>
                <td><strong>LeNet-5</strong></td>
                <td>畳み込みとプーリングを重ねる初期CNNを確立。</td>
                <td>手書き数字認識、Conv → Pool → 全結合</td>
            </tr>
            <tr>
                <td>2012</td>
                <td><strong>AlexNet</strong></td>
                <td>大規模画像認識で深層CNNの有効性を示した。</td>
                <td>ImageNet、GPU、ReLU、Dropout、データ拡張</td>
            </tr>
            <tr>
                <td>2014</td>
                <td><strong>VGG</strong></td>
                <td>$3 \\times 3$ の小さな畳み込みを繰り返し、16層・19層へ深層化。</td>
                <td>構造は単純、全結合層が大きくパラメータが多い</td>
            </tr>
            <tr>
                <td>2014</td>
                <td><strong>GoogLeNet</strong><br><small>Inception v1</small></td>
                <td>$1 \\times 1$、$3 \\times 3$、$5 \\times 5$、Poolingを並列化。</td>
                <td>Inception Module、$1 \\times 1$で次元圧縮、GAP</td>
            </tr>
            <tr class="history-core">
                <td>2015</td>
                <td><strong>ResNet</strong></td>
                <td><strong>残差接続</strong>で $H(x)=F(x)+x$ とし、深いPlain Networkの劣化問題を改善。</td>
                <td>Residual Block、加算、Basic／Bottleneck、射影Shortcut</td>
            </tr>
            <tr class="history-core">
                <td>2016</td>
                <td><strong>WideResNet</strong></td>
                <td>層を極端に増やす代わりにResidual Blockのチャネル幅を広げた。</td>
                <td>「深さ」だけでなく「幅」を増やす</td>
            </tr>
            <tr>
                <td>2016</td>
                <td><strong>DenseNet</strong></td>
                <td>各層が前の全層の特徴を受け取り、特徴を再利用。</td>
                <td>ResNetは<strong>加算</strong>、DenseNetは<strong>チャネル方向に連結</strong></td>
            </tr>
            <tr>
                <td>2017</td>
                <td><strong>MobileNet</strong></td>
                <td><strong>Depthwise Separable Conv</strong>で計算量を削減。</td>
                <td>Depthwise（空間）→ Pointwise（チャネル混合）</td>
            </tr>
            <tr>
                <td>2019</td>
                <td><strong>EfficientNet</strong></td>
                <td>深さ・幅・入力解像度をまとめて拡大。</td>
                <td>Compound Scaling</td>
            </tr>
            <tr class="history-core">
                <td>2020</td>
                <td><strong>ViT</strong><br>(Vision Transformer)</td>
                <td>画像をパッチ列に変換し、純粋なTransformer Encoderで分類。</td>
                <td>Patch token、CLS token、Position embedding</td>
            </tr>
            <tr class="history-core">
                <td>2021</td>
                <td><strong>Swin Transformer</strong></td>
                <td>局所WindowでAttentionし、次の層で窓をずらして窓間を接続。</td>
                <td>Shifted Window、階層構造、高解像度へ効率的</td>
            </tr>
        </table>

        <h3>■ ResNetの詳細：試験ではブロック内部まで区別する</h3>
        <p>Residual Block全体は $y=F(x)+S(x)$ と書けます。同じ形なら $S(x)=x$、空間サイズやチャネル数が違う場合は $S(x)=W_sx$ として、$1 \\times 1$ 畳み込みなどで形を合わせます。</p>
        <table class="model-table">
            <tr><th>構造</th><th>中身</th><th>代表モデル</th><th>目的</th></tr>
            <tr>
                <td><strong>Basic Block</strong></td>
                <td>$3 \\times 3$ → $3 \\times 3$</td>
                <td>ResNet-18／34</td>
                <td>比較的浅いResNetの基本ブロック</td>
            </tr>
            <tr>
                <td><strong>Bottleneck Block</strong></td>
                <td>$1 \\times 1$圧縮 → $3 \\times 3$ → $1 \\times 1$拡張</td>
                <td>ResNet-50／101／152</td>
                <td>深いモデルの計算量を抑える</td>
            </tr>
            <tr>
                <td><strong>Identity Shortcut</strong></td>
                <td class="model-formula">$S(x)=x$</td>
                <td>入出力の形が同じ</td>
                <td>パラメータを増やさず入力を加算</td>
            </tr>
            <tr>
                <td><strong>Projection Shortcut</strong></td>
                <td class="model-formula">$S(x)=W_sx$</td>
                <td>解像度・チャネルが変化</td>
                <td>$1 \\times 1$畳み込み等で加算可能な形へ変換</td>
            </tr>
        </table>
        <div class="calc-box">
            <strong>劣化問題と過学習は別：</strong>Plain Networkを深くしたとき、テスト誤差だけでなく<strong>訓練誤差まで悪化</strong>するのが劣化問題です。ResNetは「恒等写像なら残差 $F(x)=0$ を学べばよい」という形にし、深いネットワークを最適化しやすくしました。<br>
            <strong>接続の識別：</strong>ResNetは $F(x)+x$ の<strong>加算</strong>、DenseNetは過去の特徴マップの<strong>連結</strong>、U-NetはEncoderとDecoderの同じ解像度の特徴を<strong>連結</strong>します。
        </div>

        <h3>■ 4. Shifted Window：窓をずらして隣と会話する</h3>
        <style>
            .swin-pair { display:flex; gap:18px; justify-content:center; flex-wrap:wrap; margin:15px 0; }
            .swin-panel { text-align:center; min-width:230px; }
            .swin-grid { display:grid; grid-template-columns:repeat(4,42px); grid-template-rows:repeat(4,42px); gap:2px; justify-content:center; margin-top:8px; }
            .swin-cell { display:grid; place-items:center; border:1px solid #9aa; font-size:.75em; }
            .win-a { background:#d9efff; } .win-b { background:#ffe7bd; } .win-c { background:#dcf6df; } .win-d { background:#f2dcff; }
            .shifted { outline:3px dashed #e74c3c; outline-offset:-6px; }
            .swin-step { display:flex; align-items:center; justify-content:center; gap:8px; flex-wrap:wrap; }
            .swin-step span { padding:8px 10px; border-radius:8px; background:#eef4fa; font-weight:bold; }
        </style>
        <p>Swin Transformerは画像全体でAttentionをせず、小さな窓の中だけを見ることで計算を軽くします。ただし窓を固定すると、窓Aと窓Bの情報が混ざりません。</p>
        <div class="swin-pair">
            <div class="swin-panel"><strong>① Window Attention</strong><small><br>同じ色の窓の中で会話</small><div class="swin-grid">
                <span class="swin-cell win-a">A</span><span class="swin-cell win-a">A</span><span class="swin-cell win-b">B</span><span class="swin-cell win-b">B</span>
                <span class="swin-cell win-a">A</span><span class="swin-cell win-a">A</span><span class="swin-cell win-b">B</span><span class="swin-cell win-b">B</span>
                <span class="swin-cell win-c">C</span><span class="swin-cell win-c">C</span><span class="swin-cell win-d">D</span><span class="swin-cell win-d">D</span>
                <span class="swin-cell win-c">C</span><span class="swin-cell win-c">C</span><span class="swin-cell win-d">D</span><span class="swin-cell win-d">D</span>
            </div></div>
            <div class="swin-panel"><strong>② Shifted Window</strong><small><br>次の層で窓をずらす</small><div class="swin-grid shifted">
                <span class="swin-cell win-d">D</span><span class="swin-cell win-c">C</span><span class="swin-cell win-c">C</span><span class="swin-cell win-d">D</span>
                <span class="swin-cell win-b">B</span><span class="swin-cell win-a">A</span><span class="swin-cell win-a">A</span><span class="swin-cell win-b">B</span>
                <span class="swin-cell win-b">B</span><span class="swin-cell win-a">A</span><span class="swin-cell win-a">A</span><span class="swin-cell win-b">B</span>
                <span class="swin-cell win-d">D</span><span class="swin-cell win-c">C</span><span class="swin-cell win-c">C</span><span class="swin-cell win-d">D</span>
            </div></div>
        </div>
        <div class="swin-step"><span>局所Attentionで軽量</span>→<span>窓をシフト</span>→<span>窓をまたぐ情報交換</span></div>
        <p><strong>覚え方：</strong>「教室内で話す → 席替えする → 隣の教室の人とも情報がつながる」。未来を隠すMasked Attentionとは目的が違います。</p>

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
        },
        {
            id: "image-shifted-window-purpose",
            category: "Shifted Window",
            question: "Swin Transformerで、連続する層のWindow位置をずらす主な目的はどれか。",
            options: ["固定Windowの境界を越えてパッチ間の情報を交換する", "未来のパッチを隠す", "画像をランダム回転する", "クラス数を減らす"],
            answer: 0,
            explanation: "局所Windowだけでは窓同士が分断されます。次の層で窓をずらすと、前の層では別窓だったパッチが同じ窓に入り、情報がつながります。"
        },
        {
            id: "image-window-computation",
            category: "Shifted Window(計算量)",
            question: "画像全体のSelf-Attentionではなく、固定サイズの局所Window内でAttentionを行う主な利点はどれか。",
            options: ["画像サイズ増加に対する計算量を抑えやすい", "必ずパラメータ数が0になる", "位置情報が不要になる", "畳み込みと完全に同じ計算になる"],
            answer: 0,
            explanation: "全パッチ対のAttentionはパッチ数の二乗に比例します。窓サイズを固定すれば各パッチが見る相手を限定でき、高解像度画像を扱いやすくなります。"
        },
        {
            id: "image-shifted-window-trap",
            category: "Shifted Window(識別)",
            question: "Shifted WindowとDecoderのCausal Maskの違いとして正しいものはどれか。",
            options: ["Shifted Windowは局所窓間の接続、Causal Maskは未来情報の参照禁止が目的", "どちらも未来情報の参照禁止が目的", "どちらもデータ拡張である", "Shifted Windowは出力確率を正規化する"],
            answer: 0,
            explanation: "名前にWindowやMaskが出ても役割は別です。Shifted Windowは画像Attentionの効率と窓間接続、Causal Maskは自己回帰生成のカンニング防止です。"
        },
        {
            id: "img-history-order",
            category: "画像認識モデル史",
            kind: "歴史・比較",
            difficulty: "必須",
            question: "画像認識モデルの登場順として正しいものはどれか。",
            options: ["VGG → AlexNet → ResNet → Swin Transformer → ViT", "ResNet → VGG → AlexNet → ViT → Swin Transformer", "AlexNet → VGG → ResNet → ViT → Swin Transformer", "AlexNet → ResNet → VGG → Swin Transformer → ViT"],
            answer: 2,
            explanation: "代表年はAlexNet（2012）→ VGG（2014）→ ResNet（2015）→ ViT（2020）→ Swin Transformer（2021）です。年号の丸暗記より、深層CNNの成功→小フィルタで深層化→残差学習→画像のTransformer化→局所Windowで効率化、という課題解決の流れを覚えます。"
        },
        {
            id: "img-alexnet-breakthrough",
            category: "AlexNet",
            kind: "歴史・比較",
            difficulty: "標準",
            question: "AlexNetが2012年の大規模画像認識で示した特徴の組として最も適切なものはどれか。",
            options: ["全層をSelf-Attentionだけで構成し、位置埋め込みを使った", "GPUで深いCNNを学習し、ReLU・Dropout・データ拡張を活用した", "Residual Blockを152層積み重ねた", "Depthwise畳み込みだけでモバイル向けに軽量化した"],
            answer: 1,
            explanation: "AlexNetは大規模なImageNetとGPU計算を組み合わせ、ReLUで学習を高速化し、Dropoutやデータ拡張で過学習を抑えました。ViT、ResNet、MobileNetの特徴と混同しないことが重要です。"
        },
        {
            id: "img-vgg-core",
            category: "VGG",
            kind: "歴史・比較",
            difficulty: "必須",
            question: "VGG-16／VGG-19の設計思想として最も適切なものはどれか。",
            options: ["異なる大きさの畳み込みを並列に適用する", "入力をパッチ列へ変換してTransformerへ入れる", "層間をすべて加算するResidual Blockを使う", "$3 \\times 3$の小さな畳み込みを繰り返し、単純な規則で深くする"],
            answer: 3,
            explanation: "VGGは小さな$3 \\times 3$畳み込みを重ね、16層・19層へ深層化しました。構造は理解しやすい一方、後半の全結合層が大きく、パラメータ数が多い点も特徴です。"
        },
        {
            id: "img-vgg-receptive-field",
            category: "VGG（計算）",
            kind: "手計算",
            difficulty: "本試験型",
            question: "ストライド1の$3 \\times 3$畳み込みを2層重ねる。チャネル数が一定でバイアスを無視すると、1回の$5 \\times 5$畳み込みと比べた説明として正しいものはどれか。",
            options: ["受容野は$3 \\times 3$のままで、重み数は$9C^2$", "受容野は$7 \\times 7$で、重み数は$49C^2$", "受容野は$5 \\times 5$で、重み数は$18C^2$となり、途中に非線形変換も入る", "受容野は$5 \\times 5$だが、重み数は$50C^2$"],
            answer: 2,
            explanation: "$3 \\times 3$を2層重ねた受容野は$5 \\times 5$です。重み数は$3 \\times 3 \\times C^2$が2回なので$18C^2$で、$5 \\times 5$ 1層の$25C^2$より少なくなります。さらに活性化関数を2回入れられるため表現力も高まります。"
        },
        {
            id: "img-inception-core",
            category: "GoogLeNet／Inception",
            kind: "歴史・比較",
            difficulty: "標準",
            question: "GoogLeNetのInception Moduleを正しく説明しているものはどれか。",
            options: ["すべての層を前の全層へ密に連結する", "$1 \\times 1$・$3 \\times 3$・$5 \\times 5$畳み込みやPoolingを並列に処理し、$1 \\times 1$畳み込みで計算量も抑える", "入力をそのまま出力へ加算するだけである", "局所Windowを次の層でずらしてAttentionする"],
            answer: 1,
            explanation: "Inceptionは複数スケールの特徴を並列に抽出して連結します。高コストな畳み込みの前に$1 \\times 1$畳み込みでチャネルを減らすBottleneck的な設計が重要です。"
        },
        {
            id: "img-resnet-degradation",
            category: "ResNet（劣化問題）",
            kind: "内部構造",
            difficulty: "必須",
            question: "ResNetが主に改善した「劣化問題（Degradation Problem）」の説明として正しいものはどれか。",
            options: ["深いモデルでは必ずテスト誤差だけが増える過学習のこと", "画像を縮小しすぎて画素数が0になること", "GPUメモリが不足して学習できないこと", "Plain Networkを深くすると、より表現力があるはずなのに訓練誤差まで悪化する最適化上の問題"],
            answer: 3,
            explanation: "劣化問題は単なる過学習ではありません。層を増やしたPlain Networkで訓練誤差まで悪化する現象です。Residual Learningは恒等写像を作りやすくし、深いネットワークの最適化を容易にします。"
        },
        {
            id: "img-residual-learning-formula",
            category: "ResNet（残差学習）",
            kind: "内部構造",
            difficulty: "必須",
            question: "ResNetで本来求めたい写像を$H(x)$、Residual Blockが学ぶ残差を$F(x)$とすると、関係式として正しいものはどれか。",
            options: ["$F(x)=H(x)-x$、したがって$H(x)=F(x)+x$", "$F(x)=H(x)+x$、したがって$H(x)=F(x)-x$", "$F(x)=H(x)\\times x$", "$H(x)=\\mathrm{softmax}(F(x))$"],
            answer: 0,
            explanation: "Residual Blockは目的写像$H(x)$そのものではなく、入力との差$F(x)=H(x)-x$を学びます。出力側でShortcutの$x$を足し、$H(x)=F(x)+x$へ戻します。"
        },
        {
            id: "img-resnet-projection-shortcut",
            category: "ResNet（射影Shortcut）",
            kind: "内部構造",
            difficulty: "本試験型",
            question: "Residual Blockで主経路の出力が$16 \\times 16 \\times 128$、入力$x$が$32 \\times 32 \\times 64$のとき、加算前のShortcutとして適切なものはどれか。",
            options: ["入力をそのまま恒等写像で加える", "$3 \\times 3$ Max Poolingだけでチャネルも自動的に128へする", "$1 \\times 1$畳み込みをstride 2、出力128チャネルで適用する", "Global Average Poolingで$1 \\times 1 \\times 64$へする"],
            answer: 2,
            explanation: "加算するテンソルは高さ・幅・チャネル数が一致する必要があります。$1 \\times 1$畳み込みでstride 2にすれば$32→16$、出力128チャネルにすれば$64→128$を同時に行えます。"
        },
        {
            id: "img-resnet-basic-vs-bottleneck",
            category: "ResNet（Block比較）",
            kind: "内部構造",
            difficulty: "必須",
            question: "ResNetのBasic BlockとBottleneck Blockの対応として正しいものはどれか。",
            options: ["ResNet-18／34はBottleneck、ResNet-50以上はBasic Block", "ResNet-18／34は主に$3 \\times 3→3 \\times 3$、ResNet-50／101／152は主に$1 \\times 1→3 \\times 3→1 \\times 1$", "どのResNetも$5 \\times 5$畳み込みだけを使う", "Bottleneckはチャネルを増やすだけで、計算量削減には使わない"],
            answer: 1,
            explanation: "比較的浅いResNet-18／34はBasic Block、深いResNet-50／101／152はBottleneck Blockが基本です。Bottleneckは$1 \\times 1$で圧縮してから$3 \\times 3$を行い、最後に$1 \\times 1$で拡張します。"
        },
        {
            id: "img-resnet-vs-densenet",
            category: "ResNet／DenseNet比較",
            kind: "歴史・比較",
            difficulty: "標準",
            question: "ResNetとDenseNetの接続方法の違いとして正しいものはどれか。",
            options: ["どちらも過去の特徴を必ずSoftmaxで正規化する", "ResNetは連結、DenseNetは要素積を使う", "どちらも入力を破棄して新しい特徴だけを使う", "ResNetはShortcutと残差を要素ごとに加算し、DenseNetは過去の特徴マップをチャネル方向に連結する"],
            answer: 3,
            explanation: "ResNetの代表式は$F(x)+x$で、加算には形状一致が必要です。DenseNetは各層へ過去の特徴をConcatenateし、特徴再利用を促します。加算か連結かは頻出の識別点です。"
        },
        {
            id: "img-cnn-to-vit-swin",
            category: "CNNからViTへ",
            kind: "歴史・比較",
            difficulty: "必須",
            question: "VGG／ResNetからViT、さらにSwin Transformerへの発展を正しく説明しているものはどれか。",
            options: ["ViTは画像をPatch tokenへ変換しCLS tokenとPosition embeddingを加えてSelf-Attentionを使い、Swinは局所WindowとShifted Windowで高解像度画像を効率的に扱う", "ViTは$3 \\times 3$畳み込みだけを重ね、SwinはDropoutを初めて導入した", "ViTはResidual Blockだけで構成され、Swinは位置情報を一切使わない", "ViTもSwinもRNNで画像を1画素ずつ処理する"],
            answer: 0,
            explanation: "ViTは画像パッチをToken列としてTransformer Encoderへ入力します。CLS tokenを分類表現として使い、Position embeddingで位置を補います。SwinはAttentionを局所Windowへ限定し、次の層でWindowをずらして窓間の情報をつなぎます。"
        },
        {id:"img-resnet-block",category:"ResNet(内部構造)",question:"Residual Blockの基本式として最も近いものはどれか。",options:["$y=F(x)+x$","$y=F(x)×x$のみ","$y=softmax(x)$","$y=x-F(x)$のみ"],answer:0,explanation:"残差枝F(x)と恒等写像xを加算し、勾配と情報を直接流します。形状が違う場合は射影を使います。"},
        {id:"img-bottleneck",category:"ResNet Bottleneck",question:"ResNetのBottleneck Blockで1×1畳み込みを前後に置く主な理由はどれか。",options:["3×3畳み込みの前にチャネルを圧縮し、後で復元して計算量を抑える","空間サイズを必ず0にする","Softmaxを置き換える","ラベルを圧縮する"],answer:0,explanation:"典型的に1×1で縮小→3×3で処理→1×1で拡張し、深いモデルを効率化します。"},
        {id:"img-wideresnet",category:"WideResNet",question:"WideResNetの基本的な発想はどれか。",options:["極端に深くする代わりにResidual Blockのチャネル幅を広げる","全畳み込みをRNNへ変える","入力解像度だけを下げる","スキップ接続を削除する"],answer:0,explanation:"深さだけでなく幅を増やすことで表現力と並列性を高めます。"},
        {id:"img-rpn",category:"RPN(内部構造)",question:"Faster R-CNNのRPNが出力する代表的な2種類はどれか。",options:["各AnchorのobjectnessとBounding Box補正量","学習率とバッチサイズ","最終マスクだけ","Softmax温度と学習率"],answer:0,explanation:"物体らしさとAnchorから正解Boxへ近づける回帰量を予測し、候補領域を作ります。"},
        {id:"img-roialign",category:"ROI Align",question:"ROI AlignがROI Poolingより位置ずれを抑える仕組みはどれか。",options:["座標の丸めを避け、双線形補間で特徴をサンプリング","全座標を整数へ切り捨て","NMSを使わない","Anchorを削除"],answer:0,explanation:"量子化によるずれがマスク境界へ悪影響を与えるため、連続座標で補間します。"},
        {id:"img-hard-negative",category:"SSD Hard Negative Mining",question:"SSDのHard Negative Miningの目的はどれか。",options:["背景Anchorが圧倒的に多い中、損失の大きい負例を選んで正負バランスを取る","難しい正例を全て削除","画像を高解像度化","IoUを常に1にする"],answer:0,explanation:"容易な背景例ばかりで学習が支配されるのを防ぎます。"},
        {id:"img-fcos-centerness",category:"FCOS Centerness",question:"FCOSのCenternessが抑制したい予測はどれか。",options:["物体中心から遠い位置が出す低品質Box","中心付近の高品質Box","全ての正例","クラス確率"],answer:0,explanation:"中心から離れた位置のBoxスコアを下げ、NMS前の順位品質を改善します。"},
        {id:"img-maskrcnn-heads",category:"Mask R-CNN(内部構造)",question:"Mask R-CNNがFaster R-CNNへ主に追加する枝はどれか。",options:["各ROIのピクセルマスク予測Head","言語モデルHead","学習率予測Head","バッチサイズ予測Head"],answer:0,explanation:"分類・Box回帰に加えて、各インスタンスの二値マスクを並列に予測します。"}
    ]
};
