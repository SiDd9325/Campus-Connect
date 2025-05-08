// Sample data for demonstration
let queries = [
    {
        id: 1,
        text: "Good morning students, Prepare Poster(Print format size A3) for your project and present on 7.5.2025 (Tuesday ) lab hours and submit the same to me. Please add all project member roll number and name bottom right",
        subject: "announcement",
        author: "Joe Arun Raja",
        authorImage: "https://i.pravatar.cc/150?img=1",
        timestamp: "2024-03-15 10:30 AM",
        likes: 5,
        comments: [
            {
                text: "Understood, Joe sir. We will prepare the poster as per the requirements.",
                author: "Sanjana",
                authorImage: "https://i.pravatar.cc/150?img=2",
                timestamp: "2024-03-15 11:00 AM"
            }
        ]
    },
    {
        id: 2,
        text: "What are the main differences between mitosis and meiosis?",
        subject: "science",
        author: "Radhika Sridharan",
        authorImage: "https://i.pravatar.cc/150?img=3",
        timestamp: "2024-03-14 02:15 PM",
        likes: 3,
        comments: []
    },
    {
        id: 3,
        text: "Can someone explain the concept of closures in JavaScript? I'm having trouble understanding how they work with asynchronous code.",
        subject: "javascript",
        author: "Priya Kumar",
        authorImage: "https://i.pravatar.cc/150?img=4",
        timestamp: "2024-03-14 10:30 AM",
        likes: 8,
        comments: [
            {
                text: "Closures are functions that remember their lexical scope even when executed outside that scope. For async code, they help maintain state between async operations.",
                author: "Rahul Sharma",
                authorImage: "https://i.pravatar.cc/150?img=5",
                timestamp: "2024-03-14 11:45 AM"
            }
        ]
    },
    {
        id: 4,
        text: "Looking for study partners for the upcoming Theory of Computation exam. Anyone interested in forming a study group?",
        subject: "toc",
        author: "Aarav Patel",
        authorImage: "https://i.pravatar.cc/150?img=6",
        timestamp: "2024-03-13 04:20 PM",
        likes: 12,
        comments: [
            {
                text: "I'm interested! Let's meet in the library tomorrow at 3 PM.",
                author: "Meera Gupta",
                authorImage: "https://i.pravatar.cc/150?img=7",
                timestamp: "2024-03-13 05:30 PM"
            }
        ]
    },
    {
        id: 5,
        text: "Has anyone completed the optimization techniques assignment? I need help with the dynamic programming part.",
        subject: "optimization",
        author: "Vikram Singh",
        authorImage: "https://i.pravatar.cc/150?img=8",
        timestamp: "2024-03-13 01:15 PM",
        likes: 6,
        comments: [
            {
                text: "I can help you with that. Let's discuss it in the next lab session.",
                author: "Ananya Reddy",
                authorImage: "https://i.pravatar.cc/150?img=9",
                timestamp: "2024-03-13 02:00 PM"
            }
        ]
    }
];
let tweets = [];
let currentUser = null;

// DOM Elements
const navLinks = document.querySelectorAll('.nav-links a');
const pages = document.querySelectorAll('.page');
const queryForm = document.getElementById('query-form');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const feedContainer = document.querySelector('.feed-container');
const tweetsContainer = document.querySelector('.tweets-container');

// Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = link.getAttribute('data-page');
        
        // Update active states
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
            if (page.id === targetPage) {
                page.classList.add('active');
            }
        });

        // Update the URL hash
        window.location.hash = targetPage;
    });
});

// Handle initial page load and hash changes
function handleHashChange() {
    const hash = window.location.hash.substring(1) || 'home';
    const targetPage = document.getElementById(hash);
    const targetLink = document.querySelector(`.nav-links a[data-page="${hash}"]`);
    
    if (targetPage && targetLink) {
        pages.forEach(page => page.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));
        
        targetPage.classList.add('active');
        targetLink.classList.add('active');
    }
}

// Add event listener for hash changes
window.addEventListener('hashchange', handleHashChange);

// Handle initial page load
document.addEventListener('DOMContentLoaded', () => {
    handleHashChange();
    updateAuthUI();
    updateFeed();
    updateTweets();
});

