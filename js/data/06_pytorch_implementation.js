window.quizData = {
    title: "6. PyTorch実装対策ドリル",
    
    cheatSheet: `
        <h3>■ 学習ループの鉄板テンプレート</h3>
        <pre><code style="font-size:0.8em;"># 1. モデルを学習モードにする
model.train()

for data, target in train_loader:
    # 2. データをデバイス(GPU等)に送る
    data, target = data.to(device), target.to(device)
    
    # 3. 勾配をリセット (重要！)
    optimizer.zero_grad()
    
    # 4. 順伝播 (Forward)
    output = model(data)
    
    # 5. 損失計算
    loss = criterion(output, target)
    
    # 6. 逆伝播 (Backward)
    loss.backward()
    
    # 7. パラメータ更新
    optimizer.step()
</code></pre>

        <h3>■ 推論モードの鉄板テンプレート</h3>
        <pre><code style="font-size:0.8em;"># 1. モデルを評価モードにする (Dropout/BN固定)
model.eval()

# 2. 勾配計算を無効化 (メモリ節約・高速化)
with torch.no_grad():
    for data, target in test_loader:
        data = data.to(device)
        output = model(data)
</code></pre>

        <h3>■ 重要メソッド早見表</h3>
        <table>
            <tr><th>目的</th><th>コード</th></tr>
            <tr><td>形状変更 (Flatten)</td><td><code>x.view(x.size(0), -1)</code></td></tr>
            <tr><td>GPU転送</td><td><code>x.to('cuda')</code></td></tr>
            <tr><td>重み保存</td><td><code>torch.save(model.state_dict(), path)</code></td></tr>
            <tr><td>重み固定</td><td><code>param.requires_grad = False</code></td></tr>
        </table>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【基礎編】 Q1 - Q10
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
            explanation: "まず勾配をリセットし、次に逆伝播で勾配を計算し、最後にその勾配を使ってパラメータを更新します。"
        },
        {
            category: "テンソル操作",
            question: "バッチサイズが含まれる4次元テンソル `x` (B, C, H, W) を、全結合層に入れるために2次元 (B, Features) に平坦化するコードはどれか。",
            options: ["x.view(x.size(0), -1)", "x.flatten()", "x.view(-1)", "x.reshape(0, -1)"],
            answer: 0,
            explanation: "`x.size(0)` でバッチサイズを指定し、`-1` で残りの次元を自動計算して結合させます。`x.flatten()` だと全次元が1列になってしまいバッチが混ざります（`x.flatten(1)`ならOK）。"
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
            explanation: "モデル全体（クラス定義含む）を保存するよりも、`state_dict()`（パラメータ辞書）だけを保存する方が互換性が高く推奨されています。"
        },
        {
            category: "オプティマイザ",
            question: "Adamオプティマイザを定義する際、学習させるモデルのパラメータを渡す正しいコードはどれか。",
            options: ["optim.Adam(model.parameters(), lr=0.001)", "optim.Adam(model, lr=0.001)", "optim.Adam(model.weights, lr=0.001)", "optim.Adam(lr=0.001)"],
            answer: 0,
            explanation: "オプティマイザには更新対象となる `model.parameters()` (イテレータ) を渡す必要があります。"
        },

        // ---------------------------------------------------------
        // 【応用編】 Q11 - Q20
        // ---------------------------------------------------------
        {
            category: "Datasetクラス(応用)",
            question: "自作データセットクラスを作る際、継承すべきクラスと実装必須のメソッドの組み合わせはどれか。",
            options: ["torch.utils.data.Dataset を継承し、__len__ と __getitem__ を実装", "torch.utils.data.DataLoader を継承し、__iter__ を実装", "torch.nn.Module を継承し、forward を実装", "torch.Tensor を継承し、data を実装"],
            answer: 0,
            explanation: "`__len__` (データ数) と `__getitem__` (インデックスに対応するデータの取得) を実装することで、DataLoaderが扱えるようになります。"
        },
        {
            category: "転移学習(応用)",
            question: "転移学習において、特定の層（例: 畳み込み層）の重みを更新しないように固定（Freeze）するコードはどれか。",
            options: ["param.requires_grad = False", "param.freeze()", "model.stop_training()", "optimizer.ignore(param)"],
            answer: 0,
            explanation: "各パラメータテンソルの `requires_grad` 属性を `False` にすると、勾配が計算されず、更新もされなくなります。"
        },
        {
            category: "RNNの形状(応用)",
            question: "nn.LSTMにおいて、`batch_first=True` を指定した場合の入力テンソルの形状はどれか。",
            options: ["(Batch, Seq_len, Input_size)", "(Seq_len, Batch, Input_size)", "(Batch, Input_size, Seq_len)", "(Seq_len, Input_size, Batch)"],
            answer: 0,
            explanation: "デフォルト(`False`)は `(Seq, Batch, Input)` ですが、`True` にすると直感的な `(Batch, Seq, Input)` で扱えるようになります。"
        },
        {
            category: "勾配累積(応用)",
            question: "メモリ不足でバッチサイズを大きくできない時、疑似的に大きなバッチサイズを実現する「勾配累積」の手順として正しいものはどれか。",
            options: ["複数回のbackward()を行ってから、1回だけstep()とzero_grad()を実行する", "step()を複数回実行してから、backward()を実行する", "zero_grad()を省略する", "lossを足し合わせてからbackward()する"],
            answer: 0,
            explanation: "PyTorchはデフォルトで勾配を加算（蓄積）する仕様です。これを利用し、数回backwardして勾配を溜めてから更新することで、大きなバッチと同じ効果を得ます。"
        },
        {
            category: "DataLoader(応用)",
            question: "DataLoaderの引数 `num_workers` は何を設定するものか。",
            options: ["データ読み込みを行う並列プロセス数（CPU）", "学習に使用するGPUの数", "モデルの層の数", "バッチサイズ"],
            answer: 0,
            explanation: "データのロード（前処理含む）をCPUの別プロセスで並列に行い、GPU待ち時間を減らすための設定です。"
        },
        {
            category: "ModuleList(応用)",
            question: "複数の層をリストで管理したい場合、Pythonの標準リスト `[]` ではなく `nn.ModuleList` を使うべき理由は何か。",
            options: ["nn.ModuleListを使わないと、中のパラメータがモデルの一部として登録されず、学習（更新）されないから", "nn.ModuleListの方が計算が速いから", "Pythonのリストは順序が保証されないから", "GPUに転送できないから"],
            answer: 0,
            explanation: "`nn.Module` を継承したクラス内では、`nn.Module` 系のコンテナに入れないとパラメータ登録（`model.parameters()`への追加）が自動で行われません。"
        },
        {
            category: "forwardメソッド(応用)",
            question: "モデルに入力 `x` を通す際、`model.forward(x)` ではなく `model(x)` と呼ぶことが推奨される理由は何か。",
            options: ["`__call__` メソッド内で、forward以外にもHooks（フック）処理などが実行される仕組みになっているため", "forwardメソッドはprivateメソッドだから", "タイプ数が少なくて楽だから", "forwardメソッドが存在しない場合があるから"],
            answer: 0,
            explanation: "PyTorchのモデルは `__call__` 内で `forward` を呼び出します。この前後でフック処理（層ごとの入出力確認など）が行われるため、直接 `forward` を呼ぶのは避けるべきです。"
        },
        {
            category: "再現性(応用)",
            question: "実験の再現性を確保するために、乱数シードを固定する必要がある箇所として**不足している**ものはどれか。",
            options: ["モデルの重み初期値 (torch.manual_seed)", "データのシャッフル順序 (random.seed, numpy.random.seed)", "GPUの演算精度 (torch.backends.cudnn.deterministic = True)", "学習データのファイル名"],
            answer: 3,
            explanation: "ファイル名は結果に影響しません。PyTorch、NumPy、Python標準の乱数、そしてGPU（cuDNN）の非決定的な挙動を全て固定する必要があります。"
        },
        {
            category: "学習率スケジューラ(応用)",
            question: "学習が進むにつれて学習率を徐々に下げていく `lr_scheduler` を使う場合、`scheduler.step()` はどこで呼ぶのが正しいか。",
            options: ["エポックごとのループの最後（optimizer.stepの後）", "ミニバッチごとのループの中（loss.backwardの前）", "学習開始前", "推論時"],
            answer: 0,
            explanation: "一般的にスケジューラはエポック単位で学習率を更新します（OneCycleLRなど例外もありますが、基本はエポックの終わりです）。"
        },
        {
            category: "重みの初期化(応用)",
            question: "特定の層（例: `nn.Linear`）の重みをHeの初期値で初期化したい場合、どのように記述するか。",
            options: ["nn.init.kaiming_normal_(layer.weight)", "layer.weight = nn.init.he()", "layer.init_weights('he')", "model.apply_init('he')"],
            answer: 0,
            explanation: "`torch.nn.init` モジュールにある関数を使い、`layer.weight` テンソルを直接書き換えます（末尾に `_` がつくメソッドはインプレース操作を表します）。"
        }
    ]
};
