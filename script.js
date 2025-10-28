// --- [ Original Code ] ---
// Content formats database
const contentFormats = [
    { id: 1, name: "First line reveal", category: "Shock & Curiosity", example: '"The first line of my book is..."' },
    { id: 2, name: "This book understood...", category: "Relatable & Identity", example: '"This book understood [specific feeling]"' },
    { id: 3, name: "POV: You just read...", category: "POV & Immersion", example: '"POV: You just finished a book that..."' },
    { id: 4, name: "Things nobody tells you about...", category: "Mystery", example: '"5 things nobody tells you about [book topic]"' },
    { id: 5, name: "The scene that broke me", category: "Relatable & Identity", example: '"The scene that absolutely destroyed me"' },
    // ... (rest of your contentFormats array) ...
    { id: 40, name: "Underrated gem", category: "Data & Social Proof", example: '"This underrated book deserves more hype"' }
];

// Global state
let bookAngles = {};
let selectedFormats = [];
let generatedHooks = [];

// Initialize
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

    // Validate
    const filled = Object.values(bookAngles).filter(v => v && v.trim()).length;
    if (filled < 10) {
        alert(`Please fill out all fields. You have ${filled}/10 completed.`);
        return;
    }

    localStorage.setItem('bookAngles', JSON.stringify(bookAngles));
    switchTab('formats');
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


// --- [ SIMULATED HOOK GENERATOR - We'll replace this in Phase 4 ] ---
function generateHooks() {
    if (!bookAngles.title) {
        alert('Please fill out your book angles first!');
        switchTab('angles');
        return;
    }

    document.getElementById('loading').classList.add('active');
    document.getElementById('hookOutput').innerHTML = '';

    // Simulate generation (in real version, this would call Gemini)
    console.warn("Using simulated hook generator. We will replace this in the next phase.");
    setTimeout(() => {
        generatedHooks = [];
        const output = document.getElementById('hookOutput');
        
        selectedFormats.forEach(formatId => {
            const format = contentFormats.find(f => f.id === formatId);
            
            // Generate 3 variations per format
            for (let i = 1; i <= 3; i++) {
                const hook = generateSingleHook(format, i);
                generatedHooks.push(hook);
                
                const hookDiv = document.createElement('div');
                hookDiv.className = 'hook-item';
                hookDiv.innerHTML = `
                    <h4>${format.name} - Variation ${i}</h4>
                    <p>${hook.content}</p>
                    <div class="hook-meta">
                        <span>📂 ${format.category}</span>
                        <span>📏 ${hook.content.length} chars</span>
                    </div>
                    <button class="copy-btn" onclick="copyHook('${hook.id}')">📋 Copy</button>
                `;
                output.appendChild(hookDiv);
            }
        });

        document.getElementById('loading').classList.remove('active');
        document.getElementById('totalGenerated').textContent = generatedHooks.length;
        document.getElementById('exportOptions').style.display = 'flex';
        
        updateScriptDropdown();
    }, 2000);
}

function generateSingleHook(format, variation) {
    const angles = Object.keys(bookAngles).filter(k => k !== 'title');
    const randomAngle = angles[Math.floor(Math.random() * angles.length)];
    const angleValue = bookAngles[randomAngle] || "your book's core theme";
    
    let content = '';
    
    if (format.name.includes('First line')) {
        content = `"${angleValue.substring(0, 100)}..." - ${bookAngles.title} hits different`;
    } else if (format.name.includes('POV')) {
        content = `POV: You just read about ${angleValue} and your life will never be the same`;
    } else if (format.name.includes('This book understood')) {
        content = `This book understood ${angleValue} in a way that made me feel seen`;
    } else {
        content = `${format.example.substring(0, 50)}... featuring ${angleValue}`;
    }
    
    return {
        id: `hook-${format.id}-${variation}`,
        format: format.name,
        category: format.category,
        content: content,
        angle: randomAngle
    };
}
// --- [ End of Simulated Section ] ---


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

function updateScriptDropdown() {
    const select = document.getElementById('hookSelect');
    select