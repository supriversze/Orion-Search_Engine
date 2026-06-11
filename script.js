/**
 * ORION – Frontend UI Demonstration
 * This script powers visual interactions only.
 * No real search, no external redirects, no data collection, no login.
 */
document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const searchInput = document.getElementById('search-input');
    const newLookCheckbox = document.getElementById('new-look-checkbox');
    const settingsBtn = document.getElementById('settings-btn');
    const addShortcutBtn = document.getElementById('add-shortcut-btn');
    const searchBox = document.getElementById('search-box');
    const voiceBtn = document.getElementById('voice-btn');
    const imageBtn = document.getElementById('image-btn');
    const refreshTrendsBtn = document.getElementById('refresh-trends');
    const dismissBanner = document.getElementById('dismiss-banner');

    // 1. Splash Screen – Remove from DOM after CSS animation completes (3.4s + 0.6s = 4s)
    setTimeout(() => {
        if (splashScreen) {
            splashScreen.style.display = 'none';
        }
        if (searchInput) {
            searchInput.focus();
        }
    }, 4200); // slight buffer after the 4s animation

    // 2. New Look Toggle (visual only – no localStorage)
    newLookCheckbox.addEventListener('change', () => {
        const checked = newLookCheckbox.checked;
        if (checked) {
            document.body.classList.add('new-look');
        } else {
            document.body.classList.remove('new-look');
        }
    });

    // 3. Search Bar Interaction Focus Styles (visual feedback only)
    if (searchInput && searchBox) {
        searchInput.addEventListener('focus', () => {
            searchBox.classList.add('focused');
        });
        searchInput.addEventListener('blur', () => {
            searchBox.classList.remove('focused');
        });

        // Prevent any form submission or navigation from search input
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                showDemoToast('Search is a visual demo only – no real results.');
            }
        });
    }

    // 4. Voice Search – Demo toast only
    if (voiceBtn) {
        voiceBtn.addEventListener('click', () => {
            showDemoToast('Voice Search: This is a UI demo – microphone not activated.');
        });
    }

    // 5. Image Search – Demo toast only
    if (imageBtn) {
        imageBtn.addEventListener('click', () => {
            showDemoToast('Visual Search: This is a UI demo – camera not activated.');
        });
    }

    // 6. Refresh Trends – Visual micro-interaction only (shuffles static demo data)
    if (refreshTrendsBtn) {
        refreshTrendsBtn.addEventListener('click', () => {
            refreshTrendsBtn.style.transform = 'rotate(360deg)';
            refreshTrendsBtn.style.transition = 'transform 0.4s ease';
            
            // Static demo trend data – no external URLs
            const trends = [
                { keyword: 'NASA Artemis Constellation', val: '+142%' },
                { keyword: '500-Qubit Quantum Chip', val: '+89%' },
                { keyword: 'Silicon Photonics Trend', val: '+64%' },
                { keyword: 'WebGPU W3C Release', val: '+37%' },
                { keyword: 'Deep Learning Optimization', val: '+215%' },
                { keyword: 'Next-Gen Solar Cells', val: '+118%' }
            ];

            // Shuffle trends for visual effect
            const shuffled = trends.sort(() => 0.5 - Math.random()).slice(0, 4);
            const listItems = document.querySelectorAll('.trending-list li');
            
            listItems.forEach((item, index) => {
                const keywordEl = item.querySelector('.trending-keyword');
                const trendEl = item.querySelector('.trending-trend');
                
                keywordEl.style.opacity = '0';
                trendEl.style.opacity = '0';
                
                setTimeout(() => {
                    keywordEl.textContent = shuffled[index].keyword;
                    trendEl.innerHTML = `<i class="bx bx-upvote"></i> ${shuffled[index].val}`;
                    
                    keywordEl.style.opacity = '1';
                    trendEl.style.opacity = '1';
                }, 200);
            });

            setTimeout(() => {
                refreshTrendsBtn.style.transform = 'none';
                refreshTrendsBtn.style.transition = 'none';
            }, 400);
        });
    }

    // 7. Settings Button – Demo-only toast
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            showDemoToast('Settings panel is a visual demo only.');
        });
    }

    // 8. Add Shortcut – Demo-only toast (no real link creation)
    if (addShortcutBtn) {
        addShortcutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showDemoToast('Add Link is a visual demo only – no shortcuts are saved.');
        });
    }

    // 9. Dismiss demo banner
    if (dismissBanner) {
        dismissBanner.addEventListener('click', () => {
            const banner = document.getElementById('demo-banner');
            if (banner) {
                banner.style.transform = 'translateY(100%)';
                banner.style.opacity = '0';
                setTimeout(() => banner.remove(), 400);
            }
        });
    }

    // ============================
    // Demo Toast Notification
    // ============================
    function showDemoToast(message) {
        // Remove any existing toast
        const existing = document.querySelector('.demo-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'demo-toast';
        toast.innerHTML = `<i class="bx bx-info-circle"></i> ${message}`;
        document.body.appendChild(toast);

        // Trigger entrance
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Auto-dismiss after 3s
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }
});
