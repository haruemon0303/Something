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
const dateDisplay = document.getElementById('dateDisplay');
const counterElement = document.getElementById('counter');
const shareBtn = document.getElementById('shareBtn');
const toast = document.getElementById('toast');

// 今日の日付を取得する関数
function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
}

// 日付を表示する関数
function displayDate() {
    dateDisplay.textContent = getTodayDate();
}

// カウンターを初期化する関数
function initializeCounter() {
    const today = getTodayDate();
    const savedDate = localStorage.getItem('clickDate');

    // 日付が変わっていたらカウンターをリセット
    if (savedDate !== today) {
        localStorage.setItem('clickDate', today);
        localStorage.setItem('clickCount', '0');
        counterElement.textContent = '0';
    } else {
        // 保存されているカウントを表示
        const savedCount = localStorage.getItem('clickCount') || '0';
        counterElement.textContent = savedCount;
    }
}

// カウンターを増やす関数
function incrementCounter() {
    const currentCount = parseInt(localStorage.getItem('clickCount') || '0', 10);
    const newCount = currentCount + 1;
    localStorage.setItem('clickCount', newCount.toString());
    counterElement.textContent = newCount.toString();
}

// Toast通知を表示する関数
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// メッセージを生成する関数（カウンターを増やさない）
function generateMessageOnly() {
    const randomIndex = Math.floor(Math.random() * messages.length);
    const randomMessage = messages[randomIndex];

    messageElement.classList.remove('fade-in');
    messageBox.classList.remove('active');

    setTimeout(() => {
        messageElement.textContent = randomMessage;
        messageElement.classList.add('fade-in');
        messageBox.classList.add('active');
    }, 100);
}

// シェア機能
async function shareMessage() {
    const currentMessage = messageElement.textContent;
    const initialMessage = 'ボタンを押してメッセージを表示';

    // 初期状態の場合は、まずメッセージを生成
    if (currentMessage === initialMessage) {
        generateMessageOnly();
        // アニメーション完了後にシェア
        setTimeout(() => {
            performShare();
        }, 150);
    } else {
        performShare();
    }
}

// 実際のシェア処理
async function performShare() {
    const currentMessage = messageElement.textContent;
    const pageUrl = location.href;
    const shareText = `${currentMessage}\n\n${pageUrl}`;

    // Web Share API が使える場合
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'ランダムメッセージ',
                text: shareText
            });
        } catch (err) {
            // ユーザーがキャンセルした場合は何もしない
            if (err.name !== 'AbortError') {
                console.error('Share failed:', err);
            }
        }
    } else {
        // クリップボードにコピー
        try {
            await navigator.clipboard.writeText(shareText);
            showToast('コピーしました！');
        } catch (err) {
            console.error('Copy failed:', err);
            // フォールバック: 古い方法でコピー
            const textArea = document.createElement('textarea');
            textArea.value = shareText;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                showToast('コピーしました！');
            } catch (e) {
                console.error('Fallback copy failed:', e);
            }
            document.body.removeChild(textArea);
        }
    }
}

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

    // カウンターを増やす
    incrementCounter();
}

// ボタンクリックイベントリスナー
messageBtn.addEventListener('click', showRandomMessage);

// タッチデバイス対応（ダブルタップ防止）
messageBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    showRandomMessage();
});

// シェアボタンイベントリスナー
shareBtn.addEventListener('click', shareMessage);

// タッチデバイス対応
shareBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    shareMessage();
});

// ページロード時の初期化
document.addEventListener('DOMContentLoaded', () => {
    displayDate();
    initializeCounter();
});
