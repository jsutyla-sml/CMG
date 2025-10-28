// --- [ Content Formats DB ] ---
const contentFormats = [
    { id: 1, name: "First line reveal", category: "Shock & Curiosity", example: '"The first line of my book is..."' },
    { id: 2, name: "This book understood...", category: "Relatable & Identity", example: '"This book understood [specific feeling]"' },
    { id: 3, name: "POV: You just read...", category: "POV & Immersion", example: '"POV: You just finished a book that..."' },
    { id: 4, name: "Things nobody tells you about...", category: "Mystery", example: '"5 things nobody tells you about [book topic]"' },
    { id: 5, name: "The scene that broke me", category: "Relatable & Identity", example: '"The scene that absolutely destroyed me"' },
    { id: 6, name: "If you loved X, read this", category: "Data & Social Proof", example: '"If you loved [popular book], you NEED this"' },
    { id: 7, name: "Unpopular opinion", category: "Controversial & Contrarian", example: '"Unpopular opinion: This trope is actually..."' },
    { id: 8, name: "Why everyone needs this book", category: "Data & Social Proof", example: '"Here\'s why everyone is talking about this book"' },
    { id: 9, name: "The moment I knew...", category: "Transformation & Journey", example: '"The moment I knew this book would change me"' },
    { id: 10, name: "Books for people who...", category: "Relatable & Identity", example: '"This book is for people who [specific trait]"' },
    { id: 11, name: "What if I told you...", category: "Mystery", example: '"What if I told you this book predicted..."' },
    { id: 12, name: "Before vs After reading", category: "Transformation & Journey", example: '"Me before this book vs after"' },
    { id: 13, name: "The plot twist nobody saw", category: "Shock & Curiosity", example: '"The plot twist that left readers speechless"' },
    { id: 14, name: "This book will make you...", category: "Aspirational & Escapist", example: '"This book will make you question everything"' },
    { id: 15, name: "Biggest misconception", category: "Controversial & Contrarian", example: '"The biggest misconception about [genre/trope]"' },
    { id: 16, name: "If you've ever felt...", category: "Relatable & Identity", example: '"If you\'ve ever felt [emotion], read this"' },
    { id: 17, name: "Red flags in books", category: "Controversial & Contrarian", example: '"Red flags I ignore in books because [reason]"' },
    { id: 18, name: "Character that lives rent-free", category: "Relatable & Identity", example: '"This character will live rent-free in your head"' },
    { id: 19, name: "Here's a secret...", category: "Mystery", example: '"Here\'s a secret about this book nobody noticed"' },
    { id: 20, name: "Romance trope tier list", category: "Data & Social Proof", example: '"Ranking romance tropes in this book"' },
    { id: 21, name: "Imagine being this character", category: "Aspirational & Escapist", example: '"Imagine waking up as [character]"' },
    { id: 22, name: "I can't be the only one...", category: "Relatable & Identity", example: '"I can\'t be the only one who [reaction]"' },
    { id: 23, name: "Warning signs you'll love this", category: "Data & Social Proof", example: '"Warning signs this book is for you"' },
    { id: 24, name: "The real villain is...", category: "Shock & Curiosity", example: '"Plot twist: The real villain is [unexpected]"' },
    { id: 25, name: "Books that hit different", category: "Transformation & Journey", example: '"Books that hit different when you\'re [state]"' },
    { id: 26, name: "Tell me you read X without...", category: "POV & Immersion", example: '"Tell me you read [book] without telling me"' },
    { id: 27, name: "Day in the life of...", category: "POV & Immersion", example: '"A day in the life of [character]"' },
    { id: 28, name: "Hot take", category: "Controversial & Contrarian", example: '"Hot take: [controversial opinion about book]"' },
    { id: 29, name: "The ending ruined me", category: "Relatable & Identity", example: '"The ending ruined me and here\'s why"' },
    { id: 30, name: "Statistics that prove...", category: "Data & Social Proof", example: '"X% of readers said this book [impact]"' },
    { id: 31, name: "Choose your character", category: "Aspirational & Escapist", example: '"Which character would you be? [options]"' },
    { id: 32, name: "Confession time", category: "Mystery", example: '"Confession: I judged this book by its cover"' },
    { id: 33, name: "Slow burn done right", category: "Data & Social Proof", example: '"Finally, a slow burn that actually [payoff]"' },
    { id: 34, name: "Author's hidden message", category: "Mystery", example: '"The hidden message in Chapter [X]"' },
    { id: 35, name: "Why I DNF'd most books", category: "Controversial & Contrarian", example: '"Why I DNF most books but finished this"' },
    { id: 36, name: "Emotional damage scale", category: "Relatable & Identity", example: '"Rating the emotional damage: [scale]"' },
    { id: 37, name: "Manifesting this energy", category: "Aspirational & Escapist", example: '"Manifesting [character]\'s energy in 2025"' },
    { id: 38, name: "Shock/Surprise hook", category: "Shock & Curiosity", example: '"You won\'t believe what happens in Chapter 3"' },
    { id: 39, name: "Book hangover cure", category: "Transformation & Journey", example: '"Still recovering from this book and it\'s been..."' },
    { id: 40, name: "Underrated gem", category: "Data & Social Proof", example: '"This underrated book deserves more hype"' }
];

