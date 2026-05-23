// ==========================================================================
// 1. STATE MANAGEMENT
// ==========================================================================
let currentActiveFilter = null; 
let currentSearchQuery = "";    
let displayedPostsCount = 0;    
let isFetching = false;          
const POSTS_PER_LOAD = 5;
let currentTagFilter = null;    // Tracks active tag filters
let pendingTimeoutId = null;    // Tracks active rendering timers to prevent overlap       

// Helper function to extract "Month Year" safely from "Month DD, YYYY"
function getMonthYearString(dateString) {
    if (!dateString) return "";
    const dateParts = dateString.split(' ');
    if (dateParts.length < 3) return "";
    const month = dateParts[0];
    const year = dateParts[2];
    return `${month} ${year}`;
}

// ==========================================================================
// 2. CORE DISPLAY FUNCTIONS
// ==========================================================================

function getFilteredPostsList() {
    let filteredList = ALL_BLOG_POSTS;

    // A. Month Archive Filter
    if (currentActiveFilter) {
        filteredList = filteredList.filter(post => getMonthYearString(post.date) === currentActiveFilter);
    }

    // B. Tag Topic Filter
    if (currentTagFilter) {
        filteredList = filteredList.filter(post => 
            post.tags.some(tag => tag.toLowerCase() === currentTagFilter.toLowerCase())
        );
    }

    // C. Text Search Filter
    if (currentSearchQuery.trim() !== "") {
        const query = currentSearchQuery.toLowerCase().trim();
        filteredList = filteredList.filter(post => {
            const matchesTitle = post.title.toLowerCase().includes(query);
            const matchesContent = post.content.toLowerCase().includes(query);
            const matchesTags = post.tags.some(tag => tag.toLowerCase().includes(query));
            return matchesTitle || matchesContent || matchesTags;
        });
    }

    return filteredList;
}