// Query Form Submission
queryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const queryText = queryForm.querySelector('textarea').value;
    const subject = queryForm.querySelector('select').value;
    
    if (currentUser) {
        const newQuery = {
            id: Date.now(),
            text: queryText,
            subject: subject,
            author: currentUser.name,
            authorImage: currentUser.image,
            timestamp: new Date().toLocaleString(),
            likes: 0,
            comments: []
        };
        
        queries.unshift(newQuery);
        updateFeed();
        queryForm.reset();
    } else {
        alert('Please login to post a query');
    }
});

// Login Form Submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;
    
    // Simple authentication (in a real app, this would be handled by a backend)
    if (email && password) {
        currentUser = {
            name: 'Demo User',
            email: email,
            image: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
        };
        
        // Update UI and show home page
        updateAuthUI();
        
        // Hide all pages
        pages.forEach(page => page.classList.remove('active'));
        
        // Show home page
        document.getElementById('home').classList.add('active');
        
        // Update navigation active state
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === 'home') {
                link.classList.add('active');
            }
        });

        // Update profile information
        document.getElementById('profile-name').textContent = currentUser.name;
        document.getElementById('profile-email').textContent = currentUser.email;
        document.getElementById('profile-image').src = currentUser.image;
        
        // Show success message
        const toast = document.createElement('div');
        toast.className = 'toast show success';
        toast.innerHTML = `
            <div class="toast-header">
                <strong class="me-auto">Success</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">
                Login successful! Welcome back, ${currentUser.name}!
            </div>
        `;
        document.body.appendChild(toast);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.remove();
        }, 3000);
    } else {
        // Show error message
        const toast = document.createElement('div');
        toast.className = 'toast show error';
        toast.innerHTML = `
            <div class="toast-header">
                <strong class="me-auto">Error</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">
                Please enter both email and password.
            </div>
        `;
        document.body.appendChild(toast);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
});

// Signup Form Submission
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = signupForm.querySelector('input[type="text"]').value;
    const email = signupForm.querySelector('input[type="email"]').value;
    const password = signupForm.querySelector('input[type="password"]').value;
    const confirmPassword = signupForm.querySelectorAll('input[type="password"]')[1].value;
    
    if (password === confirmPassword) {
        currentUser = {
            name: name,
            email: email,
            image: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
        };
        alert('Signup successful!');
        updateAuthUI();
    } else {
        alert('Passwords do not match!');
    }
});

// Subject Icons
const subjectIcons = {
    math: `<svg class="subject-icon math" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2V9h-2V7h4v10zm4-4h-2V7h2v6zm0 4h-2v-2h2v2z"/>
    </svg>`,
    science: `<svg class="subject-icon science" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.3 16.9c.4-.7.7-1.5.7-2.4 0-2.5-2-4.5-4.5-4.5S11 12 11 14.5s2 4.5 4.5 4.5c.9 0 1.7-.3 2.4-.7l3.1 3.1 1.4-1.4-3.1-3.1zm-3.8.1c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5zM5 20v-6h3v6H5zm10-9V4h-3v7h3zM4 4v7h3V4H4z"/>
    </svg>`,
    history: `<svg class="subject-icon history" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
    </svg>`,
    english: `<svg class="subject-icon english" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>`
};