// --- [ Global State ] ---
let bookAngles = {};
let selectedFormats = [];
let generatedHooks = [];

// --- [ App Initialization ] ---
document.addEventListener('DOMContentLoaded', function() {
    setupTabs();
    loadFormats();
    loadSavedData();
});

function setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

// --- [ Tab 1: Book Angles Logic ] ---

function loadSavedData() {
    const saved = localStorage.getItem('bookAngles');
    if (saved) {
        bookAngles = JSON.parse(saved);
        Object.keys(bookAngles).forEach(key => {
            const element = document.getElementById(key);
            if (element) element.value = bookAngles[key];
        });
    }
}

function saveAngles() {
    bookAngles = {
        title: document.getElementById('bookTitle').value,
        readerFantasy: document.getElementById('readerFantasy').value,
        emotionalWreckage: document.getElementById('emotionalWreckage').value,
        identityMirror: document.getElementById('identityMirror').value,
        cultureHook: document.getElementById('cultureHook').value,
        personalWound: document.getElementById('personalWound').value,
        cinematicMoment: document.getElementById('cinematicMoment').value,
        whatIfSetup: document.getElementById('whatIfSetup').value,
        tropeTwist: document.getElementById('tropeTwist').value,
        shockFactor: document.getElementById('shockFactor').value
    };

    const filled = Object.values(bookAngles).filter(v => v && v.trim()).length;
    if (filled < 10) {
        alert(`Please fill out all fields. You have ${filled}/10 completed.`);
        return;
    }

    localStorage.setItem('bookAngles', JSON.stringify(bookAngles));
    switchTab('formats');
}

// --- [ Tab 2: Choose Formats Logic ] ---

function loadFormats() {
    const grid = document.getElementById('formatGrid');
    grid.innerHTML = '';
    
    contentFormats.forEach(format => {
        const card = document.createElement('div');
        card.className = 'format-card';
        card.innerHTML = `
            <input type="checkbox" id="format-${format.id}" value="${format.id}">
            <label for="format-${format.id}">
                <strong>${format.name}</strong><br>
                <small style="color: #6c757d;">${format.category}</small>
            </label>
        `;
        
        card.addEventListener('click', function(e) {
            if (e.target.tagName !== 'INPUT') {
                const checkbox = this.querySelector('input');
                checkbox.checked = !checkbox.checked;
            }
            this.classList.toggle('selected');
            updateFormatStats();
        });
        
        grid.appendChild(card);
    });
}

function updateFormatStats() {
    const selected = document.querySelectorAll('#formatGrid input:checked').length;
    document.getElementById('selectedCount').textContent = selected;
    document.getElementById('potentialHooks').textContent = selected * 9; // 9 book angles
}

function selectAll() {
    const checkboxes = document.querySelectorAll('#formatGrid input[type="checkbox"]');
    const allSelected = Array.from(checkboxes).every(cb => cb.checked);
    
    checkboxes.forEach(cb => {
        cb.checked = !allSelected;
        cb.closest('.format-card').classList.toggle('selected', !allSelected);
    });
    updateFormatStats();
}

function continueToGenerate() {
    selectedFormats = Array.from(document.querySelectorAll('#formatGrid input:checked'))
        .map(cb => parseInt(cb.value));
    
    if (selectedFormats.length === 0) {
        alert('Please select at least one format!');
        return;
    }

    document.getElementById('formatCount').textContent = selectedFormats.length;
    switchTab('generate');
}

// --- [ Tab 3: Generate Hooks Logic ] ---

/**
 * FINAL: This function calls our /api/generate-hooks backend
 * and populates the UI with real, AI-generated hooks.
 */