function loadNextPostsBatch() {
    const feedContainer = document.querySelector('.blog-posts-feed');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const triggerWrapper = document.querySelector('.read-more-trigger');

    if (!feedContainer || !loadMoreBtn) return;

    // FIX: Clear any active timers immediately to prevent old search results from rendering late
    if (pendingTimeoutId) {
        clearTimeout(pendingTimeoutId);
    }

    const existingNotice = feedContainer.querySelector('.no-results-notice');
    if (existingNotice) existingNotice.remove();

    const targetedPosts = getFilteredPostsList();

    // Handle empty state results
    if (targetedPosts.length === 0) {
        if (triggerWrapper) triggerWrapper.style.display = 'none';

        const noticeDiv = document.createElement('div');
        noticeDiv.className = 'no-results-notice';
        noticeDiv.innerHTML = `
            <h3>No Articles Found</h3>
            <p>We couldn't find any posts matching your criteria. Try checking your spelling or clearing active navigation filters.</p>
            <button id="reset-all-filters-btn">Reset Filters & Search</button>
        `;

        feedContainer.appendChild(noticeDiv);

        document.getElementById('reset-all-filters-btn').addEventListener('click', () => {
            const searchInput = document.getElementById('blog-search-input');
            const clearSearchBtn = document.getElementById('clear-search-btn');
            if (searchInput) searchInput.value = "";
            if (clearSearchBtn) clearSearchBtn.style.display = 'none';

            currentSearchQuery = "";
            currentActiveFilter = null;
            applyFilter(null);
        });
        return;
    }

    if (triggerWrapper) triggerWrapper.style.display = 'block';

    if (displayedPostsCount >= targetedPosts.length) {
        loadMoreBtn.innerText = "All posts loaded";
        loadMoreBtn.disabled = true;
        return;
    }

    isFetching = true;
    loadMoreBtn.innerText = "Loading posts...";

    // Assign the current timeout index calculation to your tracker variable safely
    pendingTimeoutId = setTimeout(() => {
        const startIndex = displayedPostsCount;
        const endIndex = Math.min(startIndex + POSTS_PER_LOAD, targetedPosts.length);

        for (let i = startIndex; i < endIndex; i++) {
            const postData = targetedPosts[i];
            const article = document.createElement('article');
            article.className = 'blog-post';

            const postUrlParam = encodeURIComponent(postData.title.toLowerCase().replace(/ /g, '-'));
            const targetFullUrl = `blog-post.html?article=${postUrlParam}`;

            // Create a temporary hidden DOM element to easily parse the HTML parts
            const parserDiv = document.createElement('div');
            parserDiv.innerHTML = postData.content;

            // Look for media objects at the very start of the content string
            const firstChild = parserDiv.firstElementChild;
            let mediaMarkup = "";
            let remainingTextMarkup = "";

            if (firstChild && (firstChild.classList.contains('video-container') || firstChild.tagName === 'IMG')) {
                // Media found first! Extract it cleanly from the rest of the text
                mediaMarkup = firstChild.outerHTML;
                firstChild.remove(); // Removes it from the parser so only text remains
                remainingTextMarkup = parserDiv.innerHTML;
            } else {
                // No leading media found. The whole post content is treated as text
                remainingTextMarkup = postData.content;
            }

            // Fill article layout splitting media and text wrappers dynamically
            article.innerHTML = `
                <div class="post-meta">${postData.date}</div>
                <h2 class="post-title"><a href="${targetFullUrl}">${postData.title}</a></h2>
                
                <!-- 1. Media Area: Stays 100% visible if present -->
                ${mediaMarkup ? `<div class="post-preview-media-frame">${mediaMarkup}</div>` : ''}
                
                <!-- 2. Text Area: Constrained and smoothly faded near the bottom edge -->
                <div class="post-preview-limiter">
                    <div class="post-content">
                        ${remainingTextMarkup}
                    </div>
                </div>

                <!-- 3. Interactive Call to action link -->
                <div class="see-more-link-wrapper">
                    <a href="${targetFullUrl}" class="see-more-action-link">See More &rarr;</a>
                </div>

                <div class="post-tags"></div>
            `;

            // Append tags individually and bind click events
            const tagsContainer = article.querySelector('.post-tags');
            postData.tags.forEach(tagText => {
                const tagSpan = document.createElement('span');
                tagSpan.className = 'tag clickable-tag';
                tagSpan.innerText = tagText;
                
                tagSpan.addEventListener('click', () => {
                    applyFilter(currentActiveFilter, tagText);
                });
                
                tagsContainer.appendChild(tagSpan);
            });

            feedContainer.insertBefore(article, triggerWrapper);
            displayedPostsCount++;
        }

        if (displayedPostsCount >= targetedPosts.length) {
            loadMoreBtn.innerText = "All posts loaded";
            loadMoreBtn.disabled = true;
        } else {
            loadMoreBtn.innerText = "Read More";
            loadMoreBtn.disabled = false;
        }

        isFetching = false;
        pendingTimeoutId = null; // Clear tracking variable when rendering completes successfully
    }, 400);
}

function applyFilter(selectedMonthYear, selectedTag = undefined) {
    // Only reset the tag filter if a tag wasn't explicitly passed into this function
    if (selectedTag !== undefined) {
        currentTagFilter = selectedTag;
    } else if (selectedMonthYear !== undefined && selectedTag === undefined) {
        // If they clicked an archive month link directly, clear out any old tag selection
        currentTagFilter = null;
    }

    currentActiveFilter = selectedMonthYear;
    displayedPostsCount = 0;

    const feedContainer = document.querySelector('.blog-posts-feed');
    const existingPosts = feedContainer.querySelectorAll('.blog-post');
    existingPosts.forEach(post => post.remove());

    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.disabled = false;
        loadMoreBtn.innerText = "Read More";
    }

    updateActiveFiltersUI(); 
    loadNextPostsBatch();
}

// ==========================================================================
// 3. SIDEBAR & ACTIVE FILTERS UI MANAGEMENT
// ==========================================================================

