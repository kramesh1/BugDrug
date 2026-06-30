/**
 * @summary Main script for the BugDrug webpage (vanilla JS, no jQuery).
 *
 * DEPENDENCIES (loaded before this file in index.html):
 *   1. parseCSV.js       -> csvToJS(), CSV_SYNDROME, CSV_ANTIBIOTICS
 *   2. static_objects.js -> ANTIBIOTICS, BACTERIA, SYNDROMES
 *   3. species_index.js  -> SPECIES_INDEX (species -> category lookup)
 *
 * FEATURES
 *   - Hover (or tap) any syndrome / bacteria / antibiotic to preview its
 *     relationships and notes (original behavior, jQuery-free).
 *   - Click one or more antibiotics to PIN them; the bug grid then shows the
 *     combined ("best across selected agents") coverage.
 *   - Search antibiotics (name / brand / abbreviation) and bacteria (by real
 *     species name) and jump to the relevant category.
 *   - PO / IV / IM route badges, plus a systemic PO availability filter.
 *
 * CREDIT
 *   Adapted from https://bugdrugdx.com/  (original by Hunter Ratliff, MIT).
 *
 * @license MIT
 */

/******************************************************************************\
 * SECTION I — Precomputed lookups & state
 \*****************************************************************************/

// csvToJS() is pure JS; compute the four relationship maps once.
const LOOKUPS = {
    abxToBugs: csvToJS(CSV_ANTIBIOTICS, false), // {abxId: {bugId: coverageClass}}
    bugToAbx:  csvToJS(CSV_ANTIBIOTICS, true),  // {bugId: {abxId: coverageClass}}
    synToBugs: csvToJS(CSV_SYNDROME,  false),   // {synId: {bugId: assocClass}}
    bugToSyn:  csvToJS(CSV_SYNDROME,  true)     // {bugId: {synId: assocClass}}
};

// Coverage classes that get toggled on/off (base colors like GN/GP are kept).
const HILITE_CLASSES = ['good', 'broad', 'some', 'bad', 'na', 'com', 'occ', 'note', 'unk'];

// Rank used to pick the "best" coverage across multiple selected antibiotics.
const COVERAGE_RANK = { good: 5, broad: 4, some: 3, note: 2, bad: 1, na: 0 };

const pinned = new Set(); // ids of pinned (selected) antibiotics
let stuck = null;         // {type:'bug'|'syndrome', id} pinned via tap (touch support)

/******************************************************************************\
 * SECTION II — Small helpers
 \*****************************************************************************/

/** Tokenize a free-text route string into PO / IV / IM. */
function parseRoutes(str) {
    const s = (str || '').toUpperCase();
    const out = [];
    if (/\bPO\b|ORAL/.test(s)) out.push('PO');
    if (/\bIV\b/.test(s))      out.push('IV');
    if (/\bIM\b/.test(s))      out.push('IM');
    return out;
}

function isRestrictedOralRoute(exampleName, route) {
    const text = `${exampleName || ''} ${route || ''}`.toUpperCase();
    return /\bPO\b/.test(text) && /(C\s*DIFF|CLOSTRIDIOIDES|CLOSTRIDIUM|COLITIS)/.test(text);
}

/** Union of all routes across an antibiotic's examples, ordered PO, IV, IM. */
function abxRoutes(abxId, { systemicOnly = false } = {}) {
    const set = new Set();
    const examples = ANTIBIOTICS[abxId].examples || {};
    Object.entries(examples).forEach(([name, e]) => {
        parseRoutes(e.route).forEach(r => {
            if (r === 'PO' && isRestrictedOralRoute(name, e.route)) {
                if (!systemicOnly) set.add('PO-restricted');
                return;
            }
            set.add(r);
        });
    });
    return ['PO', 'IV', 'IM', 'PO-restricted'].filter(r => set.has(r));
}

