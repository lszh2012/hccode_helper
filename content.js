// ============================================================
// 0. 毛玻璃 CSS（从油猴脚本移植，只注入一次）
// ============================================================
const GLASS_CSS = `
html.hc-glass-on {
  --hc-blur: 18px;
  --hc-saturate: 175%;
  --hc-radius: 14px;
  --hc-glass-bg: rgba(255,255,255,0.52);
  --hc-glass-border: rgba(255,255,255,0.68);
  --hc-shadow: 0 8px 32px rgba(31,38,135,0.13);
}

/* 仅在“无自定义背景图”时启用浅色底 */
html.hc-glass-on.hc-glass-solid-bg body {
  background: #eef1fb !important;
}

/* ================= 光斑背景 ================= */
.hc-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}
.hc-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.55;
  animation: hc-orb-float 26s ease-in-out infinite alternate;
  will-change: transform;
}
.hc-orb.o1 { width: 560px; height: 560px; left: -160px; top: -140px;
  background: radial-gradient(circle at 35% 35%, rgba(96,165,250,0.8), rgba(96,165,250,0) 65%); }
.hc-orb.o2 { width: 660px; height: 660px; right: -220px; top: 8%;
  background: radial-gradient(circle at 60% 40%, rgba(167,139,250,0.75), rgba(167,139,250,0) 65%);
  animation-duration: 30s; animation-delay: -8s; }
.hc-orb.o3 { width: 540px; height: 540px; left: 18%; bottom: -240px;
  background: radial-gradient(circle at 50% 45%, rgba(56,189,248,0.7), rgba(56,189,248,0) 65%);
  animation-duration: 34s; animation-delay: -16s; }
.hc-orb.o4 { width: 420px; height: 420px; right: 26%; bottom: 6%;
  background: radial-gradient(circle at 50% 50%, rgba(244,164,246,0.65), rgba(244,164,246,0) 65%);
  animation-duration: 24s; animation-delay: -12s; }
@keyframes hc-orb-float {
  from { transform: translate3d(0,0,0) scale(1); }
  to   { transform: translate3d(48px,-56px,0) scale(1.15); }
}
@media (prefers-reduced-motion: reduce) {
  .hc-orb { animation: none !important; }
}

/* ================= 通用玻璃 ================= */
html.hc-glass-on .el-card,
html.hc-glass-on .vxe-table1-wrapper,
html.hc-glass-on .el-dialog,
html.hc-glass-on .el-message-box,
html.hc-glass-on .el-drawer,
html.hc-glass-on .el-popover,
html.hc-glass-on .el-dropdown-menu,
html.hc-glass-on .el-select-dropdown,
html.hc-glass-on .el-picker-panel,
html.hc-glass-on .el-cascader__dropdown,
html.hc-glass-on .el-message,
html.hc-glass-on .el-notification {
  background: var(--hc-glass-bg) !important;
  backdrop-filter: blur(var(--hc-blur)) saturate(var(--hc-saturate)) !important;
  -webkit-backdrop-filter: blur(var(--hc-blur)) saturate(var(--hc-saturate)) !important;
  border: 1px solid var(--hc-glass-border) !important;
  box-shadow: var(--hc-shadow) !important;
}

/* ================= 顶部导航 ================= */
html.hc-glass-on .el-menu--horizontal {
  background: rgba(255,255,255,0.55) !important;
  backdrop-filter: blur(var(--hc-blur)) saturate(var(--hc-saturate)) !important;
  -webkit-backdrop-filter: blur(var(--hc-blur)) saturate(var(--hc-saturate)) !important;
  border-bottom: 1px solid var(--hc-glass-border) !important;
}
html.hc-glass-on .el-menu--horizontal .el-menu-item,
html.hc-glass-on .el-menu--horizontal .el-submenu__title {
  background: transparent !important;
}}/* ================= 卡片 ================= */
html.hc-glass-on .el-card {
  border-radius: var(--hc-radius) !important;
  transition: box-shadow 0.25s ease, background-color 0.25s ease;
}
html.hc-glass-on .el-card__header,
html.hc-glass-on .el-card__body {
  background: transparent !important;
}
html.hc-glass-on .el-card__header {
  border-bottom: 1px solid rgba(255,255,255,0.6) !important;
}
html.hc-glass-on .el-card.is-hover-shadow:hover {
  box-shadow: 0 12px 40px rgba(31,38,135,0.2) !important;
}

/* ================= 表格 ================= */
html.hc-glass-on .vxe-table,
html.hc-glass-on .vxe-grid,
html.hc-glass-on .vxe-table1-wrapper,
html.hc-glass-on .el-table {
  background: transparent !important;
}
html.hc-glass-on .vxe-table1-wrapper {
  backdrop-filter: blur(var(--hc-blur)) saturate(var(--hc-saturate)) !important;
  -webkit-backdrop-filter: blur(var(--hc-blur)) saturate(var(--hc-saturate)) !important;
  border-radius: var(--hc-radius) !important;
}
html.hc-glass-on .vxe-table--header-wrapper,
html.hc-glass-on .el-table th.el-table__cell {
  background: rgba(255,255,255,0.32) !important;
}
html.hc-glass-on .vxe-table--body-wrapper,
html.hc-glass-on .el-table__body-wrapper {
  background: transparent !important;
}
html.hc-glass-on .vxe-table--row,
html.hc-glass-on .el-table .el-table__row {
  background: rgba(255,255,255,0.14) !important;
}
html.hc-glass-on .vxe-table--row.row--hover,
html.hc-glass-on .vxe-table tbody tr:hover,
html.hc-glass-on .el-table .el-table__row:hover > td.el-table__cell {
  background: rgba(255,255,255,0.42) !important;
}
html.hc-glass-on .vxe-table .vxe-table--border-line,
html.hc-glass-on .el-table::before {
  background: rgba(255,255,255,0.45) !important;
}

/* ================= 弹窗 / 抽屉 ================= */
html.hc-glass-on .el-dialog,
html.hc-glass-on .el-message-box {
  border-radius: 16px !important;
  background: rgba(255,255,255,0.72) !important;
}
html.hc-glass-on .el-drawer {
  border-radius: 16px 0 0 16px !important;
  background: rgba(255,255,255,0.72) !important;
}
html.hc-glass-on .el-dialog__header,
html.hc-glass-on .el-dialog__body,
html.hc-glass-on .el-dialog__footer,
html.hc-glass-on .el-message-box__header,
html.hc-glass-on .el-message-box__content,
html.hc-glass-on .el-message-box__btns {
  background: transparent !important;
}
html.hc-glass-on .el-overlay,
html.hc-glass-on .vxe-modal--wrapper {
  background: rgba(15,23,42,0.32) !important;
}
html.hc-glass-on .el-message,
html.hc-glass-on .el-notification {
  border-radius: 12px !important;
  background: rgba(255,255,255,0.8) !important;
}

/* ================= 下拉 / 气泡 ================= */
html.hc-glass-on .el-popper .popper__arrow::before {
  background: rgba(255,255,255,0.7) !important;
}
html.hc-glass-on .el-dropdown-menu__item:not(.is-disabled):hover,
html.hc-glass-on .el-select-dropdown__item.hover,
html.hc-glass-on .el-select-dropdown__item:hover {
  background: rgba(64,158,255,0.12) !important;
}
html.hc-glass-on .el-popper.is-light {
  border-radius: 12px !important;
}
html.hc-glass-on .el-tooltip__popper.is-dark {
  background: rgba(38,52,84,0.78) !important;
  backdrop-filter: blur(12px) saturate(160%) !important;
  -webkit-backdrop-filter: blur(12px) saturate(160%) !important;
  border: 1px solid rgba(255,255,255,0.18) !important;
  color: #fff !important;
}
html.hc-glass-on .el-tooltip__popper.is-dark .popper__arrow::before {
  background: rgba(38,52,84,0.8) !important;
}

/* ================= 输入框 / 按钮 / 分页 ================= */
html.hc-glass-on .el-input__inner,
html.hc-glass-on .el-textarea__inner,
html.hc-glass-on .el-input-number .el-input__inner,
html.hc-glass-on .vxe-input--inner {
  background: rgba(255,255,255,0.45) !important;
  backdrop-filter: blur(8px) saturate(150%) !important;
  -webkit-backdrop-filter: blur(8px) saturate(150%) !important;
  border-color: rgba(255,255,255,0.75) !important;
}
html.hc-glass-on .el-input__inner:focus,
html.hc-glass-on .el-textarea__inner:focus,
html.hc-glass-on .vxe-input--inner:focus {
  background: rgba(255,255,255,0.6) !important;
}
html.hc-glass-on .el-button--default {
  background: rgba(255,255,255,0.5) !important;
  backdrop-filter: blur(8px) saturate(150%) !important;
  -webkit-backdrop-filter: blur(8px) saturate(150%) !important;
  border-color: rgba(255,255,255,0.75) !important;
}
html.hc-glass-on .el-button--default:hover {
  background: rgba(255,255,255,0.75) !important;
  color: #409eff !important;
}
html.hc-glass-on .el-pagination.is-background .el-pager li,
html.hc-glass-on .el-pagination.is-background .btn-prev,
html.hc-glass-on .el-pagination.is-background .btn-next {
  background: rgba(255,255,255,0.4) !important;
}

/* ================= 页脚 ================= */
html.hc-glass-on footer.fix-to-bottom {
  background: rgba(255,255,255,0.35) !important;
  backdrop-filter: blur(14px) saturate(160%) !important;
  -webkit-backdrop-filter: blur(14px) saturate(160%) !important;
  border-top: 1px solid rgba(255,255,255,0.6) !important;
}

/* ================= 内容容器透明化 ================= */
html.hc-glass-on .el-main,
html.hc-glass-on .full-height,
html.hc-glass-on .content-center,
html.hc-glass-on .el-container,
html.hc-glass-on #app {
  background: transparent !important;
}
`;

