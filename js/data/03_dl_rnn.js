window.quizData = {
    title: "3-（５）RNN：リカレントニューラルネットワーク",
    
    cheatSheet: `
        <h3>■ RNNの基本とBPTT</h3>
        <p>RNNは時間を遡って誤差を伝播させる <strong>BPTT</strong> で学習します。</p>
        <ul>
            <li><strong>勾配消失</strong>: 過去の情報が消えてしまう問題。<br>→ 対策: <strong>LSTM / GRU</strong> の導入。</li>
            <li><strong>勾配爆発</strong>: 勾配が巨大になり計算が壊れる問題。<br>→ 対策: <strong>勾配クリッピング (Gradient Clipping)</strong>。</li>
        </ul>

        <h3>■ LSTM vs GRU</h3>
        <table>
            <tr><th>モデル</th><th>ゲート機構</th><th>特徴</th></tr>
            <tr><td><strong>LSTM</strong></td><td><strong>忘却</strong>・<strong>入力</strong>・<strong>出力</strong>ゲート<br>＋ <strong>セル (CEC)</strong></td><td>長期記憶を保持する「セル」が最大の特徴。<br>CEC内では勾配が減衰せず残り続ける。</td></tr>
            <tr><td><strong>GRU</strong></td><td><strong>リセット</strong>・<strong>更新</strong>ゲート</td><td>LSTMを簡略化したもの。パラメータが少なく計算が速い。<br>セルがなく、隠れ状態のみ。</td></tr>
        </table>

        <h3>■ Seq2Seq と Attention</h3>
        <ul>
            <li><strong>Seq2Seq (Encoder-Decoder)</strong>: 入力系列を固定長のベクトルに圧縮し、そこから出力系列を生成する。<br>欠点：長い文章だと情報が溢れる（ボトルネック）。</li>
            <li><strong>Attention (注意機構)</strong>: 「入力のどの単語に注目すべきか」を時間ステップごとに計算する。<br>固定長ベクトルを通さず、<strong>全ての隠れ状態</strong>を利用する。</li>
        </ul>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【基礎編】 Q1 - Q10
        // ---------------------------------------------------------
        {
            category: "RNNの構造",
            question: "RNN（リカレントニューラルネットワーク）が、通常のフィードフォワードネットワークと決定的に異なる点は何か。",
            options: ["隠れ層の出力が、次の時刻の入力として自身の隠れ層に戻ってくる（ループ構造を持つ）", "出力層から入力層へ信号が逆流する", "活性化関数を使わない", "画像データしか扱えない"],
            answer: 0,
            explanation: "過去の情報（隠れ状態）を記憶として保持し、現在の入力と合わせて処理することで、時系列データを扱えるようにしています。"
        },
        {
            category: "BPTT",
            question: "RNNの学習アルゴリズムである「BPTT (Backpropagation Through Time)」の説明として正しいものはどれか。",
            options: ["時間方向に展開したネットワークに対して、通常の誤差逆伝播法を適用する", "時間を未来に向かって進めながら学習する", "パラメータを時間ごとに変化させる", "誤差を計算せずにランダムに重みを更新する"],
            answer: 0,
            explanation: "ループ構造を時間軸方向に展開すると、深いフィードフォワードネットワークとみなせるため、遡って誤差を伝播させることができます。"
        },
        {
            category: "LSTMの構造",
            question: "LSTMにおいて、過去の記憶を長期的に保持するための中心的な役割を果たすユニット（勾配が消失しない部分）を何と呼ぶか。",
            options: ["CEC (Constant Error Carousel) / メモリセル", "忘却ゲート", "更新ゲート", "隠れ状態"],
            answer: 0,
            explanation: "CEC（メモリセル）は、ゲートによって遮断されない限り情報をそのまま保持し続けるため、勾配消失を防ぐことができます。"
        },
        {
            category: "LSTMのゲート",
            question: "LSTMが持つ3つのゲートとして正しい組み合わせはどれか。",
            options: ["入力ゲート、出力ゲート、忘却ゲート", "入力ゲート、更新ゲート、リセットゲート", "入力ゲート、出力ゲート、リセットゲート", "更新ゲート、忘却ゲート、リセットゲート"],
            answer: 0,
            explanation: "「何を取り込むか（入力）」「何を出すか（出力）」「何を忘れるか（忘却）」の3つで制御します。"
        },
        {
            category: "GRU",
            question: "GRU (Gated Recurrent Unit) がLSTMと比較して優れている点（特徴）は何か。",
            options: ["パラメータ数が少なく、計算コストが低い", "長期記憶の保持能力がLSTMより圧倒的に高い", "ゲートの数が4つに増えている", "画像処理に特化している"],
            answer: 0,
            explanation: "LSTMの3つのゲートを「リセットゲート」「更新ゲート」の2つに統合し、構造を単純化しています。"
        },
        {
            category: "勾配爆発",
            question: "RNNの学習中に、勾配が極端に大きくなって計算が不安定になる「勾配爆発」への対策として用いられる手法はどれか。",
            options: ["勾配クリッピング (Gradient Clipping)", "Batch Normalization", "Dropout", "ReLU"],
            answer: 0,
            explanation: "勾配のノルム（大きさ）が閾値を超えたら、強制的にその値まで小さくカットする手法です。"
        },
        {
            category: "Seq2Seq",
            question: "翻訳タスクなどで使われる「Seq2Seq (Encoder-Decoder)」モデルのボトルネック（弱点）とされるものは何か。",
            options: ["入力系列の全ての情報を、固定長のベクトル（文脈ベクトル）一つに圧縮しなければならない点", "デコーダの計算が並列化できない点", "エンコーダが逆順にデータを読む点", "語彙数に制限がある点"],
            answer: 0,
            explanation: "長い文章でも無理やり1つのベクトルに詰め込むため、情報が溢れて精度が落ちてしまいます。これを解決したのがAttentionです。"
        },
        {
            category: "双方向RNN",
            question: "双方向RNN (Bidirectional RNN) の特徴として正しいものはどれか。",
            options: ["過去から未来への方向だけでなく、未来から過去への方向の情報も利用する", "学習と推論を同時に行う", "エンコーダとデコーダを双方向に繋ぐ", "2つの異なる言語を同時に学習する"],
            answer: 0,
            explanation: "文章の穴埋め問題など、前後の文脈両方が重要なタスクで威力を発揮します。"
        },
        {
            category: "Attention",
            question: "Attention（注意機構）の基本的な考え方はどれか。",
            options: ["出力（デコーダ）の各ステップにおいて、入力（エンコーダ）の「どの単語」に注目すべきかの重みを計算する", "重要な単語だけを残して他を削除する", "入力文を要約して短くする", "辞書を使って単語の意味を調べる"],
            answer: 0,
            explanation: "「固定長ベクトル1つ」に頼るのではなく、エンコーダの全ての隠れ状態を参照し、必要な部分を重み付けして取り込みます。"
        },
        {
            category: "ゲートの活性化関数",
            question: "LSTMやGRUのゲート（開くか閉じるかの制御）に使われる活性化関数は通常どれか。",
            options: ["シグモイド関数", "tanh関数", "ReLU", "ソフトマックス関数"],
            answer: 0,
            explanation: "ゲートは「0（閉じる）〜1（開く）」の割合を表すため、値域が(0, 1)であるシグモイド関数が使われます。"
        },

        // ---------------------------------------------------------
        // 【応用編】 Q11 - Q20
        // ---------------------------------------------------------
        {
            category: "CECの数学的性質(応用)",
            question: "LSTMのCEC（Constant Error Carousel）が勾配消失を防げる数学的な理由は何か。",
            options: ["誤差逆伝播において、加算（足し算）のみで勾配が伝わるルートが存在し、微分値が1（減衰しない）だから", "活性化関数にReLUを使っているから", "パラメータ数が非常に多いから", "時間を遡る必要がないから"],
            answer: 0,
            explanation: "CECの状態更新式は $C_t = C_{t-1} + \\dots$ という加算形式であり、このルートを通る勾配は減衰せずに過去へ伝わります。"
        },
        {
            category: "Attentionの計算(応用)",
            question: "Attentionの重み（スコア）を計算する際、クエリ(Query)とキー(Key)の類似度を測るためによく用いられる計算はどれか。",
            options: ["内積（ドット積）", "外積（クロス積）", "和", "最大公約数"],
            answer: 0,
            explanation: "ベクトルの内積は類似度を表します。Transformerの「Scaled Dot-Product Attention」もこれをベースにしています。"
        },
        {
            category: "Teacher Forcing(応用)",
            question: "RNN（Seq2Seq）の学習を安定させるためのテクニック「Teacher Forcing（教師強制）」とはどのような手法か。",
            options: ["デコーダの次の入力として、自身の1つ前の予測値ではなく「正解データ」を与える", "学習率を強制的に固定する", "重みの更新を強制的に止める", "間違えた問題だけを繰り返し学習させる"],
            answer: 0,
            explanation: "学習初期はデコーダの予測がデタラメなので、それを次の入力に使うと連鎖的に崩壊します。正解（カンニング）を見せることで学習をガイドします。"
        },
        {
            category: "RNNの並列化(応用)",
            question: "RNN（LSTM含む）がTransformerに比べて学習時間が長くなりやすい（並列化しにくい）根本的な理由は何か。",
            options: ["時刻 $t$ の計算を行うために、時刻 $t-1$ の計算結果（隠れ状態）を待たなければならないから", "パラメータ数が多すぎるから", "GPUが使えない構造だから", "メモリ消費量が大きいから"],
            answer: 0,
            explanation: "時系列の依存関係があるため、逐次処理（シーケンシャル）にならざるを得ず、GPUによる一括並列計算の恩恵を受けにくい構造です。"
        },
        {
            category: "Truncated BPTT(応用)",
            question: "非常に長い時系列データを学習する際、BPTTをある程度の長さ（ブロック）で打ち切る手法を何と呼ぶか。",
            options: ["Truncated BPTT", "Global BPTT", "Mini-batch BPTT", "Early Stopping"],
            answer: 0,
            explanation: "あまりに長く遡ると勾配消失や計算コストの問題が出るため、適当な長さで勾配伝播をカットします（ただし順伝播の隠れ状態は継承します）。"
        },
        {
            category: "Peeky Seq2Seq(応用)",
            question: "Seq2Seqの改良版である「Peeky Seq2Seq」の特徴はどれか。",
            options: ["エンコーダの出力（文脈ベクトル）を、デコーダの最初の時刻だけでなく、全ての時刻に入力する", "エンコーダの中身を覗き見（Peek）してパラメータを盗む", "デコーダの出力をエンコーダに戻す", "Attention機構を簡略化したもの"],
            answer: 0,
            explanation: "固定長ベクトルを最初の一回しか渡さないのは心許ないので、毎回「ほら、これだよ」と見せてあげる（Peek）手法です。"
        },
        {
            category: "GRUのゲート(応用)",
            question: "GRUにおいて、LSTMの「忘却ゲート」と「入力ゲート」の役割を1つで担っているゲートはどれか。",
            options: ["更新ゲート (Update Gate)", "リセットゲート (Reset Gate)", "出力ゲート (Output Gate)", "記憶ゲート (Memory Gate)"],
            answer: 0,
            explanation: "更新ゲート $z$ が「過去をどれだけ捨てて(1-z)、新しい情報をどれだけ取り込むか(z)」をバランスさせる役割を持ちます。"
        },
        {
            category: "Global vs Local(応用)",
            question: "Attention機構において、入力文の「全て」の単語を対象にスコア計算するものをGlobal Attentionと呼ぶのに対し、特定の「一部」の範囲だけに注目するものを何と呼ぶか。",
            options: ["Local Attention", "Self Attention", "Hard Attention", "Soft Attention"],
            answer: 0,
            explanation: "計算コストを抑えるために、注目すべき周辺のみにウィンドウを絞って計算する手法です。"
        },
        {
            category: "双方向RNNの制約(応用)",
            question: "双方向RNNは強力だが、適用できない（適さない）タスクの代表例はどれか。",
            options: ["リアルタイムの音声認識や翻訳（未来の情報がまだ存在しない場合）", "文章の感情分析", "機械翻訳（文章全体が揃ってから翻訳する場合）", "手書き文字認識"],
            answer: 0,
            explanation: "未来の情報（後ろのデータ）を使うため、データ全体が手元にあるバッチ処理ならOKですが、リアルタイム処理には不向きです。"
        },
        {
            category: "RNNの万能性(応用)",
            question: "RNN（特にLSTM）は理論上、どのような計算能力を持つことが示されているか。",
            options: ["チューリング完全（Turing Complete）", "量子計算が可能", "NP困難問題を多項式時間で解ける", "人間を超える意識を持つ"],
            answer: 0,
            explanation: "理論的には、適切な重みと無限の時間があれば、あらゆるコンピュータプログラム（アルゴリズム）を実行可能であることが証明されています。"
        }
    ]
};
