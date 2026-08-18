window.quizData = {
    title: "4-（７）深層強化学習：DQN・A3C",

    cheatSheet: `
        <style>
            .rlx-core { background:#eef8f8; border-left:5px solid #35b9c5; border-radius:0 10px 10px 0; padding:14px 18px; margin:12px 0 22px; }
            .rlx-note { background:#fff8e8; border-left:5px solid #f39c12; border-radius:0 10px 10px 0; padding:12px 16px; margin:12px 0 22px; }
            .rlx-formula { background:#f7f9fc; border:1px solid #d9e2ec; border-radius:8px; padding:11px 14px; margin:10px 0; overflow-x:auto; }
            .rlx-visual-wrap { overflow-x:auto; margin:14px 0 22px; }
            .rlx-visual-card { min-width:990px; border:1px solid #d9e2ec; border-radius:12px; background:#fff; padding:12px; }
            .rlx-wide-svg { display:block; width:100%; min-width:960px; height:auto; }
            .rlx-svg-title { font-size:16px; font-weight:700; fill:#102a43; }
            .rlx-svg-label { font-size:13px; font-weight:700; fill:#102a43; }
            .rlx-svg-note { font-size:12px; fill:#334e68; }
            .rlx-svg-mini { font-size:11px; fill:#486581; }
            .rlx-box { fill:#fff; stroke:#cbd5e1; stroke-width:1.5; rx:10; }
            .rlx-blue { fill:#eef7fb; stroke:#2780b8; stroke-width:1.5; rx:10; }
            .rlx-green { fill:#eafaf1; stroke:#27ae60; stroke-width:1.5; rx:10; }
            .rlx-orange { fill:#fff8e7; stroke:#f39c12; stroke-width:1.5; rx:10; }
            .rlx-purple { fill:#f7f0ff; stroke:#8e44ad; stroke-width:1.5; rx:10; }
            .rlx-caption { margin:8px 8px 0; color:#334e68; }
            .rlx-table-wrap { overflow-x:auto; margin:12px 0 22px; }
            .rlx-table { width:100%; min-width:760px; border-collapse:collapse; }
            .rlx-table th { background:#eaf2fb; color:#102a43; text-align:left; padding:10px; border:1px solid #d9e2ec; }
            .rlx-table td { padding:10px; border:1px solid #d9e2ec; vertical-align:top; }
            .rlx-steps { margin:8px 0 0; padding-left:1.5em; }
            .rlx-steps li { margin:5px 0; }
            .rlx-word { display:inline-block; background:#eaf2fb; border-radius:5px; padding:1px 6px; margin:2px 1px; }
        </style>

        <h3>■ まず全体：行動して、結果から学ぶ</h3>
        <div class="rlx-core">
            <strong>エージェント（考える側）</strong>が行動し、<strong>環境（世界）</strong>から次の状態と報酬を受け取ります。<br>
            この往復を繰り返し、将来を含む報酬の合計を大きくします。
        </div>
        <div class="rlx-note">
            <strong>DQN</strong>＝Deep Q-Network／
            <strong>A3C</strong>＝Asynchronous Advantage Actor-Critic
        </div>

        <h3>■ モデル図は「出力・記憶箱・worker数」の順で読む</h3>
        <div class="rlx-core"><strong>試験の4手：</strong>①1つの状態から何を出すかを見る → ②経験をためる箱があるかを見る → ③NetworkがOnline／Targetの2つかを見る → ④複数workerが共有モデルへ矢印を送るかを見る。</div>
        <div class="rlx-visual-wrap"><div class="rlx-visual-card">
            <svg class="rlx-wide-svg" viewBox="0 0 960 280" role="img" aria-labelledby="rlx-read-title rlx-read-desc">
                <title id="rlx-read-title">DQNとA3Cを図の構造から識別する</title>
                <desc id="rlx-read-desc">DQNは状態から離散行動ごとのQ値を出しReplay BufferとTarget Networkを使う。A3Cは複数workerがActorとCriticを持ち共有モデルを非同期更新する。</desc>
                <defs><marker id="rlx-arrow-read" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#627d98"/></marker></defs>
                <text x="18" y="26" class="rlx-svg-title">箱が1系列ならDQN、複数workerが集まればA3C</text>

                <g transform="translate(18 48)">
                    <rect width="924" height="90" class="rlx-blue"/>
                    <text x="16" y="25" class="rlx-svg-label">DQN（Deep Q-Network）</text>
                    <rect x="180" y="32" width="84" height="38" class="rlx-box"/><text x="202" y="56" class="rlx-svg-note">状態 s</text><path d="M272 51H318" stroke="#627d98" stroke-width="2" marker-end="url(#rlx-arrow-read)"/>
                    <rect x="328" y="27" width="150" height="48" class="rlx-blue"/><text x="352" y="49" class="rlx-svg-label">Online Q</text><text x="350" y="67" class="rlx-svg-mini">学習する本体</text><path d="M486 51H532" stroke="#627d98" stroke-width="2" marker-end="url(#rlx-arrow-read)"/>
                    <rect x="542" y="32" width="150" height="38" class="rlx-box"/><text x="562" y="56" class="rlx-svg-note">各行動Q(s,a)</text>
                    <rect x="718" y="16" width="180" height="28" class="rlx-orange"/><text x="739" y="35" class="rlx-svg-mini">Experience Replay</text>
                    <rect x="718" y="52" width="180" height="28" class="rlx-purple"/><text x="746" y="71" class="rlx-svg-mini">Target Network</text>
                </g>

                <g transform="translate(18 154)">
                    <rect width="924" height="104" class="rlx-purple"/>
                    <text x="16" y="25" class="rlx-svg-label">A3C（Asynchronous Advantage Actor-Critic）</text>
                    <rect x="174" y="40" width="140" height="44" class="rlx-blue"/><text x="193" y="59" class="rlx-svg-note">Worker 1</text><text x="193" y="76" class="rlx-svg-mini">Actor＋Critic</text>
                    <rect x="344" y="40" width="140" height="44" class="rlx-blue"/><text x="363" y="59" class="rlx-svg-note">Worker 2</text><text x="363" y="76" class="rlx-svg-mini">Actor＋Critic</text>
                    <rect x="514" y="40" width="140" height="44" class="rlx-blue"/><text x="533" y="59" class="rlx-svg-note">Worker 3</text><text x="533" y="76" class="rlx-svg-mini">Actor＋Critic</text>
                    <path d="M244 84V94H684 M414 84V94 M584 84V94 M684 94V62H694" fill="none" stroke="#627d98" stroke-width="2" marker-end="url(#rlx-arrow-read)"/>
                    <rect x="704" y="35" width="194" height="54" class="rlx-green"/><text x="728" y="58" class="rlx-svg-label">共有モデル</text><text x="728" y="78" class="rlx-svg-mini">非同期に勾配を反映</text>
                </g>
            </svg>
        </div></div>
        <div class="rlx-table-wrap"><table class="rlx-table">
            <tr><th>図の決め手</th><th>モデル</th><th>他との違い</th></tr>
            <tr><td>各離散行動のQ値・Experience Replay・Target Network</td><td><strong>DQN</strong></td><td>ActorとCriticへ出力を分ける図ではない。</td></tr>
            <tr><td>複数worker・Actor/Critic・共有重みへ非同期矢印</td><td><strong>A3C</strong></td><td>基本はOn-policyでReplay Bufferを使わない。</td></tr>
        </table></div>

        <div class="rlx-visual-wrap">
            <div class="rlx-visual-card">
                <svg class="rlx-wide-svg" viewBox="0 0 960 250" role="img" aria-labelledby="rlx-loop-title rlx-loop-desc">
                    <title id="rlx-loop-title">強化学習の基本ループ</title>
                    <desc id="rlx-loop-desc">エージェントが環境へ行動を送り、環境から次状態と報酬を受け取る循環。</desc>
                    <defs><marker id="rlx-arrow-loop" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#486581"></path></marker></defs>
                    <text x="20" y="28" class="rlx-svg-title">強化学習の基本：行動 → 結果 → 次の行動</text>

                    <rect x="80" y="72" width="260" height="104" class="rlx-blue"></rect>
                    <text x="105" y="108" class="rlx-svg-label">エージェント（Agent）</text>
                    <text x="105" y="137" class="rlx-svg-note">状態を見て、行動を決める</text>

                    <rect x="620" y="72" width="260" height="104" class="rlx-green"></rect>
                    <text x="645" y="108" class="rlx-svg-label">環境（Environment）</text>
                    <text x="645" y="137" class="rlx-svg-note">行動を受け、結果を返す</text>

                    <line x1="350" y1="103" x2="610" y2="103" stroke="#486581" stroke-width="2" marker-end="url(#rlx-arrow-loop)"></line>
                    <text x="438" y="91" class="rlx-svg-note">行動 aₜ</text>
                    <line x1="610" y1="151" x2="350" y2="151" stroke="#486581" stroke-width="2" marker-end="url(#rlx-arrow-loop)"></line>
                    <text x="387" y="174" class="rlx-svg-note">次状態 sₜ₊₁・報酬 rₜ₊₁</text>

                    <text x="160" y="222" class="rlx-svg-label">目標：将来を含む報酬の合計（Return）を最大化する</text>
                </svg>
                <p class="rlx-caption"><strong>記号：</strong>t＝現在の時刻、t+1＝次の時刻。報酬は「その行動の直後に返る点数」です。</p>
            </div>
        </div>

        <h3>■ 最初に覚える4つの量</h3>
        <div class="rlx-table-wrap">
            <table class="rlx-table">
                <tr><th>量</th><th>意味</th><th>イメージ</th></tr>
                <tr><td><strong>状態 s</strong></td><td>現在の状況</td><td>ゲーム画面・ロボットの姿勢</td></tr>
                <tr><td><strong>行動 a</strong></td><td>エージェントが選ぶ操作</td><td>右へ進む・ブレーキを踏む</td></tr>
                <tr><td><strong>報酬 r</strong></td><td>直後に返る点数</td><td>ゴールで+1、衝突で-1</td></tr>
                <tr><td><strong>収益 G</strong><br>Return</td><td>将来の報酬を割り引いて足した合計</td><td>$G_t=r_{t+1}+\\gamma r_{t+2}+\\gamma^2r_{t+3}+\\cdots$</td></tr>
            </table>
        </div>
        <div class="rlx-note">
            <strong>割引率 $\\gamma$：</strong>0に近いほど目先を重視し、1に近いほど遠い未来も重視します。
        </div>

        <h3>■ TD学習 → Q学習 → DQN のつながり</h3>
        <div class="rlx-table-wrap">
            <table class="rlx-table">
                <tr><th>段階</th><th>何をするか</th><th>試験で使う形</th></tr>
                <tr>
                    <td><strong>TD学習</strong><br>Temporal-Difference Learning</td>
                    <td>最後まで待たず、1段先の推定値を使って更新する</td>
                    <td>TD目標 $y=r+\\gamma V(s')$<br>TD誤差 $\\delta=y-V(s)$</td>
                </tr>
                <tr>
                    <td><strong>Q学習</strong></td>
                    <td>状態sで、どの行動aがよいかを $Q(s,a)$ で比べる</td>
                    <td>$y=r+\\gamma\\max_{a'}Q(s',a')$<br>$Q\\leftarrow Q+\\alpha(y-Q)$</td>
                </tr>
                <tr>
                    <td><strong>DQN</strong><br>Deep Q-Network</td>
                    <td>表に保存していたQ値をニューラルネットワークで近似する</td>
                    <td>状態sを入力 → 各離散行動のQ値を出力</td>
                </tr>
            </table>
        </div>
        <div class="rlx-core">
            <strong>Q(s,a)の一言：</strong>「この状態でこの行動を選び、その後もうまく行動したら、将来どれくらい得をするか」の見積もりです。
        </div>

        <h3>■ DQN：Q値を出し、2つの工夫で安定させる</h3>
        <div class="rlx-visual-wrap">
            <div class="rlx-visual-card">
                <svg class="rlx-wide-svg" viewBox="0 0 960 500" role="img" aria-labelledby="rlx-dqn-title rlx-dqn-desc">
                    <title id="rlx-dqn-title">DQNの行動選択と学習安定化</title>
                    <desc id="rlx-dqn-desc">DQNが状態から各行動のQ値を出して最大の行動を選び、Replay BufferとTarget Networkを使って学習する。</desc>
                    <defs><marker id="rlx-arrow-dqn" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#486581"></path></marker></defs>
                    <text x="20" y="28" class="rlx-svg-title">DQN（Deep Q-Network）</text>

                    <rect x="20" y="48" width="920" height="152" class="rlx-blue"></rect>
                    <text x="38" y="76" class="rlx-svg-label">① 行動を選ぶ</text>
                    <rect x="40" y="98" width="110" height="54" class="rlx-box"></rect>
                    <text x="69" y="130" class="rlx-svg-note">状態 s</text>
                    <line x1="160" y1="125" x2="200" y2="125" stroke="#486581" stroke-width="2" marker-end="url(#rlx-arrow-dqn)"></line>
                    <rect x="212" y="88" width="180" height="74" class="rlx-blue"></rect>
                    <text x="237" y="119" class="rlx-svg-label">Online Q Network</text>
                    <text x="237" y="143" class="rlx-svg-mini">現在学習している本体</text>
                    <line x1="402" y1="125" x2="442" y2="125" stroke="#486581" stroke-width="2" marker-end="url(#rlx-arrow-dqn)"></line>
                    <rect x="454" y="80" width="238" height="90" class="rlx-box"></rect>
                    <text x="475" y="106" class="rlx-svg-label">各行動のQ値</text>
                    <text x="475" y="132" class="rlx-svg-note">左：1.2　右：3.8　待つ：0.5</text>
                    <text x="475" y="155" class="rlx-svg-mini">大きいほど将来の得が大きい</text>
                    <line x1="702" y1="125" x2="742" y2="125" stroke="#486581" stroke-width="2" marker-end="url(#rlx-arrow-dqn)"></line>
                    <rect x="754" y="98" width="166" height="54" class="rlx-green"></rect>
                    <text x="778" y="130" class="rlx-svg-note">最大 →「右」</text>

                    <rect x="20" y="220" width="920" height="260" class="rlx-orange"></rect>
                    <text x="38" y="248" class="rlx-svg-label">② 経験から学ぶ</text>
                    <rect x="38" y="273" width="180" height="58" class="rlx-box"></rect>
                    <text x="56" y="298" class="rlx-svg-note">経験 (s, a, r, s', done)</text>
                    <text x="56" y="319" class="rlx-svg-mini">1回の行動と結果</text>
                    <line x1="228" y1="302" x2="256" y2="302" stroke="#486581" stroke-width="2" marker-end="url(#rlx-arrow-dqn)"></line>
                    <rect x="268" y="263" width="166" height="78" class="rlx-orange"></rect>
                    <text x="289" y="291" class="rlx-svg-label">Replay Buffer</text>
                    <text x="289" y="315" class="rlx-svg-mini">経験をためる箱</text>
                    <line x1="444" y1="302" x2="478" y2="302" stroke="#486581" stroke-width="2" marker-end="url(#rlx-arrow-dqn)"></line>
                    <rect x="490" y="273" width="112" height="58" class="rlx-box"></rect>
                    <text x="510" y="298" class="rlx-svg-note">ランダム抽出</text>
                    <text x="510" y="319" class="rlx-svg-mini">mini-batch</text>

                    <line x1="612" y1="290" x2="640" y2="290" stroke="#486581" stroke-width="2" marker-end="url(#rlx-arrow-dqn)"></line>
                    <rect x="652" y="255" width="150" height="66" class="rlx-blue"></rect>
                    <text x="672" y="283" class="rlx-svg-label">Online Network</text>
                    <text x="672" y="307" class="rlx-svg-mini">予測 Q(s,a)</text>
                    <line x1="612" y1="320" x2="640" y2="360" stroke="#486581" stroke-width="2" marker-end="url(#rlx-arrow-dqn)"></line>
                    <rect x="652" y="354" width="150" height="58" class="rlx-purple"></rect>
                    <text x="672" y="380" class="rlx-svg-label">Target Network</text>
                    <text x="672" y="402" class="rlx-svg-mini">目標 y を計算</text>
                    <line x1="727" y1="326" x2="727" y2="344" stroke="#8e44ad" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#rlx-arrow-dqn)"></line>
                    <text x="438" y="348" class="rlx-svg-mini">OnlineからTargetへ一定間隔で重みをコピー</text>

                    <line x1="812" y1="288" x2="836" y2="332" stroke="#486581" stroke-width="2" marker-end="url(#rlx-arrow-dqn)"></line>
                    <line x1="812" y1="383" x2="836" y2="353" stroke="#486581" stroke-width="2" marker-end="url(#rlx-arrow-dqn)"></line>
                    <rect x="848" y="318" width="74" height="66" class="rlx-green"></rect>
                    <text x="864" y="345" class="rlx-svg-label">Loss</text>
                    <text x="857" y="368" class="rlx-svg-mini">差を小さく</text>

                    <rect x="38" y="422" width="378" height="40" class="rlx-box"></rect>
                    <text x="54" y="447" class="rlx-svg-note">Replay：順番を混ぜ、時間的な相関を弱める</text>
                    <rect x="438" y="422" width="484" height="40" class="rlx-box"></rect>
                    <text x="454" y="447" class="rlx-svg-note">Target：目標値をしばらく固定し、学習を安定させる</text>
                </svg>
                <p class="rlx-caption"><strong>重要：</strong>Replay Bufferからランダムに経験を再利用し、Target Networkは目標値だけを計算します。学習で直接更新するのはOnline Networkです。</p>
            </div>
        </div>

        <div class="rlx-note">
            <strong>DQNのTD目標：</strong>$y=r+\\gamma\\max_{a'}Q_{target}(s',a')$。終端状態なら未来がないので <strong>y=r</strong> です。<br>
            <strong>DQNの損失：</strong>Online Networkの予測 $Q_{online}(s,a)$ を目標yへ近づけます。二乗誤差やHuber損失が代表です。
        </div>

        <h3>■ 方策勾配とActor-Critic</h3>
        <div class="rlx-table-wrap">
            <table class="rlx-table">
                <tr><th>役割</th><th>学ぶもの</th><th>一言</th></tr>
                <tr><td><strong>Actor</strong></td><td>方策 $\\pi(a|s)$</td><td>状態sで、どの行動をどの確率で選ぶか</td></tr>
                <tr><td><strong>Critic</strong></td><td>主に状態価値 $V(s)$</td><td>今の状況から将来どれくらい報酬を得そうか</td></tr>
                <tr><td><strong>Advantage</strong><br>アドバンテージ</td><td>$A(s,a)=Q(s,a)-V(s)$</td><td>選んだ行動が平均よりどれだけ良かったか</td></tr>
            </table>
        </div>
        <div class="rlx-core">
            <strong>方策勾配法（Policy Gradient）：</strong><br>
            Advantageが正なら、選んだ行動の確率を上げます。負なら下げます。
            <div class="rlx-formula">更新の向き：$\\nabla_\\theta\\log\\pi_\\theta(a|s)\\,A(s,a)$</div>
        </div>

        <h3>■ A3C：複数workerが別々に経験する</h3>
        <div class="rlx-visual-wrap">
            <div class="rlx-visual-card">
                <svg class="rlx-wide-svg" viewBox="0 0 960 460" role="img" aria-labelledby="rlx-a3c-title rlx-a3c-desc">
                    <title id="rlx-a3c-title">A3Cの非同期Actor-Critic</title>
                    <desc id="rlx-a3c-desc">複数workerが別々の環境から経験を集め、共有Actor-Criticモデルへ非同期に勾配を送り、最新の重みを受け取る。</desc>
                    <defs><marker id="rlx-arrow-a3c" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#486581"></path></marker></defs>
                    <text x="20" y="28" class="rlx-svg-title">A3C（Asynchronous Advantage Actor-Critic）</text>

                    <rect x="300" y="50" width="360" height="82" class="rlx-purple"></rect>
                    <text x="344" y="82" class="rlx-svg-label">共有Actor-Criticモデル</text>
                    <text x="344" y="108" class="rlx-svg-note">全workerが更新するグローバルな重み</text>
                    <line x1="690" y1="74" x2="738" y2="74" stroke="#2780b8" stroke-width="2" marker-end="url(#rlx-arrow-a3c)"></line>
                    <text x="750" y="79" class="rlx-svg-mini">勾配を非同期に送る</text>
                    <line x1="690" y1="106" x2="738" y2="106" stroke="#8e44ad" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#rlx-arrow-a3c)"></line>
                    <text x="750" y="111" class="rlx-svg-mini">最新の重みを受け取る</text>

                    <line x1="175" y1="208" x2="370" y2="138" stroke="#2780b8" stroke-width="2" marker-end="url(#rlx-arrow-a3c)"></line>
                    <line x1="480" y1="208" x2="480" y2="138" stroke="#2780b8" stroke-width="2" marker-end="url(#rlx-arrow-a3c)"></line>
                    <line x1="785" y1="208" x2="590" y2="138" stroke="#2780b8" stroke-width="2" marker-end="url(#rlx-arrow-a3c)"></line>
                    <line x1="390" y1="138" x2="195" y2="208" stroke="#8e44ad" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#rlx-arrow-a3c)"></line>
                    <line x1="500" y1="138" x2="500" y2="208" stroke="#8e44ad" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#rlx-arrow-a3c)"></line>
                    <line x1="570" y1="138" x2="765" y2="208" stroke="#8e44ad" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#rlx-arrow-a3c)"></line>

                    <rect x="50" y="220" width="250" height="108" class="rlx-blue"></rect>
                    <text x="70" y="248" class="rlx-svg-label">Worker 1</text>
                    <text x="70" y="276" class="rlx-svg-note">Actor：行動を決める</text>
                    <text x="70" y="301" class="rlx-svg-note">Critic：状態価値V(s)を予測</text>
                    <rect x="355" y="220" width="250" height="108" class="rlx-blue"></rect>
                    <text x="375" y="248" class="rlx-svg-label">Worker 2</text>
                    <text x="375" y="276" class="rlx-svg-note">Actor：行動を決める</text>
                    <text x="375" y="301" class="rlx-svg-note">Critic：状態価値V(s)を予測</text>
                    <rect x="660" y="220" width="250" height="108" class="rlx-blue"></rect>
                    <text x="680" y="248" class="rlx-svg-label">Worker 3</text>
                    <text x="680" y="276" class="rlx-svg-note">Actor：行動を決める</text>
                    <text x="680" y="301" class="rlx-svg-note">Critic：状態価値V(s)を予測</text>

                    <line x1="160" y1="338" x2="160" y2="358" stroke="#2780b8" stroke-width="2" marker-end="url(#rlx-arrow-a3c)"></line>
                    <line x1="190" y1="362" x2="190" y2="338" stroke="#27ae60" stroke-width="2" marker-end="url(#rlx-arrow-a3c)"></line>
                    <text x="115" y="354" class="rlx-svg-mini">行動</text>
                    <text x="200" y="354" class="rlx-svg-mini">状態・報酬</text>
                    <line x1="465" y1="338" x2="465" y2="358" stroke="#2780b8" stroke-width="2" marker-end="url(#rlx-arrow-a3c)"></line>
                    <line x1="495" y1="362" x2="495" y2="338" stroke="#27ae60" stroke-width="2" marker-end="url(#rlx-arrow-a3c)"></line>
                    <text x="420" y="354" class="rlx-svg-mini">行動</text>
                    <text x="505" y="354" class="rlx-svg-mini">状態・報酬</text>
                    <line x1="770" y1="338" x2="770" y2="358" stroke="#2780b8" stroke-width="2" marker-end="url(#rlx-arrow-a3c)"></line>
                    <line x1="800" y1="362" x2="800" y2="338" stroke="#27ae60" stroke-width="2" marker-end="url(#rlx-arrow-a3c)"></line>
                    <text x="725" y="354" class="rlx-svg-mini">行動</text>
                    <text x="810" y="354" class="rlx-svg-mini">状態・報酬</text>
                    <rect x="95" y="370" width="160" height="52" class="rlx-green"></rect>
                    <text x="144" y="401" class="rlx-svg-note">環境 1</text>
                    <rect x="400" y="370" width="160" height="52" class="rlx-green"></rect>
                    <text x="449" y="401" class="rlx-svg-note">環境 2</text>
                    <rect x="705" y="370" width="160" height="52" class="rlx-green"></rect>
                    <text x="754" y="401" class="rlx-svg-note">環境 3</text>

                    <text x="165" y="448" class="rlx-svg-note">別々の環境で異なる経験を集め、時間的な相関を弱める</text>
                </svg>
                <p class="rlx-caption"><strong>A3Cの要点：</strong>基本はOn-policyでReplay Bufferを使わず、複数workerが経験収集を並列化します。Actorは方策、Criticは価値を学びます。</p>
            </div>
        </div>

        <div class="rlx-note">
            <strong>Advantageのやさしい近似：</strong>$A_t\\approx r_{t+1}+\\gamma V(s_{t+1})-V(s_t)$。<br>
            「実際の結果」がCriticの予想より良ければ正、悪ければ負になります。A3Cは複数ステップ分の報酬を使うn-step returnも利用します。
        </div>

        <h3>■ DQNとA3Cを混同しない</h3>
        <div class="rlx-table-wrap">
            <table class="rlx-table">
                <tr><th>比較</th><th>DQN</th><th>A3C</th></tr>
                <tr><td>中心</td><td>行動価値 $Q(s,a)$</td><td>方策Actor＋価値Critic</td></tr>
                <tr><td>行動</td><td>主に離散行動</td><td>確率的方策。離散・連続の設計が可能</td></tr>
                <tr><td>データ</td><td>Replay Bufferで過去経験を再利用</td><td>現在の方策で各workerが収集</td></tr>
                <tr><td>方策</td><td>Off-policy</td><td>On-policy</td></tr>
                <tr><td>安定化・分散</td><td>Experience Replay＋Target Network</td><td>複数worker＋Advantage</td></tr>
            </table>
        </div>

        <h3>■ 計算問題はこの順で解く</h3>
        <div class="rlx-table-wrap">
            <table class="rlx-table">
                <tr><th>問題</th><th>1手目</th><th>2手目</th></tr>
                <tr><td>Return</td><td>報酬を時刻順に並べる</td><td>遠い報酬ほど $\\gamma,\\gamma^2$ を掛ける</td></tr>
                <tr><td>TD誤差</td><td>$y=r+\\gamma V(s')$</td><td>$\\delta=y-V(s)$</td></tr>
                <tr><td>Q学習更新</td><td>$y=r+\\gamma\\max Q(s',a')$</td><td>$Q\\leftarrow Q+\\alpha(y-Q)$</td></tr>
                <tr><td>DQN損失</td><td>Target Networkでyを作る</td><td>$(y-Q_{online})^2$</td></tr>
                <tr><td>Advantage</td><td>実際の結果を計算</td><td>Criticの予想Vを引く</td></tr>
            </table>
        </div>

        <h3>■ 最後はこの表だけ</h3>
        <div class="rlx-table-wrap">
            <table class="rlx-table">
                <tr><th>問題文の合図</th><th>答える語</th><th>一言理由</th></tr>
                <tr><td>将来の報酬を割引いて合計</td><td><strong>Return</strong></td><td>$\\gamma$ が小さいほど目先を重視</td></tr>
                <tr><td>状態s・行動aの将来価値</td><td><strong>Q(s,a)</strong></td><td>その状態でどの行動がよいか</td></tr>
                <tr><td>1段先の推定値で更新</td><td><strong>TD学習</strong></td><td>エピソード終了前に学べる</td></tr>
                <tr><td>次状態の最大Q値</td><td><strong>Q学習</strong></td><td>Off-policyのTD目標</td></tr>
                <tr><td>Q値をニューラルネットで近似</td><td><strong>DQN</strong></td><td>各離散行動のQ値を出力</td></tr>
                <tr><td>経験をためてランダム抽出</td><td><strong>Experience Replay</strong></td><td>相関を弱めて再利用</td></tr>
                <tr><td>目標値用ネットを一時固定</td><td><strong>Target Network</strong></td><td>動く目標を安定させる</td></tr>
                <tr><td>確率εでランダム行動</td><td><strong>ε-greedy</strong></td><td>探索と活用の両立</td></tr>
                <tr><td>良い行動の確率を上げる</td><td><strong>Policy Gradient</strong></td><td>方策を直接更新</td></tr>
                <tr><td>Actorが行動・Criticが価値</td><td><strong>Actor-Critic</strong></td><td>方策と価値を組み合わせる</td></tr>
                <tr><td>平均よりどれだけ良い行動か</td><td><strong>Advantage</strong></td><td>$A=Q-V$</td></tr>
                <tr><td>複数worker・非同期更新</td><td><strong>A3C</strong></td><td>別々の経験を共有モデルへ送る</td></tr>
            </table>
        </div>
    `,

    questions: [
        {
            id: "rl-objective",
            category: "強化学習の目的",
            question: "強化学習でエージェントが最大化しようとするものはどれか。",
            options: ["将来を含む割引累積報酬（Return）の期待値", "直後の報酬だけ", "状態の個数", "エピソードの長さだけ"],
            answer: 0,
            explanation: "<strong>①</strong> 行動の結果は未来にも影響します。<br><strong>②</strong> 遠い報酬には割引率γを掛けます。<br><strong>③</strong> その合計Returnの期待値を大きくするのが目標です。"
        },
        {
            id: "rl-loop-signals",
            category: "基本ループ",
            question: "強化学習の基本ループで、環境がエージェントへ返すものはどれか。",
            options: ["次の状態と報酬", "行動だけ", "方策の重みだけ", "損失関数だけ"],
            answer: 0,
            explanation: "<strong>①</strong> エージェントが行動aを環境へ送ります。<br><strong>②</strong> 環境が変化します。<br><strong>③</strong> 次状態s'と報酬rがエージェントへ返ります。"
        },
        {
            id: "rl-return-definition",
            category: "Return",
            question: "Return（収益）の説明として正しいものはどれか。",
            options: ["現在以降の報酬を、遠いほど割り引いて足したもの", "現在の報酬だけ", "Q値の最大値だけ", "行動を選ぶ確率"],
            answer: 0,
            explanation: "<strong>①</strong> 将来の報酬も足します。<br><strong>②</strong> 遠い報酬にはγ、γ²のように割引を掛けます。<br><strong>③</strong> その合計がReturnです。"
        },
        {
            id: "rl-return-calc",
            category: "Return（計算）",
            kind: "計算",
            question: "報酬が$r_1=2,r_2=4$、割引率$\\gamma=0.5$のとき、$G_0=r_1+\\gamma r_2$はいくつか。",
            options: ["4", "6", "3", "5"],
            answer: 0,
            explanation: "<strong>使う公式（2時刻のReturn）：</strong><br>$G_0=r_1+\\gamma r_2$<br><br><strong>① 遠い報酬：</strong>$0.5\\times4=2$。<br><strong>② 現在に近い報酬：</strong>$2$。<br><strong>③ 合計：</strong>$G_0=2+2=4$です。"
        },
        {
            id: "rl-discount-factor",
            category: "割引率",
            question: "割引率$\\gamma$を0に近づけると、一般にどの報酬を重視するか。",
            options: ["目先の報酬", "遠い未来の報酬だけ", "報酬を一切使わない", "負の報酬だけ"],
            answer: 0,
            explanation: "<strong>①</strong> 遠い報酬にはγやγ²が掛かります。<br><strong>②</strong> γが小さいと遠い報酬はほぼ0になります。<br><strong>③</strong> そのため目先を重視します。"
        },
        {
            id: "rl-action-value",
            category: "行動価値関数",
            question: "最適行動価値$Q^*(s,a)$が表すものはどれか。",
            options: ["状態sで行動aを選び、その後最適に行動したときの期待Return", "状態sにいる確率", "行動aを選ぶ確率", "直後の報酬だけ"],
            answer: 0,
            explanation: "<strong>①</strong> 状態sと行動aの組を評価します。<br><strong>②</strong> 直後だけでなく、その後の報酬も含めます。<br><strong>③</strong> 大きいQ値の行動ほど将来の得が大きい見込みです。"
        },
        {
            id: "rl-td-bootstrap",
            category: "TD学習",
            question: "TD（Temporal-Difference）学習の特徴はどれか。",
            options: ["1段先の推定値を使い、エピソード終了前に更新できる", "必ず終了まで待って実測Returnだけを使う", "報酬を使わない", "ニューラルネットを使えない"],
            answer: 0,
            explanation: "<strong>①</strong> TD目標は即時報酬と次状態の推定値から作ります。<br><strong>②</strong> 最後の結果を待つ必要がありません。<br><strong>③</strong> 推定値で別の推定値を更新することをbootstrapと呼びます。"
        },
        {
            id: "rl-td-vs-mc",
            category: "TDとMonte Carlo",
            question: "TD学習とMonte Carlo法の違いとして正しいものはどれか。",
            options: ["TDは次状態の推定値を使い、Monte Carloは原則としてエピソード終了後の実測Returnを使う", "TDだけが報酬を使う", "Monte Carloだけが方策を持つ", "両者は常に同じ更新時刻"],
            answer: 0,
            explanation: "<strong>① TD：</strong>1段先の価値を使って途中で更新します。<br><strong>② Monte Carlo：</strong>最後まで得た報酬を集計します。<br><strong>③</strong> 違いはbootstrapを使うかです。"
        },
        {
            id: "rl-td-error-calc",
            category: "TD誤差（計算）",
            kind: "計算",
            question: "$V(s)=3,r=1,\\gamma=0.5,V(s')=4$のとき、$\\delta=r+\\gamma V(s')-V(s)$はいくつか。",
            options: ["0", "3", "-1", "2"],
            answer: 0,
            explanation: "<strong>使う公式（TD誤差）：</strong><br>$\\delta=\\{r+\\gamma V(s')\\}-V(s)$<br><br><strong>① TD目標：</strong>$y=1+0.5\\times4=3$。<br><strong>② 現在の予測：</strong>$V(s)=3$。<br><strong>③ 誤差：</strong>$\\delta=3-3=0$です。"
        },
        {
            id: "rl-q-learning-target",
            category: "Q学習",
            question: "Q学習のTD目標として正しいものはどれか。",
            options: ["$r+\\gamma\\max_{a'}Q(s',a')$", "$r-\\gamma\\max_{a'}Q(s',a')$", "$Q(s,a)$だけ", "$\\pi(a|s)$だけ"],
            answer: 0,
            explanation: "<strong>使う公式（Q学習のTD目標）：</strong><br>$y=r+\\gamma\\max_{a'}Q(s',a')$<br><br><strong>①</strong> 直後の報酬rを使います。<br><strong>②</strong> 次状態で最も大きいQ値を選び、γを掛けます。<br><strong>③</strong> 両者を足した値が現在のQの目標です。"
        },
        {
            id: "rl-q-update",
            category: "Q学習（計算）",
            kind: "計算",
            question: "$Q=2,r=1,\\gamma=0.9,\\max Q(s',a')=4,\\alpha=0.5$のQ学習更新後はどれか。",
            options: ["3.3", "4.6", "2.6", "5"],
            answer: 0,
            explanation: "<strong>使う公式（Q学習の更新式）：</strong><br>$y=r+\\gamma\\max_{a'}Q(s',a')$<br>$Q_{new}=Q+\\alpha(y-Q)$<br><br><strong>① 目標：</strong>$y=1+0.9\\times4=4.6$。<br><strong>② 誤差：</strong>$4.6-2=2.6$。<br><strong>③ 更新：</strong>$Q_{new}=2+0.5\\times2.6=3.3$です。"
        },
        {
            id: "rl-q-off-policy",
            category: "Off-policy",
            question: "Q学習・DQNがOff-policyと呼ばれる主な理由はどれか。",
            options: ["行動を集めた方策と異なる最良行動のQ値を目標に使える", "現在の方策のデータしか使えない", "行動を一切選ばない", "方策の更新を禁止する"],
            answer: 0,
            explanation: "<strong>①</strong> 経験を集めるときは探索を含む方策を使えます。<br><strong>②</strong> 学習目標では次状態の最大Q値を使います。<br><strong>③</strong> 行動方策と学習対象方策が異なるためOff-policyです。"
        },
        {
            id: "rl-epsilon-greedy",
            category: "探索と活用",
            question: "ε-greedy法の動作として正しいものはどれか。",
            options: ["確率εでランダム行動し、それ以外は最大Q値の行動を選ぶ", "常にランダム行動する", "常に最小Q値を選ぶ", "報酬をε倍する"],
            answer: 0,
            explanation: "<strong>① 探索：</strong>確率εで未知の行動を試します。<br><strong>② 活用：</strong>それ以外は現在最良の行動を選びます。<br><strong>③</strong> 両者のバランスを取る手法です。"
        },
        {
            id: "rl-epsilon-calc",
            category: "ε-greedy（計算）",
            kind: "計算",
            question: "行動が4個、$\\epsilon=0.2$。探索時は4行動から一様に選ぶ。greedy行動が選ばれる総確率はどれか。",
            options: ["0.85", "0.80", "0.20", "0.25"],
            answer: 0,
            explanation: "<strong>使う公式（ε-greedyでgreedy行動を選ぶ確率）：</strong><br>$P(\\text{greedy})=(1-\\epsilon)+\\frac{\\epsilon}{n}$<br>nは行動数です。<br><br><strong>① 活用：</strong>$1-0.2=0.8$。<br><strong>② 探索中に同じ行動：</strong>$0.2\\times\\frac14=0.05$。<br><strong>③ 合計：</strong>$0.8+0.05=0.85$です。"
        },
        {
            id: "rl-dqn-expansion",
            category: "DQN",
            question: "DQNの正式名称はどれか。",
            options: ["Deep Q-Network", "Dynamic Query Network", "Deep Quality Normalization", "Distributed Q-Node"],
            answer: 0,
            explanation: "<strong>① Q：</strong>行動価値Q(s,a)です。<br><strong>② Network：</strong>ニューラルネットワークで近似します。<br><strong>③</strong> したがってDeep Q-Networkです。"
        },
        {
            id: "rl-dqn-output",
            category: "DQNの出力",
            question: "離散行動が「左・右・待つ」の3個あるDQNで、代表的な出力はどれか。",
            options: ["3行動それぞれのQ値", "報酬1個だけ", "次の画像だけ", "方策確率を必ず1個だけ"],
            answer: 0,
            explanation: "<strong>① 入力：</strong>現在の状態sです。<br><strong>② 出力：</strong>各離散行動のQ値を並べます。<br><strong>③</strong> 通常は最大Q値の行動を選びます。"
        },
        {
            id: "rl-dqn-stabilizers",
            category: "DQNの安定化",
            question: "DQNを安定させる代表的な2つの仕組みはどれか。",
            options: ["Experience ReplayとTarget Network", "DropoutとLayer Normalization", "Self-AttentionとPositional Encoding", "PoolingとUpsampling"],
            answer: 0,
            explanation: "<strong>① Replay：</strong>経験の順番を混ぜて再利用します。<br><strong>② Target：</strong>TD目標を作るネットワークを一時固定します。<br><strong>③</strong> 相関と動く目標の不安定さを抑えます。"
        },
        {
            id: "rl-replay-transition",
            category: "Experience Replay",
            question: "Replay Bufferへ保存する代表的な1遷移はどれか。",
            options: ["$(s,a,r,s',done)$", "$(画像,正解ラベル)$だけ", "$(\\mu,\\sigma)$", "$(Q,K,V)$"],
            answer: 0,
            explanation: "<strong>①</strong> 行動前の状態sと行動aを保存します。<br><strong>②</strong> 結果の報酬r、次状態s'、終端かdoneも保存します。<br><strong>③</strong> この一組をtransitionと呼びます。"
        },
        {
            id: "rl-experience",
            category: "Experience Replay",
            question: "Replay Bufferから経験をランダム抽出する主な理由はどれか。",
            options: ["連続時刻データの相関を弱め、経験を再利用するため", "経験を完全なi.i.d.（独立同分布）に保証するため", "報酬を削除するため", "Target Networkを不要にするため"],
            answer: 0,
            explanation: "<strong>①</strong> 隣り合う時刻のデータは似ています。<br><strong>②</strong> Bufferから順番を混ぜて抽出します。<br><strong>③</strong> 相関を弱め、同じ経験も再利用できます。厳密なIIDを保証するわけではありません。"
        },
        {
            id: "rl-target-net",
            category: "Target Network",
            question: "DQNのTarget Networkの役割はどれか。",
            options: ["TD目標を計算するため、重みをしばらく固定する", "真の正解ラベルを作る", "行動数を減らす", "Replay Bufferを削除する"],
            answer: 0,
            explanation: "<strong>①</strong> Online Networkが予測を更新します。<br><strong>②</strong> Target Networkはその遅れたコピーです。<br><strong>③</strong> 目標が毎回大きく動く問題を緩和します。"
        },
        {
            id: "rl-dqn-target-calc",
            category: "DQN TD目標（計算）",
            kind: "計算",
            question: "次状態$s'$は非終端とする。$r=1,\\gamma=0.9,\\max Q_{target}(s',a')=4$のとき、DQNのTD目標yはいくつか。",
            options: ["4.6", "3.6", "5.0", "1.9"],
            answer: 0,
            explanation: "<strong>使う公式（DQNの非終端時TD目標）：</strong><br>$y=r+\\gamma\\max_{a'}Q_{target}(s',a')$<br><br><strong>① 未来側：</strong>$0.9\\times4=3.6$。<br><strong>② 即時報酬：</strong>$1$。<br><strong>③ 合計：</strong>$y=1+3.6=4.6$です。"
        },
        {
            id: "rl-dqn-terminal",
            category: "DQNの終端状態",
            kind: "計算",
            question: "終端状態へ到達し、報酬$r=2$を得た。DQNのTD目標yはどれか。",
            options: ["2", "$2+\\gamma\\max Q_{target}$", "0", "$\\gamma$"],
            answer: 0,
            explanation: "<strong>使う公式（DQNの終端時TD目標）：</strong><br>非終端なら $y=r+\\gamma\\max_{a'}Q_{target}(s',a')$、終端なら $y=r$<br><br><strong>①</strong> 終端後に次の行動はありません。<br><strong>②</strong> 未来価値のbootstrap項は0です。<br><strong>③</strong> したがってTD目標は報酬そのものの$y=r=2$です。"
        },
        {
            id: "rl-dqn-loss-calc",
            category: "DQN損失（計算）",
            kind: "計算",
            question: "TD目標$y=5$、Online Networkの予測$Q(s,a)=3$。二乗誤差$(y-Q)^2$はいくつか。",
            options: ["4", "2", "8", "16"],
            answer: 0,
            explanation: "<strong>使う公式（DQNの二乗誤差）：</strong><br>$L=\\{y-Q_{online}(s,a)\\}^2$<br><br><strong>① 差：</strong>$5-3=2$。<br><strong>② 二乗：</strong>$2^2=4$。<br><strong>③</strong> この損失を小さくするようOnline Networkを更新します。"
        },
        {
            id: "rl-dqn-action-space",
            category: "DQNの適用範囲",
            question: "標準的なDQNが特に扱いやすい行動空間はどれか。",
            options: ["左・右・ジャンプのような有限個の離散行動", "任意次元の連続行動だけ", "行動が存在しない環境", "報酬が必ず0の環境"],
            answer: 0,
            explanation: "<strong>①</strong> DQNは各行動のQ値を出力します。<br><strong>②</strong> 有限個なら出力を1個ずつ用意できます。<br><strong>③</strong> 無数にある連続行動は標準DQNでは扱いにくいです。"
        },
        {
            id: "rl-actor-critic-roles",
            category: "Actor-Critic",
            question: "Actor-Criticの役割分担として正しいものはどれか。",
            options: ["Actorは方策を学び、Criticは主に価値を推定する", "Actorは価値だけ、Criticは行動だけを出す", "両方ともReplay Bufferである", "両方とも報酬を生成する"],
            answer: 0,
            explanation: "<strong>① Actor：</strong>どの行動を選ぶかを学びます。<br><strong>② Critic：</strong>状態価値などを予測します。<br><strong>③</strong> Criticの評価を使ってActorを改善します。"
        },
        {
            id: "rl-policy-gradient-purpose",
            category: "方策勾配法",
            question: "方策勾配法（Policy Gradient）が直接更新するものはどれか。",
            options: ["行動を選ぶ確率を表す方策$\\pi_\\theta(a|s)$", "Replay Bufferの容量", "環境の状態数", "Target Networkのコピー周期だけ"],
            answer: 0,
            explanation: "<strong>①</strong> 方策は状態から行動確率を出します。<br><strong>②</strong> 得られた報酬やAdvantageを使います。<br><strong>③</strong> 良かった行動を選びやすいよう方策パラメータθを更新します。"
        },
        {
            id: "rl-policy-gradient-sign",
            category: "方策勾配法",
            question: "選んだ行動のAdvantageが正のとき、方策勾配は一般にどう更新するか。",
            options: ["その行動を選ぶ確率を上げる", "その行動を必ず禁止する", "Criticを削除する", "報酬を0にする"],
            answer: 0,
            explanation: "<strong>①</strong> Advantageが正なら予想より良い結果です。<br><strong>②</strong> 良かった行動を再び選びやすくします。<br><strong>③</strong> 負なら反対に確率を下げます。"
        },
        {
            id: "rl-advantage-definition",
            category: "Advantage",
            question: "Advantage $A(s,a)$の代表的な定義はどれか。",
            options: ["$Q(s,a)-V(s)$", "$Q(s,a)+V(s)$", "$V(s)-Q(s,a)$", "$Q(s,a)\\times V(s)$"],
            answer: 0,
            explanation: "<strong>使う公式（Advantageの定義）：</strong><br>$A(s,a)=Q(s,a)-V(s)$<br><br><strong>① Q：</strong>その行動を選んだ価値です。<br><strong>② V：</strong>その状態での平均的な価値です。<br><strong>③</strong> 差$Q-V$で、その行動が平均より良いかを表します。"
        },
        {
            id: "rl-advantage-calc",
            category: "Advantage（計算）",
            kind: "計算",
            question: "$r=1,\\gamma=0.9,V(s')=4,V(s)=3$。$A\\approx r+\\gamma V(s')-V(s)$はいくつか。",
            options: ["1.6", "0.6", "2.6", "4.6"],
            answer: 0,
            explanation: "<strong>使う公式（1-step Advantageの近似）：</strong><br>$A_t\\approx r+\\gamma V(s')-V(s)$<br><br><strong>① 実際側：</strong>$1+0.9\\times4=4.6$。<br><strong>② Criticの予想：</strong>$V(s)=3$。<br><strong>③ 差：</strong>$A\\approx4.6-3=1.6$です。"
        },
        {
            id: "rl-a3c-expansion",
            category: "A3C",
            question: "A3Cの正式名称はどれか。",
            options: ["Asynchronous Advantage Actor-Critic", "Automatic Action-Analysis Control", "Asymmetric Agent-Critic Cycle", "Adaptive Advantage Action Classifier"],
            answer: 0,
            explanation: "<strong>① Asynchronous：</strong>複数workerが非同期に更新します。<br><strong>② Advantage：</strong>行動が平均より良かった度合いです。<br><strong>③ Actor-Critic：</strong>方策と価値を組み合わせます。"
        },
        {
            id: "rl-a3c",
            category: "A3Cの非同期処理",
            question: "A3CのAsynchronous（非同期）が指すものはどれか。",
            options: ["複数workerが別々の環境を動かし、共有モデルへ非同期に更新を送る", "1つの環境を完全に逐次処理する", "Replay Bufferだけを同期する", "行動を固定する"],
            answer: 0,
            explanation: "<strong>①</strong> 各workerは別々の環境で経験を集めます。<br><strong>②</strong> 計算した勾配を共有モデルへ送ります。<br><strong>③</strong> 更新時刻が揃わないためAsynchronousです。"
        },
        {
            id: "rl-a3c-no-replay",
            category: "A3Cの経験",
            question: "基本的なA3CとExperience Replayの関係として正しいものはどれか。",
            options: ["複数workerで経験を分散させ、通常はReplay Bufferを使わない", "DQNと同じ大規模Replay Bufferが必須", "経験を一切使わない", "Target NetworkだけをReplayする"],
            answer: 0,
            explanation: "<strong>①</strong> A3Cは現在の方策で経験を集めます。<br><strong>②</strong> 複数workerの異なる経験が相関を弱めます。<br><strong>③</strong> 基本構成ではReplay Bufferを使いません。"
        },
        {
            id: "rl-a3c-on-policy",
            category: "A3Cの方策",
            question: "基本的なA3CがOn-policyであることの説明はどれか。",
            options: ["現在の方策で集めた経験を使って、その方策を更新する", "過去の任意方策データだけを使う", "方策を持たない", "最大Q値だけを必ず使う"],
            answer: 0,
            explanation: "<strong>①</strong> workerは現在のActor方策で行動します。<br><strong>②</strong> その経験から勾配を計算します。<br><strong>③</strong> 行動した方策と更新する方策が対応するためOn-policyです。"
        },
        {
            id: "rl-a3c-nstep-calc",
            category: "A3C n-step return（計算）",
            kind: "計算",
            question: "$r_1=1,r_2=2,\\gamma=0.5,V(s_2)=4$。2-step目標$R=1+\\gamma\\times2+\\gamma^2V(s_2)$はいくつか。",
            options: ["3", "2", "4", "5"],
            answer: 0,
            explanation: "<strong>使う公式（2-step return）：</strong><br>$R_0^{(2)}=r_1+\\gamma r_2+\\gamma^2V(s_2)$<br><br><strong>① 2個の報酬：</strong>$1+0.5\\times2=2$。<br><strong>② bootstrap（2ステップ後から先の残り価値）：</strong>$0.5^2\\times4=1$。<br><strong>③ 合計：</strong>$R=2+1=3$です。"
        },
        {
            id: "rl-a3c-entropy",
            category: "A3Cの探索",
            question: "A3Cの最大化する目的関数へEntropy bonus（エントロピーボーナス）を加える主な目的は何か。",
            options: ["方策が早く1行動へ偏りすぎるのを抑え、探索を保つ", "報酬を必ず最大値にする", "Criticを削除する", "全行動を同じ価値に固定する"],
            answer: 0,
            explanation: "<strong>①</strong> 方策が早く1つへ偏ると探索が止まります。<br><strong>②</strong> エントロピーは行動確率のばらつきを表します。<br><strong>③</strong> 最大化目的には$+\\beta H$を加えます。最小化する損失で書くなら$-\\beta H$です。"
        },
        {
            id: "rl-exam-dqn-a3c-flow-identification",
            category: "強化学習モデル構造図の識別",
            difficulty: "本試験型",
            kind: "図表・長文",
            question: `<p>次のX・Yは深層強化学習モデルの学習フローを簡略化した図である。モデル名の対応として正しいものはどれか。</p>
                <div class="rlx-visual-wrap"><div class="rlx-visual-card"><svg class="rlx-wide-svg" viewBox="0 0 960 190" role="img" aria-label="単一Network系Xと複数worker系Yの学習フロー比較">
                    <rect x="18" y="18" width="924" height="66" class="rlx-blue"/><text x="34" y="42" class="rlx-svg-label">X　状態 s → Online Network → 各離散行動のQ(s,a)</text><text x="34" y="67" class="rlx-svg-note">経験 → Replay Buffer　／　Target Network → TD目標</text>
                    <rect x="18" y="104" width="924" height="66" class="rlx-purple"/><text x="34" y="128" class="rlx-svg-label">Y　環境1→Worker1 ┐　環境2→Worker2 ├→ 共有Actor-Criticを非同期更新</text><text x="34" y="153" class="rlx-svg-note">各workerがActor（方策）とCritic（価値）を使い、現在の方策で経験を集める</text>
                </svg></div></div>`,
            options: ["X＝DQN、Y＝A3C", "X＝A3C、Y＝DQN", "XもYもDQN", "XもYもA3C"],
            answer: 0,
            explanation: "<p><strong>① 図で見る場所：</strong>Q値の出力、Replay Buffer、Target Network、複数workerを探します。</p><p><strong>② 矢印を追う：</strong>Xは1つのOnline Q Networkを学習し、ReplayとTargetで安定化します。Yは各workerの勾配が共有Actor-Criticへ集まります。</p><p><strong>③ 答え：</strong>X＝DQN（Deep Q-Network）、Y＝A3C（Asynchronous Advantage Actor-Critic）です。</p><p><strong>④ 他との違い：</strong>DQNは各離散行動のQ値を出すOff-policy法、基本的なA3CはReplayを使わないOn-policyのActor-Critic法です。</p>"
        },
        {
            id: "rl-dqn-vs-a3c",
            category: "DQNとA3C",
            question: "DQNとA3Cの組合せとして正しいものはどれか。",
            options: ["DQN＝Q値・Off-policy・Replay、A3C＝Actor-Critic・On-policy・非同期worker", "DQN＝方策勾配だけ、A3C＝Q表だけ", "両方ともReplay必須", "両方ともTarget Network必須"],
            answer: 0,
            explanation: "<strong>① DQN：</strong>行動価値を学び、過去経験を再利用します。<br><strong>② A3C：</strong>方策と価値を学び、複数workerを使います。<br><strong>③</strong> この対比を表ごと覚えます。"
        }
    ]
};
