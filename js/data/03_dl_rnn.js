window.quizData = {
    title: "3-（５）RNN：系列データと自然言語処理",
    
    cheatSheet: `
        <style>
            .rnn-flow { display: flex; align-items: center; justify-content: center; gap: 5px; background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px; overflow-x: auto; }
            .rnn-step { border: 2px solid #333; padding: 5px; background: white; border-radius: 5px; text-align: center; width: 60px; font-size: 0.8em; position: relative; }
            .rnn-arrow { color: #555; font-weight: bold; font-size: 1.2em; }
            .hidden-state { background-color: #eafaf1; border-color: #27ae60; color: #27ae60; font-weight: bold; padding: 2px; margin-top: 5px; border-radius: 3px; }
            .time-label { position: absolute; top: -20px; left: 0; width: 100%; font-size: 0.7em; color: #999; }
            
            .lstm-box { border: 2px solid #3498db; background: #ebf5fb; padding: 10px; border-radius: 8px; margin: 5px; width: 45%; vertical-align: top; display: inline-block; }
            .gate-icon { display: inline-block; width: 20px; height: 20px; line-height: 20px; border-radius: 50%; background: #333; color: white; font-size: 0.7em; text-align: center; margin: 2px; }
            
            .seq-container { display: flex; justify-content: center; align-items: center; background: #fff; padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-top: 10px; }
            .box-enc { background: #fef9e7; border: 2px solid #f39c12; padding: 10px; border-radius: 5px; text-align: center; }
            .box-dec { background: #fceceb; border: 2px solid #e74c3c; padding: 10px; border-radius: 5px; text-align: center; }
            .context-vec { background: #333; color: #fff; padding: 5px 10px; border-radius: 20px; font-size: 0.8em; margin: 0 10px; }
            .attention-line { border-top: 2px dashed #e74c3c; width: 100%; margin-top: 5px; position: relative; }
            .attention-text { position: absolute; top: -12px; left: 35%; background: #fff; font-size: 0.7em; color: #e74c3c; padding: 0 5px; }

            .table-wrap { overflow-x: auto; }
        </style>

        <h3>■ RNNの仕組み：時間を展開する</h3>
        <p>RNNは、自身へのループ構造を持つネットワークです。<br>学習時は時間を遡って誤差を伝えます (<strong>BPTT</strong>)。</p>
        
        <div class="rnn-flow">
            <div class="rnn-step">
                <div class="time-label">t-1</div>
                $x_{t-1}$<br>↓<br><div class="hidden-state">$h_{t-1}$</div>
            </div>
            <div class="rnn-arrow">→</div>
            <div class="rnn-step">
                <div class="time-label">t (現在)</div>
                $x_t$<br>↓<br><div class="hidden-state">$h_t$</div><br>↓<br>$y_t$
            </div>
            <div class="rnn-arrow">→</div>
            <div class="rnn-step">
                <div class="time-label">t+1</div>
                $x_{t+1}$<br>↓<br><div class="hidden-state">$h_{t+1}$</div>
            </div>
        </div>
        <p style="font-size:0.8em; text-align:center;">
            前の時間の隠れ状態 $h_{t-1}$ が、現在の入力 $x_t$ と一緒に計算に使われます。<br>
            <strong>「過去の記憶を引き継ぐ」</strong>仕組みです。
        </p>

        <h3>■ LSTM vs GRU (記憶の保持)</h3>
        <p>単純なRNNは「勾配消失」で長期間の記憶ができません。<br>これを解決したのがLSTMです。</p>
        <div style="text-align:center;">
            <div class="lstm-box">
                <strong>LSTM</strong><br>
                <span style="font-size:0.8em; color:#3498db;">セル (Cell) + 3つのゲート</span>
                <hr style="border:0; border-top:1px solid #abd2ef; margin:5px 0;">
                <div style="text-align:left; font-size:0.8em;">
                    <span class="gate-icon">C</span> <strong>CEC</strong>: 記憶のベルトコンベア（勾配が消えない）<br>
                    <span class="gate-icon">F</span> <strong>忘却</strong>: いらない記憶を消す<br>
                    <span class="gate-icon">I</span> <strong>入力</strong>: 新しい情報を足す<br>
                    <span class="gate-icon">O</span> <strong>出力</strong>: 次に伝える情報を選ぶ
                </div>
            </div>
            <div class="lstm-box" style="border-color:#e67e22; background:#fdf2e9;">
                <strong>GRU</strong><br>
                <span style="font-size:0.8em; color:#e67e22;">隠れ状態のみ + 2つのゲート</span>
                <hr style="border:0; border-top:1px solid #fadbd8; margin:5px 0;">
                <div style="text-align:left; font-size:0.8em;">
                    <br>
                    <span class="gate-icon" style="background:#e67e22;">R</span> <strong>リセット</strong>: 過去を無視する<br>
                    <span class="gate-icon" style="background:#e67e22;">Z</span> <strong>更新</strong>: LSTMの入力+忘却を統合<br>
                    <br>
                    ※パラメータが少なく計算が速い
                </div>
            </div>
        </div>

        <h3>■ Seq2Seq と Attention (翻訳モデル)</h3>
        <p>「Encoder」で読み込み、「Decoder」で生成します。</p>
        
        <div class="seq-container">
            <div class="box-enc">
                Encoder<br>
                <small>入力: "I am a cat"</small>
            </div>
            <div class="context-vec">
                Context<br>
                Vector
            </div>
            <div class="box-dec">
                Decoder<br>
                <small>出力: "吾輩は猫..."</small>
            </div>
        </div>
        
        <div style="margin-top:10px; background:#f9f9f9; padding:10px; border-radius:5px;">
            <strong>Attention (注意機構) の追加</strong>
            <div class="attention-line">
                <span class="attention-text">直接参照 (近道)</span>
            </div>
            <p style="font-size:0.8em; margin-top:5px;">
                Decoderが単語を生成するたびに、Encoderの<strong>「どの単語を見るべきか」</strong>を計算して、必要な情報を直接つまみ食いする仕組み。<br>
                → 長い文章でも精度が落ちない。
            </p>
        </div>

        <h3>■ 重要用語まとめ</h3>
        <div class="table-wrap">
            <table>
                <tr><th>用語</th><th>内容</th></tr>
                <tr><td><strong>BPTT</strong></td><td>Backpropagation Through Time。時間を遡って勾配を計算する。</td></tr>
                <tr><td><strong>CEC</strong></td><td>Constant Error Carousel。LSTMの中心部。「記憶をそのまま保持」し、勾配を1.0で伝えるため<strong>勾配消失しない</strong>。</td></tr>
                <tr><td><strong>勾配クリッピング</strong></td><td>勾配が閾値を超えたらノルムをカットする。<strong>勾配爆発</strong>対策。</td></tr>
                <tr><td><strong>Teacher Forcing</strong></td><td>学習時、前の時刻の「予測」ではなく「正解」を入力するテクニック。学習が安定・高速化する。</td></tr>
                <tr><td><strong>Bidirectional RNN</strong></td><td>過去から未来（順方向）と、未来から過去（逆方向）の両方から学習する。</td></tr>
            </table>
        </div>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【基礎編】 Q1 - Q15
        // ---------------------------------------------------------
        {
            category: "BPTT",
            question: "RNNの学習において、時間を遡って誤差を伝播させるアルゴリズムを何と呼ぶか。",
            options: ["BPTT (Backpropagation Through Time)", "BP (Backpropagation)", "SGD", "Adam"],
            answer: 0,
            explanation: "RNNは展開すると非常に深いネットワークとみなせるため、時間軸に沿って逆伝播を行います。"
        },
        {
            category: "LSTMの構造",
            question: "LSTMにおいて、勾配消失問題を防ぐために中心的な役割を果たしている、勾配を減衰させずに保持する機構はどれか。",
            options: ["CEC (Constant Error Carousel)", "忘却ゲート (Forget Gate)", "出力ゲート (Output Gate)", "覗き穴結合 (Peephole Connection)"],
            answer: 0,
            explanation: "CEC（セル）は、記憶を保持し続けるベルトコンベアのような役割を持ち、誤差逆伝播時の勾配係数が「1」になるため、勾配が消失しません。"
        },
        {
            category: "勾配爆発",
            question: "RNNで発生しやすい「勾配爆発（Gradient Explosion）」への対策として、最も一般的な手法はどれか。",
            options: ["勾配クリッピング (Gradient Clipping)", "Batch Normalization", "ReLUを使う", "LSTMを使う"],
            answer: 0,
            explanation: "勾配のノルム（大きさ）が閾値を超えた場合、強制的にその閾値まで小さくすることで、重みの破壊的な更新を防ぎます。"
        },
        {
            category: "GRUの特徴",
            question: "GRU（Gated Recurrent Unit）がLSTMと比較して優れている点（特徴）はどれか。",
            options: ["ゲート数が少なくパラメータが少ないため、計算コストが低く学習が速い", "表現力がLSTMより圧倒的に高い", "長期記憶の保持能力がLSTMより高い", "勾配爆発が起きない"],
            answer: 0,
            explanation: "GRUは「リセットゲート」と「更新ゲート」の2つしか持たず（セルがない）、LSTMより構造がシンプルです。"
        },
        {
            category: "Seq2Seq",
            question: "翻訳タスクなどで使われる「Seq2Seq (Sequence-to-Sequence)」モデルは、どのような構造で構成されているか。",
            options: ["Encoder-Decoder モデル", "Generator-Discriminator モデル", "Actor-Critic モデル", "Self-Attention モデル"],
            answer: 0,
            explanation: "入力系列を処理するEncoderと、出力系列を生成するDecoderの2つのRNNで構成されます。"
        },
        {
            category: "Attention",
            question: "Attention（注意機構）が解決しようとした、従来のSeq2Seqの最大の問題点は何か。",
            options: ["入力文が長くなると、固定長の文脈ベクトル（Context Vector）に情報を詰め込みきれず、精度が低下する問題", "計算量が少なすぎる問題", "単語の意味が理解できない問題", "逆伝播ができない問題"],
            answer: 0,
            explanation: "Encoderの最終状態だけを使うボトルネックを解消するため、Decoderが「入力の全単語（隠れ状態）」を直接参照できるようにしました。"
        },
        {
            category: "双方向RNN",
            question: "Bidirectional RNN（双方向RNN）のメリットは何か。",
            options: ["「過去」の情報だけでなく、「未来」の情報も考慮して現在の出力を決定できる", "計算量が半分になる", "リアルタイム処理が可能になる", "メモリ消費量が減る"],
            answer: 0,
            explanation: "文章の穴埋め問題などでは、後ろの単語を見ないと前の単語が決まらないことがあります。順方向と逆方向の2つのRNNを組み合わせることでこれを解決します。"
        },
        {
            category: "Teacher Forcing",
            question: "RNNの学習テクニックである「Teacher Forcing（教師強制）」とはどのような手法か。",
            options: ["次の時刻の入力として、モデル自身の「予測値」ではなく「正解データ（教師データ）」を使う", "教師モデルを使って生徒モデルを学習させる", "学習率を強制的に固定する", "勾配を強制的に0にする"],
            answer: 0,
            explanation: "学習初期はモデルの予測がデタラメなので、それを次の入力に使うと学習が進みません。正解を入力してあげることで学習をガイドします。"
        },
        {
            category: "RNNの入力",
            question: "RNNで自然言語処理を行う際、単語を数値ベクトルに変換する処理を何と呼ぶか。",
            options: ["単語埋め込み (Word Embedding)", "One-hot Encoding", "正規化", "プーリング"],
            answer: 0,
            explanation: "One-hotベクトルは次元数が大きすぎるため、Word2VecなどのEmbedding層を使って密なベクトル（分散表現）に変換するのが一般的です。"
        },
        {
            category: "CECの課題",
            question: "初期のLSTMにおけるCEC（Constant Error Carousel）の課題に対し、「忘却ゲート」が導入された理由は何か。",
            options: ["記憶が蓄積され続けると、過去の不要な情報がノイズとなり、新しい情報を学習できなくなるため", "勾配が消失してしまうため", "計算が複雑すぎるため", "パラメータが多すぎるため"],
            answer: 0,
            explanation: "CECは記憶を保持し続けるため、文脈が変わった時などに記憶をリセットする機能（忘却ゲート）が必要でした。"
        },

        // ---------------------------------------------------------
        // 【応用編】 Q11 - Q25
        // ---------------------------------------------------------
        {
            category: "ゲートの活性化関数(応用)",
            question: "LSTMのゲート（忘却・入力・出力）の開閉（0〜1）を制御するために使われる活性化関数はどれか。",
            options: ["シグモイド関数", "tanh関数", "ReLU", "ソフトマックス関数"],
            answer: 0,
            explanation: "ゲートは「通す(1)」か「通さない(0)」かの割合を決めるため、0〜1の値を出力するシグモイド関数が使われます。一方、データ変換にはtanhが使われます。"
        },
        {
            category: "Peephole(応用)",
            question: "LSTMの改良版である「Peephole Connection（覗き穴結合）」の特徴は何か。",
            options: ["ゲートの制御に、現在のCEC（セル）の状態も直接入力として使う", "隠れ層を覗き見る", "出力を入力に戻す", "セルを削除する"],
            answer: 0,
            explanation: "通常のLSTMではゲートは入力と隠れ状態のみを見ますが、Peepholeは「現在の記憶状態（セル）」も参考にしてゲートを開閉します。"
        },
        {
            category: "Attentionスコア(応用)",
            question: "Attention機構において、Encoderの隠れ状態とDecoderの隠れ状態の類似度（スコア）を計算する際、最も単純で計算が速い手法はどれか。",
            options: ["内積 (Dot Product)", "加算 (Additive / Bahdanau)", "多層パーセプトロン", "畳み込み"],
            answer: 0,
            explanation: "ベクトルの内積をとる方法（Luong Attentionなど）が計算コストが低く高速です。TransformerでもScaled Dot-Product Attentionが採用されています。"
        },
        {
            category: "Bleu Score(応用)",
            question: "機械翻訳（Seq2Seqなど）の評価指標として最も一般的に使われる「BLEUスコア」は何に基づいているか。",
            options: ["生成された文と正解文のn-gram（単語の並び）の一致率", "文法の正確さ", "意味の類似度", "文字数の一致率"],
            answer: 0,
            explanation: "人間が作成した参照訳と、どれくらい単語の並び（1-gram, 2-gram...）が一致しているかを計算する指標です。"
        },
        {
            category: "Exposure Bias(応用)",
            question: "Teacher Forcingの問題点として挙げられる「Exposure Bias（露光バイアス）」とは何か。",
            options: ["学習時は正解データが入力されるが、推論時は自身の予測値を入力するため、分布のズレが生じてエラーが蓄積すること", "学習データにバイアスがあること", "過学習のこと", "勾配消失のこと"],
            answer: 0,
            explanation: "本番（推論）では先生（正解）がいないため、一度間違えると、その間違いを入力としてさらに間違えるという悪循環に陥るリスクのことです。"
        },
        {
            category: "勾配消失の原因(応用)",
            question: "単純なRNNにおいて、活性化関数に `tanh` を使用していても勾配消失が起きる主な数学的理由は何か。",
            options: ["tanhの微分の最大値が1であり、層（時間）を遡るたびに重み行列と微分の積が繰り返され、値が1未満になりやすいため", "tanhの出力が負になるから", "重みが0になるから", "バイアスが大きすぎるから"],
            answer: 0,
            explanation: "逆伝播では「重み × tanhの微分」を何度も掛け算します。これが1より小さいと、指数関数的に勾配が小さくなってしまいます（0.9の100乗はほぼ0）。"
        },
        {
            category: "Seq2Seqの応用(応用)",
            question: "Seq2Seqモデルが応用されているタスクとして、不適切なものはどれか。",
            options: ["画像の物体検出 (Object Detection)", "機械翻訳 (Translation)", "要約 (Summarization)", "対話生成 (Chatbot)"],
            answer: 0,
            explanation: "物体検出は主にCNN（YOLO, SSDなど）の領分です。Seq2Seqは「系列から系列」への変換（翻訳、要約、対話）に使われます。"
        },
        {
            category: "Hard vs Soft Attention(応用)",
            question: "Attention機構において、「Hard Attention」と「Soft Attention」の違いは何か。",
            options: ["Hardは特定の箇所のみを確率的に選択（微分不可）、Softは全箇所の重み付き平均を使用（微分可能）", "HardはGPUを使う、SoftはCPUを使う", "Hardは精度が高い、Softは精度が低い", "Hardは画像用、Softはテキスト用"],
            answer: 0,
            explanation: "通常のDeep Learning（誤差逆伝播）で学習できるのは、滑らかに重みを計算する「Soft Attention」です。Hard Attentionは強化学習などが必要です。"
        },
        {
            category: "Transformerとの関係(応用)",
            question: "RNNを使わずにAttention機構のみで構成された「Transformer」が、RNNより優れている最大の点は何か。",
            options: ["並列計算が可能であり、学習が高速かつ長距離の依存関係を捉えやすい", "パラメータ数が少ない", "メモリ使用量が少ない", "再帰構造を持っている"],
            answer: 0,
            explanation: "RNNは前の単語の計算が終わらないと次へ進めませんが、Transformerは文全体を一気に入力して並列計算できます（Self-Attention）。"
        },
        {
            category: "RNNのパラメータ数(応用)",
            question: "入力次元 $D$、隠れ層次元 $H$ の単純なRNNにおける、1ステップ分のパラメータ数はおよそいくつか（バイアス含む）。",
            options: ["$H(H + D + 1)$", "$H^2$", "$D^2$", "$H \times D$"],
            answer: 0,
            explanation: "入力への重み($H \times D$)、前状態への重み($H \times H$)、バイアス($H$)の合計が必要です。"
        },
        {
            category: "Global Attention(応用)",
            question: "Luongらが提案したGlobal Attentionにおいて、Attentionスコアから算出された「文脈ベクトル」は、その後どう使われるか。",
            options: ["Decoderの隠れ状態と結合(Concatenate)され、最終的な出力層に入力される", "Encoderの入力に戻される", "次の時刻の入力ゲートに使われる", "損失関数に直接加えられる"],
            answer: 0,
            explanation: "「注目した情報（文脈）」と「自身の状態」を合わせることで、次にどの単語を出力すべきかを決定します。"
        },
        {
            category: "LSTMの忘却ゲート(応用)",
            question: "LSTMの忘却ゲートのバイアス項の初期値として、学習初期に推奨される値はどれか。",
            options: ["1 (記憶を保持する方向)", "0", "-1 (記憶を消す方向)", "0.5"],
            answer: 0,
            explanation: "初期値が0や負だと、学習初期にいきなり記憶を忘れてしまい、勾配が伝わらなくなる可能性があります。最初は「忘れない（1）」設定から始めるのが定石です（Jozefowicz et al.）。"
        },
        {
            category: "GNMT(応用)",
            question: "Google Neural Machine Translation (GNMT) で採用された、翻訳精度向上のための工夫はどれか。",
            options: ["EncoderとDecoderの両方にLSTMを多層化（8層など）し、残差結合（Skip Connection）を取り入れた", "CNNのみを使用した", "Attentionを廃止した", "単語単位ではなく文字単位で処理した"],
            answer: 0,
            explanation: "RNNも層を深くすると精度が上がりますが、学習が難しくなるため、ResNetのような残差結合が導入されました。"
        },
        {
            category: "Image Captioning(応用)",
            question: "画像を入力して説明文を生成する「Image Captioning」タスクでは、EncoderとDecoderにそれぞれ何が使われるのが一般的か。",
            options: ["Encoder: CNN, Decoder: RNN (LSTM)", "Encoder: RNN, Decoder: CNN", "Encoder: RNN, Decoder: RNN", "Encoder: CNN, Decoder: CNN"],
            answer: 0,
            explanation: "画像の特徴抽出にはCNN（VGGやResNet）を使い、その特徴を初期状態としてRNNで文章を生成します。"
        },
        {
            category: "勾配消失とReLu(応用)",
            question: "単純なRNNで活性化関数にReLUを使う際のリスクとして、最も注意すべき点は何か。",
            options: ["出力が発散しやすく、勾配爆発を起こしやすい", "勾配消失が起きやすくなる", "計算が遅くなる", "負の値が出力できない"],
            answer: 0,
            explanation: "ReLUは最大値に制限がないため、ループするたびに値が大きくなり続け、数値的に不安定（発散・爆発）になりやすいです。そのため、適切な初期化やクリッピングが必要です。"
        }
    ]
};
