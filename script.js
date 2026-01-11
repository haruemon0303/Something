// ランダムメッセージの配列
const messages = [
    "今日も素敵な一日を！",
    "あなたならできる！",
    "笑顔は最高の贈り物です",
    "小さな一歩が大きな変化を生む",
    "チャンスは準備された心に訪れる",
    "今を楽しみましょう",
    "困難は成長のチャンス",
    "自分を信じて前進しよう",
    "幸せは心の中にある",
    "夢に向かって進もう",
    "今日の努力が明日の成功に",
    "ポジティブに考えよう",
    "一期一会を大切に",
    "感謝の気持ちを忘れずに",
    "新しい挑戦を楽しもう"
];

// DOM要素の取得
const messageElement = document.getElementById('message');
const messageBtn = document.getElementById('messageBtn');
const messageBox = document.querySelector('.message-box');

// ランダムメッセージを表示する関数
function showRandomMessage() {
    // ランダムなインデックスを生成
    const randomIndex = Math.floor(Math.random() * messages.length);
    const randomMessage = messages[randomIndex];

    // アニメーション効果の準備
    messageElement.classList.remove('fade-in');
    messageBox.classList.remove('active');

    // 少し遅延させてからメッセージを更新
    setTimeout(() => {
        messageElement.textContent = randomMessage;
        messageElement.classList.add('fade-in');
        messageBox.classList.add('active');
    }, 100);
}

// ボタンクリックイベントリスナー
messageBtn.addEventListener('click', showRandomMessage);

// タッチデバイス対応（ダブルタップ防止）
messageBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    showRandomMessage();
});