// Resources for each subject
const subjectResources = {
    math: {
        geeksForGeeks: "https://www.geeksforgeeks.org/mathematics/",
        khanAcademy: "https://www.khanacademy.org/math",
        mitOcw: "https://ocw.mit.edu/courses/mathematics/"
    },
    science: {
        geeksForGeeks: "https://www.geeksforgeeks.org/science/",
        coursera: "https://www.coursera.org/browse/physical-science-and-engineering",
        edx: "https://www.edx.org/learn/science"
    },
    frontend: {
        geeksForGeeks: "https://www.geeksforgeeks.org/web-development/",
        mdn: "https://developer.mozilla.org/",
        frontendMasters: "https://frontendmasters.com/"
    },
    fullstack: {
        geeksForGeeks: "https://www.geeksforgeeks.org/web-development/",
        freeCodeCamp: "https://www.freecodecamp.org/",
        odinProject: "https://www.theodinproject.com/"
    },
    toc: {
        geeksForGeeks: "https://www.geeksforgeeks.org/theory-of-computation/",
        nptel: "https://nptel.ac.in/courses/106105085/",
        stanford: "https://online.stanford.edu/courses/soe-ycsautomata-automata-theory"
    },
    javascript: {
        geeksForGeeks: "https://www.geeksforgeeks.org/javascript/",
        jsInfo: "https://javascript.info/",
        ydkjs: "https://github.com/getify/You-Dont-Know-JS"
    },
    optimization: {
        geeksForGeeks: "https://www.geeksforgeeks.org/optimization-techniques/",
        leetcode: "https://leetcode.com/",
        systemDesign: "https://github.com/donnemartin/system-design-primer"
    },
    english: {
        geeksForGeeks: "https://www.geeksforgeeks.org/english/",
        grammarly: "https://www.grammarly.com/",
        cambridge: "https://dictionary.cambridge.org/"
    }
};

// Handle subject card clicks
document.querySelectorAll('.subject-card').forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const subject = card.getAttribute('data-subject');
        const target = e.target;
        
        if (target.classList.contains('subject-link')) {
            window.open(subjectResources[subject].geeksForGeeks, '_blank');
        } else if (target.classList.contains('resource-link')) {
            const resourceName = target.textContent.toLowerCase().replace(/\s+/g, '');
            if (subjectResources[subject][resourceName]) {
                window.open(subjectResources[subject][resourceName], '_blank');
            }
        }
    });
});

// Update Feed
function updateFeed() {
    feedContainer.innerHTML = '';
    queries.forEach(query => {
        const queryElement = document.createElement('div');
        queryElement.className = `feed-item ${query.subject}`;
        
        // Randomly set status for demo purposes
        const statuses = ['online', 'offline', 'busy', 'away'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        queryElement.innerHTML = `
            <div class="feed-item-header">
                <div class="author-info">
                    <img src="${query.authorImage}" alt="${query.author}" class="profile-image">
                    <div class="profile-status ${randomStatus}"></div>
                    <span class="author-name">${query.author}</span>
                </div>
                <h3>${subjectIcons[query.subject]} ${query.subject.charAt(0).toUpperCase() + query.subject.slice(1)}</h3>
            </div>
            <p>${query.text}</p>
            <div class="meta">
                <span>${query.timestamp}</span>
            </div>
            <div class="actions">
                <button class="action-btn like-btn ${query.liked ? 'liked' : ''}" data-query-id="${query.id}">
                    <span class="like-count">${query.likes}</span> Likes
                </button>
                <button class="action-btn comment-btn" data-query-id="${query.id}">
                    ${query.comments.length} Comments
                </button>
            </div>
            <div class="comment-section">
                <div class="comment-list">
                    ${query.comments.map(comment => {
                        const commentStatus = statuses[Math.floor(Math.random() * statuses.length)];
                        return `
                        <div class="comment">
                            <div class="comment-header">
                                <div class="author-info">
                                    <img src="${comment.authorImage}" alt="${comment.author}" class="profile-image">
                                    <div class="profile-status ${commentStatus}"></div>
                                    <span class="comment-author">${comment.author}</span>
                                </div>
                                <span class="comment-timestamp">${comment.timestamp}</span>
                            </div>
                            <div class="comment-content">${comment.text}</div>
                            <div class="comment-actions">
                                <button class="comment-action like ${comment.liked ? 'active' : ''}" data-comment-id="${comment.id}">
                                    ${comment.likes || 0} Likes
                                </button>
                                <button class="comment-action reply" data-comment-id="${comment.id}">
                                    Reply
                                </button>
                            </div>
                        </div>
                    `}).join('')}
                </div>
                ${currentUser ? `
                    <form class="comment-form" data-query-id="${query.id}">
                        <input type="text" placeholder="Write a comment..." required>
                        <button type="submit">Post Comment</button>
                    </form>
                ` : `
                    <div class="login-prompt">
                        <a href="#" class="login-link" data-page="login">Login</a> to comment
                    </div>
                `}
            </div>
        `;
        feedContainer.appendChild(queryElement);
    });

    // Add event listeners for likes
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', handleLike);
    });

    // Add event listeners for comments
    document.querySelectorAll('.comment-form').forEach(form => {
        form.addEventListener('submit', handleComment);
    });

    // Add event listeners for comment likes
    document.querySelectorAll('.comment-action.like').forEach(btn => {
        btn.addEventListener('click', handleCommentLike);
    });

    // Add event listeners for login links
    document.querySelectorAll('.login-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('data-page');
            document.querySelector(`[data-page="${targetPage}"]`).click();
        });
    });
}