// ============================================================
// 1. 核心：自定义背景图（保留原逻辑）
// ============================================================
let currentBgUrl = '';
let currentGlassEnabled = true;

function applyBackground(bgImageUrl) {
    currentBgUrl = bgImageUrl || '';
    const oldStyle = document.getElementById('my-custom-theme-style');
    if (oldStyle) oldStyle.remove();

    let css = '';
    if (bgImageUrl && bgImageUrl.length > 5) {
        css += `
            #app, #app > *, .main-container, .layout-container, .problem-container, 
            [class*="background"], [class*="bg"], [style*="background-image"] {
                background-image: none !important;
                background-color: transparent !important;
            }
            html {
                background-image: url(${bgImageUrl}) !important;
                background-size: cover !important;
                background-position: center !important;
                background-attachment: fixed !important;
                background-repeat: no-repeat !important;
            }
            body, #app {
                background-color: transparent !important;
                background-image: none !important;
            }
        `;
    } else {
        css += `
            html, body, #app {
                background-image: none !important;
                background-color: transparent !important;
            }
        `;
    }

    const style = document.createElement('style');
    style.id = 'my-custom-theme-style';
    style.textContent = css;
    document.head.appendChild(style);
    console.log('🖼️ 背景图已应用:', bgImageUrl || '默认');

    // 背景变化后，重新判断毛玻璃状态
    refreshGlassState();
}

