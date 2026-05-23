// ==========================================================================
// MASTER BLOG POSTS DATABASE (810px wide on blog.html)
// ==========================================================================
const ALL_BLOG_POSTS = [
    {
        date: "May 22, 2026",
        title: "How to Build Rich Interactive Blog Posts",
        content: `
            <!-- Responsive YouTube Wrapper Frame -->
            <div class="video-container">
                <iframe src="https://youtube.com" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>

            <p>Today we are exploring how to take our vanilla JavaScript engine to the next level. By writing <strong>raw HTML snippets</strong> right into our data variables, we can style key insights effortlessly.</p>
            
            <p>For instance, you can highlight a critical warning in a <span style="color: #b91c1c; font-weight: 700;">bold red color</span> to grab immediate user attention, or change text to your signature purple color using <span style="color: #813F9B; font-weight: 600;">inline styles</span>.</p>
            
            <p>You can also interlink your thoughts! If you want to check out how our responsive grids are built, jump straight to our <a href="blog-post.html?article=exploring-responsive-css-grids" style="color: #813F9B; font-weight: 600; text-decoration: underline;">Grid Layout Guide</a>.</p>
            
            <p>It is also good practice to add target="_blank" rel="noopener" inside the link tag to open the link in a new browser. For example, here is an <a href="https://google.com" target="_blank" rel="noopener">external link</a> that does that.</p>

            <p>Check out this step-by-step video guide explaining modern embedding techniques:</p>           
        `,
        tags: ["Web Dev", "HTML", "Media"]
    },
    {
        date: "May 22, 2026",
        title: "Evaluating Asset Weights in Modern Core Frameworks",
        content: `
            <p>Optimizing web application payload delivery scales directly with your system architecture choices. When we build interactive components like blog engines, selecting lightweight, native design scripts drastically drops request bottlenecks compared to relying on heavy third-party codebases.</p>
            
            <p>Below is a comparative breakdown showing structural weights and processing scores collected across identical implementation tests on standard layout containers:</p>
            
            <!-- 60% Width Data Table Container Instance -->
            <table class="blog-data-table">
                <thead>
                    <tr>
                        <th>Framework Stack</th>
                        <th>Payload Size</th>
                        <th>Core Performance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Vanilla JavaScript</td>
                        <td>4.2 KB</td>
                        <td>Excellent (99%)</td>
                    </tr>
                    <tr>
                        <td>CSS Grid Only</td>
                        <td>2.8 KB</td>
                        <td>Optimal (100%)</td>
                    </tr>
                    <tr>
                        <td>Dynamic HTML5</td>
                        <td>1.5 KB</td>
                        <td>Excellent (98%)</td>
                    </tr>
                    <tr>
                        <td>Heavy React Build</td>
                        <td>42.4 KB</td>
                        <td>Moderate (74%)</td>
                    </tr>
                </tbody>
            </table>

            <p>As illustrated in the data logs above, keeping logic modular and utilizing native browser technologies keeps compiling overhead extremely tiny. For example, to clear out a layout feed smoothly using pure JavaScript without heavy frameworks, you can target child nodes with this quick function hook:</p>

            <!-- Custom Code Snippet Box Theme Example -->
            <div class="code-snippet-box">
                <div class="code-box-header">
                    <span class="code-box-dot red"></span>
                    <span class="code-box-dot yellow"></span>
                    <span class="code-box-dot green"></span>
                    <span class="code-box-title">blog-events.js</span>
                </div>
                <pre><code>function applyFilter(selectedMonthYear, selectedTag) {
                    currentTagFilter = selectedTag;
                    currentActiveFilter = selectedMonthYear;
                    displayedPostsCount = 0;
                    
                    // Smoothly wipe timeline content frames
                    const feedContainer = document.querySelector('.blog-posts-feed');
                    const existingPosts = feedContainer.querySelectorAll('.blog-post');
                    existingPosts.forEach(post => post.remove());
                }</code></pre>
            </div>

            <p>This performance boost is precisely why separating structural elements into standalone files like <code>blog-data.js</code> and loading them sequentially is a best practice.</p>
            
            <p>If you want to dive deeper into performance optimization strategies, check out our previous article on <a href="blog-post.html?article=why-website-performance-matters">Why Website Performance Matters</a> to review asset compression techniques.</p>
        `,
        tags: ["Performance", "Optimization", "Web Dev"]
    },
    {
        date: "May 20, 2026",
        title: "Exploring Responsive CSS Grids",
        content: "Designing modern layouts requires tools that adapt gracefully across all devices. By leveraging CSS Grid and Flexbox, we can build flawless website structures that maintain design hierarchy from 4K displays down to compact mobile phones in portrait mode.",
        tags: ["Web Design", "CSS"]
    },
    {
        date: "May 15, 2026",
        title: "Mastering Sticky Headers",
        content: "Sticky headers keep navigation elements right at your users' fingertips. They can slide away smoothly on scroll down and reappear instantly on scroll up, maximizing readable vertical space for your text content.",
        tags: ["JavaScript", "UX"]
    },
    {
        date: "April 28, 2026",
        title: "A Guide to Fluid Typography",
        content: "Fonts should feel right no matter the device scale. Using clean, accessible Google Fonts like EB Garamond and Urbanist establishes a reading rhythm that keeps your website visitors engaged for longer reading sessions.",
        tags: ["Typography", "Design Systems"]
    },
    {
        date: "April 10, 2026",
        title: "Why White Canvas Enforcement Matters",
        content: "Enforcing a solid global background color avoids sudden layout flashes or browser canvas mismatches. Keeping standard body properties uniform sets up a seamless playground for text and UI mechanics.",
        tags: ["Web Development"]
    },
    {
        date: "March 14, 2026",
        title: "Optimizing Images for the Web",
        content: "Large assets cause layout shifting and slow down loading times. Using modern formats and standard CSS properties ensures elements fit within their bounds safely and stay responsive.",
        tags: ["Performance", "Media"]
    },
    {
        date: "February 28, 2026",
        title: "Understanding CSS Flexbox Alignment",
        content: "Flexbox makes component layouts highly predictable. By pairing align-items and justify-content properties correctly, we can build custom hero sections or align text links perfectly across any wrapper without margin hacking.",
        tags: ["CSS", "Frontend"]
    },
    {
        date: "February 14, 2026",
        title: "Getting Started with Vanilla JavaScript",
        content: "You do not always need massive frameworks to build interactive websites. Writing clean, native event listeners and DOM manipulation functions keeps your site loading incredibly fast and free of external bugs.",
        tags: ["JavaScript", "Web Dev"]
    },
    {
        date: "February 02, 2026",
        title: "A Deep Dive into Semantics",
        content: "Using tags like main, header, footer, and article instead of basic divs helps search engines read your site content effectively. It also instantly makes your blog fully screen-reader accessible.",
        tags: ["HTML", "Accessibility"]
    },
    {
        date: "January 25, 2026",
        title: "Designing for Dark Mode Smoothly",
        content: "Implementing dark themes requires shifting more than just background colors. You must also adjust contrast levels on text strings and dim bright white graphics so your layout looks easy on the eyes at night.",
        tags: ["UI Design", "UX"]
    },
    {
        date: "January 19, 2026",
        title: "Why Website Performance Matters",
        content: "A fast website directly improves user retention. Minimizing rendering blocks, script file payloads, and server request counts guarantees readers stay on your articles instead of bouncing away.",
        tags: ["Performance", "Optimization"]
    },
    {
        date: "January 05, 2026",
        title: "Mastering Browser Developer Tools",
        content: "The browser console and elements inspector panels are a developer's best friend. Learning to trace layout clipping bugs or monitor live event triggers saves hours of debugging frustration.",
        tags: ["Debugging", "Tools"]
    }
];