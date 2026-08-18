window.quizData = {
    title: "4-（６）生成モデル",

    cheatSheet: `
        <style>
            .gm-core { background:#eef8f8; border-left:5px solid #35b9c5; border-radius:0 10px 10px 0; padding:14px 18px; margin:12px 0 22px; }
            .gm-note { background:#fff8e8; border-left:5px solid #f39c12; border-radius:0 10px 10px 0; padding:12px 16px; margin:12px 0 22px; }
            .gm-formula { background:#f7f9fc; border:1px solid #d9e2ec; border-radius:8px; padding:11px 14px; margin:10px 0; overflow-x:auto; }
            .gm-visual-wrap { overflow-x:auto; margin:14px 0 22px; }
            .gm-visual-card { min-width:990px; border:1px solid #d9e2ec; border-radius:12px; background:#fff; padding:12px; }
            .gm-wide-svg { display:block; width:100%; min-width:960px; height:auto; }
            .gm-svg-title { font-size:16px; font-weight:700; fill:#102a43; }
            .gm-svg-label { font-size:13px; font-weight:700; fill:#102a43; }
            .gm-svg-note { font-size:12px; fill:#334e68; }
            .gm-svg-mini { font-size:11px; fill:#486581; }
            .gm-svg-box { fill:#fff; stroke:#cbd5e1; stroke-width:1.5; rx:10; }
            .gm-svg-blue { fill:#eef7fb; stroke:#2780b8; stroke-width:1.5; rx:10; }
            .gm-svg-red { fill:#fff1f1; stroke:#d64545; stroke-width:1.5; rx:10; }
            .gm-svg-purple { fill:#f7f0ff; stroke:#8e44ad; stroke-width:1.5; rx:10; }
            .gm-svg-green { fill:#eafaf1; stroke:#27ae60; stroke-width:1.5; rx:10; }
            .gm-svg-orange { fill:#fff8e7; stroke:#f39c12; stroke-width:1.5; rx:10; }
            .gm-caption { margin:8px 8px 0; color:#334e68; }
            .gm-table-wrap { overflow-x:auto; margin:12px 0 22px; }
            .gm-table { width:100%; min-width:760px; border-collapse:collapse; }
            .gm-table th { background:#eaf2fb; color:#102a43; text-align:left; padding:10px; border:1px solid #d9e2ec; }
            .gm-table td { padding:10px; border:1px solid #d9e2ec; vertical-align:top; }
            .gm-steps { margin:8px 0 0; padding-left:1.5em; }
            .gm-steps li { margin:5px 0; }
            .gm-details { margin:12px 0 22px; border:1px solid #d9e2ec; border-radius:8px; background:#fafcff; }
            .gm-details summary { cursor:pointer; padding:12px 14px; font-weight:700; color:#102a43; }
            .gm-details > div { padding:0 14px 14px; }
            .gm-word { display:inline-block; background:#eaf2fb; border-radius:5px; padding:1px 6px; margin:2px 1px; }
        </style>

        <h3>■ まずこれだけ：5つの作り方</h3>
        <div class="gm-core">
            <strong>識別モデル</strong>は、写真を見て「犬か猫か」を<strong>当てる</strong>モデルです。<br>
            <strong>生成モデル</strong>は、たくさんの例をまねて、新しい画像や文章を<strong>作る</strong>モデルです。
        </div>
        <div class="gm-note">
            <strong>VAE</strong>＝Variational Autoencoder（変分オートエンコーダ）／
            <strong>GAN</strong>＝Generative Adversarial Network（敵対的生成ネットワーク）
        </div>

        <div class="gm-visual-wrap">
            <div class="gm-visual-card">
                <svg class="gm-wide-svg" viewBox="0 0 960 300" role="img" aria-labelledby="gm-map-title gm-map-desc">
                    <title id="gm-map-title">生成モデル5種類のやさしい比較</title>
                    <desc id="gm-map-desc">自己回帰、VAE、GAN、拡散モデル、Flowを日常語で比較する。</desc>
                    <text x="20" y="28" class="gm-svg-title">まずは「どう作るか」だけ覚える</text>

                    <rect x="20" y="48" width="280" height="62" class="gm-svg-purple"></rect>
                    <text x="38" y="74" class="gm-svg-label">識別モデル</text>
                    <text x="38" y="96" class="gm-svg-note">入力を見て、答えを当てる</text>
                    <rect x="320" y="48" width="620" height="62" class="gm-svg-green"></rect>
                    <text x="338" y="74" class="gm-svg-label">生成モデル</text>
                    <text x="338" y="96" class="gm-svg-note">学習データの特徴を覚え、新しいデータを作る</text>

                    <rect x="20" y="130" width="172" height="142" class="gm-svg-purple"></rect>
                    <text x="36" y="158" class="gm-svg-label">自己回帰</text>
                    <text x="36" y="193" class="gm-svg-note">前までを見て</text>
                    <text x="36" y="218" class="gm-svg-note">次を1つずつ作る</text>

                    <rect x="207" y="130" width="172" height="142" class="gm-svg-blue"></rect>
                    <text x="223" y="158" class="gm-svg-label">VAE</text>
                    <text x="223" y="193" class="gm-svg-note">中心と広がりへ圧縮</text>
                    <text x="223" y="218" class="gm-svg-note">そこから戻して作る</text>

                    <rect x="394" y="130" width="172" height="142" class="gm-svg-red"></rect>
                    <text x="410" y="158" class="gm-svg-label">GAN</text>
                    <text x="410" y="193" class="gm-svg-note">作るGと</text>
                    <text x="410" y="218" class="gm-svg-note">見破るDが競う</text>

                    <rect x="581" y="130" width="172" height="142" class="gm-svg-green"></rect>
                    <text x="597" y="158" class="gm-svg-label">拡散モデル</text>
                    <text x="597" y="193" class="gm-svg-note">ノイズで壊し</text>
                    <text x="597" y="218" class="gm-svg-note">少しずつ戻す</text>

                    <rect x="768" y="130" width="172" height="142" class="gm-svg-orange"></rect>
                    <text x="784" y="158" class="gm-svg-label">Flow</text>
                    <text x="784" y="193" class="gm-svg-note">元へ戻せる変換で</text>
                    <text x="784" y="218" class="gm-svg-note">行き来する</text>
                </svg>
                <p class="gm-caption"><strong>一言暗記：</strong>順番に書く／圧縮して戻す／作る人と見破る人／汚して戻す／往復できる変換。</p>
            </div>
        </div>

        <h3>■ モデル図は「分岐・反復・往復」を先に探す</h3>
        <div class="gm-core"><strong>試験の4手：</strong>①左端がデータか乱数かを見る → ②途中で2本に分岐するか、同じ処理を反復するかを見る → ③矢印が一方向か往復かを見る → ④最後が復元・判定・次の要素のどれかを見る。</div>
        <div class="gm-visual-wrap"><div class="gm-visual-card">
            <svg class="gm-wide-svg" viewBox="0 0 960 355" role="img" aria-labelledby="gm-read-title gm-read-desc">
                <title id="gm-read-title">生成モデル5種類を矢印から識別する</title>
                <desc id="gm-read-desc">VAEは中心と広がりから潜在変数を選び、GANはGeneratorとDiscriminatorが対戦し、拡散モデルはノイズ付加と反復除去を行い、Flowは可逆変換で往復し、自己回帰は前の出力を次へ戻す。</desc>
                <defs><marker id="gm-arrow-read" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#627d98"/></marker></defs>
                <text x="18" y="26" class="gm-svg-title">図の形そのものがモデル名の合図</text>

                <g transform="translate(18 45)"><rect width="924" height="50" class="gm-svg-blue"/><text x="14" y="30" class="gm-svg-label">VAE　x → Encoder →［μ, σ］→ z → Decoder → x̂　（途中で分布の2値を出す）</text></g>
                <g transform="translate(18 105)"><rect width="924" height="50" class="gm-svg-red"/><text x="14" y="22" class="gm-svg-label">GAN　乱数 z → Generator(G) → fake ┐</text><text x="343" y="38" class="gm-svg-note">real ────────────────────┴→ Discriminator(D) → 本物／偽物</text></g>
                <g transform="translate(18 165)"><rect width="924" height="50" class="gm-svg-green"/><text x="14" y="30" class="gm-svg-label">Diffusion　x₀ ── ノイズを加える ─→ xₜ　／　xₜ ── denoiseを反復 ─→ x₀</text></g>
                <g transform="translate(18 225)"><rect width="924" height="50" class="gm-svg-orange"/><text x="14" y="30" class="gm-svg-label">Flow　データ x ⇄ 可逆変換 f, f⁻¹ ⇄ 単純な潜在変数 z　（同じ道を戻れる）</text></g>
                <g transform="translate(18 285)"><rect width="924" height="50" class="gm-svg-purple"/><text x="14" y="30" class="gm-svg-label">Autoregressive　x₁ → x₂ → x₃ → …　（生成した出力を次の条件へ戻す）</text></g>
            </svg>
        </div></div>
        <div class="gm-table-wrap"><table class="gm-table">
            <tr><th>図の決め手</th><th>モデル</th><th>他との違い</th></tr>
            <tr><td>Encoderがμ・σを出し、zを選んでDecoderへ</td><td><strong>VAE</strong></td><td>1点の圧縮値だけでなく潜在分布を学ぶ。</td></tr>
            <tr><td>乱数から作るGと、本物・偽物を見るDが分岐</td><td><strong>GAN</strong></td><td>Encoderで入力を復元する図ではない。</td></tr>
            <tr><td>Forwardでnoise付加、Reverseでdenoiseを何段も反復</td><td><strong>Diffusion</strong></td><td>1回の可逆関数で厳密に戻すFlowとは違う。</td></tr>
            <tr><td>両向き矢印・可逆変換・ヤコビアン</td><td><strong>Flow</strong></td><td>データと潜在変数を同じ変換経路で往復する。</td></tr>
            <tr><td>直前までの出力を次の予測へ戻すloop</td><td><strong>Autoregressive</strong></td><td>系列を原則1要素ずつ生成する。</td></tr>
        </table></div>
        <div class="gm-note"><strong>正式名称：</strong>Diffusion Model（拡散モデル）／Normalizing Flow（正規化フロー）／Autoregressive Model（自己回帰モデル）。</div>

        <details class="gm-details">
            <summary>試験で出る確率の書き方を見る</summary>
            <div>識別モデルは主に <strong>p(y|x)</strong>、生成モデルは <strong>p(x)</strong>・<strong>p(x,y)</strong>・条件付き生成の <strong>p(x|c)</strong> を扱う、と表します。</div>
        </details>

        <h3>■ AE・DAE・VAE：圧縮メモの違い</h3>
        <div class="gm-table-wrap">
            <table class="gm-table">
                <tr><th>方式</th><th>やっていること</th><th>一言イメージ</th></tr>
                <tr>
                    <td><strong>AE<br>Autoencoder</strong></td>
                    <td>元データ → 圧縮メモ z → 元へ戻す</td>
                    <td>大事な特徴だけをメモする</td>
                </tr>
                <tr>
                    <td><strong>DAE<br>Denoising Autoencoder</strong></td>
                    <td>わざと汚したデータ → きれいな元データ</td>
                    <td>汚れを落とす練習をする</td>
                </tr>
                <tr>
                    <td><strong>VAE<br>Variational Autoencoder</strong></td>
                    <td>元データ → 中心 μ と広がり σ → 元へ戻す</td>
                    <td>幅をもった設計図から新しい例を作る</td>
                </tr>
            </table>
        </div>

        <div class="gm-note">
            <span class="gm-word"><strong>z</strong>＝圧縮した設計図（潜在変数）</span>
            <span class="gm-word"><strong>Encoder</strong>＝圧縮する側</span>
            <span class="gm-word"><strong>Decoder</strong>＝元へ戻す側</span>
            <span class="gm-word"><strong>prior</strong>＝生成を始める基準分布（事前分布）</span>
        </div>

        <h3>■ VAE：中心と広がりから設計図 z を選ぶ</h3>
        <div class="gm-core">
            <ol class="gm-steps">
                <li>Encoderが、設計図の<strong>中心 μ</strong>と<strong>広がり σ</strong>を出す。</li>
                <li>乱数 ε を使い、<strong>z = μ + σε</strong> で設計図を1つ選ぶ。</li>
                <li>Decoderが z から元データに似たものを作る。</li>
            </ol>
        </div>

        <div class="gm-visual-wrap">
            <div class="gm-visual-card">
                <svg class="gm-wide-svg" viewBox="0 0 960 385" role="img" aria-labelledby="gm-vae-title gm-vae-desc">
                    <title id="gm-vae-title">VAEを3手順で理解する図</title>
                    <desc id="gm-vae-desc">Encoderが中心と広がりを出し、乱数で潜在変数を選び、Decoderで復元する。損失は再構成と分布の整形の2つ。</desc>
                    <defs><marker id="gm-arrow-vae-simple" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#486581"></path></marker></defs>
                    <text x="20" y="28" class="gm-svg-title">VAE：圧縮 → zを選ぶ → 復元</text>
                    <rect x="20" y="48" width="920" height="238" class="gm-svg-blue"></rect>
                    <text x="38" y="76" class="gm-svg-label">学習時</text>

                    <rect x="42" y="108" width="84" height="48" class="gm-svg-box"></rect>
                    <text x="65" y="137" class="gm-svg-note">入力 x</text>
                    <line x1="132" y1="132" x2="170" y2="132" stroke="#486581" stroke-width="2" marker-end="url(#gm-arrow-vae-simple)"></line>

                    <rect x="182" y="100" width="130" height="64" class="gm-svg-box"></rect>
                    <text x="202" y="125" class="gm-svg-label">圧縮する</text>
                    <text x="202" y="148" class="gm-svg-mini">Encoder</text>
                    <line x1="318" y1="132" x2="356" y2="132" stroke="#486581" stroke-width="2" marker-end="url(#gm-arrow-vae-simple)"></line>

                    <rect x="368" y="96" width="154" height="72" class="gm-svg-box"></rect>
                    <text x="389" y="121" class="gm-svg-note">中心 μ</text>
                    <text x="389" y="146" class="gm-svg-note">広がり σ</text>
                    <line x1="528" y1="132" x2="566" y2="132" stroke="#486581" stroke-width="2" marker-end="url(#gm-arrow-vae-simple)"></line>

                    <rect x="578" y="96" width="150" height="72" class="gm-svg-purple"></rect>
                    <text x="596" y="120" class="gm-svg-note">z = μ + σ×ε</text>
                    <text x="596" y="145" class="gm-svg-mini">乱数 ε でzを選ぶ</text>
                    <line x1="734" y1="132" x2="772" y2="132" stroke="#486581" stroke-width="2" marker-end="url(#gm-arrow-vae-simple)"></line>

                    <rect x="784" y="100" width="130" height="64" class="gm-svg-box"></rect>
                    <text x="804" y="125" class="gm-svg-label">復元する</text>
                    <text x="804" y="148" class="gm-svg-mini">Decoder → x̂</text>

                    <rect x="92" y="205" width="330" height="56" class="gm-svg-box"></rect>
                    <text x="112" y="229" class="gm-svg-label">① 元のxに近づける</text>
                    <text x="112" y="250" class="gm-svg-mini">再構成損失</text>
                    <rect x="520" y="205" width="330" height="56" class="gm-svg-box"></rect>
                    <text x="540" y="229" class="gm-svg-label">② 分布を基準へ近づける</text>
                    <text x="540" y="250" class="gm-svg-mini">KL項</text>

                    <rect x="20" y="307" width="920" height="56" class="gm-svg-green"></rect>
                    <text x="38" y="341" class="gm-svg-label">生成時：</text>
                    <text x="118" y="341" class="gm-svg-note">基準分布から z を選ぶ → Decoder → 新しいデータ</text>
                    <text x="610" y="341" class="gm-svg-note">※Encoderは使わない</text>
                </svg>
                <p class="gm-caption"><strong>再パラメータ化：</strong>乱数部分を ε として別に置くと、μ・σを学習できる計算の形になります。</p>
            </div>
        </div>

        <div class="gm-core">
            <strong>VAEの学習でやりたいこと</strong><br>
            ① 元データへ上手に戻す　＋　② 設計図 z の分布を基準の形へそろえる
            <div class="gm-formula"><strong>学習損失（−ELBO）</strong> ＝ 再構成損失 ＋ 分布のずれ（KL項）</div>
            <strong>KL</strong>＝Kullback–Leibler divergence（KLダイバージェンス：分布のずれ）／
            <strong>ELBO</strong>＝Evidence Lower Bound（変分下限）
        </div>

        <details class="gm-details">
            <summary>試験用の正式なVAEの式を見る</summary>
            <div>
                <div class="gm-formula"><strong>ELBO（変分下限）</strong> ＝ E<sub>q</sub>[log p<sub>θ</sub>(x|z)] − KL(q<sub>φ</sub>(z|x) || p(z))</div>
                <p>ELBOは<strong>最大化</strong>します。同じことを「−ELBO＝再構成損失＋KL項を<strong>最小化</strong>」とも表します。</p>
                <p>実装ではEncoderが μ と log σ² を出し、σ を求めて z=μ+σε とします。</p>
            </div>
        </details>

        <h3>■ GAN：偽造者Gと鑑定者Dが競う</h3>
        <div class="gm-core">
            <strong>GAN（Generative Adversarial Network／敵対的生成ネットワーク）</strong>では、次の2者が競います。
            <ol class="gm-steps">
                <li><strong>G（生成器）</strong>が偽物を作る。</li>
                <li><strong>D（識別器）</strong>が本物か偽物かを判定する。</li>
                <li>交互に練習し、Gが本物らしいデータを作れるようになる。</li>
            </ol>
        </div>

        <div class="gm-visual-wrap">
            <div class="gm-visual-card">
                <svg class="gm-wide-svg" viewBox="0 0 960 345" role="img" aria-labelledby="gm-gan-title gm-gan-desc">
                    <title id="gm-gan-title">GANの生成器と識別器の競争</title>
                    <desc id="gm-gan-desc">乱数を材料に生成器が偽物を作り、識別器が本物データと偽物を判定する。両者を交互に学習する。</desc>
                    <defs><marker id="gm-arrow-gan-simple" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#486581"></path></marker></defs>
                    <text x="20" y="28" class="gm-svg-title">基本GAN：作るGと見破るDが競う</text>
                    <rect x="20" y="48" width="920" height="208" class="gm-svg-red"></rect>

                    <rect x="42" y="78" width="130" height="48" class="gm-svg-green"></rect>
                    <text x="65" y="107" class="gm-svg-note">本物データ x</text>
                    <line x1="178" y1="102" x2="614" y2="119" stroke="#27ae60" stroke-width="2" marker-end="url(#gm-arrow-gan-simple)"></line>

                    <rect x="42" y="170" width="130" height="48" class="gm-svg-purple"></rect>
                    <text x="61" y="199" class="gm-svg-note">乱数 z（材料）</text>
                    <line x1="178" y1="194" x2="224" y2="194" stroke="#486581" stroke-width="2" marker-end="url(#gm-arrow-gan-simple)"></line>

                    <rect x="236" y="164" width="170" height="60" class="gm-svg-red"></rect>
                    <text x="255" y="190" class="gm-svg-label">生成器 G</text>
                    <text x="255" y="213" class="gm-svg-mini">偽物を作る</text>
                    <line x1="412" y1="194" x2="458" y2="194" stroke="#486581" stroke-width="2" marker-end="url(#gm-arrow-gan-simple)"></line>

                    <rect x="470" y="170" width="112" height="48" class="gm-svg-box"></rect>
                    <text x="488" y="199" class="gm-svg-note">偽物 G(z)</text>
                    <line x1="588" y1="194" x2="614" y2="177" stroke="#d64545" stroke-width="2" marker-end="url(#gm-arrow-gan-simple)"></line>

                    <rect x="626" y="98" width="180" height="100" class="gm-svg-purple"></rect>
                    <text x="646" y="135" class="gm-svg-label">識別器 D</text>
                    <text x="646" y="160" class="gm-svg-note">本物か判定する</text>
                    <line x1="812" y1="148" x2="846" y2="148" stroke="#486581" stroke-width="2" marker-end="url(#gm-arrow-gan-simple)"></line>

                    <rect x="858" y="124" width="68" height="48" class="gm-svg-box"></rect>
                    <text x="866" y="153" class="gm-svg-mini">本物らしさ</text>

                    <rect x="20" y="276" width="446" height="48" class="gm-svg-purple"></rect>
                    <text x="38" y="306" class="gm-svg-note">D：本物→1、偽物→0 を当てる</text>
                    <rect x="494" y="276" width="446" height="48" class="gm-svg-red"></rect>
                    <text x="512" y="306" class="gm-svg-note">G：偽物を1と判定させたい</text>
                </svg>
                <p class="gm-caption"><strong>注意：</strong>違う乱数からも似たものばかり作る失敗を <strong>Mode Collapse（モード崩壊）</strong> と呼びます。</p>
            </div>
        </div>

        <div class="gm-table-wrap">
            <table class="gm-table">
                <tr><th>名前</th><th>まず覚えること</th><th>試験語</th></tr>
                <tr><td><strong>DCGAN</strong><br>Deep Convolutional Generative Adversarial Network</td><td>画像向けに畳み込みを使うGAN</td><td>G：ReLU（Rectified Linear Unit）・出力tanh／D：Leaky ReLU</td></tr>
                <tr><td><strong>WGAN</strong><br>Wasserstein GAN</td><td>Dの代わりに実数の評価値を出すCriticを使う</td><td>Wasserstein距離／評価値が急変しない（1-Lipschitz）</td></tr>
                <tr><td><strong>cGAN</strong><br>Conditional GAN</td><td>「猫を作って」など条件を指定する</td><td>条件cをGとDの両方へ入れる</td></tr>
                <tr><td><strong>CycleGAN</strong></td><td>ペア画像なしでA↔Bを変換する</td><td>往復して元へ戻すCycle-consistency</td></tr>
            </table>
        </div>

        <details class="gm-details">
            <summary>試験用の正式なGANの式・派生語を見る</summary>
            <div>
                <div class="gm-formula"><strong>Dの基本：</strong>本物 D(x)→1、偽物 D(G(z))→0</div>
                <div class="gm-formula"><strong>Gの基本：</strong>偽物を D(G(z))→1 と判定させたい</div>
                <div class="gm-formula"><strong>minimax：</strong>min<sub>G</sub> max<sub>D</sub> E<sub>x</sub>[log D(x)] + E<sub>z</sub>[log(1−D(G(z)))]</div>
                <p>BCE（Binary Cross-Entropy／二値交差エントロピー）は、本物か偽物かの2値判定に使う損失です。WGAN-GP（WGAN with Gradient Penalty）は、勾配ペナルティで1-Lipschitz制約を近似します。</p>
            </div>
        </details>

        <h3>■ DiffusionとFlow：戻し方が違う</h3>
        <div class="gm-core">
            <strong>Diffusion（拡散モデル）</strong>＝画像を砂嵐のように壊し、少しずつ戻す練習。<br>
            <strong>Flow（フローベース）</strong>＝必ず元へ戻れる変換で、簡単な乱数とデータを行き来。
        </div>
        <div class="gm-note">
            <strong>DDPM</strong>＝Denoising Diffusion Probabilistic Models。代表的な拡散モデルで、加えたノイズを当てる練習をします。
        </div>

        <div class="gm-visual-wrap">
            <div class="gm-visual-card">
                <svg class="gm-wide-svg" viewBox="0 0 960 380" role="img" aria-labelledby="gm-df-title gm-df-desc">
                    <title id="gm-df-title">拡散モデルとフローベースモデルのやさしい比較</title>
                    <desc id="gm-df-desc">拡散モデルはノイズを加えて壊し、予測したノイズを反復的に除く。Flowは可逆変換で単純な乱数とデータを行き来する。</desc>
                    <defs><marker id="gm-arrow-df-simple" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#486581"></path></marker></defs>
                    <text x="20" y="28" class="gm-svg-title">Diffusion＝少しずつ戻す／Flow＝変換を逆向きに戻す</text>

                    <rect x="20" y="48" width="450" height="308" class="gm-svg-green"></rect>
                    <text x="38" y="76" class="gm-svg-label">Diffusion（拡散モデル）</text>
                    <text x="38" y="104" class="gm-svg-note">準備（固定）：ノイズを加えて学習用の x_t を作る</text>
                    <rect x="42" y="120" width="100" height="42" class="gm-svg-box"></rect>
                    <text x="57" y="146" class="gm-svg-note">元データ x₀</text>
                    <line x1="148" y1="141" x2="180" y2="141" stroke="#486581" stroke-width="2" marker-end="url(#gm-arrow-df-simple)"></line>
                    <rect x="192" y="120" width="96" height="42" class="gm-svg-box"></rect>
                    <text x="211" y="146" class="gm-svg-note">途中 x_t</text>
                    <line x1="294" y1="141" x2="326" y2="141" stroke="#486581" stroke-width="2" marker-end="url(#gm-arrow-df-simple)"></line>
                    <rect x="338" y="120" width="104" height="42" class="gm-svg-purple"></rect>
                    <text x="350" y="146" class="gm-svg-note">ほぼノイズ x_T</text>

                    <text x="38" y="196" class="gm-svg-note">生成：右から左へ、予測したノイズを少しずつ除く</text>
                    <rect x="338" y="206" width="104" height="34" class="gm-svg-purple"></rect>
                    <text x="350" y="228" class="gm-svg-mini">ほぼノイズ x_T</text>
                    <line x1="332" y1="223" x2="294" y2="223" stroke="#27ae60" stroke-width="2" marker-end="url(#gm-arrow-df-simple)"></line>
                    <rect x="192" y="206" width="96" height="34" class="gm-svg-box"></rect>
                    <text x="215" y="228" class="gm-svg-mini">途中 x_t</text>
                    <line x1="186" y1="223" x2="148" y2="223" stroke="#27ae60" stroke-width="2" marker-end="url(#gm-arrow-df-simple)"></line>
                    <rect x="42" y="206" width="100" height="34" class="gm-svg-box"></rect>
                    <text x="57" y="228" class="gm-svg-mini">元データ x₀</text>

                    <rect x="42" y="252" width="400" height="78" class="gm-svg-box"></rect>
                    <text x="58" y="278" class="gm-svg-label">学ぶこと：加えたノイズ ε を当てる</text>
                    <text x="58" y="304" class="gm-svg-note">正解 ε と予測 ε̂ の平均二乗誤差（MSE）を小さくする</text>

                    <rect x="490" y="48" width="450" height="308" class="gm-svg-orange"></rect>
                    <text x="508" y="76" class="gm-svg-label">Flow（フローベース）</text>
                    <text x="508" y="104" class="gm-svg-note">生成：簡単な乱数からデータへ戻す</text>
                    <rect x="520" y="124" width="112" height="48" class="gm-svg-purple"></rect>
                    <text x="546" y="153" class="gm-svg-note">簡単な乱数 z</text>
                    <line x1="638" y1="148" x2="698" y2="148" stroke="#f39c12" stroke-width="2" marker-end="url(#gm-arrow-df-simple)"></line>
                    <rect x="710" y="118" width="106" height="60" class="gm-svg-box"></rect>
                    <text x="730" y="143" class="gm-svg-note">逆変換 g⁻¹</text>
                    <text x="730" y="164" class="gm-svg-mini">元へ戻す</text>
                    <line x1="822" y1="148" x2="862" y2="148" stroke="#f39c12" stroke-width="2" marker-end="url(#gm-arrow-df-simple)"></line>
                    <rect x="874" y="124" width="48" height="48" class="gm-svg-green"></rect>
                    <text x="893" y="153" class="gm-svg-note">x</text>

                    <text x="508" y="216" class="gm-svg-note">尤度（データらしさ）を計算：x → g → z</text>
                    <rect x="856" y="230" width="66" height="46" class="gm-svg-box"></rect>
                    <text x="883" y="258" class="gm-svg-note">x</text>
                    <line x1="846" y1="253" x2="800" y2="253" stroke="#486581" stroke-width="2" marker-end="url(#gm-arrow-df-simple)"></line>
                    <rect x="702" y="230" width="88" height="46" class="gm-svg-orange"></rect>
                    <text x="738" y="258" class="gm-svg-note">g</text>
                    <line x1="692" y1="253" x2="630" y2="253" stroke="#486581" stroke-width="2" marker-end="url(#gm-arrow-df-simple)"></line>
                    <rect x="540" y="230" width="80" height="46" class="gm-svg-box"></rect>
                    <text x="574" y="258" class="gm-svg-note">z</text>

                    <rect x="520" y="294" width="402" height="42" class="gm-svg-box"></rect>
                    <text x="538" y="320" class="gm-svg-note">○ 厳密な尤度　△ 可逆変換とヤコビアンが必要</text>
                </svg>
            </div>
        </div>

        <div class="gm-note">
            <strong>拡散モデルの記号：</strong>
            x₀＝元データ／x<sub>t</sub>＝時刻tの汚れたデータ／ε＝加えたノイズ。<br>
            √ᾱ<sub>t</sub>＝元データ側の係数、√(1−ᾱ<sub>t</sub>)＝ノイズ側の係数。
        </div>

        <div class="gm-note">
            <strong>Flowの言葉：</strong>
            Jacobian（ヤコビアン）＝変換による「伸び縮み率」。伸び縮みした分だけ確率密度を補正します。
        </div>

        <details class="gm-details">
            <summary>試験用のDiffusion・Flowの式を見る</summary>
            <div>
                <div class="gm-formula"><strong>拡散：</strong>x<sub>t</sub> = √ᾱ<sub>t</sub>x<sub>0</sub> + √(1−ᾱ<sub>t</sub>)ε</div>
                <div class="gm-formula"><strong>Flow：</strong>z=g(x) のとき、log p<sub>X</sub>(x) = log p<sub>Z</sub>(g(x)) + log |det J<sub>g</sub>(x)|</div>
                <p>DDPMは Denoising Diffusion Probabilistic Models。代表的な学習では、加えたノイズεを予測します。</p>
            </div>
        </details>

        <h3>■ 自己回帰：前までを見て、次を1つ作る</h3>
        <div class="gm-core">
            <ol class="gm-steps">
                <li>「今日は」までを見て、次の語を予測する。</li>
                <li>「今日は 天気が」までを見て、さらに次を予測する。</li>
                <li>各段階の確率を全部掛けると、系列全体の確率になる。</li>
            </ol>
        </div>
        <details class="gm-details">
            <summary>試験用の自己回帰の式を見る</summary>
            <div>
                <div class="gm-formula">p(x₁:T) = ∏<sub>t=1</sub><sup>T</sup> p(x<sub>t</sub> | x<sub>1:t−1</sub>)</div>
                <p>x₁:T＝系列全体、x₁:t−1＝それまでに出た要素。生成は原則1つずつなので時間がかかりやすい方式です。</p>
            </div>
        </details>

        <h3>■ 計算問題：何をすればよいか</h3>
        <div class="gm-table-wrap">
            <table class="gm-table">
                <tr><th>与えられたもの</th><th>やること</th><th>答えの意味</th></tr>
                <tr><td>μ・σ・ε</td><td>σ×εを計算し、最後にμを足す</td><td>選ばれた潜在変数 z</td></tr>
                <tr><td>再構成対数尤度・KL</td><td>ELBO＝再構成対数尤度−KL<br>Lossは符号を反転</td><td>VAEの学習損失</td></tr>
                <tr><td>μ・σの正規分布（Gaussian）のKL</td><td>σ²とlogσ²を先に簡単にする</td><td>潜在分布のずれ</td></tr>
                <tr><td>D(real)・D(fake)</td><td>本物側の損失＋偽物側の損失</td><td>Dの二値交差エントロピー</td></tr>
                <tr><td>元データ・ノイズ・係数</td><td>元データ側とノイズ側を別々に計算して足す</td><td>時刻tの汚れたデータ x<sub>t</sub></td></tr>
                <tr><td>CycleGANの往復結果</td><td>各要素の絶対値の差を足す</td><td>元へ戻せた程度</td></tr>
                <tr><td>密度・変換の傾き</td><td>密度×伸び縮み率</td><td>Flowで補正した密度</td></tr>
            </table>
        </div>

        <h3>■ 最後はこの表だけ</h3>
        <div class="gm-table-wrap">
            <table class="gm-table">
                <tr><th>問題文の合図</th><th>答え</th><th>まず思い出すこと</th></tr>
                <tr><td>前までを見て次を1つ</td><td><strong>自己回帰</strong></td><td>順番に作る</td></tr>
                <tr><td>汚した入力から元へ</td><td><strong>DAE</strong></td><td>汚れを落とす練習</td></tr>
                <tr><td>中心μ・広がりσ・乱数ε</td><td><strong>VAE</strong></td><td>幅をもつ設計図</td></tr>
                <tr><td>再構成＋KL</td><td><strong>−ELBO</strong></td><td>上手に戻す＋分布を整える</td></tr>
                <tr><td>作るGと見破るD</td><td><strong>GAN</strong></td><td>交互に競う</td></tr>
                <tr><td>同じものばかり作る</td><td><strong>Mode Collapse</strong></td><td>多様性がなくなる</td></tr>
                <tr><td>画像向けの畳み込みGAN</td><td><strong>DCGAN</strong></td><td>GはReLU、DはLeaky ReLU</td></tr>
                <tr><td>Critic・Wasserstein・1-Lipschitz</td><td><strong>WGAN</strong></td><td>確率でなく実数評価</td></tr>
                <tr><td>作りたい条件を指定</td><td><strong>cGAN</strong></td><td>条件cをGとDへ</td></tr>
                <tr><td>ペアなし変換・往復</td><td><strong>CycleGAN</strong></td><td>A→B→Aで元へ</td></tr>
                <tr><td>ノイズを加え、少しずつ除く</td><td><strong>DDPM</strong></td><td>加えたノイズを当てる</td></tr>
                <tr><td>戻せる変換・ヤコビアン</td><td><strong>Flow</strong></td><td>乱数とデータを往復</td></tr>
            </table>
        </div>

        <details class="gm-details">
            <summary>略語の正式名称を見る</summary>
            <div>
                AE＝Autoencoder／DAE＝Denoising Autoencoder／VAE＝Variational Autoencoder／
                ELBO＝Evidence Lower Bound／KL＝Kullback–Leibler／GAN＝Generative Adversarial Network／
                DCGAN＝Deep Convolutional Generative Adversarial Network／
                WGAN＝Wasserstein GAN／cGAN＝Conditional GAN／
                DDPM＝Denoising Diffusion Probabilistic Models／MSE＝Mean Squared Error／
                BCE＝Binary Cross-Entropy／ReLU＝Rectified Linear Unit
            </div>
        </details>
    `,

    questions: [
        {
            id: "gen-discriminative-vs-generative",
            category: "識別モデルと生成モデル",
            question: "「画像を見て犬か猫か当てる」識別モデルに対し、生成モデルが主に学ぶものはどれか。",
            options: ["新しいデータを作れるよう、p(x)などのデータ分布を学ぶ", "P(y|x)だけを学ぶ", "Accuracyだけを学ぶ", "決定境界だけを学ぶ"],
            answer: 0,
            explanation: "<strong>① 識別</strong>は入力xから答えyを当てます。<br><strong>② 生成</strong>は学習データらしさを覚えます。<br><strong>③ したがって</strong>p(x)、p(x,y)、条件付きならp(x|c)を扱います。"
        },
        {
            id: "gen-vae-encoder-output",
            category: "VAEの構造",
            question: "VAEのEncoderは、潜在変数zを選ぶために何を出力するか。",
            options: ["zの中心μと広がりを表すlogσ²など", "完成した画像だけ", "クラスラベルだけ", "固定されたzを必ず1個だけ"],
            answer: 0,
            explanation: "<strong>①</strong> VAEはzを最初から1点に決めません。<br><strong>②</strong> Encoderが中心μと広がりσを出します。<br><strong>③</strong> そこへ乱数εを入れ、z=μ+σεでzを1つ選びます。"
        },
        {
            id: "gen-reparameterization-reason",
            category: "再パラメータ化",
            question: "VAEで z=μ+σε と書く主な理由は何か。",
            options: ["乱数部分をεとして分け、μとσを学習できる計算経路にするため", "潜在次元を必ず1にするため", "画像分類だけを行うため", "GANの識別器を作るため"],
            answer: 0,
            explanation: "<strong>①</strong> zを直接ランダムに選ぶと、その選択部分は微分しにくくなります。<br><strong>②</strong> ランダムさを外部のεへ分けます。<br><strong>③</strong> z=μ+σεなら、μ・σまで誤差を戻して学習できます。"
        },
        {
            id: "gen-gan-generator-goal",
            category: "GANの仕組み",
            question: "GANのGenerator（生成器）Gが目指すことは何か。",
            options: ["作った偽物をDiscriminatorに本物だと思わせる", "本物画像を分類するだけ", "入力をそのまま復元する", "KL項だけを計算する"],
            answer: 0,
            explanation: "<strong>①</strong> Gは乱数zから偽物G(z)を作ります。<br><strong>②</strong> Dは本物らしさを判定します。<br><strong>③</strong> GはD(G(z))を1側、つまり本物判定へ近づけます。"
        },
        {
            id: "gen-mode-collapse",
            category: "モード崩壊",
            question: "GANのMode Collapse（モード崩壊）とは何か。",
            options: ["違う乱数からも似たものばかり生成し、多様性がなくなる", "常にノイズだけを出す", "Dが正しく判定できる理想状態", "画像が少し明るくなる"],
            answer: 0,
            explanation: "<strong>①</strong> 本来は乱数が違えば多様な出力がほしいです。<br><strong>②</strong> GがDをだませる少数の型だけに偏ることがあります。<br><strong>③</strong> 同じ種類ばかりになる失敗がMode Collapseです。"
        },
        {
            id: "gen-diffusion-reverse-process",
            category: "拡散モデルの概要",
            question: "拡散モデルが新しい画像を作るときの基本動作はどれか。",
            options: ["ほぼ純粋なノイズから始め、少しずつノイズを除く", "潜在変数から必ず1回で作る", "識別器だけで画像を作る", "画像を圧縮するだけ"],
            answer: 0,
            explanation: "<strong>① 学習</strong>では元画像へノイズを加えます。<br><strong>② モデル</strong>は加えたノイズを当てる練習をします。<br><strong>③ 生成</strong>ではノイズから少しずつノイズ除去して画像へ戻します。"
        },
        {
            id: "gen-vae-blur",
            category: "VAEの特徴",
            question: "単純な平均二乗誤差（MSE）型の再構成を使うVAEで、画像がぼやけやすい理由はどれか。",
            options: ["正解候補が複数あると、その平均が損失を小さくしやすいから", "必ずノイズだけを出すから", "潜在変数を持たないから", "識別器が必須だから"],
            answer: 0,
            explanation: "<strong>①</strong> zへの圧縮で細かな情報が失われることがあります。<br><strong>②</strong> 同じようなzから複数の細部が考えられると、MSEは平均を選びやすくなります。<br><strong>③</strong> 輪郭や模様が平均化され、ぼやけて見えやすくなります。"
        },
        {
            id: "gen-dcgan-name",
            category: "DCGAN",
            question: "画像向けに畳み込み層を中心として構成したGANはどれか。",
            options: ["DCGAN", "CycleGAN", "WGAN", "VAE"],
            answer: 0,
            explanation: "<strong>①</strong> DCはDeep Convolutionalの意味です。<br><strong>②</strong> 全結合中心ではなく畳み込みを使います。<br><strong>③</strong> 代表構成はG隠れ層ReLU・出力tanh、D隠れ層Leaky ReLUです。"
        },
        {
            id: "gen-cyclegan-unpaired",
            category: "CycleGAN",
            question: "対応ペアのない「馬の画像集」と「シマウマの画像集」だけで相互変換を学ぶモデルはどれか。",
            options: ["CycleGAN", "DCGAN", "WGAN", "VAE"],
            answer: 0,
            explanation: "<strong>①</strong> 馬Aと対応するシマウマBのペアは不要です。<br><strong>②</strong> 馬→シマウマ→馬と往復させます。<br><strong>③</strong> 元へ戻れるようにするCycle-consistencyを使います。"
        },
        {
            id: "gen-vae-kl-role",
            category: "VAEのKL項",
            question: "VAEのKL項は何のために使うか。",
            options: ["入力ごとのzの分布を、生成時に使う基準分布へ近づける", "画像を必ず鮮明にする", "再構成損失そのものにする", "潜在次元を増やす"],
            answer: 0,
            explanation: "<strong>① 学習時</strong>は入力ごとにzの分布を作ります。<br><strong>② 生成時</strong>は基準分布p(z)からzを選びます。<br><strong>③ KL項</strong>で両者を近づけ、Decoderが生成時のzを扱いやすくします。"
        },
        {
            id: "gen-gan-js",
            category: "GAN理論",
            question: "元のminimax GANで、Dが最適だと仮定したときGが小さくするものはどれか。",
            options: ["実分布と生成分布のJensen–Shannon（JS）ダイバージェンス", "物体検出の枠の重なり", "Accuracy", "コサイン距離"],
            answer: 0,
            explanation: "<strong>①</strong> Dが十分に最適だと仮定します。<br><strong>②</strong> GANの目的は定数＋JSダイバージェンスの形になります。<br><strong>③</strong> GがJSを小さくすると、生成分布が実分布へ近づきます。"
        },
        {
            id: "gen-wgan-name",
            category: "WGAN",
            question: "Wasserstein距離を使ってGANの学習信号を得やすくしたモデルはどれか。",
            options: ["WGAN", "DCGAN", "CycleGAN", "VAE"],
            answer: 0,
            explanation: "<strong>①</strong> 通常GANは分布が離れると学習信号が弱くなることがあります。<br><strong>②</strong> WGANはWasserstein距離に基づく実数評価を使います。<br><strong>③</strong> 分布が離れていても有用な信号を得やすくします。"
        },
        {
            id: "gen-ddpm-target",
            category: "拡散モデルの学習",
            question: "代表的なDDPMで、モデルが学習時に予測するものは何か。",
            options: ["元データへ加えたノイズε", "クラスラベルだけ", "GANの識別結果", "Flowのヤコビアン"],
            answer: 0,
            explanation: "<strong>①</strong> 学習時に正体の分かるノイズεを加えます。<br><strong>②</strong> モデルへ汚れたデータx_tと時刻tを渡します。<br><strong>③</strong> 予測ε̂と正解εの差を小さくします。"
        },
        {
            id: "gen-cgan-condition",
            category: "Conditional GAN",
            question: "cGANで「猫を作る」などの条件cは、どこへ入力するか。",
            options: ["GeneratorとDiscriminatorの両方", "Generatorだけ", "Discriminatorだけ", "どちらにも入れない"],
            answer: 0,
            explanation: "<strong>①</strong> Gは条件に合うデータを作ります。<br><strong>②</strong> Dはその条件に合う本物かを判定します。<br><strong>③</strong> そのため条件cをGとDの両方へ渡します。"
        },
        {
            id: "gen-dae",
            category: "Denoising Autoencoder",
            question: "DAE（Denoising Autoencoder）はどのように学習するか。",
            options: ["汚した入力から元のきれいな入力を復元する", "入力を分類するだけ", "識別器と競わせる", "報酬を最大化する"],
            answer: 0,
            explanation: "<strong>①</strong> 元データxをわざと汚してx̃を作ります。<br><strong>②</strong> 入力にはx̃、正解には元のxを使います。<br><strong>③</strong> ノイズに強い特徴を学びます。"
        },
        {
            id: "gen-ae-bottleneck",
            category: "Autoencoder",
            question: "Autoencoderの狭いBottleneck（ボトルネック）を設ける目的は何か。",
            options: ["保存できる情報を制限し、復元に重要な特徴を残させる", "出力次元を無限にする", "分類ラベルを追加する", "勾配を止める"],
            answer: 0,
            explanation: "<strong>①</strong> 容量が大きすぎると入力を丸写しできます。<br><strong>②</strong> 狭いBottleneckで保存量を制限します。<br><strong>③</strong> 復元に必要な重要特徴だけを残させます。"
        },
        {
            id: "gen-vae-reparam-calc",
            category: "VAE 再パラメータ化（計算）",
            kind: "計算",
            question: "使う式：$z=\\mu+\\sigma\\epsilon$。値：$\\mu=2,\\sigma=0.5,\\epsilon=-1$。zはいくつか。",
            options: ["1.5", "2.5", "1", "-1.5"],
            answer: 0,
            explanation: "<strong>① 掛け算：</strong>$\\sigma\\epsilon=0.5\\times(-1)=-0.5$。<br><strong>② 足し算：</strong>$z=2-0.5=1.5$。<br><strong>③ 意味：</strong>乱数εを分けることで、μ・σを学習できます。"
        },
        {
            id: "gen-elbo-sign",
            category: "VAE ELBO",
            question: "VAEのELBOとして正しい形はどれか。",
            options: ["再構成対数尤度 − KL", "再構成損失＋Accuracy", "GANの損失だけ", "報酬−価値関数の誤差"],
            answer: 0,
            explanation: "<strong>①</strong> 再構成対数尤度は、上手に元へ戻せたほど大きくなります。<br><strong>②</strong> KLは分布のずれなので引きます。<br><strong>③</strong> ELBOを最大化することは、−ELBOを最小化することと同じです。"
        },
        {
            id: "gen-flow",
            category: "フローベース生成モデル",
            question: "Flow（フローベース生成モデル）の主な特徴はどれか。",
            options: ["元へ戻せる変換を使い、厳密な尤度を計算できる", "識別器が必須", "逆変換できない", "ノイズを段階的に加えるだけ"],
            answer: 0,
            explanation: "<strong>①</strong> 複雑なデータxを簡単な分布zへ変換します。<br><strong>②</strong> 可逆なのでzからxへ戻して生成できます。<br><strong>③</strong> 伸び縮みをヤコビアンで補正し、尤度を計算できます。"
        },
        {
            id: "gen-flow-tradeoff",
            category: "Flowの制約",
            question: "Flowのネットワーク設計に必要な条件はどれか。",
            options: ["変換が可逆で、ヤコビアンを計算できる", "損失が微分できない", "潜在次元が必ず1", "画像を扱えない"],
            answer: 0,
            explanation: "<strong>①</strong> zからxへ戻すため、変換は可逆である必要があります。<br><strong>②</strong> 密度補正のため、伸び縮み率を計算します。<br><strong>③</strong> そのため可逆性とヤコビアン計算が設計上の制約です。"
        },
        {
            id: "gen-wgan",
            category: "Wasserstein GAN",
            question: "WGANのCriticと、通常GANのDiscriminatorの違いはどれか。",
            options: ["Criticは確率に限らない実数評価を出し、1-Lipschitz制約を課す", "Criticは必ず0か1だけを返す", "CriticはGeneratorである", "WGANは本物データを使わない"],
            answer: 0,
            explanation: "<strong>① 通常D：</strong>本物確率を出します。<br><strong>② Critic：</strong>大小を比較する実数評価を出します。<br><strong>③ 制約：</strong>値が急変しすぎない1-Lipschitz制約を課します。"
        },
        {
            id: "gen-diffusion-forward",
            category: "拡散モデル",
            question: "拡散モデルのforward process（前向き過程）で、時刻tが進むとどうなるか。",
            options: ["データへ段階的にノイズが加わり、ほぼノイズへ近づく", "ノイズが一度で消える", "識別器が生成器を分類する", "潜在変数が離散化される"],
            answer: 0,
            explanation: "<strong>①</strong> x₀は元データです。<br><strong>②</strong> 時刻が進むほど決められた量のノイズを加えます。<br><strong>③</strong> 最後は単純なノイズ分布へ近づきます。"
        },
        {
            id: "gen-autoregressive-definition",
            category: "自己回帰",
            question: "自己回帰型生成モデルの特徴はどれか。",
            options: ["前までの要素を見て、次の要素を1つずつ生成する", "全要素を無関係に同時生成する", "必ずGとDを競わせる", "可逆変換だけを使う"],
            answer: 0,
            explanation: "<strong>①</strong> それまでに出た要素を条件にします。<br><strong>②</strong> 次を1つ生成し、またそれを条件へ加えます。<br><strong>③</strong> 全体の確率は各段階の条件付き確率の積です。"
        },
        {
            id: "gen-family-compare",
            category: "生成モデル比較",
            question: "生成モデルと作り方の対応として正しいものはどれか。",
            options: ["自己回帰＝順番、GAN＝競争、拡散＝ノイズ除去、Flow＝可逆変換", "自己回帰＝可逆変換、GAN＝ELBO、拡散＝往復損失、Flow＝識別", "すべてDが必要", "すべて1回で生成"],
            answer: 0,
            explanation: "<strong>① 自己回帰：</strong>次を順番に作る。<br><strong>② GAN／拡散：</strong>競争する／ノイズを戻す。<br><strong>③ Flow：</strong>元へ戻せる変換で乱数とデータを往復します。"
        },
        {
            id: "gen-ae-vs-vae",
            category: "AEとVAE",
            question: "通常のAEとVAEの違いはどれか。",
            options: ["AEは1点zへ圧縮し、VAEは中心と広がりをもつzの分布を使う", "AEにも必ずKL項がある", "VAEはEncoderを持たない", "AEだけが分布を出す"],
            answer: 0,
            explanation: "<strong>① AE：</strong>同じ入力なら同じ1点zへ圧縮します。<br><strong>② VAE：</strong>中心μと広がりσをもつ分布へ圧縮します。<br><strong>③</strong> VAEは基準分布からzを選んで新しい例を生成できます。"
        },
        {
            id: "gen-exam-model-flow-identification",
            category: "生成モデル構造図の識別",
            difficulty: "本試験型",
            kind: "図表・長文",
            question: `<p>次のA〜Cは生成モデルの処理フローを簡略化した図である。モデル名の対応として正しいものはどれか。</p>
                <div class="gm-visual-wrap"><div class="gm-visual-card"><svg class="gm-wide-svg" viewBox="0 0 960 230" role="img" aria-label="3種類の生成モデルの構造">
                    <g transform="translate(18 16)"><rect width="924" height="54" class="gm-svg-blue"/><text x="16" y="33" class="gm-svg-label">A　入力 x → Encoder →［μ, σ］→ z → Decoder → 復元 x̂</text></g>
                    <g transform="translate(18 88)"><rect width="924" height="54" class="gm-svg-red"/><text x="16" y="24" class="gm-svg-label">B　乱数 z → G → fake ┐</text><text x="281" y="41" class="gm-svg-note">real ──────────┴→ D → 本物／偽物</text></g>
                    <g transform="translate(18 160)"><rect width="924" height="54" class="gm-svg-green"/><text x="16" y="33" class="gm-svg-label">C　元データ x₀ → noiseを段階付加 → xₜ → denoiseを反復 → 生成 x₀</text></g>
                </svg></div></div>`,
            options: ["A＝VAE、B＝GAN、C＝Diffusion", "A＝GAN、B＝Diffusion、C＝VAE", "A＝Flow、B＝VAE、C＝GAN", "A＝Autoregressive、B＝Flow、C＝VAE"],
            answer: 0,
            explanation: "<p><strong>① 図で見る場所：</strong>分布の2値、GとDの分岐、同じ処理の反復を探します。</p><p><strong>② 矢印を追う：</strong>Aはμ・σからzを選んで復元、BはGeneratorとDiscriminatorが対戦、Cはnoise付加後にdenoiseを繰り返します。</p><p><strong>③ 答え：</strong>A＝VAE、B＝GAN、C＝Diffusionです。</p><p><strong>④ 他との違い：</strong>Flowは可逆な往復矢印、Autoregressiveは直前の出力を次の条件へ戻すloopが決め手です。</p>"
        },
        {
            id: "gen-exam-flow-autoregressive-arrows",
            category: "生成モデルの矢印",
            difficulty: "本試験型",
            kind: "図表・長文",
            question: `<p>図Xはデータと潜在変数の間を同じ変換経路で往復でき、図Yは生成した要素を次の予測条件へ戻す。XとYの対応はどれか。</p>
                <div class="gm-visual-wrap"><div class="gm-visual-card"><svg class="gm-wide-svg" viewBox="0 0 960 150" role="img" aria-label="同じ経路を往復するXと、出力を次の条件へ戻すYの比較">
                    <rect x="18" y="18" width="442" height="110" class="gm-svg-orange"/><text x="36" y="48" class="gm-svg-label">X　data x ⇄ invertible transform ⇄ latent z</text><text x="36" y="82" class="gm-svg-note">両方向を厳密に計算できる</text>
                    <rect x="500" y="18" width="442" height="110" class="gm-svg-purple"/><text x="518" y="48" class="gm-svg-label">Y　x₁ → x₂ → x₃ → …</text><text x="518" y="82" class="gm-svg-note">前までの出力を次の条件へ加える</text>
                </svg></div></div>`,
            options: ["X＝Normalizing Flow、Y＝Autoregressive Model", "X＝GAN、Y＝VAE", "X＝Diffusion、Y＝Flow", "X＝VAE、Y＝GAN"],
            answer: 0,
            explanation: "<p><strong>① 図で見る場所：</strong>Xの両向き矢印と、Yの時系列loopを見ます。</p><p><strong>② 矢印を追う：</strong>Xは可逆変換でデータと潜在変数を往復し、Yは生成済み要素を使って次を予測します。</p><p><strong>③ 答え：</strong>X＝Normalizing Flow（正規化フロー）、Y＝Autoregressive Model（自己回帰モデル）です。</p><p><strong>④ 他との違い：</strong>Diffusionは多数stepのdenoise、GANはGとDの対戦です。</p>"
        },
        {
            id: "gen-elbo-calc",
            category: "VAE ELBO（計算）",
            kind: "計算",
            question: "使う式：ELBO＝再構成対数尤度−KL。値：再構成対数尤度=−8、KL=2。ELBOとLoss（−ELBO）はどれか。",
            options: ["ELBO=−10、Loss=10", "ELBO=−6、Loss=6", "ELBO=10、Loss=−10", "ELBO=2、Loss=8"],
            answer: 0,
            explanation: "<strong>① ELBO：</strong>$-8-2=-10$。<br><strong>② Loss：</strong>符号を反転して$10$。<br><strong>③ 注意：</strong>ELBOは最大化、−ELBOは最小化します。"
        },
        {
            id: "gen-gaussian-kl-calc",
            category: "VAE KL（応用計算）",
            kind: "計算",
            question: "使う式：$KL=\\frac12(\\mu^2+\\sigma^2-\\log\\sigma^2-1)$。値：$\\mu=1,\\sigma=1$。KLはいくつか。",
            options: ["0.5", "0", "1", "2"],
            answer: 0,
            explanation: "<strong>① 簡単化：</strong>$\\sigma^2=1,\\log1=0$。<br><strong>② 括弧内：</strong>$1^2+1-0-1=1$。<br><strong>③ 最後：</strong>$\\frac12\\times1=0.5$。"
        },
        {
            id: "gen-discriminator-role",
            category: "GANの識別器",
            question: "通常GANでDiscriminator（識別器）Dを学習するときの目標はどれか。",
            options: ["本物D(x)を1へ、偽物D(G(z))を0へ近づける", "本物も偽物も1へ近づける", "乱数zを復元する", "KL項を最大化する"],
            answer: 0,
            explanation: "<strong>① 本物：</strong>D(x)を1へ近づけます。<br><strong>② 偽物：</strong>D(G(z))を0へ近づけます。<br><strong>③</strong> Gを学習するときだけ、偽物を1と思わせる方向を目指します。"
        },
        {
            id: "gen-gan-bce-calc",
            category: "GAN BCE（計算）",
            kind: "計算",
            question: "使う式：$L_D=-\\ln D(real)-\\ln(1-D(fake))$。値：D(real)=0.8、D(fake)=0.3。近似：$-\\ln0.8=0.22,-\\ln0.7=0.36$。$L_D$はどれか。",
            options: ["0.58", "0.14", "1.10", "1.60"],
            answer: 0,
            explanation: "<strong>① 本物側：</strong>$-\\ln0.8=0.22$。<br><strong>② 偽物側：</strong>$-\\ln(1-0.3)=-\\ln0.7=0.36$。<br><strong>③ 合計：</strong>$0.22+0.36=0.58$。"
        },
        {
            id: "gen-dcgan-activations",
            category: "DCGAN",
            question: "DCGANの代表的な活性化関数の組合せはどれか。",
            options: ["G隠れ層ReLU・G出力tanh・D隠れ層Leaky ReLU", "GもDも全層Sigmoid", "G隠れ層Leaky ReLU・D隠れ層ReLUだけ", "G出力ReLU・D出力tanh"],
            answer: 0,
            explanation: "<strong>① G隠れ層：</strong>ReLU。<br><strong>② G出力：</strong>tanh。<br><strong>③ D隠れ層：</strong>Leaky ReLU。この組合せを固定して覚えます。"
        },
        {
            id: "gen-cycle-loss-calc",
            category: "CycleGAN（計算）",
            kind: "計算",
            question: "元x=(1,2)、往復後F(G(x))=(0.8,2.3)。L1 cycle loss $|1-0.8|+|2-2.3|$ はどれか。",
            options: ["0.5", "0.1", "1.5", "2.5"],
            answer: 0,
            explanation: "<strong>① 1つ目：</strong>$|1-0.8|=0.2$。<br><strong>② 2つ目：</strong>$|2-2.3|=0.3$。<br><strong>③ 合計：</strong>$0.2+0.3=0.5$。小さいほど元へ戻せています。"
        },
        {
            id: "gen-diffusion-xt-calc",
            category: "拡散モデル（計算）",
            kind: "計算",
            question: "使う式：$x_t=\\sqrt{\\bar\\alpha_t}x_0+\\sqrt{1-\\bar\\alpha_t}\\epsilon$。値：$\\bar\\alpha_t=0.64,x_0=2,\\epsilon=-1$。$x_t$はどれか。",
            options: ["1.0", "1.3", "1.6", "2.2"],
            answer: 0,
            explanation: "<strong>① 元データ側：</strong>$\\sqrt{0.64}=0.8$。<br><strong>② ノイズ側：</strong>$\\sqrt{1-0.64}=\\sqrt{0.36}=0.6$。<br><strong>③ 合計：</strong>$0.8\\times2+0.6\\times(-1)=1.0$。"
        },
        {
            id: "gen-flow-jacobian-calc",
            category: "Flow（計算）",
            kind: "計算",
            question: "使う式：$p_X(x)=p_Z(g(x))|dg/dx|$。値：$g(x)=2x,p_Z(g(x))=0.1$。$p_X(x)$はどれか。",
            options: ["0.2", "0.05", "0.1", "2.0"],
            answer: 0,
            explanation: "<strong>① 伸び率：</strong>$g(x)=2x$なので$|dg/dx|=2$。<br><strong>② 密度補正：</strong>$0.1\\times2$。<br><strong>③ 答え：</strong>$p_X(x)=0.2$。ヤコビアンは伸び縮みを補正します。"
        }
    ]
};