// ============================================================
// 2. 毛玻璃开关 + 光斑控制
// ============================================================
function addGlassOrbs() {
    if (document.getElementById('hc-glass-bg')) return;
    if (!document.body) return;
    const bg = document.createElement('div');
    bg.id = 'hc-glass-bg';
    bg.className = 'hc-bg';
    bg.setAttribute('aria-hidden', 'true');
    bg.innerHTML =
      '<i class="hc-orb o1"></i>' +
      '<i class="hc-orb o2"></i>' +
      '<i class="hc-orb o3"></i>' +
      '<i class="hc-orb o4"></i>';
    document.body.appendChild(bg);
}

function removeGlassOrbs() {
    const bg = document.getElementById('hc-glass-bg');
    if (bg) bg.remove();
}

function refreshGlassState() {
    const enabled = currentGlassEnabled;
    const hasBg = currentBgUrl && currentBgUrl.length > 5;

    document.documentElement.classList.toggle('hc-glass-on', enabled);
    document.documentElement.classList.toggle('hc-glass-solid-bg', enabled && !hasBg);

    if (enabled && !hasBg) {
        addGlassOrbs();
    } else {
        removeGlassOrbs();
    }
    console.log('🪟 毛玻璃状态:', enabled, '有背景图:', hasBg);
}

