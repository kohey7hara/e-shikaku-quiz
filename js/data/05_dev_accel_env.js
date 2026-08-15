window.quizData = {
    title: "5-（３）アクセラレータ・5-（４）環境構築",

    cheatSheet: `
        <style>
            .acc-core { background:#eef8f8; border-left:5px solid #35b9c5; border-radius:0 10px 10px 0; padding:14px 18px; margin:12px 0 22px; }
            .acc-note { background:#fff8e8; border-left:5px solid #f39c12; border-radius:0 10px 10px 0; padding:12px 16px; margin:12px 0 22px; }
            .acc-formula { background:#f7f9fc; border:1px solid #d9e2ec; border-radius:8px; padding:11px 14px; margin:10px 0 22px; overflow-x:auto; }
            .acc-table-wrap { overflow-x:auto; margin:12px 0 22px; }
            .acc-table { width:100%; min-width:780px; border-collapse:collapse; }
            .acc-table th { background:#eaf2fb; color:#102a43; text-align:left; padding:10px; border:1px solid #d9e2ec; }
            .acc-table td { padding:10px; border:1px solid #d9e2ec; vertical-align:top; }
            .acc-visual-wrap { overflow-x:auto; margin:14px 0 22px; }
            .acc-visual-card { min-width:990px; border:1px solid #d9e2ec; border-radius:12px; background:#fff; padding:12px; box-sizing:border-box; }
            .acc-wide-svg { display:block; width:100%; min-width:960px; height:auto; }
            .acc-svg-title { font-size:16px; font-weight:700; fill:#102a43; }
            .acc-svg-label { font-size:13px; font-weight:700; fill:#102a43; }
            .acc-svg-note { font-size:12px; fill:#334e68; }
            .acc-svg-mini { font-size:11px; fill:#486581; }
            .acc-box { fill:#fff; stroke:#cbd5e1; stroke-width:1.5; }
            .acc-blue { fill:#eef7fb; stroke:#2780b8; stroke-width:1.5; }
            .acc-green { fill:#eafaf1; stroke:#27ae60; stroke-width:1.5; }
            .acc-orange { fill:#fff8e7; stroke:#f39c12; stroke-width:1.5; }
            .acc-purple { fill:#f7f0ff; stroke:#8e44ad; stroke-width:1.5; }
            .acc-gray { fill:#f1f5f9; stroke:#94a3b8; stroke-width:1.5; }
            .acc-caption { margin:8px 8px 0; color:#334e68; }
        </style>

        <h3>■ まず全体：「命令の流し方」と「環境の分け方」を見分ける</h3>
        <div class="acc-core"><strong>アクセラレータ</strong>は計算をどう並列化するか、<strong>仮想化</strong>は1台のhardware上へ環境をどう分けるかを学ぶ章です。</div>
        <div class="acc-note"><strong>先に略語：</strong>CPU＝Central Processing Unit（中央処理装置）、GPU＝Graphics Processing Unit（画像処理装置）、TPU＝Tensor Processing Unit（テンソル処理装置）、VM＝Virtual Machine（仮想マシン）、OS＝Operating System（基本ソフト）です。</div>
        <div class="acc-note"><strong>3つの実行方式：</strong>SIMD＝Single Instruction, Multiple Data（1命令・複数data）、SIMT＝Single Instruction, Multiple Threads（1命令列・複数thread）、MIMD＝Multiple Instruction, Multiple Data（複数命令列・複数data）です。</div>
        <div class="acc-note"><strong>先に用語：</strong>vector＝複数の数値を並べたまとまり、lane＝同じ命令を処理する演算の通り道、thread＝独立した実行単位、register＝threadが使う高速な一時記憶、throughput＝単位時間あたりの処理量、workload＝処理する仕事の内容、kernel＝OSの中核、Hypervisor＝VMを作成・管理する仮想化層、Guest OS＝VM内のOS、container runtime＝containerを実行・管理するsoftware、image＝containerの読取専用templateです。</div>
        <div class="acc-table-wrap"><table class="acc-table">
            <tr><th>問題文の合図</th><th>選ぶ語</th><th>見るポイント</th></tr>
            <tr><td>1命令でvectorの複数data</td><td><strong>SIMD</strong></td><td>命令1本・演算lane複数。</td></tr>
            <tr><td>多数threadが同じ命令列</td><td><strong>SIMT</strong></td><td>GPUの代表的な実行model。</td></tr>
            <tr><td>複数の命令列を独立実行</td><td><strong>MIMD</strong></td><td>coreごとに別の処理が可能。</td></tr>
            <tr><td>大量の行列演算を汎用的に並列処理</td><td><strong>GPU</strong></td><td>高いthroughput。</td></tr>
            <tr><td>AIのtensor・行列演算へ特化</td><td><strong>TPU</strong></td><td>対応workloadで高効率。</td></tr>
            <tr><td>Host OS上のsoftwareでVM</td><td><strong>ホスト型</strong></td><td>仮想化softwareがapplicationとして動く。</td></tr>
            <tr><td>hardware直上でVMを管理</td><td><strong>ハイパーバイザー型</strong></td><td>Host OSを挟まない。</td></tr>
            <tr><td>Host kernelを共有</td><td><strong>コンテナ型</strong></td><td>Guest OSをcontainerごとに持たない。</td></tr>
            <tr><td>container imageの作り方を書く</td><td><strong>Dockerfile</strong></td><td>build手順をtextで保存。</td></tr>
        </table></div>

        <h3>■ アクセラレータ：SIMD・SIMT・MIMDを図で見分ける</h3>
        <div class="acc-visual-wrap"><div class="acc-visual-card">
            <svg class="acc-wide-svg" viewBox="0 0 960 500" role="img" aria-labelledby="acc-flow-title acc-flow-desc">
                <title id="acc-flow-title">SIMD、SIMT、MIMDの命令とデータの流れ</title>
                <desc id="acc-flow-desc">1命令で複数データを扱うSIMD、多数スレッドが同じ命令列を実行するSIMT、複数命令列を独立実行するMIMDを比較する。</desc>
                <defs><marker id="acc-arrow-flow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#486581"></path></marker></defs>
                <text x="20" y="28" class="acc-svg-title">同時に動くものは「lane」「thread」「命令列」のどれか</text>
                <rect x="20" y="48" width="920" height="118" rx="12" class="acc-blue"></rect>
                <text x="40" y="77" class="acc-svg-label">SIMD（Single Instruction, Multiple Data）＝1命令 × 複数data</text>
                <rect x="50" y="98" width="110" height="42" rx="7" class="acc-purple"></rect><text x="77" y="124" class="acc-svg-note">ADD命令 1本</text>
                <line x1="170" y1="119" x2="220" y2="119" stroke="#486581" stroke-width="2" marker-end="url(#acc-arrow-flow)"></line>
                <rect x="234" y="92" width="128" height="54" rx="7" class="acc-box"></rect><text x="252" y="114" class="acc-svg-note">Lane 1〜4</text><text x="252" y="134" class="acc-svg-mini">同じ演算を並列</text>
                <line x1="372" y1="119" x2="422" y2="119" stroke="#486581" stroke-width="2" marker-end="url(#acc-arrow-flow)"></line>
                <rect x="436" y="92" width="70" height="54" rx="7" class="acc-green"></rect><text x="456" y="124" class="acc-svg-note">D1</text>
                <rect x="518" y="92" width="70" height="54" rx="7" class="acc-green"></rect><text x="538" y="124" class="acc-svg-note">D2</text>
                <rect x="600" y="92" width="70" height="54" rx="7" class="acc-green"></rect><text x="620" y="124" class="acc-svg-note">D3</text>
                <rect x="682" y="92" width="70" height="54" rx="7" class="acc-green"></rect><text x="702" y="124" class="acc-svg-note">D4</text>
                <text x="780" y="112" class="acc-svg-note">代表：CPUの</text><text x="780" y="133" class="acc-svg-note">vector命令</text>

                <rect x="20" y="184" width="920" height="150" rx="12" class="acc-green"></rect>
                <text x="40" y="213" class="acc-svg-label">SIMT（Single Instruction, Multiple Threads）＝同じ命令列 × 多数thread</text>
                <rect x="50" y="239" width="134" height="54" rx="7" class="acc-purple"></rect><text x="69" y="261" class="acc-svg-note">命令列 A→B→C</text><text x="69" y="281" class="acc-svg-mini">同じprogram</text>
                <line x1="194" y1="266" x2="236" y2="266" stroke="#486581" stroke-width="2" marker-end="url(#acc-arrow-flow)"></line>
                <rect x="250" y="239" width="100" height="54" rx="7" class="acc-box"></rect><text x="269" y="261" class="acc-svg-note">Thread 1</text><text x="279" y="281" class="acc-svg-mini">data 1</text>
                <rect x="362" y="239" width="100" height="54" rx="7" class="acc-box"></rect><text x="381" y="261" class="acc-svg-note">Thread 2</text><text x="391" y="281" class="acc-svg-mini">data 2</text>
                <rect x="474" y="239" width="100" height="54" rx="7" class="acc-box"></rect><text x="493" y="261" class="acc-svg-note">Thread 3</text><text x="503" y="281" class="acc-svg-mini">data 3</text>
                <text x="612" y="251" class="acc-svg-note">代表：GPU。threadごとにregister・dataを持つ。</text>
                <text x="612" y="278" class="acc-svg-note">同じgroup内で条件分岐が割れると両経路を順に処理し、</text>
                <text x="612" y="301" class="acc-svg-note">branch divergence（分岐のばらつき）で効率が下がる。</text>

                <rect x="20" y="352" width="920" height="126" rx="12" class="acc-orange"></rect>
                <text x="40" y="381" class="acc-svg-label">MIMD（Multiple Instruction, Multiple Data）＝複数命令列 × 複数data</text>
                <rect x="52" y="404" width="184" height="50" rx="7" class="acc-box"></rect><text x="70" y="425" class="acc-svg-note">Core 1：命令A</text><text x="158" y="445" class="acc-svg-mini">→ data 1</text>
                <rect x="252" y="404" width="184" height="50" rx="7" class="acc-box"></rect><text x="270" y="425" class="acc-svg-note">Core 2：命令B</text><text x="358" y="445" class="acc-svg-mini">→ data 2</text>
                <rect x="452" y="404" width="184" height="50" rx="7" class="acc-box"></rect><text x="470" y="425" class="acc-svg-note">Core 3：命令C</text><text x="558" y="445" class="acc-svg-mini">→ data 3</text>
                <text x="678" y="422" class="acc-svg-note">各coreが独立して別の命令を実行。</text>
                <text x="678" y="447" class="acc-svg-note">代表：multicore CPU・複数processor。</text>
            </svg>
            <p class="acc-caption"><strong>最短暗記：</strong>SIMD＝lane、SIMT＝thread、MIMD＝独立した命令列。</p>
        </div></div>

        <div class="acc-table-wrap"><table class="acc-table">
            <tr><th>device</th><th>構造・実行model</th><th>得意な処理</th><th>注意</th></tr>
            <tr><td><strong>CPU</strong>（比較用）</td><td>少数の高性能core。MIMDとSIMDを利用。</td><td>複雑な分岐・逐次処理・低遅延処理。</td><td>GPUより並列lane数は少ないが、並列計算ができないわけではない。</td></tr>
            <tr><td><strong>GPU</strong></td><td>多数の演算器・threadをSIMTで実行。</td><td>行列積など同種計算の大量並列処理。</td><td>分岐の多い処理や頻繁なdata転送では効率が下がり得る。</td></tr>
            <tr><td><strong>TPU</strong></td><td>AIのtensor演算へ特化。dataを規則的に流すsystolic arrayが代表。</td><td>対応する行列・tensor演算を高効率に処理。</td><td>汎用CPUの完全な代替ではなく、対応workloadで強い。</td></tr>
        </table></div>
        <div class="acc-formula"><strong>計算で使う公式（理想的なSIMD命令数）</strong><br>
            $N_{inst}=\\left\\lceil N/W\\right\\rceil$<br>
            $N$＝処理するdata数、$W$＝SIMD幅（1命令で処理できるdata数）、$\\lceil \\rceil$＝端数切り上げ。
        </div>

        <h3>■ 環境構築：3種類の仮想化とDockerの流れ</h3>
        <div class="acc-visual-wrap"><div class="acc-visual-card">
            <svg class="acc-wide-svg" viewBox="0 0 960 690" role="img" aria-labelledby="acc-virt-title acc-virt-desc">
                <title id="acc-virt-title">ホスト型、ハイパーバイザー型、コンテナ型の構造とDockerの流れ</title>
                <desc id="acc-virt-desc">3種類の仮想化stackを比較し、Dockerfileからimageをbuildしてcontainerを起動する流れを示す。</desc>
                <defs><marker id="acc-arrow-virt" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#486581"></path></marker></defs>
                <text x="20" y="28" class="acc-svg-title">上へ読む：HardwareからAppまでに何を挟むか</text>
                <rect x="20" y="48" width="292" height="410" rx="12" class="acc-blue"></rect>
                <text x="40" y="77" class="acc-svg-label">ホスト型（Type 2）</text>
                <text x="40" y="99" class="acc-svg-mini">普段のOS上で仮想化softwareを動かす</text>
                <rect x="54" y="128" width="224" height="45" rx="6" class="acc-green"></rect><text x="144" y="156" class="acc-svg-note">App</text>
                <rect x="54" y="178" width="224" height="45" rx="6" class="acc-orange"></rect><text x="127" y="206" class="acc-svg-note">Guest OS</text>
                <rect x="54" y="228" width="224" height="54" rx="6" class="acc-purple"></rect><text x="91" y="250" class="acc-svg-note">Hosted virtualization</text><text x="120" y="270" class="acc-svg-mini">software</text>
                <rect x="54" y="287" width="224" height="45" rx="6" class="acc-gray"></rect><text x="130" y="315" class="acc-svg-note">Host OS</text>
                <rect x="54" y="337" width="224" height="45" rx="6" fill="#334e68" stroke="#102a43"></rect><text x="127" y="365" font-size="12" fill="#fff">Hardware</text>
                <text x="54" y="410" class="acc-svg-note">導入しやすいが、Host OSを挟む。</text>
                <text x="54" y="435" class="acc-svg-mini">例：desktop上で別OSを動かす。</text>

                <rect x="334" y="48" width="292" height="410" rx="12" class="acc-orange"></rect>
                <text x="354" y="77" class="acc-svg-label">ハイパーバイザー型（Type 1）</text>
                <text x="354" y="99" class="acc-svg-mini">hardware直上で複数VMを管理</text>
                <rect x="368" y="128" width="224" height="45" rx="6" class="acc-green"></rect><text x="458" y="156" class="acc-svg-note">App</text>
                <rect x="368" y="178" width="224" height="45" rx="6" class="acc-orange"></rect><text x="441" y="206" class="acc-svg-note">Guest OS</text>
                <rect x="368" y="228" width="224" height="54" rx="6" class="acc-purple"></rect><text x="436" y="260" class="acc-svg-note">Hypervisor</text>
                <rect x="368" y="287" width="224" height="95" rx="6" fill="#334e68" stroke="#102a43"></rect><text x="441" y="340" font-size="12" fill="#fff">Hardware</text>
                <text x="368" y="410" class="acc-svg-note">Host OSを挟まず、server用途で代表。</text>
                <text x="368" y="435" class="acc-svg-mini">各VMは独自のGuest OSを持つ。</text>

                <rect x="648" y="48" width="292" height="410" rx="12" class="acc-green"></rect>
                <text x="668" y="77" class="acc-svg-label">コンテナ型</text>
                <text x="668" y="99" class="acc-svg-mini">Host kernelを共有してprocessを隔離</text>
                <rect x="674" y="128" width="116" height="70" rx="6" class="acc-blue"></rect><text x="707" y="154" class="acc-svg-note">App A</text><text x="694" y="178" class="acc-svg-mini">＋ libraries</text>
                <rect x="798" y="128" width="116" height="70" rx="6" class="acc-blue"></rect><text x="831" y="154" class="acc-svg-note">App B</text><text x="818" y="178" class="acc-svg-mini">＋ libraries</text>
                <rect x="674" y="208" width="240" height="54" rx="6" class="acc-purple"></rect><text x="721" y="231" class="acc-svg-note">Container runtime</text><text x="765" y="251" class="acc-svg-mini">Docker</text>
                <rect x="674" y="272" width="240" height="60" rx="6" class="acc-gray"></rect><text x="724" y="297" class="acc-svg-note">Host OS / kernel</text><text x="724" y="318" class="acc-svg-mini">全containerで共有</text>
                <rect x="674" y="342" width="240" height="40" rx="6" fill="#334e68" stroke="#102a43"></rect><text x="755" y="367" font-size="12" fill="#fff">Hardware</text>
                <text x="674" y="410" class="acc-svg-note">Guest OSを個別に持たず軽量・高速起動。</text>
                <text x="674" y="435" class="acc-svg-mini">VMとは隔離境界とkernel共有が違う。</text>

                <text x="20" y="500" class="acc-svg-title">Docker：設計図から実行実体まで</text>
                <rect x="34" y="530" width="216" height="92" rx="10" class="acc-orange"></rect><text x="100" y="558" class="acc-svg-label">Dockerfile</text><text x="55" y="582" class="acc-svg-note">FROM / COPY / RUN / CMD</text><text x="77" y="604" class="acc-svg-mini">build手順を書くtext</text>
                <line x1="260" y1="576" x2="354" y2="576" stroke="#486581" stroke-width="2" marker-end="url(#acc-arrow-virt)"></line><text x="279" y="560" class="acc-svg-note">docker build</text>
                <rect x="368" y="530" width="216" height="92" rx="10" class="acc-purple"></rect><text x="437" y="558" class="acc-svg-label">Image</text><text x="413" y="582" class="acc-svg-note">読取専用template</text><text x="408" y="604" class="acc-svg-mini">layerを重ねて保存</text>
                <line x1="594" y1="576" x2="688" y2="576" stroke="#486581" stroke-width="2" marker-end="url(#acc-arrow-virt)"></line><text x="617" y="560" class="acc-svg-note">docker run</text>
                <rect x="702" y="530" width="216" height="92" rx="10" class="acc-green"></rect><text x="759" y="558" class="acc-svg-label">Container</text><text x="756" y="582" class="acc-svg-note">実行中の実体</text><text x="739" y="604" class="acc-svg-mini">1 imageから複数起動可</text>
                <text x="34" y="655" class="acc-svg-note">覚え方：Dockerfile＝recipe、Image＝完成した型、Container＝その型を動かした実体。</text>
            </svg>
        </div></div>

        <div class="acc-table-wrap"><table class="acc-table">
            <tr><th>方式</th><th>仮想化層の場所</th><th>Guest OS</th><th>特徴</th></tr>
            <tr><td><strong>ホスト型</strong></td><td>Host OS上のapplication</td><td>VMごとに持つ</td><td>導入しやすいが、Host OS分のoverheadがある。</td></tr>
            <tr><td><strong>ハイパーバイザー型</strong></td><td>hardware直上</td><td>VMごとに持つ</td><td>Host OSを挟まず、server基盤で代表的。</td></tr>
            <tr><td><strong>コンテナ型</strong></td><td>Host OS上のcontainer runtime</td><td>個別には持たずHost kernelを共有</td><td>軽量・高速起動。VMと隔離の仕組みが異なる。</td></tr>
        </table></div>
        <div class="acc-table-wrap"><table class="acc-table">
            <tr><th>Dockerfile命令</th><th>役割</th><th>実行される時点</th></tr>
            <tr><td><code>FROM</code></td><td>土台にするbase imageを指定</td><td>buildの開始</td></tr>
            <tr><td><code>COPY</code></td><td>build contextからfileをimageへcopy</td><td>build時</td></tr>
            <tr><td><code>RUN</code></td><td>package導入などを実行し、image layerへ保存</td><td>build時</td></tr>
            <tr><td><code>CMD</code></td><td>container起動時の既定commandを指定</td><td>run時（上書き可能）</td></tr>
        </table></div>

        <h3>■ 最後はこの表だけ</h3>
        <div class="acc-table-wrap"><table class="acc-table">
            <tr><th>問題文の合図</th><th>答える語</th><th>一言理由</th></tr>
            <tr><td>1命令・複数data lane</td><td><strong>SIMD</strong></td><td>vectorへ同じ演算を適用。</td></tr>
            <tr><td>同じ命令列・多数thread</td><td><strong>SIMT</strong></td><td>GPUの代表。分岐divergenceに注意。</td></tr>
            <tr><td>複数命令列・複数data</td><td><strong>MIMD</strong></td><td>coreごとに独立実行。</td></tr>
            <tr><td>多数thread・高throughput</td><td><strong>GPU</strong></td><td>行列演算の大量並列に向く。</td></tr>
            <tr><td>AIのtensor演算へ特化</td><td><strong>TPU</strong></td><td>対応workloadを高効率化。</td></tr>
            <tr><td>Host OS上でVM</td><td><strong>ホスト型</strong></td><td>仮想化softwareがapplicationとして動く。</td></tr>
            <tr><td>hardware直上でVM</td><td><strong>ハイパーバイザー型</strong></td><td>Host OSを挟まない。</td></tr>
            <tr><td>Host kernelを共有</td><td><strong>コンテナ型</strong></td><td>Guest OSを個別に持たず軽量。</td></tr>
            <tr><td>build手順→template→実行実体</td><td><strong>Dockerfile → Image → Container</strong></td><td><code>build</code>してから<code>run</code>。</td></tr>
            <tr><td>build時／起動時</td><td><strong>RUN／CMD</strong></td><td>実行timingを見分ける。</td></tr>
        </table></div>
    `,

    questions: [
        { id:"acc-simd-definition", category:"SIMD", question:"SIMD（Single Instruction, Multiple Data）の説明として正しいものはどれか。", options:["1つの命令でvector内の複数dataへ同じ演算を行う", "複数の命令列を1つのdataへ実行する", "多数threadが必ず異なる命令を実行する", "Guest OSを共有する"], answer:0, explanation:"SIMDは1命令が複数の演算laneへ作用します。CPUのvector命令が代表例です。" },
        { id:"acc-simt-definition", category:"SIMT", question:"SIMT（Single Instruction, Multiple Threads）の説明として正しいものはどれか。", options:["多数threadが同じ命令列を実行し、threadごとにdataやregisterを持つ", "1つのthreadだけを高速化する", "VMごとにGuest OSを持つ", "複数coreが必ず別のprogramを実行する"], answer:0, explanation:"GPUでは多数threadをgroup化し、同じ命令をまとめて進める方式が代表的です。" },
        { id:"acc-mimd-definition", category:"MIMD", question:"MIMD（Multiple Instruction, Multiple Data）の説明として正しいものはどれか。", options:["複数のcoreが異なる命令列を異なるdataへ独立実行できる", "1命令だけで全dataを処理する", "全threadが必ず同じ分岐を通る", "containerの実行方式である"], answer:0, explanation:"multicore CPUや複数processorのように、各実行単位が別の命令列を進められます。" },
        { id:"acc-three-models", category:"並列実行方式（識別）", question:"SIMD・SIMT・MIMDの対応として正しいものはどれか。", options:["SIMD＝lane、SIMT＝thread、MIMD＝独立した命令列", "SIMD＝VM、SIMT＝container、MIMD＝Dockerfile", "3つとも同義", "SIMDだけが並列処理"], answer:0, explanation:"何を複数にするかで見分けます。SIMDはdata lane、SIMTはthread、MIMDは命令列です。" },
        { id:"acc-simd-calc", category:"SIMD（計算）", kind:"計算", question:"18個のdataをSIMD幅4（1命令で最大4個処理）で処理する。端数も1命令使うとき、理想的な命令数はいくつか。", options:["5", "4", "18", "72"], answer:0, explanation:"<strong>使う公式（SIMD命令数）：</strong><br>$N_{inst}=\\left\\lceil N/W\\right\\rceil$<br><br><strong>代入：</strong>$\\left\\lceil18/4\\right\\rceil=\\left\\lceil4.5\\right\\rceil=5$。<br><strong>答え：</strong>5命令です。最後の2個にも1命令必要です。" },
        { id:"acc-simt-divergence", category:"SIMTの分岐", question:"同じGPU thread group内で、条件分岐により半分がA経路、半分がB経路へ分かれた。起こりやすいことはどれか。", options:["branch divergenceにより経路を順に処理し、並列効率が下がる", "thread数が自動で0になる", "必ずMIMDへ変換される", "Guest OSが追加される"], answer:0, explanation:"SIMTでは同じgroupのthreadが同じ命令を進めると効率的です。分岐が割れると一方をmaskしながら各経路を処理します。" },
        { id:"acc-gpu-reason", category:"GPU", question:"深層学習の行列演算にGPUが向く主な理由はどれか。", options:["多数の演算器・threadで同種の計算を高throughputに並列処理できる", "複雑な分岐を必ずCPUより速く処理する", "memory容量が必ず無限", "Guest OSを持たない"], answer:0, explanation:"行列積は同様の積和演算を大量に行うため、GPUの並列性を活かしやすい処理です。" },
        { id:"acc-cpu-gpu-compare", category:"CPU・GPU（比較）", question:"CPUとGPUの一般的な設計傾向として適切なものはどれか。", options:["CPUは複雑な制御・低遅延、GPUは大量の同種計算・高throughputに向く", "CPUは並列計算が一切できない", "GPUは分岐が多いほど必ず速い", "両者の構造は同じ"], answer:0, explanation:"CPUもSIMDやMIMDで並列計算できます。得意な並列度とworkloadが異なります。" },
        { id:"acc-tpu-definition", category:"TPU", question:"TPU（Tensor Processing Unit）の説明として最も適切なものはどれか。", options:["AIのtensor・行列演算へ特化したaccelerator", "container専用のOS", "画像file形式", "CPUのGuest OS"], answer:0, explanation:"TPUはGoogleが設計したAI向けacceleratorで、対応するtensor演算を高効率に処理します。" },
        { id:"acc-tpu-systolic", category:"TPUの構造", question:"TPUで代表的なsystolic arrayの狙いはどれか。", options:["演算器間でdataを規則的に流して再利用し、行列演算の外部memory accessを減らす", "VMを起動する", "branchを増やす", "Dockerfileをbuildする"], answer:0, explanation:"dataを演算器間で受け渡しながら積和演算を進め、外部memoryとの往復を減らして効率を高めます。" },
        { id:"acc-gpu-tpu-compare", category:"GPU・TPU（比較）", question:"GPUとTPUの比較として正しいものはどれか。", options:["GPUは広い並列workloadへ使え、TPUは対応するAI tensor演算へより特化する", "TPUは常にあらゆるprogramでGPUより速い", "GPUは行列演算ができない", "両者とも仮想化方式"], answer:0, explanation:"性能はmodel・operation・software環境で変わります。TPUは汎用CPUの完全な代替ではありません。" },
        { id:"acc-device-scenario", category:"device選択", question:"複雑な条件分岐が少ない大規模な行列積を大量に処理したい。一般に最も活かしやすい特徴はどれか。", options:["GPUやTPUの大量並列tensor演算", "ホスト型仮想化", "DockerfileのCMD", "Guest OSの追加"], answer:0, explanation:"同種の積和演算を大量に行う処理はacceleratorの並列性と相性がよいです。" },

        { id:"env-virtualization-definition", category:"仮想化環境", question:"仮想化環境の目的として最も適切なものはどれか。", options:["1台のhardware資源上へ複数の分離された実行環境を構成する", "行列積だけを高速化する", "全dataを1つに結合する", "必ず物理serverを増やす"], answer:0, explanation:"physical resourceを論理的に分け、異なるOSやapplication環境を動かします。" },
        { id:"env-hosted-type", category:"ホスト型", question:"ホスト型仮想化のstackとして正しいものはどれか。", options:["Hardware → Host OS → 仮想化software → Guest OS → App", "Hardware → Hypervisor → Guest OS → App", "Hardware → Host kernel共有 → Container", "Dockerfile → GPU → TPU"], answer:0, explanation:"ホスト型（Type 2）は普段のHost OS上で仮想化softwareをapplicationとして動かします。" },
        { id:"env-hypervisor-type", category:"ハイパーバイザー型", question:"ハイパーバイザー型（Type 1／bare metal）のstackとして正しいものはどれか。", options:["Hardware → Hypervisor → Guest OS → App", "Hardware → Host OS → 仮想化software → Guest OS", "Hardware → Dockerfile → Container", "Hardware → SIMD → App"], answer:0, explanation:"hardware直上のHypervisorが複数VMを管理し、Host OSを間に挟みません。" },
        { id:"env-container-type", category:"コンテナ型", question:"コンテナ型仮想化の構造上の特徴はどれか。", options:["各containerがHost OSのkernelを共有し、Appと必要なlibrariesを分離する", "containerごとに必ずGuest OS kernelを持つ", "hardware直上にGuest OSだけ置く", "threadをSIMD化する"], answer:0, explanation:"containerごとにGuest OSを起動しないため、一般にVMより軽量で起動が速い特徴があります。" },
        { id:"env-three-types", category:"仮想化方式（識別）", question:"ホスト型・ハイパーバイザー型・コンテナ型の見分け方として正しいものはどれか。", options:["Host OS上の仮想化software／hardware直上のHypervisor／Host kernel共有", "3方式ともGuest OSを共有", "3方式ともhardware直上にDockerを置く", "違いはない"], answer:0, explanation:"仮想化層の位置と、Guest OSを環境ごとに持つかを確認します。" },
        { id:"env-guest-os", category:"Guest OS", question:"一般的なVMとcontainerのGuest OSについて正しいものはどれか。", options:["VMは各環境にGuest OSを持ち、containerはHost kernelを共有して個別Guest OSを持たない", "containerだけがGuest OSを持つ", "両方とも必ずGuest OSを共有", "Guest OSはGPUの一部"], answer:0, explanation:"この違いが、containerの軽量さとOS kernel互換性の制約につながります。" },
        { id:"env-container-kernel", category:"kernel共有", question:"Linux containerを非Linux hostで動かす際、内部でLinux VMを介する場合がある主な理由はどれか。", options:["containerはhostと異なるkernelを直接は持たず、Linux kernelが必要だから", "SIMD幅を増やすため", "TPUが必要だから", "Dockerfileが画像fileだから"], answer:0, explanation:"containerはHost kernelを共有します。異なるkernelが必要な場合はVM layerが補助する構成があります。" },
        { id:"env-isolation-caveat", category:"隔離の違い", question:"VMとcontainerの隔離について適切な説明はどれか。", options:["VMは一般に独立kernelにより強い隔離を得やすいが、どちらも完全な安全を自動保証しない", "containerは常にVMより完全に安全", "VMには隔離がない", "両者の境界は同一"], answer:0, explanation:"構造上の境界は異なります。実際の安全性は設定・更新・権限管理にも依存します。" },
        { id:"env-vm-container-use", category:"VM・container（使い分け）", question:"多数の同一application環境を素早く起動し、環境再現性を高めたい。一般に向く方式はどれか。", options:["container型", "Guest OSを毎回手作業で構築", "SIMD", "TPU"], answer:0, explanation:"container imageを共有すれば、同じ実行環境を軽量に複製できます。異なるkernelが必要ならVMが候補です。" },
        { id:"env-memory-calc", category:"VM・container（計算）", kind:"計算", question:"問題文の仮定として、4個のVMは各Guest OS 2GB＋App 1GBを使う。4個のcontainerはHost OS 2GBを共有し、各Appが1GBを使う。合計memoryの組合せはどれか。その他のoverheadは無視する。", options:["VM 12GB、container 6GB", "VM 6GB、container 12GB", "どちらも4GB", "どちらも12GB"], answer:0, explanation:"<strong>使う公式（問題文の単純model）：</strong><br>VM合計＝個数×（Guest OS＋App）、container合計＝共有Host OS＋個数×App<br><br><strong>代入：</strong>VMは$4\\times(2+1)=12$GB、containerは$2+4\\times1=6$GB。<br><strong>答え：</strong>VM 12GB、container 6GBです。実環境の値を一般化したものではありません。" },
        { id:"env-docker-role", category:"Docker", question:"Dockerの役割として最も適切なものはどれか。", options:["container imageのbuild・配布・実行を扱うcontainer platform", "GPUの命令分類", "Guest OSそのもの", "TPUの行列演算器"], answer:0, explanation:"Dockerfileからimageを作り、そのimageからcontainerを起動する流れが基本です。" },
        { id:"env-dockerfile-role", category:"Dockerfile", question:"Dockerfileとは何か。", options:["container imageを作るための手順を記述したtext file", "実行中containerのmemory", "Host OSのkernel", "GPUのthread一覧"], answer:0, explanation:"base image、file copy、package導入、起動commandなどを記述し、再現可能なbuild手順にします。" },
        { id:"env-docker-flow", category:"Dockerの流れ", question:"Dockerの基本的な処理順として正しいものはどれか。", options:["Dockerfile → docker build → Image → docker run → Container", "Container → SIMD → Guest OS → TPU", "Image → Dockerfile → Hardware", "docker run → Dockerfile → Image"], answer:0, explanation:"Dockerfileはrecipe、Imageは読取専用template、Containerはimageを動かした実体です。" },
        { id:"env-image-container", category:"Image・Container", question:"Docker ImageとContainerの関係として正しいものはどれか。", options:["Imageは読取専用templateで、Containerはそこから起動した実行実体", "Containerが設計図でImageが実行実体", "1つのImageからContainerは1個しか作れない", "両者はGuest OS"], answer:0, explanation:"1つのimageから複数containerを起動できます。container側の変更は実行時layerへ書かれます。" },
        { id:"env-dockerfile-from", category:"Dockerfile命令", question:"DockerfileのFROM命令の役割はどれか。", options:["土台となるbase imageを指定する", "container起動時の既定commandを実行する", "fileを削除する", "GPUを選ぶ"], answer:0, explanation:"Dockerfileは通常FROMから始まり、どの環境を土台にbuildするかを決めます。" },
        { id:"env-dockerfile-copy-run", category:"Dockerfile命令", question:"DockerfileのCOPYとRUNの対応として正しいものはどれか。", options:["COPYはfileをimageへcopyし、RUNはbuild時にcommandを実行してlayerへ保存する", "COPYは起動command、RUNはHost OS", "両方ともrun時だけ実行", "両方ともGPU命令"], answer:0, explanation:"COPYはbuild context内のfileを取り込み、RUNはpackage導入などのbuild処理に使います。" },
        { id:"env-dockerfile-run-cmd", category:"Dockerfile命令", question:"DockerfileのRUNとCMDの違いとして正しいものはどれか。", options:["RUNはimage build時、CMDはcontainer起動時の既定command", "CMDはbuild時だけ", "RUNはcontainer停止時だけ", "両者の実行timingは同じ"], answer:0, explanation:"RUNの結果はimage layerへ保存されます。CMDは起動時の既定値で、docker run時に上書きできます。" },
        { id:"env-reproducibility", category:"環境再現性", question:"Dockerfileをversion管理する主な利点はどれか。", options:["環境構築手順をtextとして共有し、同じimageを再buildしやすくする", "Host kernelを不要にする", "すべてのsecurity問題を自動解決する", "GPUをTPUへ変換する"], answer:0, explanation:"手作業の設定を減らし、依存packageや手順をcodeとして追跡できます。外部repository更新などにより完全な再現にはversion固定も重要です。" }
    ]
};
