window.quizData = {
    title: "3-（７）汎化性能向上のためのテクニック",
    
    cheatSheet: `
        <style>
            .flow-wrap { display: flex; align-items: center; justify-content: center; gap: 5px; background: #f9f9f9; padding: 10px; border-radius: 8px; margin-bottom: 20px; font-size: 0.9em; flex-wrap: wrap; }
            .flow-box { border: 2px solid #333; padding: 8px; background: white; border-radius: 5px; text-align: center; width: 90px; position: relative; }
            .arrow { color: #555; font-weight: bold; }
            
            .norm-visual-container { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-bottom: 20px; }
            .norm-card { border: 1px solid #ccc; border-radius: 8px; padding: 10px; width: 45%; min-width: 250px; background: #fff; }
            
            .data-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; margin: 10px auto; width: 80%; }
            .cell { height: 20px; background: #eee; border: 1px solid #ddd; }
            
            /* Batch Norm: 縦（データ間）でまとめる */
            .bn-highlight { background-color: #3498db; } 
            
            /* Layer Norm: 横（データ内全Ch）でまとめる */
            .ln-highlight { background-color: #e74c3c; }
            
            /* Instance Norm: 個別 */
            .in-highlight { background-color: #27ae60; }
            
            .tech-table { width: 100%; border-collapse: collapse; font-size: 0.85em; }
            .tech-table th { background: #eee; border: 1px solid #ccc; padding: 5px; }
            .tech-table td { border: 1px solid #ccc; padding: 5px; }
        </style>

        <h3>■ 正規化 (Normalization) の位置と役割</h3>
        <p>「学習を安定・高速化」させるために、層と層の間でデータを整形します。</p>
        
        <div class="flow-wrap">
            <div class="flow-box">
                Affine<br>
                <small>畳み込み等</small>
                <br>$Wx+b$
            </div>
            <div class="arrow">→</div>
            <div class="flow-box" style="background:#eafaf1; border-color:#27ae60;">
                <strong>正規化</strong><br>
                <small>Normalize</small>
                <br>$\hat{x} = \frac{x-\mu}{\sigma}$
            </div>
            <div class="arrow">→</div>
            <div class="flow-box" style="background:#fef9e7; border-color:#f39c12;">
                <strong>活性化</strong><br>
                <small>ReLU等</small>
                <br>$f(\hat{x})$
            </div>
        </div>
        <p style="font-size:0.8em; color:#666;">
            ※平均0、分散1に揃えることで、データの偏りを正します。<br>
            ※その後、学習可能なパラメータ $\gamma, \beta$ で適度にスケール・シフトします。
        </p>

        <h3>■ 図解：正規化の守備範囲（どこをまとめる？）</h3>
        <p>「N: バッチ(データ数)」「C: チャンネル(特徴)」の行列でイメージしてください。</p>
        
        <div class="norm-visual-container">
            <div class="norm-card">
                <strong>Batch Norm (CNN向)</strong><br>
                <small>同じチャンネルの「全データ」をまとめる</small>
                <div class="data-grid">
                    <div class="cell bn-highlight"></div><div class="cell"></div><div class="cell"></div><div class="cell"></div>
                    <div class="cell bn-highlight"></div><div class="cell"></div><div class="cell"></div><div class="cell"></div>
                    <div class="cell bn-highlight"></div><div class="cell"></div><div class="cell"></div><div class="cell"></div>
                </div>
                <div style="font-size:0.8em; color:#3498db;">縦方向 (Batch依存)</div>
            </div>

            <div class="norm-card">
                <strong>Layer Norm (RNN/Transfomer向)</strong><br>
                <small>1つのデータの「全チャンネル」をまとめる</small>
                <div class="data-grid">
                    <div class="cell ln-highlight"></div><div class="cell ln-highlight"></div><div class="cell ln-highlight"></div><div class="cell ln-highlight"></div>
                    <div class="cell"></div><div class="cell"></div><div class="cell"></div><div class="cell"></div>
                    <div class="cell"></div><div class="cell"></div><div class="cell"></div><div class="cell"></div>
                </div>
                <div style="font-size:0.8em; color:#e74c3c;">横方向 (Batch非依存)</div>
            </div>
            
            <div class="norm-card">
                <strong>Instance Norm (Style変換向)</strong><br>
                <small>1データ・1チャンネルごとに独立</small>
                <div class="data-grid">
                    <div class="cell in-highlight"></div><div class="cell"></div><div class="cell"></div><div class="cell"></div>
                    <div class="cell"></div><div class="cell"></div><div class="cell"></div><div class="cell"></div>
                    <div class="cell"></div><div class="cell"></div><div class="cell"></div><div class="cell"></div>
                </div>
                <div style="font-size:0.8em; color:#27ae60;">個別に計算</div>
            </div>

            <div class="norm-card">
                <strong>Group Norm (汎用)</strong><br>
                <small>チャンネルをいくつかのグループに分ける</small>
                <div class="data-grid">
                    <div class="cell in-highlight"></div><div class="cell in-highlight"></div><div class="cell"></div><div class="cell"></div>
                    <div class="cell"></div><div class="cell"></div><div class="cell"></div><div class="cell"></div>
                    <div class="cell"></div><div class="cell"></div><div class="cell"></div><div class="cell"></div>
                </div>
                <div style="font-size:0.8em; color:#27ae60;">Batch Normの代替 (Batchサイズ小でもOK)</div>
            </div>
        </div>

        <h3>■ データ拡張 (Data Augmentation)</h3>
        <table class="tech-table">
            <tr><th>種類</th><th>手法名</th><th>内容</th></tr>
            <tr>
                <td rowspan="3"><strong>画像</strong></td>
                <td><strong>MixUp</strong></td>
                <td>2枚の画像を透明度を変えて重ねる。ラベルも「犬0.7, 猫0.3」のように混ぜる。</td>
            </tr>
            <tr>
                <td><strong>Cutout / Random Erasing</strong></td>
                <td>画像の一部をランダムな矩形で塗りつぶす（隠す）。<br>「一部が見えなくても認識する」力をつける。</td>
            </tr>
            <tr>
                <td><strong>CutMix</strong></td>
                <td>画像の一部を切り取り、別の画像を貼り付ける。<br>MixUpとCutoutの合わせ技。</td>
            </tr>
            <tr>
                <td><strong>NLP</strong></td>
                <td><strong>EDA</strong></td>
                <td>同義語置換、ランダム挿入、削除、入替を行ってテキストデータを増やす。</td>
            </tr>
        </table>

        <h3>■ アンサンブル & ハイパーパラメータ探索</h3>
        <table class="tech-table" style="margin-top:10px;">
            <tr><th>カテゴリ</th><th>手法</th><th>特徴</th></tr>
            <tr>
                <td rowspan="3"><strong>アンサンブル</strong><br>(合議制)</td>
                <td><strong>バギング</strong><br>(Bagging)</td>
                <td>並列に独立学習 → 多数決・平均。<br>例: Random Forest。<br><strong>バリアンス</strong>を下げる。</td>
            </tr>
            <tr>
                <td><strong>ブースティング</strong><br>(Boosting)</td>
                <td>直列に学習。前のモデルの失敗を次が修正。<br>例: XGBoost, LightGBM。<br><strong>バイアス</strong>を下げる。</td>
            </tr>
            <tr>
                <td><strong>スタッキング</strong><br>(Stacking)</td>
                <td>モデルの出力を、さらに別のモデル（メタモデル）に入力して最終決定する。</td>
            </tr>
            <tr>
                <td rowspan="3"><strong>探索</strong><br>(チューニング)</td>
                <td><strong>グリッドサーチ</strong></td>
                <td>しらみつぶしに全通り試す。確実だが遅い。</td>
            </tr>
            <tr>
                <td><strong>ランダムサーチ</strong></td>
                <td>ランダムに試す。グリッドより効率が良いことが多い。</td>
            </tr>
            <tr>
                <td><strong>ベイズ最適化</strong></td>
                <td>過去の結果から「次によさそうな場所」を確率的（ガウス過程等）に推測して探索する。</td>
            </tr>
        </table>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【基礎編】 Q1 - Q15
        // ---------------------------------------------------------
        {
            category: "Batch Normalization",
            question: "Batch Normalization（バッチ正規化）を導入する主な目的として、最も適切なものはどれか。",
            options: ["内部共変量シフト（学習中の層ごとの入力分布の変化）を抑え、学習を安定・高速化させる", "モデルのパラメータ数を減らす", "過学習を完全に防ぐ", "入力画像サイズを小さくする"],
            answer: 0,
            explanation: "層が深くなると、手前の層の更新によって分布がコロコロ変わり、後ろの層が学習しづらくなる現象（内部共変量シフト）を解決します。"
        },
        {
            category: "BNの推論時",
            question: "Batch Normalizationにおいて、学習時と推論（テスト）時で挙動を変える必要がある点は何か。",
            options: ["学習時は「そのバッチの平均・分散」を使うが、推論時は「学習全体で計算した移動平均・分散」を使う", "推論時は正規化を行わない", "推論時は学習時の倍の係数を使う", "変化はない"],
            answer: 0,
            explanation: "推論時にデータが1つだけ入力される場合、そのデータの分散は0になってしまい計算できません。そのため、学習中に蓄積した統計量を使います。"
        },
        {
            category: "Layer Normalization",
            question: "RNNやTransformerなどの自然言語処理タスクで、Batch NormalizationよりもLayer Normalizationが好まれる理由は何か。",
            options: ["文章の長さが可変であり、バッチサイズも小さくなりがちなため、バッチ統計量に依存しないLayer Normが安定するから", "Layer Normの方が計算が速いから", "Batch NormはGPUでしか動かないから", "RNNには正規化が不要だから"],
            answer: 0,
            explanation: "Layer Normは「そのデータ単体」の中で正規化するため、他のデータ（バッチ）の影響を受けず、時系列データに適しています。"
        },
        {
            category: "Instance Normalization",
            question: "画像のスタイル変換（画風変換）やGANなどでよく用いられるInstance Normalizationの特徴はどれか。",
            options: ["1枚の画像の1つのチャンネルごとに正規化を行う（画像のコントラスト情報を正規化する効果がある）", "全ての画像をまとめて正規化する", "チャンネルをグループ化する", "正規化を行わない"],
            answer: 0,
            explanation: "画像の「スタイル（コントラストや色調）」は画像ごとに異なるため、バッチ全体で平均を取らず、個別に正規化することでスタイルを操作しやすくします。"
        },
        {
            category: "MixUp",
            question: "データ拡張手法「MixUp」の具体的な処理内容はどれか。",
            options: ["2枚の画像を重み付け加算して重ね合わせ、正解ラベルも同じ比率で混ぜる", "画像を左右反転する", "画像の一部を切り取る", "画像にノイズを加える"],
            answer: 0,
            explanation: "「犬」と「猫」を混ぜた画像に対し「犬0.6、猫0.4」というラベルを与えることで、決定境界を滑らかにします。"
        },
        {
            category: "Random Erasing",
            question: "画像の一部をランダムな矩形で塗りつぶす（消去する）データ拡張「Random Erasing」や「Cutout」の主な効果は何か。",
            options: ["対象物の一部が隠れていても（オクルージョン）、残りの部分から正しく認識できるような頑健性を獲得する", "画像サイズを小さくする", "計算量を減らす", "背景を消す"],
            answer: 0,
            explanation: "重要な特徴（例えば猫の顔）が隠されても、尻尾や体から猫だと判断できるようにモデルを鍛えます。"
        },
        {
            category: "バギング",
            question: "アンサンブル学習の「バギング (Bagging)」の代表例であり、複数の決定木を並列に学習させる手法はどれか。",
            options: ["Random Forest", "Gradient Boosting Decision Tree (GBDT)", "XGBoost", "Logistic Regression"],
            answer: 0,
            explanation: "ブートストラップサンプリングで異なるデータセットを作り、それぞれで木を作って多数決をとることで、バリアンス（過学習）を抑えます。"
        },
        {
            category: "ブースティング",
            question: "アンサンブル学習の「ブースティング (Boosting)」の特徴として正しいものはどれか。",
            options: ["弱学習器を直列（順番）に学習させ、前のモデルが間違えたデータを次のモデルが重点的に学習する", "弱学習器を並列（同時）に学習させる", "学習データを使わない", "モデルをランダムに選ぶ"],
            answer: 0,
            explanation: "「間違いを修正する」プロセスを繰り返すことで、バイアス（学習不足）を強力に減らします。代表例はAdaBoostやXGBoostです。"
        },
        {
            category: "グリッドサーチ",
            question: "ハイパーパラメータ探索手法としての「グリッドサーチ」の説明はどれか。",
            options: ["あらかじめ指定した候補値の全ての組み合わせをしらみつぶしに試す", "ランダムな値を試す", "確率モデルに基づいて効率的に試す", "勾配法を使って試す"],
            answer: 0,
            explanation: "確実ですが、パラメータ数が増えると組み合わせが爆発的に増え、計算時間が現実的でなくなる欠点があります。"
        },
        {
            category: "ベイズ最適化",
            question: "ハイパーパラメータ探索において、過去の試行結果からガウス過程などを用いて「次によさそうな値」を予測して探索する手法はどれか。",
            options: ["ベイズ最適化 (Bayesian Optimization)", "ランダムサーチ", "グリッドサーチ", "進化的アルゴリズム"],
            answer: 0,
            explanation: "「探索（未知の領域）」と「活用（有望な領域）」のバランスを取りながら（獲得関数）、効率的に最適値を探します。"
        },
        {
            category: "正規化のスケール戻し",
            question: "Batch Normalizationなどの正規化層では、$\hat{x} = \frac{x-\mu}{\sigma}$ で正規化した後に、$y = \gamma \hat{x} + \beta$ という変換を行う。この $\gamma$ と $\beta$ は何か。",
            options: ["学習によって更新されるパラメータ（スケールとシフト）", "固定の定数（1と0）", "バッチサイズ", "学習率"],
            answer: 0,
            explanation: "単に正規化するだけだと表現力が落ちる場合があるため、モデルが必要に応じて元の分布に戻したり変形したりできるように、学習可能なパラメータを持たせています。"
        },
        {
            category: "EDA (NLP)",
            question: "自然言語処理におけるデータ拡張手法「EDA (Easy Data Augmentation)」に含まれない操作はどれか。",
            options: ["文法構造の書き換え（構文解析）", "同義語への置換 (Synonym Replacement)", "ランダムな単語の挿入 (Random Insertion)", "ランダムな単語の削除 (Random Deletion)"],
            answer: 0,
            explanation: "EDAは複雑な構文解析を行わず、表層的な操作（置換・挿入・入替・削除）だけでデータを増やすシンプルな手法です。"
        },
        {
            category: "スタッキング",
            question: "アンサンブル手法「スタッキング (Stacking)」の構造として正しいものはどれか。",
            options: ["複数のモデル（1段目）の予測結果を入力として受け取り、最終的な予測を行う別のモデル（2段目：メタモデル）を学習させる", "複数のモデルの平均をとる", "複数のモデルを交互に学習させる", "最も精度の高いモデルだけを採用する"],
            answer: 0,
            explanation: "「モデルの予測」を「新たな特徴量」として扱い、さらに学習させることで、各モデルの得意不得意を統合します。"
        },
        {
            category: "Group Normalization",
            question: "Group Normalizationが提案された主な背景（Batch Normの弱点）は何か。",
            options: ["バッチサイズが小さいとき（例: 2や4）に、平均・分散の推定が不安定になり精度が落ちる点", "計算量が多すぎる点", "メモリ消費量が多すぎる点", "推論が遅い点"],
            answer: 0,
            explanation: "物体検出などでは高解像度画像を扱うためバッチサイズを大きくできません。BNの代わりに、バッチサイズに依存しないGNが使われます。"
        },
        {
            category: "Weight Decay",
            question: "L2正則化は、最適化アルゴリズム（SGDなど）の中で実装される際、一般になんとよばれるか。",
            options: ["Weight Decay (荷重減衰)", "Momentum", "Dropout", "Gradient Clipping"],
            answer: 0,
            explanation: "更新式の形を見ると、重み $w$ に $1$ 未満の係数（減衰率）を掛けて小さくする操作になるため、Weight Decayと呼ばれます。"
        },

        // ---------------------------------------------------------
        // 【応用編】 Q16 - Q30
        // ---------------------------------------------------------
        {
            category: "BNと過学習(応用)",
            question: "Batch Normalizationには、正則化（過学習抑制）の効果もあると言われる。その理由は何か。",
            options: ["ミニバッチごとの平均・分散の計算にノイズが含まれるため、それがドロップアウトのようなノイズ注入効果をもたらすから", "パラメータ数が減るから", "データが増えるから", "勾配が消失するから"],
            answer: 0,
            explanation: "バッチの選び方によって正規化の結果が毎回微妙に変わるため、特定の特徴に依存しすぎるのを防ぐ副次効果があります。"
        },
        {
            category: "TTA(応用)",
            question: "コンペティションなどで精度を上げるために使われる「TTA (Test Time Augmentation)」とは何か。",
            options: ["推論（テスト）時にも画像を回転・反転させて複数枚作り、それぞれの予測結果の平均をとる手法", "テストデータを学習データに加える手法", "テスト時間を短縮する手法", "テストデータの正解ラベルを推測する手法"],
            answer: 0,
            explanation: "学習時だけでなく推論時にもAugmentationを行うことで、予測の安定性と精度を高めるアンサンブルテクニックです。"
        },
        {
            category: "Label Smoothing(応用)",
            question: "Label Smoothing（ラベル平滑化）を行うと、モデルの出力確率分布はどうなる傾向があるか。",
            options: ["「100%自信がある」という極端な出力を抑制し、全体的に滑らかな分布になる", "より極端に0か1に近い値になる", "ランダムな分布になる", "変化しない"],
            answer: 0,
            explanation: "正解ラベルを $1.0$ ではなく $0.9$ などにすることで、モデルが過剰に自信を持ちすぎて過学習するのを防ぎます。"
        },
        {
            category: "CutMix(応用)",
            question: "MixUpとCutoutの利点を組み合わせた「CutMix」の特徴はどれか。",
            options: ["画像の一部を切り抜き（Cutout）、そこに別の画像を貼り付け（Mix）、ラベルも面積比で混合する", "画像を半透明にして重ねる", "画像をモザイク処理する", "画像の色を反転させる"],
            answer: 0,
            explanation: "MixUpのように不自然なゴースト画像ができず、かつCutoutのように情報が完全に消えることもないため、非常に強力な手法です。"
        },
        {
            category: "ランダムサーチの利点(応用)",
            question: "ハイパーパラメータ探索において、グリッドサーチよりもランダムサーチの方が効率的であるとされる主な理由は何か。",
            options: ["重要なパラメータとそうでないパラメータがある場合、ランダムサーチの方が重要なパラメータの探索密度が高くなるから（低次元の射影効果）", "計算が簡単だから", "並列化しやすいから", "偶然良い値が見つかるから"],
            answer: 0,
            explanation: "グリッドだと重要でない軸も含めて等間隔に見ますが、ランダムだと重要な軸に関しては多くの異なる値を試せるため、効率よく最適値付近を見つけられます。"
        },
        {
            category: "早期終了の注意点(応用)",
            question: "Early Stopping（早期終了）を行う際、注意すべき実装上のポイントは何か。",
            options: ["学習を止めた時点の重みではなく、検証誤差が最小だった時点の重み（ベストモデル）を保存・ロードすること", "学習率を0にすること", "バッチサイズを大きくすること", "全てのデータを使い切ること"],
            answer: 0,
            explanation: "止めたタイミング（Patience後）では既に過学習が始まって性能が悪化していることが多いため、過去のベストポイントに戻す必要があります。"
        },
        {
            category: "蒸留(応用)",
            question: "「蒸留 (Knowledge Distillation)」とはどのような技術か。",
            options: ["巨大で高性能なモデル（教師）の出力確率分布を、軽量なモデル（生徒）に模倣させることで、軽量モデルの精度を上げる", "モデルの重みを圧縮する", "不要なニューロンを削除する", "学習データを精選する"],
            answer: 0,
            explanation: "教師モデルの「ソフトな出力（例えば、これは犬だけど猫っぽさも少しある）」を学ぶことで、単なる正解ラベル(0/1)以上の情報を生徒モデルに伝えます。"
        },
        {
            category: "カリキュラム学習(応用)",
            question: "人間のように「簡単なデータから順に難しいデータへ」と学習させる手法を何と呼ぶか。",
            options: ["カリキュラム学習 (Curriculum Learning)", "転移学習", "強化学習", "能動学習"],
            answer: 0,
            explanation: "最初から難しいデータを与えると収束しない場合でも、徐々に難易度を上げることで、より良い局所解に到達できることがあります。"
        },
        {
            category: "Adversarial Training(応用)",
            question: "Adversarial Example（敵対的サンプル）を用いた「Adversarial Training」の主な目的は何か。",
            options: ["ノイズに対する頑健性（ロバスト性）を高め、攻撃に強いモデルを作る（正則化効果もある）", "敵対的生成ネットワークを作る", "画像を生成する", "学習を速くする"],
            answer: 0,
            explanation: "わざとモデルが間違えそうな微小なノイズを加えた画像を学習データに含めることで、弱点を克服させます。"
        },
        {
            category: "Stratified K-Fold(応用)",
            question: "分類問題での交差検証（Cross Validation）において、「Stratified K-Fold」を使うべきなのはどのような時か。",
            options: ["正解ラベルの比率が不均衡（Imbalanced）な場合", "データ数が非常に多い場合", "回帰問題の場合", "時系列データの場合"],
            answer: 0,
            explanation: "各分割（Fold）に含まれるクラスの割合が、全体の割合と同じになるように分割します。レアなクラスが特定のFoldに偏るのを防ぎます。"
        },
        {
            category: "Warmup Restart(応用)",
            question: "SGDR (SGD with Warm Restarts) などで用いられる、学習率を周期的に増減させる手法の目的は何か。",
            options: ["局所解（Local Minima）にハマった際に、学習率を上げてそこから脱出し、より良い解を探すため", "学習時間を短縮するため", "過学習を防ぐため", "計算精度を上げるため"],
            answer: 0,
            explanation: "コサインカーブのように学習率を下げてからまた上げる（リスタート）ことで、複数の極小値を探索し、アンサンブル効果（Snapshot Ensemble）も期待できます。"
        },
        {
            category: "BNの配置場所(応用)",
            question: "ResNetなど近年のモデルにおいて、Batch Normは「活性化関数の前（Pre-Activation）」と「後（Post-Activation）」のどちらに置かれることが多いか。",
            options: ["活性化関数の前 (Conv -> BN -> ReLU)", "活性化関数の後 (Conv -> ReLU -> BN)", "どちらでも変わらない", "入力層の直前のみ"],
            answer: 0,
            explanation: "原論文ではReLUの前が推奨されています。ReLUの後だと、負の値が0になった分布を正規化することになり、分布が歪む可能性があるためです（※諸説あり、モデルによります）。"
        },
        {
            category: "半精度学習(応用)",
            question: "近年のGPUで利用される「混合精度学習 (Mixed Precision Training)」のメリットは何か。",
            options: ["FP16（半精度）を使うことでメモリ使用量を減らし計算を高速化しつつ、精度劣化を防ぐ", "精度が向上する", "CPUで学習できる", "バッチサイズを小さくできる"],
            answer: 0,
            explanation: "32bit浮動小数点の代わりに16bitを使うことで、メモリを節約し、より大きなバッチサイズやモデルを扱えるようにします。"
        },
        {
            category: "Pseudo Labeling(応用)",
            question: "ラベルなしデータを利用する「Pseudo Labeling（自己学習）」の手順として正しいものはどれか。",
            options: ["ラベルありデータで学習したモデルでラベルなしデータを予測し、確信度が高いものを「正解」とみなして学習データに追加する", "人間がラベルをつける", "ランダムにラベルをつける", "クラスタリングを行う"],
            answer: 0,
            explanation: "半教師あり学習の一種です。自分自身の予測を正解だと思い込んで再学習するため、初期モデルの精度がある程度必要です。"
        },
        {
            category: "Multi-Task Learning(応用)",
            question: "1つのモデルで複数のタスク（例：物体の分類と位置特定）を同時に学習させる「マルチタスク学習」の正則化的なメリットは何か。",
            options: ["共通の特徴表現（バックボーン）を学習することで、特定のタスクへの過学習を防ぎ、汎用的な特徴を獲得できる", "計算量が減る", "タスクごとにモデルを作るより簡単だから", "パラメータ数が増えるから"],
            answer: 0,
            explanation: "関連するタスクを同時に解くことは、暗黙的なデータ拡張や正則化の効果があり、メインタスクの精度向上にも寄与することが多いです。"
        }
    ]
};