function routeBadges(abxId) {
    return abxRoutes(abxId).map(r => {
        if (r === 'PO-restricted') {
            return '<span class="route-badge route-PO-restricted" title="Non-systemic oral indication only">PO*</span>';
        }
        return `<span class="route-badge route-${r}">${r}</span>`;
    }).join('');
}

/** Short label for a bacteria category (reuse the SVG text). */
function labelFor(catId) {
    const t = document.getElementById(catId + '-txt');
    return t ? t.textContent.trim() : catId;
}

/** Port of the original addInfoBox subtitle formatter for examples objects. */
function formatExamples(subtitle) {
    if (typeof subtitle === 'string') return subtitle;
    const output = [];
    Object.keys(subtitle).forEach(key => {
        const item = subtitle[key];
        let html = key;
        if (item.abbv) html += ' <small>[' + item.abbv + ']</small>';
        const paren = [];
        if (item.trade) paren.push('<span class="text-info">' + item.trade + '</span>');
        if (item.route) paren.push(item.route);
        if (paren.length) html += ' (' + paren.join(', ') + ')';
        output.push(html);
    });
    return output.join(' / ');
}

function infoBox(title = '', text = '', subtitle = '') {
    let sub = formatExamples(subtitle);
    if (title === '' && sub !== '') { title = sub; sub = ''; }
    document.getElementById('box-title').innerHTML = title;
    document.getElementById('box-subtitle').innerHTML = sub;
    document.getElementById('box-text').innerHTML = text;
}

/** Remove coverage highlights from every toggleable element. */
function clearHighlights() {
    document.querySelectorAll('.toggleable').forEach(el => el.classList.remove(...HILITE_CLASSES));
}

/** Apply a {id: class} map; blank class falls back to defaultClass. */
function applyHighlights(map, defaultClass = 'na') {
    if (!map) return;
    Object.keys(map).forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.classList.add(map[id] || defaultClass);
    });
}

/******************************************************************************\
 * SECTION III — Rendering
 \*****************************************************************************/

/** Transient preview of a single item (used on hover and tap). */
function showItem(type, id) {
    clearHighlights();
    if (type === 'abx') {
        const a = ANTIBIOTICS[id];
        applyHighlights(LOOKUPS.abxToBugs[id]);
        infoBox(a.fullName, a.comments, a.examples);
    } else if (type === 'syndrome') {
        const s = SYNDROMES[id];
        applyHighlights(LOOKUPS.synToBugs[id]);
        infoBox(s.fullName, s.comments);
    } else if (type === 'bug') {
        const b = BACTERIA[id];
        applyHighlights(LOOKUPS.bugToSyn[id]);
        applyHighlights(LOOKUPS.bugToAbx[id]);
        infoBox(b.name, b.comments, b.bugExamples);
    }
}

/** Best coverage class for a bug across all pinned antibiotics. */
function bestCoverage(bugId) {
    let best = '', bestRank = -1;
    pinned.forEach(abxId => {
        const cls = (LOOKUPS.abxToBugs[abxId] || {})[bugId] || '';
        const rank = COVERAGE_RANK[cls] !== undefined ? COVERAGE_RANK[cls] : 0;
        if (rank > bestRank) { bestRank = rank; best = cls; }
    });
    return best;
}

/** Combined-coverage view for the set of pinned antibiotics. */
function renderCombination() {
    clearHighlights();
    const covered = [], partial = [], gaps = [];

    Object.keys(BACTERIA).forEach(bugId => {
        const cls = bestCoverage(bugId);
        const rank = COVERAGE_RANK[cls] || 0;
        const el = document.getElementById(bugId);
        if (el) el.classList.add(cls || 'na');

        const label = labelFor(bugId);
        if (rank >= 4) covered.push(label);
        else if (rank >= 2) partial.push(label);
        else gaps.push(label);
    });

    const agents = [...pinned];
    const title = `Combined coverage — ${agents.length} agent${agents.length > 1 ? 's' : ''}`;
    const subtitle = agents
        .map(a => `${ANTIBIOTICS[a].name} ${routeBadges(a)}`)
        .join(' &nbsp;<b>+</b>&nbsp; ');
    const text =
        `<p class="mb-1"><b class="text-success">Covered:</b> ${covered.join(', ') || '—'}</p>` +
        `<p class="mb-1"><b class="cover-partial">Variable / partial:</b> ${partial.join(', ') || '—'}</p>` +
        `<p class="mb-0"><b class="text-danger">Gaps:</b> ${gaps.join(', ') || '—'}</p>`;
    infoBox(title, text, subtitle);
}

