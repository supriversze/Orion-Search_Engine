document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const searchInput = document.getElementById('search-input');
    const newLookCheckbox = document.getElementById('new-look-checkbox');
    const settingsBtn = document.getElementById('settings-btn');
    const addShortcutBtn = document.getElementById('add-shortcut-btn');
    const searchBox = document.querySelector('.search-box');
    const searchForm = document.getElementById('search-form');
    const voiceBtn = document.getElementById('voice-btn');
    const imageBtn = document.getElementById('image-btn');
    const refreshTrendsBtn = document.getElementById('refresh-trends');

    // 1. Splash Screen – Remove from DOM after CSS animation completes (3.4s + 0.6s = 4s)
    setTimeout(() => {
        if (splashScreen) {
            splashScreen.style.display = 'none';
        }
        if (searchInput) {
            searchInput.focus();
        }
    }, 4200); // slight buffer after the 4s animation

    // 2. New Look Toggle & Persistence
    // Load saved preference
    const savedNewLook = localStorage.getItem('newLookTheme');
    if (savedNewLook !== null) {
        const isNewLook = savedNewLook === 'true';
        newLookCheckbox.checked = isNewLook;
        if (isNewLook) {
            document.body.classList.add('new-look');
        } else {
            document.body.classList.remove('new-look');
        }
    } else {
        // Default is checked (pure black background)
        document.body.classList.add('new-look');
    }

    newLookCheckbox.addEventListener('change', () => {
        const checked = newLookCheckbox.checked;
        if (checked) {
            document.body.classList.add('new-look');
        } else {
            document.body.classList.remove('new-look');
        }
        localStorage.setItem('newLookTheme', checked);
    });

    // 3. Search Bar Interaction Focus Styles
    if (searchInput && searchBox) {
        searchInput.addEventListener('focus', () => {
            searchBox.classList.add('focused');
        });
        searchInput.addEventListener('blur', () => {
            searchBox.classList.remove('focused');
        });
    }

    // 4. Voice Search Micro-Interaction
    if (voiceBtn) {
        voiceBtn.addEventListener('click', () => {
            if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                const recognition = new SpeechRecognition();
                recognition.lang = 'en-US';
                recognition.interimResults = false;
                recognition.maxAlternatives = 1;

                searchBox.style.borderColor = '#00E5FF';
                searchInput.placeholder = 'Listening...';
                recognition.start();

                recognition.onresult = (event) => {
                    const speechResult = event.results[0][0].transcript;
                    searchInput.value = speechResult;
                    searchInput.placeholder = 'Search the web securely...';
                    if (searchForm) searchForm.submit();
                };

                recognition.onspeechend = () => {
                    recognition.stop();
                    searchBox.style.borderColor = '';
                };

                recognition.onerror = () => {
                    searchInput.placeholder = 'Voice search error...';
                    searchBox.style.borderColor = '';
                    setTimeout(() => {
                        searchInput.placeholder = 'Search the web securely...';
                    }, 2000);
                };
            } else {
                alert('Voice search is not supported in this browser. Please try Chrome or Edge.');
            }
        });
    }

    // 5. Search Image Mock
    if (imageBtn) {
        imageBtn.addEventListener('click', () => {
            alert('Visual Search: Drag and drop or upload an image to find similar topics. (Demo Mode)');
        });
    }

    // 6. Refresh Trends Micro-Interaction
    if (refreshTrendsBtn) {
        refreshTrendsBtn.addEventListener('click', () => {
            refreshTrendsBtn.style.transform = 'rotate(360deg)';
            refreshTrendsBtn.style.transition = 'transform 0.4s ease';
            
            // Randomly swap some trend values for simulation
            const trends = [
                { keyword: 'NASA Artemis Constellation', val: '+142%' },
                { keyword: '500-Qubit Quantum Chip', val: '+89%' },
                { keyword: 'Silicon Photonics Trend', val: '+64%' },
                { keyword: 'WebGPU W3C Release', val: '+37%' },
                { keyword: 'Deep Learning Optimization', val: '+215%' },
                { keyword: 'Next-Gen Solar Cells', val: '+118%' }
            ];

            // Shuffle trends
            const shuffled = trends.sort(() => 0.5 - Math.random()).slice(0, 4);
            const listItems = document.querySelectorAll('.trending-list li');
            
            listItems.forEach((item, index) => {
                const keywordEl = item.querySelector('.trending-keyword');
                const trendEl = item.querySelector('.trending-trend');
                const linkEl = item.querySelector('a');
                
                keywordEl.style.opacity = '0';
                trendEl.style.opacity = '0';
                
                setTimeout(() => {
                    keywordEl.textContent = shuffled[index].keyword;
                    trendEl.innerHTML = `<i class="bx bx-upvote"></i> ${shuffled[index].val}`;
                    linkEl.href = `https://www.google.com/search?q=${encodeURIComponent(shuffled[index].keyword)}`;
                    
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

    // 7. Settings Panel Search Provider Selector
    if (settingsBtn) {
        // Load default search provider
        const savedProvider = localStorage.getItem('searchProvider') || 'google';
        if (searchForm) {
            if (savedProvider === 'bing') {
                searchForm.action = 'https://www.bing.com/search';
            } else if (savedProvider === 'duckduckgo') {
                searchForm.action = 'https://duckduckgo.com/';
            } else {
                searchForm.action = 'https://www.google.com/search';
            }
        }

        settingsBtn.addEventListener('click', () => {
            const currentProvider = localStorage.getItem('searchProvider') || 'google';
            const choice = prompt(
                `Search Settings:\nCurrent Search Provider is ${currentProvider.toUpperCase()}.\nType 'google', 'bing', or 'duckduckgo' to change:`,
                currentProvider
            );
            
            if (choice) {
                const cleanChoice = choice.trim().toLowerCase();
                if (['google', 'bing', 'duckduckgo'].includes(cleanChoice)) {
                    localStorage.setItem('searchProvider', cleanChoice);
                    if (cleanChoice === 'bing') {
                        searchForm.action = 'https://www.bing.com/search';
                    } else if (cleanChoice === 'duckduckgo') {
                        searchForm.action = 'https://duckduckgo.com/';
                    } else {
                        searchForm.action = 'https://www.google.com/search';
                    }
                    alert(`Search provider successfully updated to ${cleanChoice.toUpperCase()}!`);
                } else {
                    alert('Invalid provider. No changes were made.');
                }
            }
        });
    }

    // 8. Add Shortcut Link (Styled cleanly without box container)
    if (addShortcutBtn) {
        addShortcutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const name = prompt('Enter the name of the website:');
            if (!name) return;
            let url = prompt('Enter the URL (e.g., https://example.com):');
            if (!url) return;
            
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
            }

            // Create new shortcut element matching minimal look (no icon boxes)
            const newShortcut = document.createElement('a');
            newShortcut.href = url;
            newShortcut.target = '_blank';
            newShortcut.className = 'shortcut';

            newShortcut.innerHTML = `
                <svg class="shortcut-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="#00CFFF" stroke-width="2"/>
                    <ellipse cx="12" cy="12" rx="4" ry="10" fill="none" stroke="#00CFFF" stroke-width="1.5"/>
                    <line x1="2" y1="12" x2="22" y2="12" stroke="#00CFFF" stroke-width="1.5"/>
                </svg>
                <span>${name}</span>
            `;

            // Insert before the "Add Link" button
            addShortcutBtn.parentNode.insertBefore(newShortcut, addShortcutBtn);
        });
    }
});