async function generateHooks() {
    if (!bookAngles || !bookAngles.title) {
        alert('Please fill out your book angles first!');
        switchTab('angles');
        return;
    }

    document.getElementById('loading').classList.add('active');
    document.getElementById('hookOutput').innerHTML = '';
    generatedHooks = []; // Clear old hooks

    try {
        // 1. Get the full format objects for the IDs the user selected
        const fullFormats = selectedFormats.map(id => 
            contentFormats.find(f => f.id === id)
        ).filter(f => f); // Filter out any undefined

        if (fullFormats.length === 0) {
            throw new Error("No valid formats selected.");
        }

        // 2. Call our new backend API endpoint
        const response = await fetch('/api/generate-hooks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bookAngles: bookAngles,
                selectedFormats: fullFormats
            })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || "Failed to generate hooks from server.");
        }

        // 3. Get the array of hooks from the AI
        const hooksFromAI = await response.json();

        const output = document.getElementById('hookOutput');

        // 4. Process the AI response and build the HTML
        hooksFromAI.forEach((hook, index) => {
            const format = contentFormats.find(f => f.id === hook.formatId);
            if (!format) return; // Skip if format not found

            // 5. Create the full hook object the app needs
            const newHookObject = {
                id: `hook-${format.id}-${index}`, // Create a unique ID
                format: format.name,
                category: format.category,
                content: hook.hookContent,
                angle: 'AI-Generated'
            };
            generatedHooks.push(newHookObject); // Add to global array for export/copy

            // 6. Create and append the HTML element
            const hookDiv = document.createElement('div');
            hookDiv.className = 'hook-item';
            hookDiv.innerHTML = `
                <h4>${newHookObject.format}</h4>
                <p>${newHookObject.content}</p>
                <div class="hook-meta">
                    <span>📂 ${newHookObject.category}</span>
                    <span>📏 ${newHookObject.content.length} chars</span>
                </div>
                <button class="copy-btn" onclick="copyHook('${newHookObject.id}')">📋 Copy</button>
            `;
            output.appendChild(hookDiv);
        });

        // 7. Finalize UI
        document.getElementById('loading').classList.remove('active');
        document.getElementById('totalGenerated').textContent = generatedHooks.length;
        document.getElementById('exportOptions').style.display = 'flex';
        
        updateScriptDropdown(); // Update the "Create Scripts" tab

    } catch (error) {
        console.error('Error generating hooks:', error);
        document.getElementById('loading').classList.remove('active');
        showError(`Error: ${error.message}`); 
    }
}

function copyHook(hookId) {
    const hook = generatedHooks.find(h => h.id === hookId);
    if(hook) {
        navigator.clipboard.writeText(hook.content);
        alert('Hook copied to clipboard!');
    }
}

function copyAllHooks() {
    const allContent = generatedHooks.map(h => h.content).join('\n\n');
    navigator.clipboard.writeText(allContent);
    alert('All hooks copied to clipboard!');
}