/** Restore the base view after a hover preview ends. */
function renderBase() {
    clearHighlights();
    if (stuck) { showItem(stuck.type, stuck.id); return; }
    if (pinned.size > 0) { renderCombination(); return; }
    infoBox('Hover to begin',
        'Hover over a syndrome, bacteria, or antibiotic to get started. Click antibiotics to compare combined coverage.');
}

function updateToolbar() {
    const n = pinned.size;
    document.getElementById('selection-count').textContent =
        n === 0 ? 'No agents selected' : `${n} agent${n > 1 ? 's' : ''} selected`;
    document.getElementById('clear-selection').hidden = (n === 0 && !stuck);
}

/******************************************************************************\
 * SECTION IV — Interaction handlers
 \*****************************************************************************/

function togglePin(abxId) {
    stuck = null; // pinning an antibiotic exits a stuck bug/syndrome view
    const li = document.getElementById(abxId);
    if (pinned.has(abxId)) {
        pinned.delete(abxId);
        if (li) li.classList.remove('selected');
    } else {
        pinned.add(abxId);
        if (li) li.classList.add('selected');
    }
    updateToolbar();
    renderBase();
}

function toggleStuck(type, id) {
    stuck = (stuck && stuck.id === id) ? null : { type, id };
    updateToolbar();
    renderBase();
}

function clearAll() {
    pinned.forEach(id => {
        const li = document.getElementById(id);
        if (li) li.classList.remove('selected');
    });
    pinned.clear();
    stuck = null;
    updateToolbar();
    renderBase();
}

/******************************************************************************\
 * SECTION V — Build the page
 \*****************************************************************************/

function buildAntibiotics() {
    Object.keys(ANTIBIOTICS).forEach(abxId => {
        const a = ANTIBIOTICS[abxId];

        const li = document.createElement('li');
        li.id = abxId;
        li.className = 'list-group-item abx-item toggleable';
        li.innerHTML =
            `<span class="abx-name">${a.name}</span>` +
            `<span class="abx-routes">${routeBadges(abxId)}</span>`;

        // Searchable text + PO flag (used by the filter)
        const parts = [abxId, a.name, a.fullName || ''];
        Object.keys(a.examples || {}).forEach(g => {
            parts.push(g);
            if (a.examples[g].trade) parts.push(a.examples[g].trade);
            if (a.examples[g].abbv) parts.push(a.examples[g].abbv);
        });
        li.dataset.search = parts.join(' ').replace(/<[^>]+>/g, '').replace(/&\w+;/g, '').toLowerCase();
        li.dataset.po = abxRoutes(abxId, { systemicOnly: true }).includes('PO') ? '1' : '0';

        li.addEventListener('mouseenter', () => showItem('abx', abxId));
        li.addEventListener('mouseleave', renderBase);
        li.addEventListener('click', () => togglePin(abxId));

        const list = document.querySelector('#' + a.abxClass + ' ul');
        if (list) list.appendChild(li);
    });
}

function buildSyndromes() {
    const container = document.getElementById('list-syndrome');
    Object.keys(SYNDROMES).forEach(synId => {
        const li = document.createElement('li');
        li.id = synId;
        li.className = 'list-group-item syndrome-item toggleable';
        li.textContent = SYNDROMES[synId].name;
        li.addEventListener('mouseenter', () => showItem('syndrome', synId));
        li.addEventListener('mouseleave', renderBase);
        li.addEventListener('click', () => toggleStuck('syndrome', synId));
        container.appendChild(li);
    });
}

