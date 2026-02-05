window.quizData = {
    title: "5-（３）（４）ハードウェア & 環境構築",
    
    cheatSheet: `
        <h3>■ アクセラレータ (高速化デバイス)</h3>
        <table>
            <tr><th>用語</th><th>特徴</th></tr>
            <tr><td><strong>CPU</strong></td><td>複雑な分岐処理が得意（MIMD）。<br>少数のコアでシーケンシャルに処理。</td></tr>
            <tr><td><strong>GPU</strong></td><td>単純な並列計算が得意（<strong>SIMT</strong>）。<br>数千のコアで画像を並列処理。Deep Learningの主役。</td></tr>
            <tr><td><strong>TPU</strong></td><td>Google開発のAI専用チップ。<br><strong>Systolic Array</strong>構造で行列演算に特化。</td></tr>
        </table>

        <h3>■ 並列処理の分類 (フリンの分類)</h3>
        <ul>
            <li><strong>SIMD</strong> (Single Instruction, Multiple Data): 1つの命令で複数のデータを処理（CPUのベクトル命令など）。</li>
            <li><strong>SIMT</strong> (Single Instruction, Multiple Threads): 1つの命令を多数のスレッドで実行（GPUのアーキテクチャ）。</li>
        </ul>

        <h3>■ 環境構築 (仮想化)</h3>
        <table>
            <tr><th>タイプ</th><th>代表例</th><th>特徴</th></tr>
            <tr><td><strong>ホスト型</strong></td><td>VirtualBox</td><td>OSの上にアプリとして仮想化ソフトを入れる。重い。</td></tr>
            <tr><td><strong>ハイパーバイザー型</strong></td><td>ESXi, Hyper-V</td><td>ハードウェア上で直接仮想化ソフトが動く。</td></tr>
            <tr><td><strong>コンテナ型</strong></td><td><strong>Docker</strong></td><td><strong>ホストOSのカーネルを共有</strong>する。<br>起動が速く、軽量。環境再現性が高い。</td></tr>
        </table>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【基礎編】 Q1 - Q10
        // ---------------------------------------------------------
        {
            category: "GPUの特徴",
            question: "CPUと比較した際の、GPU（Graphics Processing Unit）のアーキテクチャ上の最大の特徴はどれか。",
            options: ["単純な計算を行うコアが数千個搭載されており、並列処理に特化している", "複雑な分岐予測やキャッシュメモリが充実しており、逐次処理が速い", "OSを動かすことに特化している", "消費電力が非常に少ない"],
            answer: 0,
            explanation: "CPUは「少数の賢いコア」、GPUは「多数の単純なコア」です。Deep Learningの行列演算（単純計算の塊）に最適です。"
        },
        {
            category: "SIMD",
            question: "「SIMD (Single Instruction Multiple Data)」の説明として正しいものはどれか。",
            options: ["1つの命令で、複数のデータに対して同時に同じ処理を行う方式", "1つの命令で、1つのデータを処理する方式", "複数の命令で、複数のデータを処理する方式", "複数の命令で、1つのデータを処理する方式"],
            answer: 0,
            explanation: "例：「配列Aと配列Bを足せ」という1命令で、要素ごとの足し算を一気に行います。"
        },
        {
            category: "Docker",
            question: "Dockerなどの「コンテナ型仮想化」が、従来の「ハイパーバイザー型（仮想マシン）」と比べて優れている点は何か。",
            options: ["ホストOSのカーネルを共有するため、起動が非常に高速で、リソース消費（オーバーヘッド）が少ない", "異なるOS（Windows上でLinuxなど）をカーネルを含めて完全にエミュレートできる", "セキュリティが物理マシンと同等に高い", "GUIの操作性に優れている"],
            answer: 0,
            explanation: "OSを丸ごと立ち上げるVMと違い、コンテナは必要なプロセスだけを隔離して動かすため、非常に軽量です。"
        },
        {
            category: "TPU",
            question: "Googleが開発したディープラーニング専用プロセッサ「TPU (Tensor Processing Unit)」の特徴的な内部構造はどれか。",
            options: ["Systolic Array（シストリックアレイ）", "Super Scalar", "Out-of-Order実行", "量子ビット"],
            answer: 0,
            explanation: "データが心臓の鼓動（Systolic）のようにチップ内を流れながら、レジスタアクセスなしで連続的に積和演算を行う構造です。"
        },
        {
            category: "GPGPU",
            question: "元々は画像処理用だったGPUを、ディープラーニングなどの一般的な数値計算に応用する技術を何と呼ぶか。",
            options: ["GPGPU (General-Purpose computing on GPU)", "FPGA", "ASIC", "SoC"],
            answer: 0,
            explanation: "NVIDIAのCUDAなどがこれを可能にしました。"
        },
        {
            category: "Dockerfile",
            question: "Dockerにおいて、インフラ構成（OSやライブラリ、設定など）をコードとして記述し、イメージを自動生成するための設計図となるファイルはどれか。",
            options: ["Dockerfile", "docker-compose.yml", "requirements.txt", "Makefile"],
            answer: 0,
            explanation: "`FROM python:3.8`, `RUN pip install ...` のように手順を書くことで、誰でも同じ環境（Image）を再現できます（Infrastructure as Code）。"
        },
        {
            category: "MIMD",
            question: "フリンの分類において、マルチコアCPUのように「複数の命令で、複数のデータを処理する」方式はどれか。",
            options: ["MIMD (Multiple Instruction Multiple Data)", "SISD", "SIMD", "MISD"],
            answer: 0,
            explanation: "各コアがバラバラの仕事（命令）をバラバラのデータに対して行える、最も柔軟な並列処理です。"
        },
        {
            category: "CUDA",
            question: "NVIDIA製GPUを利用して並列計算を行うための統合開発環境（プラットフォーム）はどれか。",
            options: ["CUDA", "OpenCL", "DirectX", "Metal"],
            answer: 0,
            explanation: "深層学習フレームワーク（PyTorch, TensorFlow）のバックエンドとして事実上の標準となっています。"
        },
        {
            category: "コンテナイメージ",
            question: "Dockerにおいて、コンテナの実行に必要なファイルシステムや設定が読み取り専用でパッケージ化されたものを何と呼ぶか。",
            options: ["Dockerイメージ", "Dockerコンテナ", "Dockerボリューム", "Dockerネットワーク"],
            answer: 0,
            explanation: "イメージは「金型（クラス）」、コンテナはそこから生成された「実体（インスタンス）」の関係に近いです。"
        },
        {
            category: "FPGA",
            question: "製造後でも回路構成をプログラムで書き換えることができる、柔軟性の高いハードウェアはどれか。",
            options: ["FPGA (Field Programmable Gate Array)", "ASIC", "GPU", "CPU"],
            answer: 0,
            explanation: "専用回路（ASIC）を作る前の試作や、仕様変更が多いエッジAIの現場などで利用されます。"
        },

        // ---------------------------------------------------------
        // 【応用編】 Q11 - Q20
        // ---------------------------------------------------------
        {
            category: "SIMT(応用)",
            question: "NVIDIA GPUのアーキテクチャで採用されている「SIMT (Single Instruction Multiple Threads)」の特徴はどれか。",
            options: ["1つの命令を、多数の「スレッド」がそれぞれのデータに対して実行する（プログラマからは個別のスレッドに見える）", "1つの命令を1つのスレッドが実行する", "OSがスレッドを管理する", "CPUと同じ仕組みである"],
            answer: 0,
            explanation: "SIMDと似ていますが、プログラミングモデルとしては個々のスレッドが独立しているように書けるため、柔軟性が高いのが特徴です。"
        },
        {
            category: "Dockerのレイヤー構造(応用)",
            question: "Dockerイメージが採用している「レイヤー構造（Union File System）」のメリットは何か。",
            options: ["共通のベースイメージ（OS部分など）を複数のイメージ間で共有できるため、ディスク容量を節約でき、ビルドも速い", "全てのファイルを1つにまとめるため管理が楽", "暗号化が容易になる", "メモリ使用量が減る"],
            answer: 0,
            explanation: "変更分だけを新しい層として積み重ねる仕組みです。Ubuntuのベースが同じなら、その部分はディスク上で共有されます。"
        },
        {
            category: "ASIC(応用)",
            question: "TPUのように、特定の用途（AI計算など）のために専用設計・製造された集積回路を何と呼ぶか。",
            options: ["ASIC (Application Specific Integrated Circuit)", "FPGA", "CPU", "DSP"],
            answer: 0,
            explanation: "特定の計算しかできませんが、その分、汎用プロセッサよりも圧倒的な電力効率と性能を発揮します。"
        },
        {
            category: "仮想化のオーバーヘッド(応用)",
            question: "ホスト型やハイパーバイザー型の仮想化において、ゲストOSがハードウェアにアクセスする際に発生する性能低下の原因は主に何か。",
            options: ["特権命令の変換やエミュレーションによるオーバーヘッド", "ネットワークの遅延", "ディスクの断片化", "メモリの不足"],
            answer: 0,
            explanation: "仮想マシンからの命令を、物理ハードウェアが理解できる命令に変換する仲介処理が必要なため、ネイティブ動作より遅くなります。"
        },
        {
            category: "精度と速度のトレードオフ(応用)",
            question: "GPUにおける「半精度浮動小数点演算 (FP16)」や「Tensor Core」の利用目的は何か。",
            options: ["多少の計算精度を犠牲にしても、計算速度（スループット）を倍増させ、メモリ消費を半減させる", "計算精度を極限まで高める", "消費電力を増やす", "CPUとの互換性を保つ"],
            answer: 0,
            explanation: "ディープラーニングは厳密な精度（FP64/FP32）を必要としないことが多いため、精度を落として数倍の速度を得る戦略が取られます。"
        },
        {
            category: "Kubernetes(応用)",
            question: "多数のDockerコンテナを複数のサーバー上で統合管理（オーケストレーション）するためのツールはどれか。",
            options: ["Kubernetes (k8s)", "Docker Compose", "Ansible", "Jenkins"],
            answer: 0,
            explanation: "Googleが開発したOSSです。大規模なコンテナ群のデプロイ、スケーリング、管理を自動化します。"
        },
        {
            category: "エッジでの学習(応用)",
            question: "通常、エッジデバイスは「推論」のみを行うが、近年研究されている「オンデバイス学習」の課題は何か。",
            options: ["限られたリソース（メモリ・電力）の中で、計算負荷の高い逆伝播（学習）を行う必要がある点", "データが集まらない点", "ネットワークが遅い点", "モデルが小さすぎる点"],
            answer: 0,
            explanation: "推論（順伝播）に比べて、学習（逆伝播）は勾配を保持するメモリなどが大量に必要になるため、エッジで行うのはハードルが高いです。"
        },
        {
            category: "HPCとAI(応用)",
            question: "スーパーコンピュータ（富岳など）とAI専用スパコン（NVIDIA DGXなど）の主な設計思想の違いは何か。",
            options: ["富岳は倍精度(FP64)の科学技術計算も重視するが、AIスパコンは半精度(FP16)や低精度の行列演算性能を最優先する", "富岳はGPUを使わない", "AIスパコンはCPUを使わない", "違いはない"],
            answer: 0,
            explanation: "シミュレーション（天気予報など）は厳密な精度が必要ですが、AIは低精度でも「数」をこなすことが重要です。"
        },
        {
            category: "Docker Compose(応用)",
            question: "複数のコンテナ（Webサーバー、DB、AIモデルなど）の構成を1つのYAMLファイルに定義し、まとめて起動・管理するツールはどれか。",
            options: ["Docker Compose", "Dockerfile", "Docker Hub", "Docker Swarm"],
            answer: 0,
            explanation: "`docker-compose up` コマンド一発で、連携する複数のコンテナ環境を再現できます。"
        },
        {
            category: "メモリ帯域幅(応用)",
            question: "GPUによるディープラーニング学習において、計算速度のボトルネックになりやすい要素として、コアの計算速度以外に何があるか。",
            options: ["メモリ帯域幅（VRAMからコアへのデータ転送速度）", "ハードディスクの容量", "インターネット回線速度", "画面の解像度"],
            answer: 0,
            explanation: "コアが速すぎても、データの供給（メモリ転送）が追いつかないと待ち時間が発生します（Memory Wall問題）。HBM（広帯域メモリ）などが使われる理由です。"
        }
    ]
};
