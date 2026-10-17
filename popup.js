document.addEventListener('DOMContentLoaded', function() {
    const bgInput = document.getElementById('bgInput');
    const saveBgBtn = document.getElementById('saveBgBtn');
    const clearBgBtn = document.getElementById('clearBgBtn');
    const selectorInput = document.getElementById('selectorInput');
    const addSelectorBtn = document.getElementById('addSelectorBtn');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const pickModeBtn = document.getElementById('pickModeBtn');
    const hiddenListContainer = document.getElementById('hiddenListContainer');
    const msg = document.getElementById('msg');
    const advancedToggle = document.getElementById('advancedToggle');
    const advancedContent = document.getElementById('advancedContent');
    const exportBtn = document.getElementById('exportBtn');
    const importBtn = document.getElementById('importBtn');
    const resetBtn = document.getElementById('resetBtn');
    const importInput = document.getElementById('importInput');
    const glassToggle = document.getElementById('glassToggle');
    // 新增：设置备份
    const exportAllBtn = document.getElementById('exportAllBtn');
    const importAllBtn = document.getElementById('importAllBtn');
    const backupInput = document.getElementById('backupInput');

    // ============================================================
    // 悬浮提示函数
    // ============================================================
    let msgTimer = null;
    function showMsg(text, type) {
        msg.textContent = text;
        msg.className = 'show';
        if (type) msg.classList.add(type);
        clearTimeout(msgTimer);
        msgTimer = setTimeout(() => {
            msg.className = '';
            msg.textContent = '';
        }, 2800);
    }

    // ---- 高级设置折叠 ----
    advancedToggle.addEventListener('click', function() {
        const isOpen = advancedContent.classList.toggle('open');
        advancedToggle.textContent = isOpen ? '⚙️ 高级设置 ▲' : '⚙️ 高级设置 ▼';
    });

    // ============================================================
    // 预设卡片列表
    // ============================================================
    const PRESET_CARDS = [
        { selector: 'div:nth-of-type(1) > div.full-height.flex-column:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div.el-row:nth-of-type(1) > div.el-col.el-col-24.el-col-sm-24.el-col-md-15:nth-of-type(1) > div.el-card.is-always-shadow:nth-of-type(1)', name: '🎠 欢迎卡片' },
        { selector: 'div:nth-of-type(1) > div.full-height.flex-column:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div.el-row:nth-of-type(1) > div.el-col.el-col-24.el-col-sm-24.el-col-md-15:nth-of-type(1) > div.el-card.card-top.is-always-shadow:nth-of-type(2)', name: '📰 公告' },
        { selector: 'div:nth-of-type(1) > div.full-height.flex-column:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div.el-row:nth-of-type(1) > div.phone-margin.el-col.el-col-24.el-col-sm-24.el-col-md-9:nth-of-type(2) > div.el-card.is-always-shadow:nth-of-type(1)', name: '⏲️ 当前时刻' },
        { selector: 'div:nth-of-type(1) > div.full-height.flex-column:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div.el-row:nth-of-type(1) > div.phone-margin.el-col.el-col-24.el-col-sm-24.el-col-md-9:nth-of-type(2) > div.el-card.is-always-shadow.card-top:nth-of-type(2)', name: '🏎️ 近期比赛' },
        { selector: 'div:nth-of-type(1) > div.full-height.flex-column:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div.el-row:nth-of-type(1) > div.phone-margin.el-col.el-col-24.el-col-sm-24.el-col-md-9:nth-of-type(2) > div.el-card.card-top.is-always-shadow:nth-of-type(3)', name: '📋 推荐题单' },
        { selector: 'div:nth-of-type(1) > div.full-height.flex-column:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div.el-row:nth-of-type(1) > div.phone-margin.el-col.el-col-24.el-col-sm-24.el-col-md-9:nth-of-type(2) > div.el-card.card-top.is-always-shadow:nth-of-type(4)', name: '📌 最近一周过题榜单' },
    ];

    function saveAndRefresh(items, successMsg) {
        chrome.storage.sync.set({ hiddenItems: items }, () => {
            if (chrome.runtime.lastError) {
                showMsg('❌ 保存失败', 'error');
                return;
            }
            showMsg(successMsg || '✅ 已更新');
            renderHiddenList(items);
            refreshPage();
        });
    }

    function getCurrentItems(callback) {
        chrome.storage.sync.get(['hiddenItems'], (res) => {
            callback(res.hiddenItems || []);
        });
    }

    // 初始化预设
    function initPresetCards() {
        chrome.storage.sync.get(['hiddenItems'], (res) => {
            if (!res.hiddenItems || res.hiddenItems.length === 0) {
                const preset = PRESET_CARDS.map(item => ({
                    selector: item.selector,
                    enabled: false,
                    name: item.name
                }));
                chrome.storage.sync.set({ hiddenItems: preset }, () => {
                    renderHiddenList(preset);
                });
            }
        });
    }
    initPresetCards();

    // ---- 毛玻璃开关 ----
    chrome.storage.sync.get(['glassEnabled'], (res) => {
        glassToggle.checked = res.glassEnabled !== undefined ? res.glassEnabled : true;
    });
    glassToggle.addEventListener('change', function() {
        const enabled = this.checked;
        chrome.storage.sync.set({ glassEnabled: enabled }, () => {
            showMsg(enabled ? '🪟 毛玻璃已开启' : '🪟 毛玻璃已关闭');
            refreshPage();
        });
    });

    // ---- 加载背景图 ----
    chrome.storage.sync.get(['bgImageUrl'], (res) => {
        if (res.bgImageUrl) bgInput.value = res.bgImageUrl;
    });

    saveBgBtn.addEventListener('click', function() {
        const bgUrl = bgInput.value.trim();
        chrome.storage.sync.set({ bgImageUrl: bgUrl }, () => {
            if (chrome.runtime.lastError) {
                showMsg('❌ 保存失败', 'error');
                return;
            }
            showMsg(bgUrl ? '✅ 背景图已更新！' : '✅ 已恢复默认背景！');
            refreshPage();
        });
    });

    // ---- 清空背景图（垃圾桶按钮） ----
    clearBgBtn.addEventListener('click', function() {
        bgInput.value = '';
        chrome.storage.sync.set({ bgImageUrl: '' }, () => {
            if (chrome.runtime.lastError) {
                showMsg('❌ 清空失败', 'error');
                return;
            }
            showMsg('🗑️ 已恢复默认背景');
            refreshPage();
        });
    });

    // ============================================================
    // 隐藏卡片：导出
    // ============================================================
    exportBtn.addEventListener('click', function() {
        chrome.storage.sync.get(['hiddenItems'], (res) => {
            const items = res.hiddenItems || [];
            if (items.length === 0) {
                showMsg('⚠️ 没有规则可导出', 'warning');
                return;
            }
            let text = '===== 隐藏卡片规则 =====\n\n';
            items.forEach((item, index) => {
                const name = item.name || '未命名卡片';
                const selector = item.selector;
                const status = item.enabled !== false ? '✅ 启用' : '⛔ 禁用';
                text += `${index+1}. ${name}\n`;
                text += `   选择器: ${selector}\n`;
                text += `   状态: ${status}\n\n`;
            });
            text += '===== 导出时间: ' + new Date().toLocaleString() + ' =====';

            navigator.clipboard.writeText(text).then(() => {
                showMsg('✅ 已导出到剪贴板！');
            }).catch(() => {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                textarea.remove();
                showMsg('✅ 已导出到剪贴板！');
            });
        });
    });

    // ---- 隐藏卡片：导入 ----
    importBtn.addEventListener('click', function() {
        const text = importInput.value.trim();
        if (!text) {
            showMsg('⚠️ 请先粘贴规则文本', 'warning');
            return;
        }
        if (!text.includes('===== 隐藏卡片规则 =====')) {
            showMsg('⚠️ 无效的规则格式', 'warning');
            return;
        }

        const lines = text.split('\n');
        const parsed = [];
        let current = null;

        for (let line of lines) {
            line = line.trim();
            const matchNum = line.match(/^\d+\.\s+(.+)$/);
            if (matchNum) {
                if (current) parsed.push(current);
                current = { name: matchNum[1] };
                continue;
            }
            const matchSelector = line.match(/^选择器:\s+(.+)$/);
            if (matchSelector && current) {
                current.selector = matchSelector[1];
                continue;
            }
        }
        if (current) parsed.push(current);

        const valid = parsed.filter(item => item.selector && item.name);
        if (valid.length === 0) {
            showMsg('⚠️ 解析失败，请检查格式', 'warning');
            return;
        }

        if (confirm(`解析到 ${valid.length} 条规则，点击"确定"覆盖当前列表，点击"取消"追加到末尾`)) {
            const items = valid.map(item => ({
                selector: item.selector,
                enabled: true,
                name: item.name
            }));
            saveAndRefresh(items, `✅ 已导入 ${items.length} 条规则`);
        } else {
            getCurrentItems((currentItems) => {
                const existingSelectors = new Set(currentItems.map(i => i.selector));
                const newItems = valid
                    .filter(item => !existingSelectors.has(item.selector))
                    .map(item => ({
                        selector: item.selector,
                        enabled: true,
                        name: item.name
                    }));
                if (newItems.length === 0) {
                    showMsg('⚠️ 所有规则已存在', 'warning');
                    return;
                }
                const merged = [...currentItems, ...newItems];
                saveAndRefresh(merged, `✅ 已追加 ${newItems.length} 条规则`);
            });
        }
        importInput.value = '';
    });

    // ---- 复原 ----
    resetBtn.addEventListener('click', function() {
        if (!confirm('确定恢复到出厂预设吗？当前所有自定义规则将被清除！')) return;
        const preset = PRESET_CARDS.map(item => ({
            selector: item.selector,
            enabled: false,
            name: item.name
        }));
        saveAndRefresh(preset, '🔄 已恢复到出厂预设');
    });

    // ============================================================
    // 💾 设置备份：导出全部
    // ============================================================
    exportAllBtn.addEventListener('click', function() {
        chrome.storage.sync.get(
            ['bgImageUrl', 'glassEnabled', 'hiddenItems', 'aiButtonPos'],
            (res) => {
                const backup = {
                    version: '1.3',
                    timestamp: Date.now(),
                    exportTime: new Date().toLocaleString(),
                    bgImageUrl: res.bgImageUrl || '',
                    glassEnabled: res.glassEnabled !== undefined ? res.glassEnabled : true,
                    aiButtonPos: res.aiButtonPos || null,
                    hiddenItems: res.hiddenItems || []
                };
                const text = JSON.stringify(backup, null, 2);

                navigator.clipboard.writeText(text).then(() => {
                    showMsg('✅ 全部设置已复制到剪贴板！');
                }).catch(() => {
                    const ta = document.createElement('textarea');
                    ta.value = text;
                    document.body.appendChild(ta);
                    ta.select();
                    document.execCommand('copy');
                    ta.remove();
                    showMsg('✅ 全部设置已复制到剪贴板！');
                });

                // 同时显示在输入框，方便用户手动复制
                backupInput.value = text;
            }
        );
    });

    // ============================================================
    // 💾 设置备份：导入全部
    // ============================================================
    importAllBtn.addEventListener('click', function() {
        const text = backupInput.value.trim();
        if (!text) {
            showMsg('⚠️ 请先粘贴备份数据', 'warning');
            return;
        }

        let backup;
        try {
            backup = JSON.parse(text);
        } catch (e) {
            showMsg('⚠️ 数据格式无效', 'error');
            return;
        }

        if (!backup || typeof backup !== 'object') {
            showMsg('⚠️ 数据格式无效', 'error');
            return;
        }

        // 简单校验：至少有一个合法字段
        const hasValid =
            typeof backup.bgImageUrl === 'string' ||
            typeof backup.glassEnabled === 'boolean' ||
            Array.isArray(backup.hiddenItems);
        if (!hasValid) {
            showMsg('⚠️ 数据不包含可识别的设置', 'warning');
            return;
        }

        if (!confirm('确定导入吗？当前所有设置将被覆盖！')) return;

        const toSet = {};
        if (typeof backup.bgImageUrl === 'string') toSet.bgImageUrl = backup.bgImageUrl;
        if (typeof backup.glassEnabled === 'boolean') toSet.glassEnabled = backup.glassEnabled;
        if (Array.isArray(backup.hiddenItems)) toSet.hiddenItems = backup.hiddenItems;
        if (backup.aiButtonPos && typeof backup.aiButtonPos === 'object') {
            toSet.aiButtonPos = backup.aiButtonPos;
        }

        chrome.storage.sync.set(toSet, () => {
            if (chrome.runtime.lastError) {
                showMsg('❌ 导入失败', 'error');
                return;
            }
            showMsg('✅ 已导入全部设置！');
            backupInput.value = '';
            // 刷新弹窗界面，显示新数据
            setTimeout(() => location.reload(), 600);
        });
    });

    // ============================================================
    // 隐藏列表渲染
    // ============================================================
    function loadHiddenList() {
        chrome.storage.sync.get(['hiddenItems'], (res) => {
            renderHiddenList(res.hiddenItems || []);
        });
    }

    function renderHiddenList(items) {
        hiddenListContainer.innerHTML = '';
        if (items.length === 0) {
            hiddenListContainer.innerHTML = '<div style="color:#999;font-size:12px;text-align:center;padding:8px;">暂无隐藏卡片</div>';
            return;
        }
        items.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'hidden-item';
            const left = document.createElement('div');
            left.className = 'left';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = item.enabled !== false;
            checkbox.addEventListener('change', function() {
                toggleItem(index, this.checked);
            });
            const textSpan = document.createElement('span');
            textSpan.className = 'selector-text';
            textSpan.textContent = `${item.name || '📦 自定义卡片'} ( ${item.selector} )`;
            textSpan.title = item.selector;
            left.appendChild(checkbox);
            left.appendChild(textSpan);
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-btn';
            removeBtn.textContent = '删除';
            removeBtn.addEventListener('click', function() {
                removeItem(index);
            });
            div.appendChild(left);
            div.appendChild(removeBtn);
            hiddenListContainer.appendChild(div);
        });
    }

    function toggleItem(index, enabled) {
        chrome.storage.sync.get(['hiddenItems'], (res) => {
            const items = res.hiddenItems || [];
            if (index >= 0 && index < items.length) {
                items[index].enabled = enabled;
                chrome.storage.sync.set({ hiddenItems: items }, () => {
                    showMsg(enabled ? '✅ 已启用隐藏' : '⏸️ 已禁用隐藏');
                    refreshPage();
                });
            }
        });
    }

    function removeItem(index) {
        chrome.storage.sync.get(['hiddenItems'], (res) => {
            const items = res.hiddenItems || [];
            if (index >= 0 && index < items.length) {
                items.splice(index, 1);
                chrome.storage.sync.set({ hiddenItems: items }, () => {
                    showMsg('✅ 已删除');
                    renderHiddenList(items);
                    refreshPage();
                });
            }
        });
    }

    // ---- 手动添加 ----
    addSelectorBtn.addEventListener('click', function() {
        const selector = selectorInput.value.trim();
        if (!selector) {
            showMsg('⚠️ 请输入选择器', 'warning');
            return;
        }
        chrome.storage.sync.get(['hiddenItems'], (res) => {
            const items = res.hiddenItems || [];
            if (items.some(item => item.selector === selector)) {
                showMsg('⚠️ 该选择器已存在', 'warning');
                return;
            }
            items.push({ selector, enabled: true });
            chrome.storage.sync.set({ hiddenItems: items }, () => {
                showMsg('✅ 已添加');
                selectorInput.value = '';
                renderHiddenList(items);
                refreshPage();
            });
        });
    });

    // ---- 点选隐藏 ----
    pickModeBtn.addEventListener('click', function() {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'enterPickMode' });
                window.close();
            }
        });
    });

    // ---- 全部清除 ----
    clearAllBtn.addEventListener('click', function() {
        if (confirm('确定清除所有隐藏规则吗？')) {
            chrome.storage.sync.set({ hiddenItems: [] }, () => {
                showMsg('✅ 已全部清除');
                renderHiddenList([]);
                refreshPage();
            });
        }
    });

    function refreshPage() {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) chrome.tabs.reload(tabs[0].id);
        });
    }

    loadHiddenList();
});