function buildBugs() {
    Object.keys(BACTERIA).forEach(bugId => {
        const rect = document.getElementById(bugId);
        const txt = document.getElementById(bugId + '-txt');
        if (!rect) return;
        rect.classList.add('toggleable');

        const enter = () => showItem('bug', bugId);
        const click = () => toggleStuck('bug', bugId);
        [rect, txt].forEach(el => {
            if (!el) return;
            el.classList.add('bug-hit');
            el.addEventListener('mouseenter', enter);
            el.addEventListener('mouseleave', renderBase);
            el.addEventListener('click', click);
        });
    });
}

function setupAntibioticFilter() {
    const search = document.getElementById('abx-search');
    const poFilter = document.getElementById('po-filter');

    function apply() {
        const q = search.value.trim().toLowerCase();
        const poOnly = poFilter.checked;
        document.querySelectorAll('.abx-item').forEach(li => {
            const matchesQ = !q || li.dataset.search.includes(q);
            const matchesPO = !poOnly || li.dataset.po === '1';
            li.hidden = !(matchesQ && matchesPO);
        });
        // Hide cards that have no visible items
        document.querySelectorAll('.abx-card').forEach(card => {
            card.hidden = !card.querySelector('.abx-item:not([hidden])');
        });
    }

    search.addEventListener('input', apply);
    poFilter.addEventListener('change', apply);
}

function setupBugSearch() {
    const search = document.getElementById('bug-search');
    const results = document.getElementById('bug-search-results');

    function hideResults() { results.hidden = true; }

    search.addEventListener('input', () => {
        const q = search.value.trim().toLowerCase();
        if (!q) { results.innerHTML = ''; hideResults(); return; }

        const matches = SPECIES_INDEX.filter(s =>
            s.display.toLowerCase().includes(q) ||
            (s.aliases || []).some(a => a.toLowerCase().includes(q))
        ).slice(0, 12);

        if (!matches.length) {
            results.innerHTML = '<li class="list-group-item text-muted">No matching species</li>';
            results.hidden = false;
            return;
        }

        results.innerHTML = matches.map(m => {
            const cats = m.categories.map(c => `<span class="cat-pill">${labelFor(c)}</span>`).join(' ');
            return `<li class="list-group-item bug-result" role="button" ` +
                `data-cats="${m.categories.join(',')}" data-primary="${m.categories[0]}">` +
                `<span class="result-name">${m.display}</span> ${cats}` +
                (m.note ? `<div class="small text-muted">${m.note}</div>` : '') +
                `</li>`;
        }).join('');
        results.hidden = false;
    });

    results.addEventListener('click', e => {
        const li = e.target.closest('.bug-result');
        if (!li) return;
        const cats = li.dataset.cats.split(',');
        hideResults();
        stuck = { type: 'bug', id: li.dataset.primary };
        updateToolbar();
        renderBase();
        cats.forEach(c => {
            const el = document.getElementById(c);
            if (el) { el.classList.add('pulse'); setTimeout(() => el.classList.remove('pulse'), 1600); }
        });
        const table = document.getElementById('bug-table');
        if (table.scrollIntoView) table.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    // Hide the dropdown when focus leaves the search area
    search.addEventListener('blur', () => setTimeout(hideResults, 200));
    search.addEventListener('focus', () => { if (results.innerHTML.trim()) results.hidden = false; });
}

/******************************************************************************\
 * SECTION VI — Init
 \*****************************************************************************/
document.addEventListener('DOMContentLoaded', () => {
    buildAntibiotics();
    buildSyndromes();
    buildBugs();
    setupAntibioticFilter();
    setupBugSearch();
    document.getElementById('clear-selection').addEventListener('click', clearAll);
    updateToolbar();
    renderBase();
});
