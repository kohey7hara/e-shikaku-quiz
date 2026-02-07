window.quizData = {
    title: "4-（７）深層強化学習：DQN, A3C",
    
    cheatSheet: `
        <style>
            .rl-loop { display: flex; align-items: center; justify-content: center; gap: 20px; background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px; position: relative; }
            .rl-box { border: 2px solid #333; padding: 15px; border-radius: 8px; background: #fff; text-align: center; width: 100px; z-index: 2; }
            .agent { border-color: #3498db; color: #3498db; font-weight: bold; }
            .env { border-color: #27ae60; color: #27ae60; font-weight: bold; }
            
            .arrow-top { position: absolute; top: 15px; left: 50%; transform: translateX(-50%); width: 60%; border-top: 2px solid #555; height: 10px; }
            .arrow-bottom { position: absolute; bottom: 15px; left: 50%; transform: translateX(-50%); width: 60%; border-bottom: 2px solid #555; height: 10px; }
            .label-top { position: absolute; top: -5px; width: 100%; text-align: center; font-size: 0.8em; background: #f9f9f9; }
            .label-bottom { position: absolute; bottom: -5px; width: 100%; text-align: center; font-size: 0.8em; background: #f9f9f9; }

            .method-grid { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-bottom: 20px; }
            .method-card { border: 1px solid #ccc; border-radius: 8px; padding: 10px; width: 30%; min-width: 280px; background: #fff; vertical-align: top; }
            .method-title { font-weight: bold; border-bottom: 2px solid #333; margin-bottom: 5px; display: inline-block; }

            .tech-list { font-size: 0.85em; text-align: left; padding-left: 15px; }
            .tech-list li { margin-bottom: 5px; }

            .comp-table { width: 100%; border-collapse: collapse; font-size: 0.85em; margin-top: 10px; }
            .comp-table th { background: #eee; border: 1px solid #ccc; padding: 5px; }
            .comp-table td { border: 1px solid #ccc; padding: 5px; }
            .good { color: #27ae60; font-weight: bold; }
            .bad { color: #c0392b; font-weight: bold; }
            
            .dqn-features { display: flex; gap: 5px; margin-top: 5px; }
            .feature-box { flex: 1; border: 1px dashed #e74c3c; padding: 5px; font-size: 0.75em; text-align: center; background: #fceceb; border-radius: 4px; }
        </style>

        <h3>■ 強化学習の基本ループ (The Loop)</h3>
        <p>エージェント（AI）が環境と相互作用しながら「報酬」を最大化します。</p>
        
        <div class="rl-loop">
            <div class="rl-box agent">Agent<br>(脳)</div>
            <div class="rl-box env">Env<br>(世界)</div>
            
            <div class="arrow-top"><span class="label-top">行動 (Action) $a_t$</span></div>
            <div class="arrow-bottom"><span class="label-bottom">状態 (State) $s_{t+1}$ + 報酬 (Reward) $r_{t+1}$</span></div>
        </div>

        <h3>■ 3大アプローチの比較</h3>
        <div class="method-grid">
            <div class="method-card">
                <div class="method-title" style="border-color:#e74c3c;">価値ベース (DQN)</div>
                <p style="font-size:0.8em;">「どの状態が良いか」を極める。</p>
                <ul class="tech-list">
                    <li><strong>Q関数 $Q(s, a)$</strong> を学習。</li>
                    <li>値が最大の行動を選ぶ。</li>
                    <li><span class="good">強み</span>: サンプル効率が良い。</li>
                    <li><span class="bad">弱み</span>: 連続的な行動（ロボットアームの角度など）は苦手。</li>
                </ul>
            </div>

            <div class="method-card">
                <div class="method-title" style="border-color:#3498db;">方策ベース</div>
                <p style="font-size:0.8em;">「どう動くか」を直接学ぶ。</p>
                <ul class="tech-list">
                    <li><strong>方策 $\pi(a|s)$</strong> を学習。</li>
                    <li>確率的に行動を決定。</li>
                    <li><span class="good">強み</span>: <strong>連続値の行動</strong>も扱える。</li>
                    <li><span class="bad">弱み</span>: 学習が不安定になりやすい。</li>
                </ul>
            </div>

            <div class="method-card">
                <div class="method-title" style="border-color:#9b59b6;">Actor-Critic (A3C)</div>
                <p style="font-size:0.8em;">両者のハイブリッド。</p>
                <ul class="tech-list">
                    <li><strong>Actor (役者)</strong>: 行動を決める（方策）。</li>
                    <li><strong>Critic (評論家)</strong>: 行動を採点する（価値）。</li>
                    <li><span class="good">強み</span>: 安定かつ高速。現在の主流。</li>
                </ul>
            </div>
        </div>

        <h3>■ 代表モデルの詳細とE資格のツボ</h3>
        <table class="comp-table">
            <tr><th>モデル</th><th>仕組み・キーワード</th><th>特徴</th></tr>
            <tr>
                <td><strong>DQN</strong><br>(Deep Q-Net)</td>
                <td>
                    従来のQ学習をDeep化。<br>
                    <div class="dqn-features">
                        <div class="feature-box"><strong>Experience Replay</strong><br>過去の経験をランダム利用<br>→ 相関を消す</div>
                        <div class="feature-box"><strong>Target Network</strong><br>正解用の網を固定<br>→ 目標を安定させる</div>
                    </div>
                </td>
                <td>
                    Atariのゲームで人間超え。<br>
                    <strong>Off-policy</strong> (過去のデータも使える)。
                </td>
            </tr>
            <tr>
                <td><strong>A3C</strong></td>
                <td>
                    <strong>Asynchronous</strong> (非同期)。<br>
                    複数のエージェントが並列に動き、1つのグローバルネットワークを更新する。
                </td>
                <td>
                    学習が非常に速い。<br>
                    <strong>On-policy</strong> (今の自分の方策で学ぶ)。
                </td>
            </tr>
            <tr>
                <td><strong>Rainbow</strong></td>
                <td>DQNの改良版全部入り。<br>(Double, Dueling, Noisy, Multi-step, etc.)</td>
                <td>DQN系で最強の性能。</td>
            </tr>
        </table>

        <h3>■ その他重要キーワード</h3>
        <ul>
            <li><strong>$\epsilon$-greedy法</strong>: 「活用（今のベスト）」と「探索（ランダムな挑戦）」のバランスを取る手法。確率 $\epsilon$ でランダム行動する。</li>
            <li><strong>割引率 $\gamma$ (Gamma)</strong>: 未来の報酬をどれくらい割り引いて評価するか。0なら現在のみ、1なら永遠の未来まで考慮。</li>
            <li><strong>ベルマン方程式</strong>: 「現在の価値」＝「即時報酬」＋「次の状態の価値（割引あり）」という再帰的な関係式。強化学習の根幹。</li>
        </ul>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【基礎編】 Q1 - Q10
        // ---------------------------------------------------------
        {
            category: "強化学習の目的",
            question: "強化学習において、エージェントが最終的に最大化しようとするものは何か。",
            options: ["割引累積報酬（収益）の期待値", "即時報酬の合計", "状態の数", "エピソードの長さ"],
            answer: 0,
            explanation: "目先の利益（即時報酬）だけでなく、将来にわたって得られる報酬の総和（割引されたもの）を最大化することを目指します。"
        },
        {
            category: "DQNの革新点",
            question: "DQN (Deep Q-Network) が、従来のQ学習とニューラルネットワークの組み合わせ（Deep Q-Learning）を安定させるために導入した2つの主要な技術はどれか。",
            options: ["Experience Replay と Fixed Target Network", "Batch Normalization と Dropout", "Attention と Skip Connection", "Mini-batch と Momentum"],
            answer: 0,
            explanation: "「経験再生（相関の除去）」と「ターゲットネットワークの固定（目標の安定化）」が、DQN成功の鍵でした。"
        },
        {
            category: "Experience Replay",
            question: "DQNで用いられる「Experience Replay」の主な効果は何か。",
            options: ["連続した時系列データの相関（相性の悪さ）を断ち切り、iid（独立同分布）なデータとして学習させることで安定化する", "メモリ使用量を減らす", "計算速度を上げる", "過去の悪い記憶を消去する"],
            answer: 0,
            explanation: "ゲームなどは直前の画面と次の画面が似すぎていて、そのまま学習すると過学習や振動を起こします。ランダムに取り出すことでこれを防ぎます。"
        },
        {
            category: "探索と活用",
            question: "強化学習における「探索 (Exploration)」と「活用 (Exploitation)」のトレードオフに対処するための、最も基本的な手法は何か。",
            options: ["$\epsilon$-greedy法", "勾配降下法", "バックプロパゲーション", "ドロップアウト"],
            answer: 0,
            explanation: "確率 $\epsilon$ でランダムな行動（探索）をし、それ以外は現在知っている最良の行動（活用）をとる手法です。"
        },
        {
            category: "割引率",
            question: "割引率 $\gamma$ (0 <= $\gamma$ <= 1) を小さく設定した場合（0に近づけた場合）、エージェントはどのような振る舞いをするか。",
            options: ["目先の即時報酬のみを重視する（近視眼的になる）", "遠い未来の報酬を重視する（長期的視野になる）", "ランダムに行動する", "行動しなくなる"],
            answer: 0,
            explanation: "$\gamma=0$ だと「次の瞬間の報酬」しか見なくなります。$\gamma$ が1に近いほど、遠い未来の結果も考慮します。"
        },
        {
            category: "A3Cの特徴",
            question: "A3C (Asynchronous Advantage Actor-Critic) の「Asynchronous（非同期）」とは何を指しているか。",
            options: ["複数のエージェント（ワーカー）を並列に走らせ、それぞれが非同期にグローバルパラメータを更新すること", "学習と推論を非同期に行うこと", "GPUを使わずにCPUだけで計算すること", "報酬が遅れてやってくること"],
            answer: 0,
            explanation: "複数の分身が別々の場所で経験を積み、それを持ち寄ることで、Experience Replayなしでもデータの相関を消し、高速に学習できます。"
        },
        {
            category: "Actor-Critic",
            question: "Actor-Critic手法において、「Actor」と「Critic」はそれぞれ何を担当するか。",
            options: ["Actorは行動（方策）を決定し、Criticはその行動の良し悪し（価値）を評価する", "Actorは価値を計算し、Criticは行動を決定する", "Actorは報酬を受け取り、Criticは罰を与える", "Actorは攻撃し、Criticは防御する"],
            answer: 0,
            explanation: "Actor（方策ベース）の勾配更新を、Critic（価値ベース）が計算した価値を使ってガイドする、ハイブリッドな手法です。"
        },
        {
            category: "方策ベースの利点",
            question: "DQNなどの価値ベース手法と比較して、方策勾配法などの「方策ベース手法」が優れている点は何か。",
            options: ["確率的な方策や、連続値の行動（ロボットのアーム角度など）を直接学習できる", "学習が常に安定している", "サンプル効率が非常に良い", "実装が最も簡単である"],
            answer: 0,
            explanation: "DQNは「右、左」のような離散行動は得意ですが、「力を3.5ニュートン入れる」ような連続行動は苦手です。方策ベースはこれを扱えます。"
        },
        {
            category: "Q学習",
            question: "Q学習において、Q値 $Q(s, a)$ が表すものは何か。",
            options: ["状態 $s$ で行動 $a$ をとり、その後最適な行動を取り続けたときに得られる割引累積報酬の期待値", "状態 $s$ の良さ", "行動 $a$ をとる確率", "即時報酬の値"],
            answer: 0,
            explanation: "「この状況でこの行動をしたら、将来これくらい儲かるはずだ」という見積もり値です。"
        },
        {
            category: "On-policy vs Off-policy",
            question: "「Off-policy（オフ方策）」学習の特徴として正しいものはどれか。",
            options: ["現在の方策とは異なる（過去の）方策で生成されたデータを使って学習できる（Experience Replayが可能）", "自分が動いたデータでしか学習できない", "学習中に方策を更新しない", "方策を持たない"],
            answer: 0,
            explanation: "DQNはOff-policyなので過去のデータ（Experience Replay）が使えます。A3Cなどは基本On-policyなので、最新の方策で得たデータを使います。"
        },

        // ---------------------------------------------------------
        // 【応用編】 Q11 - Q20
        // ---------------------------------------------------------
        {
            category: "Double DQN(応用)",
            question: "DQNの改良版である「Double DQN」は、DQNのどのような問題を解決するために提案されたか。",
            options: ["Q値の過大評価（Overestimation）問題。ノイズによって最大値が実際より高く見積もられてしまうバイアスを防ぐ", "学習速度が遅い問題", "勾配消失問題", "メモリ不足問題"],
            answer: 0,
            explanation: "DQNは $\max$ 操作を行うため、たまたま高く出た値を過信しがちです。Double DQNは「行動を選ぶNW」と「価値を評価するNW」を分けることでこれを防ぎます。"
        },
        {
            category: "Dueling DQN(応用)",
            question: "「Dueling Network (Dueling DQN)」の構造的な特徴は何か。",
            options: ["Q値を、「状態価値 $V(s)$」と「アドバンテージ $A(s, a)$」の2つに分けて推定し、最後に足し合わせる", "2つのQネットワークを競わせる", "入力画像を2分割する", "報酬を2倍にする"],
            answer: 0,
            explanation: "「どんな行動をとっても状況が変わらない（Vが支配的）」場面などで、学習効率が良くなります。"
        },
        {
            category: "Advantage(応用)",
            question: "A3Cなどで使われる「アドバンテージ関数 $A(s, a)$」の定義として正しいものはどれか。（$Q$：行動価値、$V$：状態価値）",
            options: ["$A(s, a) = Q(s, a) - V(s)$", "$A(s, a) = Q(s, a) + V(s)$", "$A(s, a) = V(s) - Q(s, a)$", "$A(s, a) = Q(s, a) / V(s)$"],
            answer: 0,
            explanation: "「その行動 $a$ は、平均的な行動（$V(s)$）に比べてどれくらい良かったか？」を表す指標です。分散を減らす効果があります。"
        },
        {
            category: "報酬の設計(応用)",
            question: "エージェントが望ましい行動を学習しやすくするために、ゴール以外の途中経過にも報酬を与えることを何と呼ぶか。",
            options: ["報酬シェイピング (Reward Shaping)", "報酬クリッピング", "割引率の調整", "カリキュラム学習"],
            answer: 0,
            explanation: "ゴールまでの道のりが遠い場合（疎な報酬）、なかなか学習が進まないため、人為的に「ゴールに近づいたらプラス」のような中間報酬を与えます。"
        },
        {
            category: "部分観測マルコフ決定過程(応用)",
            question: "エージェントが現在の状態の全てを知ることができない環境（例：FPSゲームで視界外の敵が見えない）を何と呼ぶか。",
            options: ["POMDP (Partially Observable Markov Decision Process)", "MDP (Markov Decision Process)", "Bandit Problem", "Monte Carlo"],
            answer: 0,
            explanation: "通常のMDPは「全情報が見えている」前提ですが、現実はPOMDP（部分観測）がほとんどです。この場合、RNN（DRQN）などで過去の情報を記憶する必要があります。"
        },
        {
            category: "Fixed Target Network(応用)",
            question: "DQNにおける「Target Network」の更新頻度はどうなっているか。",
            options: ["一定ステップごと（例: 1000ステップごと）に、Main Networkの重みをコピーする", "毎ステップ更新される", "学習終了まで更新されない", "ランダムに更新される"],
            answer: 0,
            explanation: "教師信号（Target）がコロコロ変わると学習が収束しないため、Target Networkはしばらく固定し、たまに同期させます。"
        },
        {
            category: "Categorical DQN(応用)",
            question: "「Categorical DQN (C51)」は、Q値を単なる期待値（スカラ）ではなく、何として扱って学習するか。",
            options: ["報酬の確率分布（ヒストグラム）", "複素数", "行列", "ベクトル場"],
            answer: 0,
            explanation: "「平均すれば10点」でも「確実に10点」と「0点か20点」ではリスクが違います。分布ごと学習することで性能が向上しました（Rainbowの一部）。"
        },
        {
            category: "Noisy Nets(応用)",
            question: "「Noisy Networks」は、$\epsilon$-greedy法の代わりにどのような方法で探索を行うか。",
            options: ["ニューラルネットワークの重みに学習可能なノイズを加えることで、決定論的になりがちな挙動に揺らぎを持たせる", "入力画像にノイズを加える", "報酬にノイズを加える", "出力をランダムにする"],
            answer: 0,
            explanation: "$\epsilon$-greedyのように無理やりランダム行動させるのではなく、ネットワーク自体に揺らぎを持たせることで、より洗練された探索を行います（Rainbowの一部）。"
        },
        {
            category: "モデルベース強化学習(応用)",
            question: "DQNやA3Cなどの「モデルフリー」手法に対し、「モデルベース」強化学習の特徴は何か。",
            options: ["環境の遷移（次の状態がどうなるか）を予測するモデルを学習し、それを使ってシミュレーション（計画）を行う", "事前に完璧なモデルが与えられている", "物理エンジンを使う", "モデルを使わない"],
            answer: 0,
            explanation: "「もしこう動いたらどうなるか？」を脳内でシミュレーションできるため、少ない試行回数で効率よく学習できます（World Modelsなど）。"
        },
        {
            category: "AlphaGo(応用)",
            question: "囲碁AI「AlphaGo」が採用した、強化学習と探索を組み合わせた手法は何か。",
            options: ["モンテカルロ木探索 (MCTS) と Deep Learning (Value/Policy Net) の融合", "DQNのみ", "A3Cのみ", "遺伝的アルゴリズム"],
            answer: 0,
            explanation: "盤面の評価（Value Net）と次の手の確率（Policy Net）を深層学習で行い、それをガイドにしてMCTSで先読みを行いました。"
        }
    ]
};
