window.quizData = {
    title: "5-（３）（４）ハードウェア & 環境構築",
    
    cheatSheet: `
        <style>
            .concept-container { display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; margin-bottom: 20px; }
            .concept-card { border: 1px solid #ccc; border-radius: 8px; padding: 15px; width: 30%; min-width: 300px; background: #fff; vertical-align: top; }
            .card-title { font-weight: bold; border-bottom: 2px solid #333; margin-bottom: 10px; display: inline-block; }
            
            /* アクセラレータ比較 */
            .chip-layout { display: flex; flex-wrap: wrap; gap: 2px; justify-content: center; margin: 10px 0; }
            .core-cpu { width: 45%; height: 40px; background: #3498db; color: white; display: flex; align-items: center; justify-content: center; border-radius: 4px; font-weight: bold; margin: 2px; font-size: 0.8em; }
            .core-gpu { width: 10px; height: 10px; background: #27ae60; margin: 1px; }
            .core-tpu { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1px; background: #e74c3c; padding: 2px; }
            .tpu-cell { width: 8px; height: 8px; background: #fff; }

            /* 仮想化比較 */
            .virt-stack { display: flex; flex-direction: column; width: 80%; margin: 0 auto; gap: 2px; }
            .layer { padding: 5px; text-align: center; border-radius: 3px; font-size: 0.8em; border: 1px solid #999; }
            .hw { background: #333; color: #fff; }
            .hos { background: #7f8c8d; color: #fff; }
            .gos { background: #f39c12; color: #fff; } /* Guest OS */
            .eng { background: #3498db; color: #fff; } /* Docker Engine */
            .app { background: #eafaf1; border-color: #27ae60; color: #27ae60; font-weight: bold; }

            .comp-table { width: 100%; border-collapse: collapse; font-size: 0.85em; margin-top: 10px; }
            .comp-table th { background: #eee; border: 1px solid #ccc; padding: 5px; }
            .comp-table td { border: 1px solid #ccc; padding: 5px; }
            .good { color: #27ae60; font-weight: bold; }
            .bad { color: #c0392b; font-weight: bold; }
            
            .keyword-box { background:#f9f9f9; padding:8px; border-left:3px solid #f39c12; margin: 5px 0; font-size: 0.85em; }
        </style>

        <h3>■ 1. アクセラレータ (高速化デバイス)</h3>
        <div class="concept-container">
            <div class="concept-card">
                <div class="card-title" style="border-color:#3498db;">CPU</div>
                <div class="chip-layout">
                    <div class="core-cpu">Core</div>
                    <div class="core-cpu">Core</div>
                    <div class="core-cpu">Core</div>
                    <div class="core-cpu">Core</div>
                </div>
                <p style="font-size:0.85em;">
                    <strong>少数の強力なコア</strong>。<br>
                    複雑な条件分岐や順次処理が得意。<br>
                    <span class="bad">並列計算は苦手</span>。
                </p>
            </div>

            <div class="concept-card">
                <div class="card-title" style="border-color:#27ae60;">GPU</div>
                <div class="chip-layout" style="width:100px; margin: 10px auto;">
                    ${Array(64).fill('<div class="core-gpu"></div>').join('')}
                </div>
                <p style="font-size:0.85em;">
                    <strong>数千の小さなコア</strong>。<br>
                    単純な計算の大量並列処理（SIMT）が得意。<br>
                    <span class="good">Deep Learningの主役</span>。
                </p>
            </div>

            <div class="concept-card">
                <div class="card-title" style="border-color:#e74c3c;">TPU (Google)</div>
                <div class="chip-layout">
                    <div class="core-tpu">
                        ${Array(25).fill('<div class="tpu-cell"></div>').join('')}
                    </div>
                </div>
                <p style="font-size:0.85em;">
                    <strong>シストリックアレイ</strong>構造。<br>
                    データが心臓の鼓動（Systolic）のように流れ、行列演算を超高速化。<br>
                    <span class="good">AI特化型</span>。
                </p>
            </div>
        </div>

        <h3>■ 2. 環境構築：VM vs コンテナ (Docker)</h3>
        <div class="concept-container">
            <div class="concept-card">
                <div class="card-title" style="border-color:#f39c12;">仮想マシン (VM)</div>
                <div class="virt-stack">
                    <div class="layer app">App A</div>
                    <div class="layer gos">Guest OS</div>
                    <div class="layer" style="background:#eee;">Hypervisor</div>
                    <div class="layer hos">Host OS</div>
                    <div class="layer hw">Hardware</div>
                </div>
                <ul style="font-size:0.85em; margin-top:10px;">
                    <li><strong>特徴</strong>: OSごと仮想化する。</li>
                    <li><span class="good">強み</span>: 完全に隔離され安全。</li>
                    <li><span class="bad">弱み</span>: <strong>動作が重く</strong>、起動が遅い。</li>
                </ul>
            </div>

            <div class="concept-card">
                <div class="card-title" style="border-color:#3498db;">コンテナ (Docker)</div>
                <div class="virt-stack">
                    <div class="layer app">App A</div>
                    <div class="layer eng">Docker Engine</div>
                    <div class="layer hos">Host OS</div>
                    <div class="layer hw">Hardware</div>
                </div>
                <ul style="font-size:0.85em; margin-top:10px;">
                    <li><strong>特徴</strong>: <strong>Host OSのカーネルを共有</strong>。</li>
                    <li><span class="good">強み</span>: <strong>軽量・高速</strong>。環境再現性が高い。</li>
                    <li><span class="bad">弱み</span>: カーネル依存（LinuxならLinux）。</li>
                </ul>
            </div>
        </div>

        <h3>■ E資格対策：重要キーワード</h3>
        <div class="keyword-box">
            <strong>1. フリンの分類 (並列処理)</strong><br>
            <ul>
                <li><strong>SIMD</strong> (Single Instruction, Multiple Data): 1つの命令で複数データを処理（CPUのベクトル演算）。</li>
                <li><strong>SIMT</strong> (Single Instruction, Multiple Threads): 1つの命令を多数のスレッドで実行（GPU）。SIMDの拡張。</li>
            </ul>
        </div>
        <div class="keyword-box">
            <strong>2. 性能評価の法則</strong><br>
            <ul>
                <li><strong>アムダールの法則</strong>: 並列化しても「並列化できない部分」がボトルネックになり、全体の高速化には限界があるという法則。</li>
                <li><strong>ルーフラインモデル</strong>: 「演算性能」と「メモリ転送速度」のどちらがボトルネックかを判定するグラフ。</li>
            </ul>
        </div>
        <div class="keyword-box">
            <strong>3. FPGA vs ASIC</strong><br>
            <ul>
                <li><strong>FPGA</strong>: 製造後に回路を書き換えられる。試作や低遅延用途向け。</li>
                <li><strong>ASIC</strong>: 特定用途向け専用IC（TPUなど）。設計後は変更不可だが、性能・電力効率は最強。</li>
            </ul>
        </div>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【基礎編】 Q1 - Q10
        // ---------------------------------------------------------
        {
            category: "GPUの特徴",
            question: "ディープラーニングの学習にGPUが適している主な理由は何か。",
            options: ["数千個のコアを持ち、単純な行列演算の大量並列処理（スループット重視）に特化しているから", "クロック周波数がCPUより高いから", "複雑な条件分岐の処理が得意だから", "キャッシュメモリがCPUより大きいから"],
            answer: 0,
            explanation: "CPUは「少数の難しい仕事（分岐など）を速く（低遅延）」、GPUは「大量の単純な仕事（行列積）を一気に（高スループット）」処理する設計です。"
        },
        {
            category: "TPUの特徴",
            question: "Googleが開発したTPU (Tensor Processing Unit) が採用している、行列演算を効率化するためのアーキテクチャは何か。",
            options: ["シストリックアレイ (Systolic Array)", "フォン・ノイマン型", "量子アニーリング", "ニューロモーフィック"],
            answer: 0,
            explanation: "データを心臓の鼓動（Systolic）のようにプロセッサ・アレイ内に流し、レジスタへのアクセス回数を減らして電力効率と速度を高めています。"
        },
        {
            category: "Dockerの特徴",
            question: "仮想マシン（VM）と比較した際の、Dockerコンテナの最大の特徴（構造上の違い）は何か。",
            options: ["ホストOSのカーネル（Kernel）を共有し、プロセスとして隔離されているため、起動が速く軽量である", "それぞれが独自のカーネルを持つ", "ハードウェアを直接制御する", "GUIを持たない"],
            answer: 0,
            explanation: "VMは「Guest OS」を丸ごと立ち上げますが、コンテナはカーネルを共有し、名前空間（Namespace）などで隔離しているだけなので非常に軽快です。"
        },
        {
            category: "GPGPU",
            question: "画像処理専用だったGPUを、ディープラーニングなどの一般的な数値計算に応用する技術を何と呼ぶか。",
            options: ["GPGPU (General-purpose computing on GPU)", "FPGA", "ASIC", "SoC"],
            answer: 0,
            explanation: "NVIDIAのCUDAなどの環境が整備されたことで、GPUが汎用的な科学計算に使われるようになりました。"
        },
        {
            category: "フリンの分類",
            question: "フリンの分類において、GPUのアーキテクチャ（SIMT）の基礎となっている、1つの命令で複数のデータを処理する方式はどれか。",
            options: ["SIMD (Single Instruction, Multiple Data)", "SISD", "MISD", "MIMD"],
            answer: 0,
            explanation: "「命令は1つ（足し算せよ）、データはたくさん（画像の全画素）」という処理方式です。"
        },
        {
            category: "FPGA",
            question: "FPGA (Field Programmable Gate Array) の特徴として正しいものはどれか。",
            options: ["製造後（現場）でも回路構成をプログラムで書き換えることができる", "一度製造すると回路を変更できない", "Googleが開発したAI専用チップである", "GPUよりも並列コア数が多い"],
            answer: 0,
            explanation: "ASIC（専用回路）を作る前の試作や、仕様変更が頻繁な用途、または超低遅延が必要な推論処理などで使われます。"
        },
        {
            category: "エッジコンピューティング",
            question: "クラウドではなくエッジ（端末側）でAI処理を行うメリットに含まれないものはどれか。",
            options: ["大規模な学習を超高速に行える", "通信遅延（レイテンシ）が少ない", "プライバシーデータを外部に出さなくて済む", "通信コストを削減できる"],
            answer: 0,
            explanation: "エッジは計算資源（電力・メモリ）が限られるため、大規模な「学習」には向きません。主に「推論」を行います。"
        },
        {
            category: "アムダールの法則",
            question: "「アムダールの法則」が示唆する並列化の限界についての内容はどれか。",
            options: ["プログラム中に並列化できない部分（直列処理部分）がある限り、プロセッサ数をいくら増やしても全体の高速化には限界がある", "プロセッサ数を2倍にすれば性能は必ず2倍になる", "メモリ速度がボトルネックになる", "GPUはCPUより優れている"],
            answer: 0,
            explanation: "例えば全体の50%しか並列化できないなら、計算機を無限に増やしても最大で2倍しか速くなりません。"
        },
        {
            category: "CUDA",
            question: "NVIDIA製GPUで並列計算を行うための統合開発環境（プラットフォーム）は何か。",
            options: ["CUDA (Compute Unified Device Architecture)", "OpenCL", "Metal", "DirectX"],
            answer: 0,
            explanation: "深層学習フレームワーク（PyTorch, TensorFlow）のバックエンドとして事実上の標準となっています。"
        },
        {
            category: "コンテナオーケストレーション",
            question: "多数のDockerコンテナを管理・自動配備（オーケストレーション）するためのデファクトスタンダードツールは何か。",
            options: ["Kubernetes (k8s)", "VirtualBox", "Anaconda", "Jenkins"],
            answer: 0,
            explanation: "本番環境で大量のコンテナを動かす際、死活監視やスケーリング（増減）を自動で行います。"
        },

        // ---------------------------------------------------------
        // 【応用編】 Q11 - Q20
        // ---------------------------------------------------------
        {
            category: "ルーフラインモデル(応用)",
            question: "プロセッサの性能限界を分析する「ルーフラインモデル」において、ボトルネックの要因となる2つの要素は何か。",
            options: ["演算性能（FLOPS）と メモリ帯域幅（Memory Bandwidth）", "コア数とクロック周波数", "電力と熱", "学習率とバッチサイズ"],
            answer: 0,
            explanation: "「計算が遅くて詰まる（Compute bound）」か「データの到着が遅くて詰まる（Memory bound）」かを判定するグラフです。"
        },
        {
            category: "ASIC(応用)",
            question: "TPUのように、特定の用途（AI計算など）のために専用設計された集積回路を何と呼ぶか。",
            options: ["ASIC (Application Specific Integrated Circuit)", "FPGA", "CPU", "DSP"],
            answer: 0,
            explanation: "特定用途に特化して不要な機能を削ぎ落とすため、電力効率と性能が最も高くなりますが、後から回路変更はできません。"
        },
        {
            category: "混合精度演算(応用)",
            question: "NVIDIAのTensor Coreなどがサポートする、計算速度を上げメモリを節約するための技術は何か。",
            options: ["混合精度演算 (Mixed Precision): FP16（半精度）とFP32（単精度）を組み合わせて計算する", "倍精度演算 (FP64)", "整数演算のみを使う", "アナログ計算"],
            answer: 0,
            explanation: "行列積などの重い計算はFP16で行い、累積加算など精度が必要な部分はFP32で行うことで、精度を保ちつつ高速化します。"
        },
        {
            category: "コンテナの隔離技術(応用)",
            question: "Linuxカーネルの機能で、コンテナごとにプロセスIDやネットワークなどを隔離するために使われている技術は何か。",
            options: ["Namespace (名前空間)", "Cgroups (Control Groups)", "Hypervisor", "Virtual Memory"],
            answer: 0,
            explanation: "Namespaceが見える範囲（部屋）を区切り、Cgroupsがリソース（電気や水道の使用量）を制限する、という役割分担でコンテナを実現しています。"
        },
        {
            category: "Cgroups(応用)",
            question: "Dockerなどで使われるLinuxの機能「Cgroups (Control Groups)」の主な役割は何か。",
            options: ["CPUやメモリなどの物理リソースの使用量を制限・管理する", "ファイルシステムを隔離する", "ネットワークを仮想化する", "ユーザー権限を管理する"],
            answer: 0,
            explanation: "あるコンテナがCPUを使いすぎて他のコンテナが止まる、といったことを防ぐためにリソース配分を制御します。"
        },
        {
            category: "推論専用チップ(応用)",
            question: "エッジデバイス（スマホ等）向けのAIチップ（NPU/ANEなど）で、学習機能を持たず推論に特化させることで得られるメリットは何か。",
            options: ["消費電力と発熱を大幅に抑えられる", "精度が向上する", "汎用性が高まる", "プログラムが書きやすくなる"],
            answer: 0,
            explanation: "学習に必要な逆伝播（バックプロパゲーション）用の回路やメモリ帯域を省略できるため、省電力・小型化が可能です。"
        },
        {
            category: "MIMD(応用)",
            question: "フリンの分類において、現在のマルチコアCPUのように「異なる命令を、異なるデータに対して」並列実行する方式はどれか。",
            options: ["MIMD (Multiple Instruction, Multiple Data)", "SIMD", "SISD", "MISD"],
            answer: 0,
            explanation: "コアごとに独立して別のプログラム（スレッド）を動かせる、最も柔軟な並列処理方式です。"
        },
        {
            category: "インターコネクト(応用)",
            question: "複数のGPUを使って分散学習をする際、GPU間の通信速度がボトルネックにならないようにNVIDIAが開発した高速通信規格は何か。",
            options: ["NVLink", "PCI Express", "Ethernet", "USB"],
            answer: 0,
            explanation: "PCIeを経由せずにGPU同士を直接太いパイプで繋ぐことで、大規模モデルの学習に必要な高速なデータ転送を実現します。"
        },
        {
            category: "量子化のビット数(応用)",
            question: "近年のエッジAIや推論加速において、精度劣化を抑えつつ利用が進んでいる「INT8」は何ビットのデータ表現か。",
            options: ["8ビット整数 (-128 〜 127)", "8ビット浮動小数点", "16ビット整数", "1ビット"],
            answer: 0,
            explanation: "FP32（32ビット）に比べてデータ量は1/4になり、計算コストも大幅に下がります。"
        },
        {
            category: "Dockerイメージ(応用)",
            question: "Dockerにおいて、アプリケーションとその実行環境（ライブラリ設定など）をまとめた読み取り専用のテンプレートを何と呼ぶか。",
            options: ["イメージ (Image)", "コンテナ (Container)", "ボリューム (Volume)", "ネットワーク (Network)"],
            answer: 0,
            explanation: "「イメージ」は金型（クラス）で、そこから実体化したものが「コンテナ（インスタンス）」です。"
        }
    ]
};