// Handle Like
function handleLike(e) {
    if (!currentUser) {
        alert('Please login to like posts');
        return;
    }

    const queryId = parseInt(e.target.closest('.like-btn').dataset.queryId);
    const query = queries.find(q => q.id === queryId);
    
    if (query) {
        if (!query.liked) {
            query.likes++;
            query.liked = true;
        } else {
            query.likes--;
            query.liked = false;
        }
        updateFeed();
    }
}

// Handle Comment
function handleComment(e) {
    e.preventDefault();
    if (!currentUser) {
        alert('Please login to comment');
        return;
    }

    const queryId = parseInt(e.target.dataset.queryId);
    const commentText = e.target.querySelector('input').value;
    const query = queries.find(q => q.id === queryId);
    
    if (query && commentText) {
        const newComment = {
            id: Date.now(),
            text: commentText,
            author: currentUser.name,
            authorImage: currentUser.image,
            timestamp: new Date().toLocaleString(),
            likes: 0,
            liked: false
        };
        
        query.comments.push(newComment);
        e.target.reset();
        updateFeed();
    }
}

// Handle Comment Like
function handleCommentLike(e) {
    if (!currentUser) {
        alert('Please login to like comments');
        return;
    }

    const commentId = parseInt(e.target.dataset.commentId);
    const query = queries.find(q => q.comments.some(c => c.id === commentId));
    const comment = query.comments.find(c => c.id === commentId);
    
    if (comment) {
        if (!comment.liked) {
            comment.likes = (comment.likes || 0) + 1;
            comment.liked = true;
        } else {
            comment.likes = Math.max(0, (comment.likes || 0) - 1);
            comment.liked = false;
        }
        updateFeed();
    }
}

// Update Tweets
function updateTweets() {
    tweetsContainer.innerHTML = '';
    tweets.forEach(tweet => {
        const tweetElement = document.createElement('div');
        tweetElement.className = 'tweet';
        tweetElement.innerHTML = `
            <div class="tweet-header">
                <img src="${tweet.authorImage}" alt="${tweet.author}" class="tweet-avatar">
                <div class="tweet-info">
                    <span class="tweet-author">${tweet.author}</span>
                    <span class="tweet-timestamp">${tweet.timestamp}</span>
                </div>
            </div>
            <div class="tweet-content">
                <p>${tweet.text}</p>
            </div>
            <div class="tweet-actions">
                <button class="like-btn" data-id="${tweet.id}">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <span>${tweet.likes}</span>
                </button>
                <button class="comment-btn" data-id="${tweet.id}">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z"/>
                    </svg>
                    <span>${tweet.comments.length}</span>
                </button>
            </div>
        `;
        tweetsContainer.appendChild(tweetElement);
    });
}

// Update Authentication UI
function updateAuthUI() {
    const authButtons = document.querySelectorAll('.auth-btn');
    if (currentUser) {
        // Hide login and signup buttons
        authButtons.forEach(btn => {
            if (btn.getAttribute('data-page') === 'login' || btn.getAttribute('data-page') === 'signup') {
                btn.style.display = 'none';
            }
        });
        
        // Show profile button
        const profileBtn = document.querySelector('[data-page="profile"]');
        if (profileBtn) {
            profileBtn.style.display = 'block';
        }
    } else {
        // Show login and signup buttons
        authButtons.forEach(btn => {
            if (btn.getAttribute('data-page') === 'login' || btn.getAttribute('data-page') === 'signup') {
                btn.style.display = 'block';
            }
        });
        
        // Hide profile button
        const profileBtn = document.querySelector('[data-page="profile"]');
        if (profileBtn) {
            profileBtn.style.display = 'none';
        }
    }
}