function exportToText() {
    let text = `CONTENT HOOKS FOR: ${bookAngles.title}\n`;
    text += `Generated: ${new Date().toLocaleString()}\n`;
    text += `Total Hooks: ${generatedHooks.length}\n\n`;
    text += '='.repeat(60) + '\n\n';
    
    generatedHooks.forEach((hook, i) => {
        text += `HOOK #${i + 1}\n`;
        text += `Format: ${hook.format}\n`;
        text += `Category: ${hook.category}\n`;
        text += `Content: ${hook.content}\n\n`;
    });
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `content-hooks-${(bookAngles.title || 'book').replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

function exportToCSV() {
    let csv = 'Format,Category,Hook Content,Character Count\n';
    
    generatedHooks.forEach(hook => {
        const escapedContent = `"${hook.content.replace(/"/g, '""')}"`;
        csv += `"${hook.format}","${hook.category}",${escapedContent},${hook.content.length}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `content-hooks-${(bookAngles.title || 'book').replace(/\s+/g, '-')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

// --- [ Tab 4: Create Scripts Logic ] ---

function updateScriptDropdown() {
    const select = document.getElementById('hookSelect');
    select.innerHTML = '<option value="">Choose a hook to expand...</option>';
    
    generatedHooks.forEach((hook, i) => {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${hook.format}: ${hook.content.substring(0, 60)}...`;
        select.appendChild(option);
    });
}

function generateScript() {
    const hookIndex = document.getElementById('hookSelect').value;
    const videoLength = document.getElementById('videoLength').value;
    const platform = document.getElementById('platform').value;
    
    if (!hookIndex) {
        alert('Please select a hook first!');
        return;
    }
    
    const hook = generatedHooks[hookIndex];
    const output = document.getElementById('scriptOutput');
    
    const script = `
        <div class="hook-item">
            <h4>🎬 ${videoLength}-Second Script for ${platform}</h4>
            <p><strong>HOOK (0-3 seconds):</strong><br>${hook.content}</p>
            <p><strong>BUILD (3-${Math.floor(videoLength * 0.6)} seconds):</strong><br>
            [Expand on the intrigue - add emotional stakes, character details, or plot hints that build tension]</p>
            <p><strong>PAYOFF (${Math.floor(videoLength * 0.6)}-${videoLength - 5} seconds):</strong><br>
            [Deliver the emotional climax or reveal that satisfies the hook's promise]</p>
            <p><strong>CTA (${videoLength - 5}-${videoLength} seconds):</strong><br>
            "Available now - link in bio" or "Pre-order today" or "Follow for more"</p>
            <div class="hook-meta">
                <span>📱 ${platform}</span>
                <span>⏱️ ${videoLength}s</span>
                <span>🎯 ${hook.category}</span>
            </div>
            <button class="copy-btn" onclick="copyScript(this)">📋 Copy Script</button>
        </div>
    `;
    
    output.innerHTML = script;
}

function copyScript(btn) {
    const scriptText = btn.parentElement.innerText;
    navigator.clipboard.writeText(scriptText);
    alert('Script copied to clipboard!');
}


// --- [ AI Analysis Functions ] ---

function showPasteModal() {
    document.getElementById('pasteModal').style.display = 'flex';
}

function closePasteModal() {
    document.getElementById('pasteModal').style.display = 'none';
}

async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
        showError('File too large. Please upload a file smaller than 10MB.');
        return;
    }

    if (file.type === 'text/plain') {
        showUploadProgress();
        try {
            const bookText = await file.text();
            await analyzeBookWithGemini(bookText);
        } catch (error) {
            console.error('Error processing file:', error);
            showError('Error processing .txt file. Please try pasting the text instead.');
        }
    } else {
        showError('This tool only analyzes .txt files. For PDF or DOCX, please use the "Paste Book Text" button.');
    }
}

async function analyzePastedText() {
    const text = document.getElementById('pastedText').value.trim();
    
    if (!text) {
        alert('Please paste some text first!');
        return;
    }
    if (text.length < 100) {
        alert('Please provide more text (at least 100 characters) for better analysis.');
        return;
    }

    closePasteModal();
    showUploadProgress();
    await analyzeBookWithGemini(text);
}

async function analyzeBookWithGemini(bookText) {
    updateProgress(10, 'Connecting to secure server...');
    try {
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bookText: bookText.substring(0, 100000) }) 
        });

        updateProgress(60, 'Gemini is analyzing your book...');

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to get a response from the server.');
        }

        const angles = await response.json();

        updateProgress(80, 'Extracting book angles...');
        parseAndFillAngles(angles);
        
        updateProgress(100, 'Complete!');
        showUploadSuccess();

    } catch (error) {
        console.error('Error analyzing text:', error);
        showError(`Analysis failed: ${error.message}`);
    }
}

function parseAndFillAngles(angles) {
    document.getElementById('bookTitle').value = angles.bookTitle || '';
    document.getElementById('readerFantasy').value = angles.readerFantasy || '';
    document.getElementById('emotionalWreckage').value = angles.emotionalWrockage || ''; // Typo fixed in next line
    document.getElementById('emotionalWreckage').value = angles.emotionalWreckage || '';
    document.getElementById('identityMirror').value = angles.identityMirror || '';
    document.getElementById('cultureHook').value = angles.cultureHook || '';
    document.getElementById('personalWound').value = angles.personalWound || '';
    document.getElementById('cinematicMoment').value = angles.cinematicMoment || '';
    document.getElementById('whatIfSetup').value = angles.whatIfSetup || '';
    document.getElementById('tropeTwist').value = angles.tropeTwist || '';
    document.getElementById('shockFactor').value = angles.shockFactor || '';

    // Save to global state and localStorage
    bookAngles = {
        title: angles.bookTitle || '',
        readerFantasy: angles.readerFantasy || '',
        emotionalWreckage: angles.emotionalWreckage || '',
        identityMirror: angles.identityMirror || '',
        cultureHook: angles.cultureHook || '',
        personalWound: angles.personalWound || '',
        cinematicMoment: angles.cinematicMoment || '',
        whatIfSetup: angles.whatIfSetup || '',
        tropeTwist: angles.tropeTwist || '',
        shockFactor: angles.shockFactor || ''
    };

    localStorage.setItem('bookAngles', JSON.stringify(bookAngles));
}


// --- [ UI Utility Functions ] ---

function showUploadProgress() {
    document.getElementById('uploadSuccess').style.display = 'none';
    document.getElementById('uploadError').style.display = 'none';
    document.getElementById('uploadProgress').style.display = 'block';
    updateProgress(10, 'Starting analysis...');
}

function hideUploadProgress() {
    document.getElementById('uploadProgress').style.display = 'none';
}

function updateProgress(percent, status) {
    document.getElementById('progressFill').style.width = percent + '%';
    document.getElementById('uploadStatus').textContent = status;
}

function showUploadSuccess() {
    setTimeout(() => {
        hideUploadProgress();
        document.getElementById('uploadSuccess').style.display = 'block';
        
        setTimeout(() => {
            document.getElementById('uploadSuccess').style.display = 'none';
        }, 5000);
    }, 500);
}

function showError(message) {
    hideUploadProgress();
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('uploadError').style.display = 'block';
    
    setTimeout(() => {
        document.getElementById('uploadError').style.display = 'none';
    }, 8000);
}