// New: Renders or clears the active topic badge bar state automatically
function updateActiveFiltersUI() {
    const filtersBar = document.getElementById('active-filters-bar');
    if (!filtersBar) return;

    // Clear whatever layout markup was there previously
    filtersBar.innerHTML = '';

    // If there is an active tag filter, build and append the dynamic badge
    if (currentTagFilter) {
        const badge = document.createElement('div');
        badge.className = 'topic-filter-badge';
        badge.innerHTML = `
            <span>Topic: ${currentTagFilter}</span>
            <button class="clear-topic-x" id="remove-topic-filter-btn" title="Remove topic filter">&times;</button>
        `;

        // Listen for the 'X' button inside the badge being clicked
        badge.querySelector('#remove-topic-filter-btn').addEventListener('click', () => {
            // Nullify the tag selection state directly while keeping active month/search string
            applyFilter(currentActiveFilter, null); 
        });

        filtersBar.appendChild(badge);
    }
}

function buildDynamicSidebar() {
    const archiveListContainer = document.getElementById('dynamic-archive-list');
    if (!archiveListContainer) return;

    const archiveCounts = {};

    ALL_BLOG_POSTS.forEach(post => {
        const monthYearKey = getMonthYearString(post.date);
        if (monthYearKey) {
            archiveCounts[monthYearKey] = (archiveCounts[monthYearKey] || 0) + 1;
        }
    });

    archiveListContainer.innerHTML = '';

    // "Show All Posts" Link
    const allLi = document.createElement('li');
    allLi.innerHTML = `<a href="#" id="clear-filter-btn" class="archive-link"><strong>Show All Posts</strong></a>`;
    archiveListContainer.appendChild(allLi);

    allLi.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        applyFilter(null);
    });

    // Populate months loop
    Object.keys(archiveCounts).forEach(monthYear => {
        const count = archiveCounts[monthYear];
        const li = document.createElement('li');
        
        li.innerHTML = `
            <a href="#" class="archive-link" data-target="${monthYear}">
                ${monthYear} <span class="archive-count">(${count})</span>
            </a>
        `;

        li.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            const targetMonth = e.currentTarget.getAttribute('data-target');
            applyFilter(targetMonth);
        });

        archiveListContainer.appendChild(li);
    });
}

// ==========================================================================
// 4. GLOBAL INITIALIZATION & LISTENERS
// ==========================================================================
window.addEventListener('scroll', () => {
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (!loadMoreBtn || isFetching || loadMoreBtn.disabled) return;
    
    const rect = loadMoreBtn.getBoundingClientRect();
    const isVisible = rect.top <= window.innerHeight;
    
    if (isVisible) {
        loadNextPostsBatch();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    buildDynamicSidebar();
    loadNextPostsBatch(); 

    const searchInput = document.getElementById('blog-search-input');
    const clearSearchBtn = document.getElementById('clear-search-btn');

    if (searchInput && clearSearchBtn) {
        searchInput.addEventListener('input', (e) => {
            currentSearchQuery = e.target.value;

            if (currentSearchQuery.length > 0) {
                clearSearchBtn.style.display = 'block';
            } else {
                clearSearchBtn.style.display = 'none';
            }

            applyFilter(currentActiveFilter); 
        });

        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = "";
            currentSearchQuery = "";
            clearSearchBtn.style.display = 'none';
            searchInput.focus();
            applyFilter(currentActiveFilter);
        });
    }
});

// ==========================================================================
// MOBILE ACCORDION DRAWER ACCORDION ACCELERATORS
// ==========================================================================
    const searchToggle = document.getElementById('toggle-search-btn');
    const archiveToggle = document.getElementById('toggle-archive-btn');

    if (searchToggle) {
        searchToggle.addEventListener('click', () => {
            // Check if we are actually on a mobile viewport layout before toggling
            if (window.innerWidth <= 992) {
                const parentWidget = searchToggle.closest('.sidebar-widget');
                if (parentWidget) parentWidget.classList.toggle('expanded');
            }
        });
    }

    if (archiveToggle) {
        archiveToggle.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                const parentWidget = archiveToggle.closest('.sidebar-widget');
                if (parentWidget) parentWidget.classList.toggle('expanded');
            }
        });
    }