// 注入毛玻璃 CSS（只注入一次）
function injectGlassStyle() {
    if (document.getElementById('hc-glass-style')) return;
    const style = document.createElement('style');
    style.id = 'hc-glass-style';
    style.textContent = GLASS_CSS;
    document.documentElement.appendChild(style);
}

// ============================================================
// 3. 隐藏卡片功能（保留原逻辑）
// ============================================================
let isPickMode = false;
let hiddenObserver = null;

function migrateOldData() {
    chrome.storage.sync.get(['hiddenSelectors'], (res) => {
        if (res.hiddenSelectors && res.hiddenSelectors.length > 0) {
            const newItems = res.hiddenSelectors.map(s => ({ selector: s, enabled: true }));
            chrome.storage.sync.set({ hiddenItems: newItems }, () => {
                chrome.storage.sync.remove('hiddenSelectors');
            });
        }
    });
}
migrateOldData();

function applyHiddenSelectors() {
    chrome.storage.sync.get(['hiddenItems'], (res) => {
        const items = res.hiddenItems || [];
        const enabledSelectors = items.filter(item => item.enabled).map(item => item.selector);
        enabledSelectors.forEach(selector => {
            try {
                document.querySelectorAll(selector).forEach(el => {
                    el.style.setProperty('display', 'none', 'important');
                });
            } catch (e) {
                console.warn('隐藏选择器无效:', selector, e);
            }
        });
        if (!hiddenObserver) {
            const app = document.getElementById('app');
            if (app) {
                hiddenObserver = new MutationObserver(() => applyHiddenSelectors());
                hiddenObserver.observe(app, { childList: true, subtree: true });
            }
        }
    });
}

function getUniqueSelector(el) {
    if (el.id) return '#' + el.id;
    const path = [];
    let current = el;
    let depth = 0;
    while (current && current !== document.body && depth < 10) {
        let selector = current.tagName.toLowerCase();
        if (current.className && typeof current.className === 'string') {
            const classes = current.className.trim().split(/\s+/).filter(c => c && !c.startsWith('_'));
            if (classes.length > 0) selector += '.' + classes.join('.');
        }
        const parent = current.parentElement;
        if (parent) {
            const siblings = parent.children;
            let index = 0;
            for (let i = 0; i < siblings.length; i++) {
                if (siblings[i].tagName === current.tagName) {
                    index++;
                    if (siblings[i] === current) break;
                }
            }
            if (index > 0) selector += `:nth-of-type(${index})`;
        }
        path.unshift(selector);
        current = current.parentElement;
        depth++;
    }
    return path.join(' > ');
}

function getCardName(card) {
    const titleEl = card.querySelector('.el-card__header, .card-title, h3, h4, .title, .name');
    if (titleEl) {
        const text = titleEl.textContent.trim().slice(0, 20);
        if (text) return '📌 ' + text;
    }
    const img = card.querySelector('img');
    if (img && img.alt) return '🖼️ ' + img.alt;
    return null;
}

function exitPickMode() {
    isPickMode = false;
    document.body.style.cursor = '';
    const tip = document.getElementById('pick-tip');
    if (tip) tip.remove();
}

