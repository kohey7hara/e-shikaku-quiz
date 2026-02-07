// js/config.js

const menuConfig = [
    // =================================================================
    // １．数学的基礎
    // =================================================================
    {
        id: "01_math_basics",
        title: "1-（２）（３）確率・統計 & 情報理論",
        desc: "ベイズ則 / 最尤・MAP推定 / エントロピー / KLダイバージェンス",
        isActive: true
    },

    // =================================================================
    // ２．機械学習
    // =================================================================
    {
        id: "02_ml_basics_1",
        title: "2-（１）機械学習の基礎：パターン認識・分類",
        desc: "k近傍法 / 距離計算 / 教師あり・なし / 過学習 / バイアス・バリアンス",
        isActive: true
    },
    {
        id: "02_ml_basics_2",
        title: "2-（１）機械学習の基礎：検証・性能指標",
        desc: "交差検証 / Accuracy / Precision / Recall / F値 / ROC / AUC",
        isActive: true
    },

    // =================================================================
    // ３．深層学習の基礎
    // =================================================================
    {
        id: "03_dl_feedforward",
        title: "3-（１）順伝播型ネットワーク",
        desc: "MLP / 損失関数 / 活性化関数(ReLU, Sigmoid)",
        isActive: true
    },
    {
        id: "03_dl_optimization",
        title: "3-（２）深層モデルのための最適化",
        desc: "SGD / Adam / 誤差逆伝播法 / 初期化(He, Xavier)",
        isActive: true
    },
    {
        id: "03_dl_regularization",
        title: "3-（３）深層モデルのための正則化",
        desc: "L1・L2正則化 / Dropout / Batch Norm / Early Stopping",
        isActive: true
    },
    {
        id: "03_dl_cnn",
        title: "3-（４）CNN (畳み込みニューラルネットワーク)",
        desc: "畳み込み / Pooling / 受容野 / Im2Col / 1x1畳み込み",
        isActive: true
    },
    {
        id: "03_dl_rnn",
        title: "3-（５）RNN (リカレントニューラルネットワーク)",
        desc: "BPTT / LSTM / GRU / Seq2Seq / Attention",
        isActive: true
    },
    {
        id: "03_dl_transformer",
        title: "3-（６）Transformer",
        desc: "Self-Attention / Multi-Head Attention / Positional Encoding",
        isActive: true
    },
    {
        id: "03_dl_generalization",
        title: "3-（７）汎化性能向上のテクニック",
        desc: "データ拡張(MixUp) / Batch Norm / アンサンブル",
        isActive: true
    },

    // =================================================================
    // ４．深層学習の応用
    // =================================================================
    {
        id: "04_app_image",
        title: "4-（１〜３）画像認識・物体検出・セグメンテーション",
        desc: "ResNet / ViT / YOLO / R-CNN / U-Net / IoU / mAP",
        isActive: true
    },
    {
        id: "04_app_nlp",
        title: "4-（４）自然言語処理",
        desc: "Word2Vec / BERT / GPT / Prompt Learning",
        isActive: true
    },
    {
        id: "04_app_nlp_advanced",
        title: "4-（５）発展的NLP",
        desc: "ELMo, fastText, Tokenization",
        isActive: true
    },
    {
        id: "04_app_generative",
        title: "4-（６）生成モデル",
        desc: "GAN / VAE / 拡散モデル / フローベース",
        isActive: true
    },
    {
        id: "04_app_rl",
        title: "4-（７）深層強化学習",
        desc: "DQN / A3C / 方策勾配法 / 報酬",
        isActive: true
    },
    {
        id: "04_app_misc",
        title: "4-（８）（９）様々な学習方法 & 説明性",
        desc: "転移学習 / 距離学習 / XAI (Grad-CAM, SHAP)",
        isActive: true
    },

    // =================================================================
    // ５．開発・運用環境
    // =================================================================
    {
        id: "05_dev_edge_dist",
        title: "5-（１）（２）エッジAI & 分散処理",
        desc: "軽量化(蒸留・量子化・プルーニング) / モデル並列・データ並列",
        isActive: true
    },
    {
        id: "05_dev_accel_env",
        title: "5-（３）（４）ハードウェア & 環境構築",
        desc: "GPU / TPU / SIMD / コンテナ仮想化(Docker)",
        isActive: true
    },

    // =================================================================
    // ６．実装対策 (PyTorch)
    // =================================================================
    {
        id: "06_pytorch_implementation",
        title: "6. PyTorch実装対策ドリル",
        desc: "モデル定義 / 学習ループ / Dataset・DataLoader / 転移学習 / GPU処理",
        isActive: true // ★今回追加
    }
];
