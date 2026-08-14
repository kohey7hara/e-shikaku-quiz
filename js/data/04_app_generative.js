window.quizData = {
    title: "4-（６）生成モデル",

    cheatSheet: `
        <style>
            .gm-core { background:#eef8f8; border-left:5px solid #35b9c5; border-radius:0 10px 10px 0; padding:14px 18px; margin:12px 0 22px; }
            .gm-note { background:#fff8e8; border-left:5px solid #f39c12; border-radius:0 10px 10px 0; padding:12px 16px; margin:12px 0 22px; }
            .gm-formula { background:#f7f9fc; border:1px solid #d9e2ec; border-radius:8px; padding:11px 14px; margin:10px 0; font-family:Georgia, "Times New Roman", serif; overflow-x:auto; }
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
            .gm-table { width:100%; min-width:800px; border-collapse:collapse; }
            .gm-table th { background:#eaf2fb; color:#102a43; text-align:left; padding:10px; border:1px solid #d9e2ec; }
            .gm-table td { padding:10px; border:1px solid #d9e2ec; vertical-align:top; }
            .gm-steps { margin:8px 0 0; padding-left:1.5em; }
            .gm-steps li { margin:5px 0; }
        </style>

        <h3>■ まず全体：生成モデルは何を学ぶか</h3>
        <div class="gm-core">
            <strong>識別モデル</strong>は主に入力からラベルを求める <strong>p(y|x)</strong> を扱います。<strong>生成モデル</strong>はデータ分布 <strong>p(x)</strong>、同時分布 <strong>p(x,y)</strong>、条件付き生成なら <strong>p(x|c)</strong> を扱い、新しいサンプルを作ります。
        </div>
        <div class="gm-note"><strong>略語を先に読む：</strong>VAE＝Variational Autoencoder（変分オートエンコーダ）／GAN＝Generative Adversarial Network（敵対的生成ネットワーク）／ELBO＝Evidence Lower Bound（変分下限）。</div>

        <div class="gm-visual-wrap">
            <div class="gm-visual-card">
                <svg class="gm-wide-svg" viewBox="0 0 960 335" role="img" aria-labelledby="gm-map-title gm-map-desc">
                    <title id="gm-map-title">代表的な生成モデル5系統の全体マップ</title>
                    <desc id="gm-map-desc">識別モデルと生成モデルを分け、自己回帰、VAE、GAN、拡散モデル、フローベースモデルの学び方と生成方法を横並びで比較する。</desc>
                    <text x="20" y="28" class="gm-svg-title">識別するか、分布を学んで生成するか</text>
                    <rect x="20" y="48" width="280" height="64" class="gm-svg-purple"></rect>
                    <text x="38" y="74" class="gm-svg-label">識別モデル</text>
                    <text x="38" y="97" class="gm-svg-note">x → p(y|x) → ラベル y</text>
                    <rect x="320" y="48" width="620" height="64" class="gm-svg-green"></rect>
                    <text x="338" y="74" class="gm-svg-label">生成モデル</text>
                    <text x="338" y="97" class="gm-svg-note">p(x)・p(x,y)・p(x|c) を学び、新しいxを作る</text>

                    <rect x="20" y="132" width="172" height="174" class="gm-svg-purple"></rect>
                    <text x="36" y="158" class="gm-svg-label">自己回帰</text>
                    <text x="36" y="186" class="gm-svg-note">x₁ → x₂ → …</text>
                    <text x="36" y="211" class="gm-svg-mini">過去を条件に1要素ずつ</text>
                    <text x="36" y="235" class="gm-svg-mini">尤度を計算しやすい</text>
                    <text x="36" y="267" class="gm-svg-note">逐次生成</text>

                    <rect x="207" y="132" width="172" height="174" class="gm-svg-blue"></rect>
                    <text x="223" y="158" class="gm-svg-label">VAE</text>
                    <text x="223" y="186" class="gm-svg-note">x → q(z|x) → z → x̂</text>
                    <text x="223" y="211" class="gm-svg-mini">分布へ圧縮</text>
                    <text x="223" y="235" class="gm-svg-mini">ELBOで学習</text>
                    <text x="223" y="267" class="gm-svg-note">Decoderで生成</text>

                    <rect x="394" y="132" width="172" height="174" class="gm-svg-red"></rect>
                    <text x="410" y="158" class="gm-svg-label">GAN</text>
                    <text x="410" y="186" class="gm-svg-note">z → G → 偽物 → D</text>
                    <text x="410" y="211" class="gm-svg-mini">生成器と識別器が競う</text>
                    <text x="410" y="235" class="gm-svg-mini">尤度を直接計算しない</text>
                    <text x="410" y="267" class="gm-svg-note">Gで1回生成</text>

                    <rect x="581" y="132" width="172" height="174" class="gm-svg-green"></rect>
                    <text x="597" y="158" class="gm-svg-label">Diffusion</text>
                    <text x="597" y="186" class="gm-svg-note">画像 → ノイズ</text>
                    <text x="597" y="211" class="gm-svg-mini">逆向きの除去を学習</text>
                    <text x="597" y="235" class="gm-svg-mini">安定して学習しやすい</text>
                    <text x="597" y="267" class="gm-svg-note">反復して生成</text>

                    <rect x="768" y="132" width="172" height="174" class="gm-svg-orange"></rect>
                    <text x="784" y="158" class="gm-svg-label">Flow</text>
                    <text x="784" y="186" class="gm-svg-note">z ⇄ 可逆変換 ⇄ x</text>
                    <text x="784" y="211" class="gm-svg-mini">Jacobianを計算</text>
                    <text x="784" y="235" class="gm-svg-mini">厳密尤度を扱える</text>
                    <text x="784" y="267" class="gm-svg-note">逆変換で生成</text>
                </svg>
                <p class="gm-caption"><strong>一言暗記：</strong>自己回帰＝順番に書く／VAE＝分布へ圧縮／GAN＝競う／Diffusion＝壊して戻す／Flow＝可逆変換で往復。</p>
            </div>
        </div>

        <h3>■ オートエンコーダ（Autoencoder）・DAE（Denoising Autoencoder）・VAE：どこが違うか</h3>
        <div class="gm-table-wrap">
            <table class="gm-table">
                <tr><th>モデル</th><th>入力 → 目標</th><th>潜在表現</th><th>主な狙い</th></tr>
                <tr><td><strong>AE（Autoencoder／オートエンコーダ）</strong></td><td>x → xを再構成</td><td>決定的な点 z</td><td>圧縮・特徴抽出。通常のAEだけではpriorからの生成規則を保証しない。</td></tr>
                <tr><td><strong>DAE（Denoising Autoencoder／ノイズ除去オートエンコーダ）</strong></td><td>汚した入力 x̃ → 元のx</td><td>決定的な点 z</td><td>ノイズに頑健な表現を学ぶ。</td></tr>
                <tr><td><strong>VAE（Variational Autoencoder／変分オートエンコーダ）</strong></td><td>x → xを再構成</td><td>分布 q<sub>φ</sub>(z|x)</td><td>priorからサンプリングして生成できるように学ぶ。</td></tr>
            </table>
        </div>
        <div class="gm-note"><strong>KL＝Kullback–Leibler divergence（KLダイバージェンス）</strong>。VAEでは、入力ごとの潜在分布 q<sub>φ</sub>(z|x) を事前分布 p(z) に近づける役を持ちます。</div>

        <div class="gm-visual-wrap">
            <div class="gm-visual-card">
                <svg class="gm-wide-svg" viewBox="0 0 960 390" role="img" aria-labelledby="gm-vae-title gm-vae-desc">
                    <title id="gm-vae-title">VAEの学習経路と生成経路</title>
                    <desc id="gm-vae-desc">入力をEncoderで平均と対数分散へ変換し、外部ノイズを使って再パラメータ化した潜在変数をDecoderへ渡す。再構成損失とKL項を学び、生成時はpriorからDecoderだけを使う。</desc>
                    <defs><marker id="gm-arrow-vae" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#486581"></path></marker></defs>
                    <text x="20" y="28" class="gm-svg-title">VAE：点ではなく分布を経由する</text>
                    <rect x="20" y="48" width="920" height="242" class="gm-svg-blue"></rect>
                    <text x="38" y="74" class="gm-svg-label">学習時</text>
                    <rect x="40" y="106" width="80" height="48" class="gm-svg-box"></rect>
                    <text x="72" y="135" class="gm-svg-note">入力 x</text>
                    <line x1="126" y1="130" x2="168" y2="130" stroke="#486581" stroke-width="2" marker-end="url(#gm-arrow-vae)"></line>
                    <rect x="180" y="100" width="126" height="60" class="gm-svg-box"></rect>
                    <text x="202" y="124" class="gm-svg-note">Encoder</text>
                    <text x="195" y="145" class="gm-svg-mini">qφ(z|x)</text>
                    <line x1="312" y1="130" x2="354" y2="130" stroke="#486581" stroke-width="2" marker-end="url(#gm-arrow-vae)"></line>
                    <rect x="366" y="94" width="148" height="72" class="gm-svg-box"></rect>
                    <text x="386" y="119" class="gm-svg-note">μ・log σ²</text>
                    <text x="382" y="143" class="gm-svg-mini">σ=exp(½ log σ²)</text>
                    <rect x="608" y="44" width="78" height="34" class="gm-svg-purple"></rect>
                    <text x="622" y="66" class="gm-svg-mini">ε〜N(0,I)</text>
                    <line x1="647" y1="80" x2="647" y2="92" stroke="#486581" stroke-width="2" marker-end="url(#gm-arrow-vae)"></line>
                    <line x1="520" y1="130" x2="562" y2="130" stroke="#486581" stroke-width="2" marker-end="url(#gm-arrow-vae)"></line>
                    <rect x="574" y="94" width="146" height="72" class="gm-svg-purple"></rect>
                    <text x="591" y="120" class="gm-svg-note">z=μ+σ⊙ε</text>
                    <text x="590" y="144" class="gm-svg-mini">Reparameterization</text>
                    <line x1="726" y1="130" x2="768" y2="130" stroke="#486581" stroke-width="2" marker-end="url(#gm-arrow-vae)"></line>
                    <rect x="780" y="100" width="82" height="60" class="gm-svg-box"></rect>
                    <text x="794" y="124" class="gm-svg-note">Decoder</text>
                    <text x="793" y="145" class="gm-svg-mini">pθ(x|z)</text>
                    <line x1="868" y1="130" x2="898" y2="130" stroke="#486581" stroke-width="2" marker-end="url(#gm-arrow-vae)"></line>
                    <text x="907" y="135" class="gm-svg-note">x̂</text>

                    <rect x="112" y="202" width="282" height="58" class="gm-svg-box"></rect>
                    <text x="134" y="226" class="gm-svg-label">再構成損失</text>
                    <text x="134" y="248" class="gm-svg-mini">xとx̂を近づける</text>
                    <rect x="520" y="202" width="306" height="58" class="gm-svg-box"></rect>
                    <text x="542" y="226" class="gm-svg-label">KL項</text>
                    <text x="542" y="248" class="gm-svg-mini">qφ(z|x)をprior p(z)=N(0,I)へ近づける</text>

                    <rect x="20" y="310" width="920" height="58" class="gm-svg-green"></rect>
                    <text x="38" y="335" class="gm-svg-label">生成時：</text>
                    <text x="118" y="335" class="gm-svg-note">z〜N(0,I)</text>
                    <line x1="195" y1="331" x2="248" y2="331" stroke="#486581" stroke-width="2" marker-end="url(#gm-arrow-vae)"></line>
                    <text x="262" y="335" class="gm-svg-note">Decoder</text>
                    <line x1="325" y1="331" x2="378" y2="331" stroke="#486581" stroke-width="2" marker-end="url(#gm-arrow-vae)"></line>
                    <text x="392" y="335" class="gm-svg-note">新しいsample</text>
                    <text x="548" y="335" class="gm-svg-note">※Encoderは使わない</text>
                </svg>
                <p class="gm-caption"><strong>ここが試験の分かれ目：</strong>乱数そのものを微分するのではなく、εを外へ出して μ・σ を微分できる形にします。</p>
            </div>
        </div>

        <div class="gm-formula"><strong>ELBO（Evidence Lower Bound／変分下限）</strong> = E<sub>q</sub>[log p<sub>θ</sub>(x|z)] − KL(q<sub>φ</sub>(z|x) || p(z))</div>
        <div class="gm-formula"><strong>学習Loss（−ELBO）</strong> = 再構成損失 ＋ KL項　→ 最小化</div>

        <h3>■ GAN：本物と偽物を同じ判定器へ入れる</h3>
        <div class="gm-visual-wrap">
            <div class="gm-visual-card">
                <svg class="gm-wide-svg" viewBox="0 0 960 360" role="img" aria-labelledby="gm-gan-title gm-gan-desc">
                    <title id="gm-gan-title">GANのGeneratorとDiscriminatorの学習経路</title>
                    <desc id="gm-gan-desc">本物データとGeneratorが作る偽物を同じDiscriminatorへ入力し、Discriminatorは見分け、Generatorは偽物を本物と判定させるよう交互に学ぶ。</desc>
                    <defs><marker id="gm-arrow-gan" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#486581"></path></marker></defs>
                    <text x="20" y="28" class="gm-svg-title">GAN：Gが作り、Dが同じ物差しで判定する</text>
                    <rect x="20" y="48" width="920" height="218" class="gm-svg-red"></rect>
                    <rect x="42" y="78" width="120" height="48" class="gm-svg-green"></rect>
                    <text x="61" y="107" class="gm-svg-note">本物 x〜p_data</text>
                    <line x1="168" y1="102" x2="610" y2="119" stroke="#27ae60" stroke-width="2" marker-end="url(#gm-arrow-gan)"></line>

                    <rect x="42" y="176" width="120" height="48" class="gm-svg-purple"></rect>
                    <text x="66" y="205" class="gm-svg-note">noise z</text>
                    <line x1="168" y1="200" x2="224" y2="200" stroke="#486581" stroke-width="2" marker-end="url(#gm-arrow-gan)"></line>
                    <rect x="236" y="170" width="160" height="60" class="gm-svg-red"></rect>
                    <text x="255" y="195" class="gm-svg-label">Generator G</text>
                    <text x="255" y="216" class="gm-svg-mini">生成器ネットワーク</text>
                    <line x1="402" y1="200" x2="450" y2="200" stroke="#486581" stroke-width="2" marker-end="url(#gm-arrow-gan)"></line>
                    <rect x="462" y="176" width="110" height="48" class="gm-svg-box"></rect>
                    <text x="480" y="205" class="gm-svg-note">偽物 G(z)</text>
                    <line x1="578" y1="200" x2="610" y2="179" stroke="#d64545" stroke-width="2" marker-end="url(#gm-arrow-gan)"></line>

                    <rect x="622" y="100" width="174" height="100" class="gm-svg-purple"></rect>
                    <text x="642" y="137" class="gm-svg-label">Discriminator D</text>
                    <text x="642" y="159" class="gm-svg-mini">識別器ネットワーク</text>
                    <text x="642" y="181" class="gm-svg-mini">本物らしさ D(・)</text>
                    <line x1="802" y1="150" x2="838" y2="150" stroke="#486581" stroke-width="2" marker-end="url(#gm-arrow-gan)"></line>
                    <rect x="850" y="126" width="72" height="48" class="gm-svg-box"></rect>
                    <text x="860" y="155" class="gm-svg-mini">本物確率</text>

                    <rect x="20" y="286" width="446" height="52" class="gm-svg-purple"></rect>
                    <text x="38" y="308" class="gm-svg-label">Dを更新：</text>
                    <text x="118" y="308" class="gm-svg-note">D(x)→1、D(G(z))→0</text>
                    <rect x="494" y="286" width="446" height="52" class="gm-svg-red"></rect>
                    <text x="512" y="308" class="gm-svg-label">Gを更新：</text>
                    <text x="592" y="308" class="gm-svg-note">D(G(z))→1 を目指す</text>
                    <text x="38" y="330" class="gm-svg-mini">GとDを交互に更新する</text>
                    <text x="512" y="330" class="gm-svg-mini">zが違っても似た出力ばかり＝Mode Collapse</text>
                </svg>
            </div>
        </div>

        <div class="gm-formula"><strong>基本GAN：</strong>min<sub>G</sub> max<sub>D</sub> E<sub>x</sub>[log D(x)] + E<sub>z</sub>[log(1−D(G(z)))]</div>
        <div class="gm-note"><strong>BCE（Binary Cross-Entropy／二値交差エントロピー）</strong>で本物・偽物を学習します。実務でよく使うnon-saturating Generator lossは −E<sub>z</sub>[log D(G(z))]。「識別誤差率を最大化」ではなく、<strong>偽物を本物側へ判定させる</strong>と覚えます。</div>

        <div class="gm-table-wrap">
            <table class="gm-table">
                <tr><th>GAN系</th><th>核となる工夫</th><th>試験の合図</th></tr>
                <tr><td><strong>DCGAN（Deep Convolutional Generative Adversarial Network）</strong></td><td>畳み込み中心。G隠れ層はReLU（Rectified Linear Unit）・出力はtanh、D隠れ層はLeaky ReLU。</td><td>Poolingをstrided / transposed convolutionへ置換する設計指針。</td></tr>
                <tr><td><strong>WGAN（Wasserstein GAN）</strong></td><td>確率ではなく実数scoreを出すCriticとWasserstein距離を使う。</td><td>1-Lipschitz制約。原論文はweight clipping、WGAN-GP（WGAN with Gradient Penalty）はgradient penalty。</td></tr>
                <tr><td><strong>cGAN（Conditional GAN）</strong></td><td>条件cをGとDの両方へ入力する。</td><td>ラベルなどを指定して生成内容を制御。</td></tr>
                <tr><td><strong>CycleGAN</strong></td><td>対応ペアなしで領域X↔Yを変換。2つのGと2つのDを使う。</td><td>Cycle-consistency：F(G(x))≈x。</td></tr>
            </table>
        </div>

        <h3>■ DiffusionとFlow：どちらも分布を変換するが、道筋が違う</h3>
        <div class="gm-note"><strong>DDPM＝Denoising Diffusion Probabilistic Models</strong>。代表的な学習では、MSE（Mean Squared Error／平均二乗誤差）で加えたnoise εと予測noise ε̂の差を小さくします。</div>
        <div class="gm-visual-wrap">
            <div class="gm-visual-card">
                <svg class="gm-wide-svg" viewBox="0 0 960 410" role="img" aria-labelledby="gm-df-title gm-df-desc">
                    <title id="gm-df-title">拡散モデルとフローベース生成モデルの比較</title>
                    <desc id="gm-df-desc">拡散モデルはデータへ段階的にノイズを加え、学習した逆過程で反復的に除去する。フローはデータと単純分布を可逆変換で結び、ヤコビアンから厳密尤度を計算する。</desc>
                    <defs><marker id="gm-arrow-df" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#486581"></path></marker></defs>
                    <text x="20" y="28" class="gm-svg-title">Diffusion＝反復して戻す／Flow＝可逆変換で往復</text>
                    <rect x="20" y="48" width="450" height="338" class="gm-svg-green"></rect>
                    <text x="38" y="76" class="gm-svg-label">Diffusion Model（拡散モデル）</text>
                    <text x="38" y="103" class="gm-svg-note">Forward process：固定scheduleでGaussian noiseを加える</text>
                    <rect x="42" y="120" width="72" height="42" class="gm-svg-box"></rect>
                    <text x="60" y="146" class="gm-svg-note">x₀</text>
                    <line x1="120" y1="141" x2="174" y2="141" stroke="#486581" stroke-width="2" marker-end="url(#gm-arrow-df)"></line>
                    <rect x="186" y="120" width="72" height="42" class="gm-svg-box"></rect>
                    <text x="205" y="146" class="gm-svg-note">x_t</text>
                    <line x1="264" y1="141" x2="318" y2="141" stroke="#486581" stroke-width="2" marker-end="url(#gm-arrow-df)"></line>
                    <rect x="330" y="120" width="112" height="42" class="gm-svg-purple"></rect>
                    <text x="348" y="146" class="gm-svg-note">x_T（noise）</text>
                    <text x="38" y="194" class="gm-svg-note">Reverse process：学習したnetworkで反復denoise</text>
                    <line x1="412" y1="219" x2="348" y2="219" stroke="#27ae60" stroke-width="2" marker-end="url(#gm-arrow-df)"></line>
                    <text x="375" y="210" class="gm-svg-mini">x_T</text>
                    <line x1="320" y1="219" x2="256" y2="219" stroke="#27ae60" stroke-width="2" marker-end="url(#gm-arrow-df)"></line>
                    <text x="280" y="210" class="gm-svg-mini">…</text>
                    <line x1="228" y1="219" x2="164" y2="219" stroke="#27ae60" stroke-width="2" marker-end="url(#gm-arrow-df)"></line>
                    <text x="188" y="210" class="gm-svg-mini">x_t</text>
                    <line x1="136" y1="219" x2="72" y2="219" stroke="#27ae60" stroke-width="2" marker-end="url(#gm-arrow-df)"></line>
                    <text x="86" y="210" class="gm-svg-mini">x₀</text>
                    <rect x="42" y="258" width="400" height="92" class="gm-svg-box"></rect>
                    <text x="58" y="282" class="gm-svg-label">代表的DDPMの学習</text>
                    <text x="58" y="306" class="gm-svg-note">x₀＋時刻t＋noise ε → x_t → εθ(x_t,t)</text>
                    <text x="58" y="330" class="gm-svg-note">MSE(ε, ε̂)を小さくする</text>

                    <rect x="490" y="48" width="450" height="338" class="gm-svg-orange"></rect>
                    <text x="508" y="76" class="gm-svg-label">Flow-based Model（フローベース生成モデル）</text>
                    <text x="508" y="103" class="gm-svg-note">生成：単純分布 z → g⁻¹ → 複雑なデータ x</text>
                    <rect x="520" y="126" width="112" height="48" class="gm-svg-purple"></rect>
                    <text x="538" y="155" class="gm-svg-note">z〜N(0,I)</text>
                    <line x1="638" y1="150" x2="700" y2="150" stroke="#f39c12" stroke-width="2" marker-end="url(#gm-arrow-df)"></line>
                    <rect x="712" y="120" width="100" height="60" class="gm-svg-box"></rect>
                    <text x="731" y="145" class="gm-svg-note">g⁻¹</text>
                    <text x="727" y="166" class="gm-svg-mini">可逆変換</text>
                    <line x1="818" y1="150" x2="864" y2="150" stroke="#f39c12" stroke-width="2" marker-end="url(#gm-arrow-df)"></line>
                    <rect x="876" y="126" width="42" height="48" class="gm-svg-green"></rect>
                    <text x="892" y="155" class="gm-svg-note">x</text>
                    <text x="508" y="211" class="gm-svg-note">尤度計算：x → g → z（逆向きに戻す）</text>
                    <rect x="864" y="214" width="58" height="44" class="gm-svg-box"></rect>
                    <text x="888" y="241" class="gm-svg-note">x</text>
                    <line x1="854" y1="236" x2="800" y2="236" stroke="#486581" stroke-width="2" marker-end="url(#gm-arrow-df)"></line>
                    <rect x="700" y="214" width="90" height="44" class="gm-svg-orange"></rect>
                    <text x="741" y="241" class="gm-svg-note">g</text>
                    <line x1="690" y1="236" x2="616" y2="236" stroke="#486581" stroke-width="2" marker-end="url(#gm-arrow-df)"></line>
                    <rect x="530" y="214" width="76" height="44" class="gm-svg-box"></rect>
                    <text x="562" y="241" class="gm-svg-note">z</text>
                    <rect x="520" y="270" width="398" height="80" class="gm-svg-box"></rect>
                    <text x="538" y="294" class="gm-svg-note">○ 厳密なlog-likelihoodを計算可能</text>
                    <text x="538" y="317" class="gm-svg-note">△ 可逆でJacobianを計算できる構造が必要</text>
                    <text x="538" y="340" class="gm-svg-mini">基本形ではxとzを同次元にする</text>
                </svg>
            </div>
        </div>

        <div class="gm-formula"><strong>拡散の前向き過程：</strong>x<sub>t</sub> = √ᾱ<sub>t</sub> x<sub>0</sub> + √(1−ᾱ<sub>t</sub>) ε</div>
        <div class="gm-formula"><strong>Flowの変数変換：</strong>z=g(x) のとき、log p<sub>X</sub>(x) = log p<sub>Z</sub>(g(x)) + log |det J<sub>g</sub>(x)|</div>

        <h3>■ 自己回帰：確率を掛けて、1要素ずつ生成</h3>
        <div class="gm-core">
            <div class="gm-formula"><strong>p(x₁:T) = ∏<sub>t=1</sub><sup>T</sup> p(x<sub>t</sub> | x<sub>&lt;t</sub>)</strong></div>
            <ul class="gm-steps">
                <li>各要素を、それより前の要素を条件として予測する。</li>
                <li>正規化された尤度を計算しやすい一方、生成は原則として逐次的。</li>
                <li>この章では生成方式としての因数分解を扱い、Causal Mask等の内部計算はTransformer章へ任せる。</li>
            </ul>
        </div>

        <h3>■ 計算問題はこの表に当てはめる</h3>
        <div class="gm-table-wrap">
            <table class="gm-table">
                <tr><th>与えられるもの</th><th>使う式</th><th>見る場所</th></tr>
                <tr><td>各時刻の条件付き確率</td><td>全部を掛ける</td><td>自己回帰の系列確率</td></tr>
                <tr><td>μ・σ・ε</td><td>z=μ+σε</td><td>VAEのReparameterization</td></tr>
                <tr><td>再構成対数尤度・KL</td><td>ELBO=再構成対数尤度−KL</td><td>最大化か、−ELBO最小化か</td></tr>
                <tr><td>D(real)・D(fake)</td><td>−log D(real)−log(1−D(fake))</td><td>DiscriminatorのBCE（二値交差エントロピー）loss</td></tr>
                <tr><td>ᾱ<sub>t</sub>・x₀・ε</td><td>xₜ=√ᾱₜx₀+√(1−ᾱₜ)ε</td><td>拡散の時刻tのデータ</td></tr>
                <tr><td>p<sub>Z</sub>(g(x))・Jacobian</td><td>掛ける（logなら足す）</td><td>Flowのデータ密度</td></tr>
            </table>
        </div>

        <h3>■ 発展比較（本線を覚えた後）</h3>
        <div class="gm-table-wrap">
            <table class="gm-table">
                <tr><th>語</th><th>一言</th></tr>
                <tr><td><strong>Pix2Pix</strong></td><td>対応する入力・出力ペアで学ぶ画像変換cGAN。</td></tr>
                <tr><td><strong>FID（Fréchet Inception Distance）</strong></td><td>実画像と生成画像の特徴分布距離。一般に小さいほど近い。</td></tr>
                <tr><td><strong>Score-based Model</strong></td><td>対数密度の勾配 ∇<sub>x</sub>log p(x) を学ぶ。</td></tr>
                <tr><td><strong>初代StyleGAN</strong></td><td>Mapping NetworkとAdaINでstyleを制御。StyleGAN2は別方式へ発展。</td></tr>
                <tr><td><strong>VQ-VAE（Vector Quantized VAE）</strong></td><td>離散codebookを使う潜在表現。</td></tr>
                <tr><td><strong>CLIP（Contrastive Language-Image Pre-training）</strong></td><td>画像とテキストを近い埋め込み空間へ配置する対照学習モデル。</td></tr>
            </table>
        </div>

        <h3>■ 最後はこの表だけ</h3>
        <div class="gm-table-wrap">
            <table class="gm-table">
                <tr><th>問題文の合図</th><th>答える語</th><th>一言理由</th></tr>
                <tr><td>過去を条件に1要素ずつ生成</td><td><strong>Autoregressive（自己回帰）</strong></td><td>系列確率を条件付き確率の積へ分解。</td></tr>
                <tr><td>汚した入力から元データを復元</td><td><strong>DAE（Denoising Autoencoder／ノイズ除去オートエンコーダ）</strong></td><td>ノイズに頑健な表現を学ぶ。</td></tr>
                <tr><td>μ・logσ²・z=μ+σε</td><td><strong>VAE（Variational Autoencoder／変分オートエンコーダ）</strong></td><td>潜在変数を確率分布として扱う。</td></tr>
                <tr><td>再構成対数尤度−KLを最大化</td><td><strong>ELBO（Evidence Lower Bound／変分下限）</strong></td><td>−ELBOなら再構成損失＋KLを最小化。</td></tr>
                <tr><td>生成器Gと識別器Dが競う</td><td><strong>GAN（Generative Adversarial Network）</strong></td><td>Gは偽物を作り、Dは本物らしさを判定。</td></tr>
                <tr><td>同じ種類ばかり生成</td><td><strong>Mode Collapse</strong></td><td>生成分布の多様性が失われる。</td></tr>
                <tr><td>畳み込み中心・GはReLU・DはLeakyReLU</td><td><strong>DCGAN（Deep Convolutional Generative Adversarial Network）</strong></td><td>GANの安定学習の代表的設計指針。</td></tr>
                <tr><td>Critic・Wasserstein距離・1-Lipschitz</td><td><strong>WGAN（Wasserstein GAN）</strong></td><td>分布が離れていても有用な信号を得やすい。</td></tr>
                <tr><td>ラベル等の条件をGとDへ入力</td><td><strong>cGAN（Conditional GAN）</strong></td><td>生成する内容を条件で制御。</td></tr>
                <tr><td>ペアなし変換・往復して元へ</td><td><strong>CycleGAN</strong></td><td>Cycle-consistency lossを使う。</td></tr>
                <tr><td>段階的にノイズを加え、逆向きに除去</td><td><strong>DDPM（Denoising Diffusion Probabilistic Models）</strong></td><td>代表的実装はnoise εを予測する。</td></tr>
                <tr><td>可逆変換・Jacobian・厳密尤度</td><td><strong>Flow-based Model</strong></td><td>単純分布とデータ分布を往復する。</td></tr>
            </table>
        </div>
    `,

    questions: [
        {
            category: "識別モデルと生成モデル",
            question: "識別モデルが P(y|x) を学習するのに対し、生成モデルが学習しようとする確率はどれか。",
            options: ["P(x)、P(x,y)、または条件付き生成のP(x|c)", "P(y|x)だけ", "決定境界だけ", "Accuracyだけ"],
            answer: 0,
            explanation: "識別モデルは主に入力xからラベルyを求めるP(y|x)を扱います。生成モデルはデータ分布P(x)、生成的分類なら同時分布P(x,y)、条件付き生成ならP(x|c)を扱います。"
        },
        {
            category: "VAEの構造",
            question: "VAE (Variational Autoencoder) のEncoderが出力するものは何か。",
            options: ["近似事後q(z|x)のパラメータであるμとlogσ²など", "固定された潜在ベクトルだけ", "復元された画像", "クラスラベルだけ"],
            answer: 0,
            explanation: "実装では平均μとlog variance（logσ²）を出すのが代表的です。σ=exp(0.5 logσ²)とし、εを使ってzを作ります。"
        },
        {
            category: "Reparameterization Trick",
            question: "VAEにおいて「Reparameterization Trick」を用いる主な理由は何か。",
            options: ["確率的なサンプリングをεへ外出しし、μとσへ誤差逆伝播できるようにするため", "潜在次元を必ず1にするため", "画像を分類するため", "GeneratorとDiscriminatorを競わせるため"],
            answer: 0,
            explanation: "z=μ+σεと書けば、乱数εは外部から与え、学習対象μ・σを決定的な計算経路に置けます。"
        },
        {
            category: "GANの仕組み",
            question: "GAN (Generative Adversarial Network) におけるGenerator (生成器) の目的は何か。",
            options: ["Discriminatorが生成データを本物側と判定するようなデータを作る", "本物データを分類するだけ", "入力画像を必ず同じ画像へ復元する", "潜在変数の事後分布を推定する"],
            answer: 0,
            explanation: "GはD(G(z))を本物側へ近づけます。実務で代表的なnon-saturating lossは−log D(G(z))の最小化です。"
        },
        {
            category: "モード崩壊",
            question: "GANの学習における失敗例の一つ「モード崩壊 (Mode Collapse)」とはどのような現象か。",
            options: ["異なるノイズからも似たパターンばかりを生成し、多様性が失われる", "Generatorが必ずノイズだけを生成する", "Discriminatorの出力が常に0.5になる理想状態", "画像が平均化して少しぼやけるだけ"],
            answer: 0,
            explanation: "生成器が識別器を騙しやすい少数の出力へ集中し、真のデータ分布にある複数のmodeを覆えなくなる現象です。"
        },
        {
            category: "拡散モデルの概要",
            question: "拡散モデル (Diffusion Model) の画像生成プロセス（逆拡散過程）の基本的な動作はどれか。",
            options: ["ほぼ純粋なノイズから開始し、学習した逆過程で反復的にノイズを減らす", "潜在変数から必ず1回で生成する", "識別器だけで画像を作る", "画像を単に圧縮する"],
            answer: 0,
            explanation: "学習時のforward processは既知のscheduleで段階的にノイズを加えます。生成時は学習したreverse processで反復的にデータへ戻します。"
        },
        {
            category: "VAEの弱点",
            question: "一般的に、GANと比較した際のVAEの生成画像の特徴（弱点）は何か。",
            options: ["画素独立GaussianやMSE（Mean Squared Error／平均二乗誤差）型の再構成では、平均化されてぼやけやすい", "必ずノイズだけになる", "潜在空間を持てない", "生成時に識別器が必須"],
            answer: 0,
            explanation: "すべてのVAEが必ずぼやけるわけではありませんが、単純なGaussian尤度やMSE再構成では複数の可能性を平均化しやすい傾向があります。"
        },
        {
            category: "DCGAN",
            question: "GANの学習を安定させるために、全結合層の代わりに畳み込み層を使用するなどしたアーキテクチャを何と呼ぶか。",
            options: ["DCGAN (Deep Convolutional Generative Adversarial Network)", "CycleGAN", "WGAN", "VAE"],
            answer: 0,
            explanation: "DCGANは畳み込み中心の設計指針です。Generatorの隠れ層はReLU・出力はtanh、Discriminatorの隠れ層はLeaky ReLUが基本です。"
        },
        {
            category: "CycleGAN",
            question: "対応ペアではない画像データセット間（例：馬の集合とシマウマの集合）でのスタイル変換を可能にしたモデルはどれか。",
            options: ["CycleGAN", "DCGAN", "WGAN", "VAE"],
            answer: 0,
            explanation: "CycleGANは対応ペアを必要とせず、X→Y→Xで元へ戻るcycle-consistency lossを使います。"
        },
        {
            category: "VAEのKL項",
            question: "VAEの損失関数に含まれる「KLダイバージェンス」項の役割は何か。",
            options: ["近似事後q(z|x)を事前分布p(z)へ近づけ、priorから生成しやすくする", "画像を必ず鮮明にする", "再構成損失そのもの", "潜在次元を増やす"],
            answer: 0,
            explanation: "KL項はqφ(z|x)とprior p(z)の整合性を高めます。これにより、生成時にp(z)から引いたzをDecoderへ入れやすくなります。"
        },
        {
            category: "GANの損失関数（理論）",
            question: "標準的なGANの損失関数は、数理的にはどのようなダイバージェンスの最小化と解釈できるか。",
            options: ["最適なDiscriminatorのもとでのJensen-Shannon (JS) ダイバージェンス", "KLダイバージェンスだけ", "IoU", "コサイン類似度"],
            answer: 0,
            explanation: "元のminimax GANでは、Dが最適なとき、Gは実分布と生成分布のJSダイバージェンスを小さくする解釈になります。一般のGANすべてにそのまま当てはめない点に注意します。"
        },
        {
            category: "WGAN",
            question: "GANの学習不安定性を改善するために、「Wasserstein距離」を導入したモデルは何か。",
            options: ["WGAN (Wasserstein GAN)", "DCGAN", "CycleGAN", "VAE"],
            answer: 0,
            explanation: "WGANは実数scoreを出すCriticと1-Lipschitz制約を使い、分布が離れている場合にも有用な学習信号を得やすくします。"
        },
        {
            category: "拡散モデルの学習",
            question: "拡散モデル（DDPM：Denoising Diffusion Probabilistic Models）の学習時に、ニューラルネットワーク（U-Net等）が予測するターゲットは具体的に何か。",
            options: ["代表的なε予測パラメータ化では、加えられたnoise ε", "常にクラスラベルだけ", "Discriminatorのscore", "FlowのJacobian"],
            answer: 0,
            explanation: "代表的DDPMではεθ(xₜ,t)で加えたnoise εを予測します。x₀予測やv予測など別のパラメータ化もあるため、拡散モデルすべてが必ずεだけを予測するとは限りません。"
        },
        {
            category: "Conditional GAN",
            question: "「Conditional GAN (cGAN)」において、生成したい画像の条件（ラベルなど）はどのようにモデルに入力されるか。",
            options: ["GeneratorとDiscriminatorの両方へ入力する", "Generatorだけ", "Discriminatorだけ", "どちらにも入れない"],
            answer: 0,
            explanation: "Gは条件に沿って生成し、Dは『その条件に合う本物か』を判定します。そのため条件cを両方へ渡します。"
        },
        { id:"gen-dae", category:"Denoising Autoencoder", question:"Denoising Autoencoderの学習方法はどれか。", options:["汚した入力から元のクリーン入力を復元する", "入力を分類するだけ", "識別器と敵対させる", "報酬を最大化する"], answer:0, explanation:"入力x̃にはnoiseを加えますが、教師は元のxです。単なる恒等写像ではなく、noiseに頑健な表現を学びます。" },
        { id:"gen-ae-bottleneck", category:"Autoencoder", question:"Undercomplete AutoencoderのBottleneckの目的はどれか。", options:["入力より低次元へ圧縮し、再構成に重要な特徴を抽出させる", "出力次元を無限にする", "分類ラベルを追加する", "勾配を止める"], answer:0, explanation:"容量を制限し、単純な恒等写像を避けて再構成に必要な情報をzへ持たせます。" },
        { id:"gen-vae-reparam-calc", category:"VAE Reparameterization（計算）", kind:"計算", question:"$z=\\mu+\\sigma\\epsilon$で$\\mu=2,\\sigma=0.5,\\epsilon=-1$ならzはいくつか。", options:["1.5", "2.5", "1", "-1.5"], answer:0, explanation:"$2+0.5\\times(-1)=1.5$です。noiseをεへ外出ししてμ・σへ勾配を流します。" },
        { id:"gen-elbo-sign", category:"VAE ELBO", question:"VAEのELBOとして正しい形はどれか。", options:["再構成対数尤度 − $D_{KL}(q(z|x)||p(z))$", "再構成損失＋Accuracy", "GAN lossだけ", "報酬−TD誤差"], answer:0, explanation:"ELBO最大化は、負のELBOである『再構成損失＋KL項』の最小化と対応します。" },
        { id:"gen-flow", category:"フローベース生成モデル", question:"フローベース生成モデルの主要な特徴はどれか。", options:["可逆変換と変数変換公式により厳密尤度を計算できる", "Discriminatorが必須", "逆変換できない", "noiseを段階的に加えるだけ"], answer:0, explanation:"単純分布とdata分布を可逆写像で結び、Jacobian determinantで密度を変換します。" },
        { id:"gen-flow-tradeoff", category:"フローベース（制約）", question:"フローベースモデルの設計上の代表的制約はどれか。", options:["変換を可逆かつJacobian計算可能にする必要がある", "lossが微分不能", "潜在次元を必ず1にする", "画像を扱えない"], answer:0, explanation:"厳密尤度と逆生成のため、network構造へ可逆性とJacobian計算容易性の制約がかかります。" },
        { id:"gen-wgan", category:"Wasserstein GAN", question:"WGANのCriticと通常GANのDiscriminatorの違いとして正しいものはどれか。", options:["Criticは確率に限定しない実数scoreを出し、1-Lipschitz制約を課す", "Criticは必ず0か1だけを返す", "CriticはGeneratorである", "WGANには実dataを使わない"], answer:0, explanation:"WGANのCriticはreal/fake確率ではなく実数scoreを出します。原論文はweight clipping、WGAN-GPはgradient penaltyでLipschitz制約を実現します。" },
        { id:"gen-diffusion-forward", category:"拡散モデル（数式理解）", question:"DDPMのforward processで時刻tが進むにつれて一般に起きることはどれか。", options:["dataへ段階的にGaussian noiseが加わり、単純なnoise分布へ近づく", "noiseが必ず一度で消える", "識別器が生成器を分類する", "潜在変数が離散化される"], answer:0, explanation:"forward processは既知のscheduleで徐々にnoiseを加えます。reverse processはnetworkが学習します。" },

        { id:"gen-autoregressive-definition", category:"自己回帰", question:"自己回帰型生成モデルの特徴として正しいものはどれか。", options:["過去の要素を条件に次の要素を1つずつ生成し、系列確率を条件付き確率の積へ分解する", "全要素を互いに無関係として生成する", "必ずGeneratorとDiscriminatorを競わせる", "可逆変換だけを使う"], answer:0, explanation:"$p(x_{1:T})=\\prod_t p(x_t|x_{1:t-1})$です。尤度を計算しやすい一方、生成は逐次的になりやすい特徴があります。" },
        { id:"gen-family-compare", category:"生成モデル比較", question:"生成モデル族と特徴の対応として正しいものはどれか。", options:["自己回帰＝逐次尤度、GAN＝敵対学習、Diffusion＝反復denoise、Flow＝可逆変換", "自己回帰＝可逆変換、GAN＝ELBO、Diffusion＝Cycle loss、Flow＝識別境界", "すべてDiscriminatorが必須", "すべて厳密尤度を計算できる"], answer:0, explanation:"各方式の一語対応を固定します。GANは一般に明示的尤度を直接計算せず、Diffusionは反復sampling、Flowは可逆性が核です。" },
        { id:"gen-ae-vs-vae", category:"AEとVAE", question:"通常のAutoencoderとVAEの違いとして正しいものはどれか。", options:["通常AEは決定的なzで再構成し、VAEはq(z|x)とpriorをELBOで結ぶ", "通常AEにも必ずKL項がある", "VAEはEncoderを持たない", "通常AEだけが確率分布を出す"], answer:0, explanation:"通常AEは圧縮・再構成が主目的です。VAEは近似事後をpriorへ整合させ、priorからのsample生成を可能にします。" },
        { id:"gen-elbo-calc", category:"VAE ELBO（計算）", kind:"計算", question:"再構成対数尤度が−8、KL項が2のとき、ELBO（Evidence Lower Bound／変分下限）と学習Loss（−ELBO）はどれか。", options:["ELBO=−10、Loss=10", "ELBO=−6、Loss=6", "ELBO=10、Loss=−10", "ELBO=2、Loss=8"], answer:0, explanation:"ELBO=−8−2=−10です。学習で最小化する−ELBOは10です。符号を逆にしないことが重要です。" },
        { id:"gen-gaussian-kl-calc", category:"VAE KL（計算）", kind:"計算", question:"$D_{KL}(N(\\mu,\\sigma^2)||N(0,1))=\\frac12(\\mu^2+\\sigma^2-\\log\\sigma^2-1)$。$\\mu=1,\\sigma=1$のときKLはいくつか。", options:["0.5", "0", "1", "2"], answer:0, explanation:"$\\frac12(1^2+1^2-\\log1-1)=\\frac12(1+1-0-1)=0.5$です。" },
        { id:"gen-discriminator-role", category:"GANの識別器", question:"標準GANのDiscriminatorを更新するときの目標はどれか。", options:["D(real)を1へ、D(fake)を0へ近づける", "D(real)とD(fake)を両方1へする", "noise zを復元する", "KL項を最大化する"], answer:0, explanation:"Dは本物と偽物を見分けます。一方G更新時はD(G(z))を1側へ近づけます。" },
        { id:"gen-gan-bce-calc", category:"GAN Loss（計算）", kind:"計算", question:"D(real)=0.8、D(fake)=0.3のとき、Dの1組分のBCE（Binary Cross-Entropy／二値交差エントロピー）loss $-\\ln D(real)-\\ln(1-D(fake))$ は約いくつか。$-\\ln0.8\\approx0.22,-\\ln0.7\\approx0.36$とする。", options:["0.58", "0.14", "1.10", "1.60"], answer:0, explanation:"$-\\ln0.8-\\ln(1-0.3)=0.22+0.36=0.58$です。fake側は$-\\ln D(fake)$ではなく$-\\ln(1-D(fake))$です。" },
        { id:"gen-dcgan-activations", category:"DCGAN", question:"DCGANの代表的な活性化関数の組合せとして正しいものはどれか。", options:["G隠れ層ReLU・G出力tanh・D隠れ層LeakyReLU", "GもDも全層Sigmoid", "G隠れ層LeakyReLU・D隠れ層ReLUだけ", "G出力ReLU・D出力tanh"], answer:0, explanation:"GeneratorとDiscriminatorで同じ活性化を使うわけではありません。G出力tanh、D隠れ層LeakyReLUが頻出です。" },
        { id:"gen-cycle-loss-calc", category:"CycleGAN（計算）", kind:"計算", question:"x=(1,2)、F(G(x))=(0.8,2.3)のとき、L1 cycle loss $|1-0.8|+|2-2.3|$ はいくつか。", options:["0.5", "0.1", "1.5", "2.5"], answer:0, explanation:"$0.2+0.3=0.5$です。変換して戻した結果が元入力からどれだけずれたかを測ります。" },
        { id:"gen-diffusion-xt-calc", category:"拡散モデル（計算）", kind:"計算", question:"$x_t=\\sqrt{\\bar\\alpha_t}x_0+\\sqrt{1-\\bar\\alpha_t}\\epsilon$。$\\bar\\alpha_t=0.64,x_0=2,\\epsilon=-1$のとき$x_t$はいくつか。", options:["1.0", "1.3", "1.6", "2.2"], answer:0, explanation:"$\\sqrt{0.64}=0.8,\\sqrt{0.36}=0.6$なので、$0.8\\times2+0.6\\times(-1)=1.6-0.6=1.0$です。" },
        { id:"gen-flow-jacobian-calc", category:"Flow（計算）", kind:"計算", question:"dataからlatentへの変換が$z=g(x)=2x$で、$p_Z(g(x))=0.1$とする。$p_X(x)=p_Z(g(x))|dg/dx|$はいくつか。", options:["0.2", "0.05", "0.1", "2.0"], answer:0, explanation:"$|dg/dx|=2$なので、$p_X(x)=0.1\\times2=0.2$です。可逆変換による体積変化をJacobianで補正します。" }
    ]
};