function enterPickMode() {
    if (isPickMode) return;
    isPickMode = true;
    document.body.style.cursor = 'crosshair';
    const tip = document.createElement('div');
    tip.id = 'pick-tip';
    tip.textContent = '点击要隐藏的卡片，按 ESC 取消';
    tip.style.cssText = `
        position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
        background: rgba(0,0,0,0.8); color: #fff; padding: 12px 24px;
        border-radius: 8px; font-size: 16px; z-index: 999999;
        font-family: system-ui; pointer-events: none; white-space: nowrap;
    `;
    document.body.appendChild(tip);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'enterPickMode') {
        enterPickMode();
        sendResponse({ status: 'ok' });
    }
    return true;
});

document.addEventListener('click', function(e) {
    if (!isPickMode) return;
    e.preventDefault();
    e.stopPropagation();
    let target = e.target;
    while (target && target !== document.body) {
        if (target.classList && target.classList.contains('el-card')) break;
        if (target.parentElement && target.parentElement.classList &&
            target.parentElement.classList.contains('el-card')) {
            target = target.parentElement;
            break;
        }
        target = target.parentElement;
    }
    if (!target || target === document.body) target = e.target;
    const selector = getUniqueSelector(target);
    chrome.storage.sync.get(['hiddenItems'], (res) => {
        let items = res.hiddenItems || [];
        if (!items.some(item => item.selector === selector)) {
            const name = getCardName(target);
            items.push({ selector, enabled: true, name: name || '📦 自定义卡片' });
            chrome.storage.sync.set({ hiddenItems: items }, () => {
                target.style.setProperty('display', 'none', 'important');
                exitPickMode();
            });
        } else {
            alert('该卡片已在隐藏列表中');
            exitPickMode();
        }
    });
}, true);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isPickMode) exitPickMode();
});

// ============================================================
// 4. 读取存储并初始化
// ============================================================
console.log('🚀 HCCode 助手已启动');
injectGlassStyle();