// Password visibility toggle
document.getElementById('toggle-signup-password').addEventListener('click', function() {
    const passwordInput = document.getElementById('signup-password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
});

document.getElementById('toggle-signup-confirm-password').addEventListener('click', function() {
    const passwordInput = document.getElementById('signup-confirm-password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
});

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Clear any existing user data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    
    // Always show signup page first
    showPage('signup');
    updateNavbar();
});

// Show page function
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show the requested page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update navbar active state
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
}

// Update navbar based on authentication state
function updateNavbar() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const authButtons = document.querySelectorAll('.auth-btn');
    
    authButtons.forEach(btn => {
        const page = btn.getAttribute('data-page');
        if (isLoggedIn) {
            // Hide login/signup, show profile
            if (page === 'login' || page === 'signup') {
                btn.style.display = 'none';
            } else if (page === 'profile') {
                btn.style.display = 'block';
            }
        } else {
            // Show login/signup, hide profile
            if (page === 'login' || page === 'signup') {
                btn.style.display = 'block';
            } else if (page === 'profile') {
                btn.style.display = 'none';
            }
        }
    });
}

// Update user profile information
function updateUserProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        // Update profile section
        document.getElementById('profile-name').textContent = currentUser.name;
        document.getElementById('profile-email').textContent = currentUser.email;
        
        // Update profile image if available
        const profileImage = document.getElementById('profile-image');
        if (currentUser.image) {
            profileImage.src = currentUser.image;
        }
        
        // Update profile status
        const status = document.querySelector('.profile-status');
        if (status) {
            // Randomly set status for demo purposes
            const statuses = ['online', 'offline', 'busy', 'away'];
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            status.className = `profile-status ${randomStatus}`;
        }
        
        // Update stats
        const queriesCount = localStorage.getItem('queriesCount') || 0;
        const commentsCount = localStorage.getItem('commentsCount') || 0;
        const likesCount = localStorage.getItem('likesCount') || 0;
        
        document.getElementById('queries-count').textContent = queriesCount;
        document.getElementById('comments-count').textContent = commentsCount;
        document.getElementById('likes-count').textContent = likesCount;
    }
}

// Handle profile image edit
document.querySelector('.camera-icon').addEventListener('click', function(e) {
    e.stopPropagation();
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const profileImage = document.getElementById('profile-image');
                profileImage.src = e.target.result;
                
                // Update user data in localStorage
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (currentUser) {
                    currentUser.image = e.target.result;
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                }
            };
            reader.readAsDataURL(file);
        }
    };
    
    input.click();
});

// Signup form handling
document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        showToast('Passwords do not match!', 'error');
        return;
    }
    
    // Store user data in localStorage
    const userData = {
        name: name,
        email: email,
        password: password,
        image: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}` // Random avatar
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Show success message and redirect to login
    showToast('Account created successfully! Please login with your credentials.', 'success');
    setTimeout(() => {
        showPage('login');
    }, 1500);
    
    // Clear the form
    this.reset();
});

// Login form handling
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Get stored user data
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    
    if (storedUserData && storedUserData.email === email && storedUserData.password === password) {
        // Set user as logged in
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify({
            name: storedUserData.name,
            email: storedUserData.email,
            image: storedUserData.image
        }));
        
        // Show success message and redirect to home
        showToast('Login successful! Welcome back!', 'success');
        setTimeout(() => {
            showPage('home');
            updateUserProfile();
            updateNavbar();
        }, 1500);
    } else {
        showToast('Invalid email or password!', 'error');
    }
    
    // Clear the form
    this.reset();
});

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast show ${type}`;
    toast.innerHTML = `
        <div class="toast-header">
            <strong class="me-auto">${type === 'success' ? 'Success' : 'Error'}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', function() {
    // Clear user data from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    
    // Show success message
    showToast('Logged out successfully!', 'success');
    
    // Redirect to signup page after a short delay
    setTimeout(() => {
        showPage('signup');
        updateNavbar();
    }, 1500);
}); 