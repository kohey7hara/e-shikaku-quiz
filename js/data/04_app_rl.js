window.quizData = {
    title: "4-（７）深層強化学習：DQN, A3C",
    
    cheatSheet: `
        <h3>■ 強化学習の基本要素</h3>
        <ul>
            <li><strong>エージェント</strong>: 行動する主体（AI）。</li>
            <li><strong>環境 (Environment)</strong>: エージェントがいる世界。</li>
            <li><strong>報酬 (Reward)</strong>: 行動の結果として得られるスコア。</li>
            <li><strong>方策 (Policy, $\\pi$)</strong>: 「ある状態でどの行動をとるか」の戦略。</li>
            <li><strong>価値関数 (Value Function)</strong>: 「その状態がどれくらい良いか」の期待値。</li>
        </ul>

        <h3>■ 代表的なモデル</h3>
        <table>
            <tr><th>モデル</th><th>手法</th><th>特徴</th></tr>
            <tr><td><strong>DQN</strong><br>(Deep Q-Network)</td><td><strong>価値ベース</strong><br>(Q学習)</td><td>Q関数（行動価値）をDeep Learningで近似。<br><strong>Experience Replay</strong>で学習を安定化。</td></tr>
            <tr><td><strong>方策勾配法</strong><br>(Policy Gradient)</td><td><strong>方策ベース</strong></td><td>方策 $\\pi$ を直接ニューラルネットで学習。<br>連続的な行動も扱える。</td></tr>
            <tr><td><strong>A3C</strong><br>(Actor-Critic)</td><td><strong>Actor-Critic</strong><br>(ハイブリッド)</td><td><strong>Actor</strong>(行動)と<strong>Critic</strong>(評価)の2つを持つ。<br><strong>非同期(Asynchronous)</strong>に並列学習する。</td></tr>
        </table>

        <h3>■ 重要キーワード</h3>
        <ul>
            <li><strong>Experience Replay</strong>: 経験（データ）を保存し、ランダムに取り出して学習する（相関を消す）。</li>
            <li><strong>$\epsilon$-greedy法</strong>: たまにランダムに行動して「探索（冒険）」させる手法。</li>
            <li><strong>割引率 (Discount factor, $\\gamma$)</strong>: 未来の報酬をどれくらい重視するか（0〜1）。</li>
        </ul>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【基礎編】 Q1 - Q10
        // ---------------------------------------------------------
        {
            category: "基本用語",
            question: "強化学習において、エージェントが「ある状態」で「ある行動」をとった時の価値（将来もらえる報酬の総和の期待値）を表す関数はどれか。",
            options: ["行動価値関数 $Q(s, a)$", "状態価値関数 $V(s)$", "報酬関数 $R(s, a)$", "方策関数 $\\pi(a|s)$"],
            answer: 0,
            explanation: "State(状態)とAction(行動)のペアに対する価値なので「Q関数 (Quality)」とも呼ばれます。"
        },
        {
            category: "DQN",
            question: "DQN (Deep Q-Network) は、従来のQ学習の何をディープニューラルネットワークで置き換えたものか。",
            options: ["Qテーブル（Q関数の値を保持する表）", "報酬関数", "環境そのもの", "モンテカルロ木探索"],
            answer: 0,
            explanation: "状態が複雑（画像など）だとテーブル（表）で管理しきれないため、ニューラルネットで関数近似を行いました。"
        },
        {
            category: "Experience Replay",
            question: "DQNで導入された「Experience Replay」の主な目的は何か。",
            options: ["データの時系列的な相関を断ち切り、学習を安定させる", "メモリ使用量を減らす", "過去の失敗を二度と繰り返さないようにする", "報酬を最大化する"],
            answer: 0,
            explanation: "時系列データをそのまま学習すると相関が強すぎて学習が不安定になるため、一旦メモリ（バッファ）に貯めてからランダムに取り出して学習します。"
        },
        {
            category: "探索と活用",
            question: "「探索（Exploration）」と「活用（Exploitation）」のバランスをとるために、確率 $\\epsilon$ でランダムに行動し、それ以外は最適な行動をとる手法はどれか。",
            options: ["$\\epsilon$-greedy法", "ボルツマン選択", "UCB法", "モンテカルロ法"],
            answer: 0,
            explanation: "ずっと $\\epsilon$ を固定するのではなく、学習が進むにつれて $\\epsilon$ を小さく（ランダム行動を減らす）していくのが一般的です。"
        },
        {
            category: "割引率",
            question: "報酬の計算における「割引率 $\\gamma$ (ガンマ)」の役割として正しいものはどれか。",
            options: ["将来もらえる報酬を、現在の価値に換算する際に割り引く係数（遠い未来ほど価値が下がる）", "学習率を徐々に下げる係数", "過去の記憶を忘れる係数", "ノイズの大きさを決める係数"],
            answer: 0,
            explanation: "$\\gamma=0$ なら「今」しか見ない、$\\gamma=1$ なら「永遠の未来」まで考慮する。通常 0.9〜0.99 が使われます。"
        },
        {
            category: "方策勾配法",
            question: "方策勾配法 (Policy Gradient) の特徴として正しいものはどれか。",
            options: ["方策 $\\pi$（確率分布）を直接学習するため、ロボットアームの角度制御のような「連続的な行動」も扱える", "Q関数を学習するため、離散的な行動しか扱えない", "常に決定論的な行動をとる", "価値ベースの手法よりも学習が安定しやすい"],
            answer: 0,
            explanation: "DQN（価値ベース）は「右・左」のような離散行動が得意ですが、方策勾配法は連続値の出力が可能です。"
        },
        {
            category: "Actor-Critic",
            question: "Actor-Critic手法における「Critic（批評家）」の役割は何か。",
            options: ["状態価値を評価し、Actor（行動主体）の学習を助ける（TD誤差などを教える）", "行動を決定する", "環境をシミュレーションする", "報酬を与える"],
            answer: 0,
            explanation: "Actorが行動を決め、Criticが「その行動は良かったか悪かったか」を価値関数に基づいて採点します。"
        },
        {
            category: "A3C",
            question: "A3C (Asynchronous Advantage Actor-Critic) の「Asynchronous（非同期）」とは何を意味しているか。",
            options: ["複数のエージェント（スレッド）を並列に動かし、非同期にグローバルなネットワークを更新する", "学習と推論を非同期に行う", "エンコーダとデコーダが非同期である", "CPUとGPUを非同期に使う"],
            answer: 0,
            explanation: "Experience Replayを使わなくても、複数のエージェントがバラバラに動くことでデータの相関を消せる、というアイデアです。"
        },
        {
            category: "TD学習",
            question: "TD学習（Temporal Difference Learning）の更新式の考え方はどれか。",
            options: ["「現在の推定値」と「（報酬＋次の状態の推定値）」との差（TD誤差）を使って更新する", "エピソードが最後まで終わってから、実際の報酬総和を使って更新する", "教師データの正解ラベルとの誤差を使って更新する", "ランダムに値を更新する"],
            answer: 0,
            explanation: "モンテカルロ法（最後までやる）と動的計画法の中間のような手法で、1ステップ進むごとに少しずつ予測を修正します（ブートストラップ）。"
        },
        {
            category: "報酬の設計",
            question: "強化学習において、報酬（Reward）は誰が設定するか。",
            options: ["設計者（人間）が、タスクの目的に合わせて設計する", "エージェントが自分で決める", "環境が自動的に生成する", "ニューラルネットワークが学習する"],
            answer: 0,
            explanation: "「どう動けば正解か」は教えませんが、「どうなれば嬉しいか（報酬）」は人間が定義する必要があります（報酬設計の難しさ）。"
        },

        // ---------------------------------------------------------
        // 【応用編】 Q11 - Q20
        // ---------------------------------------------------------
        {
            category: "Target Network(応用)",
            question: "DQNにおいて「Target Network（ターゲットネットワーク）」を導入し、一定期間パラメータを固定する理由は何か。",
            options: ["教師データとなる目標値（正解）が変動し続けると、学習が発散して安定しないため", "計算コストを下げるため", "過学習を防ぐため", "ネットワークの層を深くするため"],
            answer: 0,
            explanation: "自分の予測($Q$)を使って目標値($r + \\max Q$)を作ると、自分が変わるたびに目標も動いてしまい、犬が自分の尻尾を追うように学習が収束しません。"
        },
        {
            category: "On-policy vs Off-policy(応用)",
            question: "学習に使っているデータが「現在の方策」によって生成されたものである必要がある手法を「On-policy（方策オン）」と呼ぶ。これに該当するモデルはどれか。",
            options: ["SARSA", "Q学習", "DQN", "Experience Replayを使う手法"],
            answer: 0,
            explanation: "Q学習やDQNは、過去のデータ（古い方策で集めたデータ）を使えるため「Off-policy」です。SARSAは自分が実際に選んだ行動で更新するため「On-policy」です。"
        },
        {
            category: "Advantage(応用)",
            question: "A3Cなどで使われる「Advantage関数 $A(s, a) = Q(s, a) - V(s)$」は何を意味しているか。",
            options: ["その状態 $s$ における平均的な価値 $V(s)$ に比べて、行動 $a$ をとることが「どれくらい良いか（アドバンテージ）」", "将来の報酬の総和", "行動価値と報酬の差", "方策の確率"],
            answer: 0,
            explanation: "単なる報酬の大きさではなく、「平均よりどれだけマシか」を指標にすることで、学習の分散を減らす効果があります。"
        },
        {
            category: "DQNの損失関数(応用)",
            question: "DQNの損失関数として、誤差が大きい時の勾配爆発を防ぐためにMSE（平均二乗誤差）の代わりに用いられることが多い関数はどれか。",
            options: ["Huber損失 (Smooth L1 Loss)", "クロスエントロピー誤差", "ヒンジ損失", "KLダイバージェンス"],
            answer: 0,
            explanation: "誤差が小さい時は二乗誤差、大きい時は絶対値誤差のように振る舞い、外れ値に対してロバストな関数です。"
        },
        {
            category: "部分観測マルコフ決定過程(応用)",
            question: "強化学習において、エージェントが環境の全ての情報を見られない（視界が限られているなど）状況を何と呼ぶか。",
            options: ["POMDP (Partially Observable Markov Decision Process)", "MDP (Markov Decision Process)", "BANDIT (Bandit Problem)", "GAN"],
            answer: 0,
            explanation: "通常のMDPは「現在の状態 $s$」に全ての情報が含まれていますが、POMDPでは記憶（RNNなど）を使わないと最適行動が決定できません（例：FPSゲームで敵が見えない時）。"
        },
        {
            category: "AlphaGo(応用)",
            question: "囲碁AI「AlphaGo」が採用した、強化学習と組み合わせた探索アルゴリズムはどれか。",
            options: ["モンテカルロ木探索 (MCTS)", "深さ優先探索", "幅優先探索", "A*探索"],
            answer: 0,
            explanation: "「Policy Network」で候補手を絞り、「Value Network」で局面を評価し、それらをMCTSでシミュレーションするという組み合わせ技です。"
        },
        {
            category: "方策勾配のベースライン(応用)",
            question: "方策勾配法において、勾配の分散（Variance）を減らして学習を安定させるために引く値（$V(s)$など）を何と呼ぶか。",
            options: ["ベースライン (Baseline)", "バイアス (Bias)", "モーメンタム (Momentum)", "ペナルティ (Penalty)"],
            answer: 0,
            explanation: "Advantage関数の考え方と同様に、基準値（ベースライン）を引くことで、報酬が常にプラスの場合でも「相対的に悪い行動」の確率を下げられるようになります。"
        },
        {
            category: "分布型強化学習(応用)",
            question: "近年発展している「分布型強化学習 (Distributional RL)」とは、Q値をどのように扱う手法か。",
            options: ["Q値を「期待値（平均）」だけでなく、「確率分布」として学習する", "Q値を正規分布に限定する", "Q値を離散化しない", "複数のエージェントのQ値を平均する"],
            answer: 0,
            explanation: "「平均すると報酬10」でも、「確実に10もらえる」のと「0か20か」ではリスクが違います。分布全体を学習することで、より高度な判断が可能になります（C51など）。"
        },
        {
            category: "Double DQN(応用)",
            question: "DQNの改良版である「Double DQN」は、DQNのどのような問題を解決するために提案されたか。",
            options: ["Q値の過大評価（Overestimation）", "計算速度の遅さ", "メモリ不足", "探索不足"],
            answer: 0,
            explanation: "通常のQ学習は $max$ を取る操作により、ノイズを含んだ高い値を「真の価値」と勘違いして過大評価しがちです。行動選択と評価のネットワークを分けることでこれを防ぎます。"
        },
        {
            category: "逆強化学習(応用)",
            question: "「逆強化学習 (Inverse Reinforcement Learning)」の目的は何か。",
            options: ["エキスパート（熟練者）の行動データから、その人が従っている「報酬関数」を推定する", "報酬を最小化するように学習する", "環境のモデルを学習する", "失敗から学習する"],
            answer: 0,
            explanation: "「運転の達人」のデータを見て、「達人は何を良いこと（報酬）だと思って運転しているのか？」を逆算する技術です。報酬設計が難しいタスクで有効です。"
        }
    ]
};