function init() {
    chrome.storage.sync.get(['bgImageUrl', 'glassEnabled'], (res) => {
        currentGlassEnabled = res.glassEnabled !== undefined ? res.glassEnabled : true;
        applyBackground(res.bgImageUrl || '');
    });
    applyHiddenSelectors();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
window.addEventListener('load', () => {
    applyHiddenSelectors();
    refreshGlassState();
});

chrome.storage.onChanged.addListener((changes) => {
    if (changes.bgImageUrl) {
        applyBackground(changes.bgImageUrl.newValue || '');
    }
    if (changes.glassEnabled) {
        currentGlassEnabled = changes.glassEnabled.newValue;
        refreshGlassState();
    }
    if (changes.hiddenItems) {
        applyHiddenSelectors();
    }
});

// ============================================================
// 5. Toast 通知
// ============================================================
function showToast(message, duration = 4500) {
    const oldToast = document.getElementById('my-custom-toast');
    if (oldToast) oldToast.remove();
    const toast = document.createElement('div');
    toast.id = 'my-custom-toast';
    toast.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.85); color: #fff; padding: 28px 44px;
        border-radius: 16px; font-size: 26px; font-weight: bold;
        font-family: system-ui, sans-serif; z-index: 999999;
        box-shadow: 0 12px 40px rgba(0,0,0,0.6); text-align: center;
        max-width: 90%; pointer-events: none; border: 2px solid #4F46E5;
        letter-spacing: 0.5px; line-height: 1.6; opacity: 1;
        transition: opacity 0.3s ease;
    `;
    toast.innerHTML = `<span style="font-size:32px;">📋</span> ${message}`;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => { if (toast.parentNode) toast.remove(); }, 400);
    }, duration);
}

// ============================================================
// 6. AI 按钮（完整保留）
// ============================================================
function getProblemText() {
    let title = document.querySelector('h1')?.innerText || '题目';
    let contentElement = document.querySelector('main, article, [class*="problem"], [class*="statement"]');
    let mainText = contentElement ? (contentElement.innerText || '') : document.body.innerText;
    let codeBlocks = [];
    document.querySelectorAll('pre, code').forEach(el => {
        let text = el.innerText.trim();
        if (text.length > 0) codeBlocks.push(text);
    });
    let combined = mainText;
    if (codeBlocks.length > 0) combined += '\n\n' + codeBlocks.join('\n\n');
    const lines = combined.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const noiseKeywords = [
        '首页', '题目', '训练', '比赛', '评测', '排名', '讨论', '团队', '课程', '工具箱',
        '登录', '注册', '语言', '在线自测', '自测', '⋮', '提交', '运行', 'IDE',
        'We\'re sorry', 'JavaScript enabled', 'enable it to continue'
    ];
    const filteredLines = lines.filter(line => {
        if (/^(首页|题目|训练|比赛|评测|排名|讨论|团队|课程|工具箱|\s)+$/.test(line)) return false;
        let isNoise = false;
        for (let kw of noiseKeywords) {
            if (line.includes(kw) && line.length < 40) { isNoise = true; break; }
        }
        if (line.includes("We're sorry") || line.includes("enable it to continue")) isNoise = true;
        return !isNoise;
    });
    let content = filteredLines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
    if (content.length < 20) content = document.body.innerText;
    if (content.length > 3500) content = content.substring(0, 3500) + '\n...(截断)';
    return "语言C++\n\n" + title + '\n\n' + content;
}

function addAIButton() {
    if (document.getElementById('my-ai-btn-wrapper')) return;
    const wrapper = document.createElement('div');
    wrapper.id = 'my-ai-btn-wrapper';
    wrapper.style.cssText = `position: fixed; z-index: 99999; font-family: system-ui, sans-serif; touch-action: none; user-select: none;`;
    const mainBtn = document.createElement('div');
    mainBtn.id = 'my-ai-btn';
    mainBtn.textContent = '🤖';
    mainBtn.style.cssText = `
        width: 56px; height: 56px; border-radius: 50%; background: #4F46E5;
        color: white; font-size: 28px; display: flex; align-items: center;
        justify-content: center; cursor: grab;
        box-shadow: 0 4px 12px rgba(79, 70, 229, 0.5);
        transition: transform 0.2s; user-select: none;
    `;
    mainBtn.onmouseenter = () => { mainBtn.style.transform = 'scale(1.05)'; };
    mainBtn.onmouseleave = () => { mainBtn.style.transform = 'scale(1)'; };

    const menu = document.createElement('div');
    menu.id = 'my-ai-menu';
    menu.style.cssText = `
        position: absolute; bottom: 70px; left: 50%; transform: translateX(-50%);
        background: white; border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.15); padding: 8px 0;
        min-width: 140px; display: none; flex-direction: column; overflow: hidden;
    `;
    const aiList = [
        { label: '问豆包 📋', url: () => `https://www.doubao.com/chat/`, needToast: true },
        { label: '问DeepSeek', url: (text) => `https://chat.deepseek.com/?q=${encodeURIComponent(text)}` },
        { label: '问Kimi', url: (text) => `https://kimi.moonshot.cn/_prefill_chat?prefill_prompt=${encodeURIComponent(text)}&send_immediately=true` }
    ];
    aiList.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.textContent = item.label;
        menuItem.style.cssText = `padding: 10px 20px; cursor: pointer; font-size: 14px; color: #333; transition: background 0.15s; white-space: nowrap;`;
        menuItem.onmouseenter = () => { menuItem.style.background = '#f0f0f0'; };
        menuItem.onmouseleave = () => { menuItem.style.background = 'transparent'; };
        menuItem.onclick = async function(e) {
            e.stopPropagation();
            const text = getProblemText();
            try { await navigator.clipboard.writeText(text); } catch (err) { alert('复制失败：' + err); return; }
            if (item.needToast) {
                showToast('题目已复制！正在打开豆包...', 4500);
                menu.style.display = 'none';
                setTimeout(() => { window.open(item.url(), '_blank'); }, 1500);
                return;
            }
            window.open(item.url(text), '_blank');
            menu.style.display = 'none';
        };
        menu.appendChild(menuItem);
    });
    mainBtn.onclick = function(e) {
        e.stopPropagation();
        menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
    };
    document.addEventListener('click', function closeMenu(e) {
        if (!wrapper.contains(e.target)) menu.style.display = 'none';
    });
    wrapper.appendChild(mainBtn);
    wrapper.appendChild(menu);
    document.body.appendChild(wrapper);

    let isDragging = false, startX, startY, startLeft, startTop, hasMoved = false;
    chrome.storage.sync.get(['aiButtonPos'], (res) => {
        const pos = res.aiButtonPos || { left: 30, bottom: 30 };
        if (pos.left !== undefined && pos.top !== undefined) {
            wrapper.style.left = pos.left + 'px';
            wrapper.style.top = pos.top + 'px';
            wrapper.style.bottom = 'auto';
            wrapper.style.right = 'auto';
        } else {
            wrapper.style.left = '30px';
            wrapper.style.bottom = '30px';
            wrapper.style.top = 'auto';
            wrapper.style.right = 'auto';
        }
    });
    function onDragStart(e) {
        const ev = e.touches ? e.touches[0] : e;
        if (e.target.closest('#my-ai-menu')) return;
        isDragging = true; hasMoved = false;
        const rect = wrapper.getBoundingClientRect();
        startX = ev.clientX; startY = ev.clientY;
        startLeft = rect.left; startTop = rect.top;
        mainBtn.style.cursor = 'grabbing';
        e.preventDefault();
    }
    function onDragMove(e) {
        if (!isDragging) return;
        const ev = e.touches ? e.touches[0] : e;
        const dx = ev.clientX - startX, dy = ev.clientY - startY;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved = true;
        let newLeft = startLeft + dx, newTop = startTop + dy;
        const w = wrapper.offsetWidth || 56, h = wrapper.offsetHeight || 56;
        newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - w));
        newTop = Math.max(0, Math.min(newTop, window.innerHeight - h));
        wrapper.style.left = newLeft + 'px';
        wrapper.style.top = newTop + 'px';
        wrapper.style.bottom = 'auto';
        wrapper.style.right = 'auto';
        e.preventDefault();
    }
    function onDragEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        mainBtn.style.cursor = 'grab';
        if (hasMoved) {
            const left = parseInt(wrapper.style.left, 10);
            const top = parseInt(wrapper.style.top, 10);
            chrome.storage.sync.set({ aiButtonPos: { left, top } });
            setTimeout(() => { hasMoved = false; }, 50);
        }
    }
    wrapper.addEventListener('mousedown', onDragStart);
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);
    wrapper.addEventListener('touchstart', onDragStart, { passive: false });
    document.addEventListener('touchmove', onDragMove, { passive: false });
    document.addEventListener('touchend', onDragEnd);
}

// ============================================================
// 7. 巡逻兵
// ============================================================
let lastUrl = location.href;
function checkAndAct() {
    const currentUrl = location.href;
    const isFirstRun = (lastUrl === location.href && !window._hasInitialized);
    if (currentUrl !== lastUrl || isFirstRun) {
        lastUrl = currentUrl;
        if (isFirstRun) window._hasInitialized = true;
        if (currentUrl.indexOf('/contest/') !== -1) {
            const oldWrapper = document.getElementById('my-ai-btn-wrapper');
            if (oldWrapper) oldWrapper.remove();
            return;
        }
        const oldWrapper = document.getElementById('my-ai-btn-wrapper');
        if (oldWrapper) oldWrapper.remove();
        if (currentUrl.indexOf('/problem/') !== -1 || currentUrl.indexOf('/training/') !== -1) {
            addAIButton();
        }
    }
}
window.addEventListener('load', checkAndAct);
if (document.readyState === 'complete') checkAndAct();
else document.addEventListener('DOMContentLoaded', checkAndAct);
setInterval(checkAndAct, 800);