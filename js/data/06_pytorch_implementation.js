window.quizData = {
    title: "6. PyTorch実装対策ドリル (完全版)",
    
    cheatSheet: `
        <h3>■ RNN/LSTMの入出力（最重要）</h3>
        <p>LSTMの出力はタプル <code>(output, (h_n, c_n))</code> になります。</p>
        <table>
            <tr><th>項目</th><th>形状 (Batch_first=True)</th></tr>
            <tr><td>入力</td><td><code>(Batch, Seq_len, Input_size)</code></td></tr>
            <tr><td>出力 (Output)</td><td><code>(Batch, Seq_len, Hidden_size * D)</code><br>※D=2 (双方向), D=1 (単方向)</td></tr>
            <tr><td>隠れ状態 (h_n, c_n)</td><td><code>(Num_layers * D, Batch, Hidden_size)</code><br>※常にBatchが2番目に来る点に注意！</td></tr>
        </table>

        <h3>■ モデル構築の定石</h3>
        <pre><code style="font-size:0.8em;"># nn.Sequential: 層を積み重ねる
model = nn.Sequential(
    nn.Linear(784, 256),
    nn.ReLU(),
    nn.Dropout(0.5),
    nn.Linear(256, 10)
)
</code></pre>

        <h3>■ その他頻出テクニック</h3>
        <ul>
            <li><strong>勾配クリッピング</strong>: <code>torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm)</code></li>
            <li><strong>重みのロード</strong>: <code>model.load_state_dict(torch.load(path))</code></li>
            <li><strong>学習率取得</strong>: <code>optimizer.param_groups[0]['lr']</code></li>
        </ul>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【Part 1: 基礎定義】
        // ---------------------------------------------------------
        {
            category: "レイヤー定義",
            question: "入力次元数100、出力次元数50の全結合層を定義する正しいコードはどれか。",
            options: ["nn.Linear(100, 50)", "nn.Linear(50, 100)", "nn.Dense(100, 50)", "nn.FullyConnected(100, 50)"],
            answer: 0,
            explanation: "PyTorchでは `nn.Linear(in_features, out_features)` を使用します。"
        },
        {
            category: "CNN定義",
            question: "入力チャンネル3(RGB)、出力チャンネル16、カーネルサイズ3x3の畳み込み層を定義するコードはどれか。",
            options: ["nn.Conv2d(3, 16, 3)", "nn.Conv2d(16, 3, 3)", "nn.Convolution(3, 16, 3)", "nn.Conv2d(3, 16, kernel_size=(3,3,3))"],
            answer: 0,
            explanation: "引数の順序は `(in_channels, out_channels, kernel_size)` です。"
        },
        {
            category: "損失関数",
            question: "多クラス分類問題において、Softmax関数と交差エントロピー誤差をセットで計算する損失関数クラスはどれか。",
            options: ["nn.CrossEntropyLoss()", "nn.NLLLoss()", "nn.BCELoss()", "nn.MSELoss()"],
            answer: 0,
            explanation: "`nn.CrossEntropyLoss` は内部で `LogSoftmax` + `NLLLoss` を行うため、モデルの出力層にSoftmaxを入れる必要はありません。"
        },
        {
            category: "学習ステップ",
            question: "学習ループ内での正しい処理順序はどれか。",
            options: ["optimizer.zero_grad() → loss.backward() → optimizer.step()", "loss.backward() → optimizer.step() → optimizer.zero_grad()", "optimizer.step() → loss.backward() → optimizer.zero_grad()", "optimizer.zero_grad() → optimizer.step() → loss.backward()"],
            answer: 0,
            explanation: "1.勾配リセット(zero) → 2.勾配計算(backward) → 3.更新(step) の順序が鉄則です。"
        },
        {
            category: "テンソル操作",
            question: "バッチサイズが含まれる4次元テンソル `x` (B, C, H, W) を、全結合層に入れるために2次元 (B, Features) に平坦化するコードはどれか。",
            options: ["x.view(x.size(0), -1)", "x.flatten()", "x.view(-1)", "x.reshape(0, -1)"],
            answer: 0,
            explanation: "`x.size(0)` でバッチサイズを指定し、`-1` で残りの次元を自動計算して結合させます。"
        },
        {
            category: "推論モード",
            question: "推論（テスト）実行前に、DropoutやBatch Normalizationを推論用の挙動に切り替えるメソッドはどれか。",
            options: ["model.eval()", "model.train(False)", "model.test()", "torch.no_grad()"],
            answer: 0,
            explanation: "`model.eval()` を呼ぶことで、Dropoutが無効化され、BN層は学習済みの移動平均を使うようになります。"
        },
        {
            category: "勾配計算停止",
            question: "推論時にメモリを節約し計算を高速化するために、勾配計算を行わないようにするコンテキストマネージャはどれか。",
            options: ["with torch.no_grad():", "with torch.zero_grad():", "with model.eval():", "with torch.stop_gradient():"],
            answer: 0,
            explanation: "`with torch.no_grad():` ブロック内では計算グラフが構築されないため、メモリ消費量が大幅に減ります。"
        },
        {
            category: "GPU転送",
            question: "モデルやデータをGPU（cuda）に転送するためのメソッドはどれか。",
            options: ["obj.to('cuda')", "obj.cuda()", "obj.gpu()", "obj.move('cuda')"],
            answer: 0,
            explanation: "`.to(device)` が最も汎用的で推奨される書き方です。"
        },
        {
            category: "モデル保存",
            question: "学習済みモデルの重み（パラメータ）のみを辞書形式で保存する推奨される方法はどれか。",
            options: ["torch.save(model.state_dict(), path)", "torch.save(model, path)", "model.save_weights(path)", "pickle.dump(model, path)"],
            answer: 0,
            explanation: "モデル全体よりも `state_dict()`（パラメータ辞書）を保存する方が互換性が高く推奨されています。"
        },
        {
            category: "オプティマイザ",
            question: "Adamオプティマイザを定義する際、学習させるモデルのパラメータを渡す正しいコードはどれか。",
            options: ["optim.Adam(model.parameters(), lr=0.001)", "optim.Adam(model, lr=0.001)", "optim.Adam(model.weights, lr=0.001)", "optim.Adam(lr=0.001)"],
            answer: 0,
            explanation: "オプティマイザには更新対象となる `model.parameters()` を渡す必要があります。"
        },

        // ---------------------------------------------------------
        // 【Part 2: 実践テクニック】
        // ---------------------------------------------------------
        {
            category: "Datasetクラス",
            question: "自作データセットクラスを作る際、継承すべきクラスと実装必須のメソッドの組み合わせはどれか。",
            options: ["torch.utils.data.Dataset を継承し、__len__ と __getitem__ を実装", "torch.utils.data.DataLoader を継承し、__iter__ を実装", "torch.nn.Module を継承し、forward を実装", "torch.Tensor を継承し、data を実装"],
            answer: 0,
            explanation: "`__len__` (データ数) と `__getitem__` (データ取得) を実装することで、DataLoaderが扱えるようになります。"
        },
        {
            category: "nn.Sequential",
            question: "複数の層（Linear, ReLU, Dropoutなど）を順番に積み重ねて1つのモジュールとして定義するコンテナはどれか。",
            options: ["nn.Sequential", "nn.ModuleList", "nn.Container", "nn.Stack"],
            answer: 0,
            explanation: "`nn.Sequential(layer1, layer2, ...)` と書くことで、`model(x)` した時にデータが上から順に流れるモデルを簡単に作れます。"
        },
        {
            category: "重み固定(転移学習)",
            question: "転移学習において、特定の層（畳み込み層など）の重みを更新しないように固定するコードはどれか。",
            options: ["param.requires_grad = False", "param.freeze()", "model.stop_training()", "optimizer.ignore(param)"],
            answer: 0,
            explanation: "パラメータテンソルの `requires_grad` 属性を `False` にすると、勾配計算と更新の対象外になります。"
        },
        {
            category: "DataLoader(Shuffle)",
            question: "DataLoaderを作成する際、訓練（Train）用と検証（Val/Test）用での `shuffle` 引数の一般的な設定はどれか。",
            options: ["訓練用: True, 検証用: False", "訓練用: False, 検証用: True", "両方とも True", "両方とも False"],
            answer: 0,
            explanation: "学習時は多様なバッチを作るためにシャッフルしますが、検証・テスト時は評価を一定にするため（また時系列順に見る場合など）シャッフルしないのが基本です。"
        },
        {
            category: "勾配クリッピング",
            question: "RNN学習時などの勾配爆発を防ぐため、勾配のノルムが指定値を超えないように制限する関数はどれか。",
            options: ["torch.nn.utils.clip_grad_norm_", "torch.clip_grad_value", "optimizer.clip_grad", "model.clip_gradients"],
            answer: 0,
            explanation: "`clip_grad_norm_` (末尾の_はインプレース操作) を `backward` の後、`step` の前に実行します。"
        },
        {
            category: "重みのロード",
            question: "保存された `state_dict` (重み辞書) をモデルに読み込むメソッドはどれか。",
            options: ["model.load_state_dict(state_dict)", "model.load_weights(state_dict)", "model.restore(state_dict)", "model.parameters = state_dict"],
            answer: 0,
            explanation: "保存時は `state_dict()`、読み込み時は `load_state_dict()` です。対になっています。"
        },
        {
            category: "Pooling",
            question: "2x2の領域の最大値をとるプーリング層を、ストライド2（重なりなし）で定義するコードはどれか。",
            options: ["nn.MaxPool2d(kernel_size=2, stride=2)", "nn.MaxPool2d(2, 1)", "nn.AvgPool2d(2, 2)", "nn.Pooling2d(2, 2)"],
            answer: 0,
            explanation: "カーネルサイズとストライドを同じ値にすると、領域が重ならずにサイズがちょうど半分になります。"
        },
        {
            category: "GAP (Global Avg Pool)",
            question: "CNNの出力特徴マップ `(B, C, H, W)` の `H` と `W` を平均して `(B, C, 1, 1)` にする Global Average Pooling を実装するのに適した層はどれか。",
            options: ["nn.AdaptiveAvgPool2d((1, 1))", "nn.AvgPool2d((H, W))", "x.mean()", "nn.GlobalPool2d()"],
            answer: 0,
            explanation: "`AdaptiveAvgPool2d` は出力サイズを指定できる便利な層です。`(1, 1)` を指定すれば、入力サイズに関わらず1x1に平均化してくれます。"
        },
        {
            category: "Batch Norm",
            question: "中間層の出力チャンネル数が `64` の畳み込み層の直後に Batch Normalization を入れる場合、正しい定義はどれか。",
            options: ["nn.BatchNorm2d(64)", "nn.BatchNorm2d(128)", "nn.BatchNorm1d(64)", "nn.LayerNorm(64)"],
            answer: 0,
            explanation: "BatchNorm2dの引数は「チャンネル数（特徴マップの枚数）」です。画像サイズ（H, W）ではありません。"
        },
        {
            category: "再現性(乱数固定)",
            question: "実験結果の再現性を担保するために乱数シードを固定すべき対象として、**不足しているもの**はどれか。",
            options: ["DataLoaderのworkerプロセス数", "torch.manual_seed", "numpy.random.seed", "torch.backends.cudnn.deterministic = True"],
            answer: 0,
            explanation: "worker数は速度に関係しますが、乱数の再現性には直接関係しません。再現性のためには PyTorch, NumPy, Python標準, cuDNN のシード/設定固定が必要です。"
        },

        // ---------------------------------------------------------
        // 【Part 3: RNN/LSTM 特化 (要注意！)】
        // ---------------------------------------------------------
        {
            category: "RNNの入力形状",
            question: "nn.LSTM(input_size=10, hidden_size=20, batch_first=True) に入力するテンソルの正しい形状はどれか。",
            options: ["(Batch_size, Seq_len, 10)", "(Seq_len, Batch_size, 10)", "(Batch_size, 10, Seq_len)", "(10, Batch_size, Seq_len)"],
            answer: 0,
            explanation: "`batch_first=True` を指定すると、バッチサイズが先頭 `(N, L, H_in)` になります。指定しないデフォルトは `(L, N, H_in)` です。"
        },
        {
            category: "LSTMの戻り値",
            question: "`output, (hn, cn) = lstm(input)` とした時、`output` 変数には何が入っているか。",
            options: ["全ての時刻（ステップ）における隠れ層の出力", "最後の時刻の隠れ層の出力のみ", "全ての時刻のメモリセルの状態", "損失関数の値"],
            answer: 0,
            explanation: "`output` には「全時刻」の出力が含まれます。`hn` には「最後」の時刻の隠れ状態だけが含まれます。Seq2Seqなどで使い分けます。"
        },
        {
            category: "LSTMの隠れ状態形状",
            question: "`batch_first=True` を設定していても、戻り値の `hn` (隠れ状態) の形状は変化しない。正しい形状はどれか。",
            options: ["(Num_layers * Num_directions, Batch_size, Hidden_size)", "(Batch_size, Num_layers, Hidden_size)", "(Num_layers, Batch_size, Hidden_size)", "(Batch_size, Seq_len, Hidden_size)"],
            answer: 0,
            explanation: "ここが最大の引っ掛けポイントです！ `output` はバッチファーストになりますが、`hn` と `cn` は常に `(Layers, Batch, Hidden)` の順序（Batchが2番目）です。"
        },
        {
            category: "双方向LSTM",
            question: "`nn.LSTM(..., hidden_size=50, bidirectional=True)` と定義した場合、出力テンソル (`output`) の最後の次元数（特徴量数）はいくつになるか。",
            options: ["100 (50 × 2)", "50", "25", "200"],
            answer: 0,
            explanation: "双方向（Bidirectional）の場合、順方向と逆方向の隠れ状態が結合（Concat）されて出力されるため、サイズは `hidden_size * 2` になります。"
        },
        {
            category: "RNNと全結合",
            question: "RNNの出力（多対一タスクの場合、最後の時刻の出力）を全結合層に入れて分類を行う際、適切な処理はどれか。",
            options: ["output[:, -1, :] を取り出して全結合層に入れる", "output[:, 0, :] を取り出して全結合層に入れる", "output全体を全結合層に入れる", "hn をそのまま全結合層に入れる"],
            answer: 0,
            explanation: "`output` は `(Batch, Seq, Hidden)` なので、`output[:, -1, :]` で「全バッチの、最後の時刻の、全特徴量」を取り出せます。"
        },
        {
            category: "Embedding層",
            question: "自然言語処理で単語IDをベクトルに変換する `nn.Embedding(num_embeddings, embedding_dim)` の `num_embeddings` には通常何を指定するか。",
            options: ["語彙数（ユニークな単語の総数）", "1文の最大単語数", "バッチサイズ", "隠れ層のサイズ"],
            answer: 0,
            explanation: "Embedding層は「語彙数 × ベクトル次元」のルックアップテーブルを作る層です。"
        },
        {
            category: "Dropoutの場所",
            question: "3層のMLPにおいて、Dropout層を挿入する最も一般的な位置はどこか。",
            options: ["活性化関数（ReLUなど）の後", "全結合層（Linear）の前", "出力層の後", "入力層の前"],
            answer: 0,
            explanation: "Linear → Activation → Dropout → Linear... の順が一般的です。活性化したニューロンをランダムに無効化します。"
        },
        {
            category: "パラメータ更新の除外",
            question: "特定のパラメータだけ学習率を変えたい場合、Optimizerにどう渡すべきか。",
            options: ["[{'params': model.layer1.parameters(), 'lr': 0.01}, {'params': model.layer2.parameters(), 'lr': 0.001}] のようなリストを渡す", "Optimizerを2つ定義する", "できない", "学習ループ内で条件分岐する"],
            answer: 0,
            explanation: "Optimizerのコンストラクタには、パラメータのリストだけでなく、パラメータグループごとの辞書リストを渡すことができます。"
        },
        {
            category: "学習率スケジューラ",
            question: "学習率をエポックごとに減衰させる `scheduler.step()` は、学習ループのどこに記述すべきか。",
            options: ["エポックごとのループの末尾（ミニバッチループの外）", "ミニバッチごとのループの中", "optimizer.step() の直後", "loss.backward() の前"],
            answer: 0,
            explanation: "多くのスケジューラ（StepLRなど）はエポック単位で動作するため、ミニバッチループを抜けた後に実行します。"
        },
        {
            category: "Collate_fn",
            question: "DataLoaderにおいて、ミニバッチ内のデータの長さがバラバラ（自然言語など）な場合に、パディング処理などを挟んでバッチを整形するために使う引数はどれか。",
            options: ["collate_fn", "worker_init_fn", "batch_sampler", "drop_last"],
            answer: 0,
            explanation: "デフォルトの動作ではTensorに変換してスタックするだけなので、長さが違うとエラーになります。`collate_fn` に自作関数を渡してパディング処理を実装します。"
        }
    ]
};
