import './style.css';
import { initAuth, login, logout, getUser } from './auth.js';
import { triggerConfetti, triggerLeaves } from './effects.js';
import {
    getDailyAffirmation,
    getRandomActivity,
    logActivity,
    savePendingTask,
    getPendingTask,
    deletePendingTask,
    getUserLogs
} from './app-logic.js';

// DOM Elements
const authBtn = document.getElementById('auth-btn');
const userDisplay = document.getElementById('user-display');
const affirmationDisplay = document.getElementById('affirmation-display');

const viewHome = document.getElementById('view-home');
const viewActivity = document.getElementById('view-activity');
const viewUpload = document.getElementById('view-upload');
const feedbackMessage = document.getElementById('feedback-message');

const btnRoll = document.getElementById('btn-roll');
const btnRollJapanActivity = document.getElementById('btn-roll-japan-activity'); // Activity View
const btnAccept = document.getElementById('btn-accept'); // New name for "Done" in phase 1
const btnCancelTask = document.getElementById('btn-cancel-task'); // New
const btnReroll = document.getElementById('btn-reroll');
const btnNotToday = document.getElementById('btn-nottoday');

const activityType = document.getElementById('activity-type');
const activityInstruction = document.getElementById('activity-instruction');
const activityDuration = document.getElementById('activity-duration');

// Upload elements
const uploadText = document.getElementById('upload-text');
const uploadFile = document.getElementById('upload-file');
const fileName = document.getElementById('file-name');
const btnSave = document.getElementById('btn-save');
// const btnSkip = document.getElementById('btn-skip'); // Removed
const uploadActivityText = document.getElementById('upload-activity-text');

// Calendar & List
const calendarGrid = document.getElementById('calendar-grid');
const logListContainer = document.getElementById('log-list');

// State
let currentActivity = null;
let pendingImageData = null;

// Initialize
async function init() {
    // Hide all views initially to prevent flash
    viewHome.classList.add('hidden');
    viewActivity.classList.add('hidden');
    viewUpload.classList.add('hidden');

    // Auth Listener
    initAuth(async (user) => {
        if (user) {
            authBtn.textContent = "Sign Out ";
            userDisplay.textContent = " - " + (user.displayName || user.email);
            userDisplay.classList.remove('hidden');

            // Check for pending task
            const pending = await getPendingTask(user);
            if (pending) {
                currentActivity = pending;

                // Check if it was already accepted
                if (pending.accepted) {
                    if (uploadActivityText) {
                        uploadActivityText.textContent = pending.instruction;
                    }
                    switchView('upload');
                } else {

                    // Just proposed
                    renderActivity(pending);
                    switchView('activity');
                }
            } else {
                // No pending task, show home
                switchView('home');
            }

            // Load calendar & list
            await loadCalendar(user);
            await loadLogList(user);
        } else {
            authBtn.textContent = "Sign In";
            userDisplay.classList.add('hidden');
            calendarGrid.innerHTML = '<p class="calendar-empty">Sign in to see your history.</p>';
            logListContainer.innerHTML = '';

            // Check for guest pending task
            const pending = await getPendingTask(null);
            if (pending) {
                currentActivity = pending;
                if (pending.accepted) {
                    if (uploadActivityText) {
                        uploadActivityText.textContent = pending.instruction;
                    }
                    switchView('upload');
                } else {
                    renderActivity(pending);
                    switchView('activity');
                }
            } else {
                switchView('home');
            }
        }
    });

    // Load Daily Affirmation
    const affirmation = getDailyAffirmation();
    affirmationDisplay.textContent = `"${affirmation}"`;
}

// Event Listeners
authBtn.addEventListener('click', () => {
    const user = getUser();
    if (user) {
        logout();
    } else {
        login();
    }
});

btnRoll.addEventListener('click', async () => {
    await showActivity(false); // Normal roll
});

if (btnRollJapanActivity) {
    btnRollJapanActivity.addEventListener('click', async () => {
        await showActivity(true); // Forced Japan roll
    });
}

btnReroll.addEventListener('click', async () => {
    await showActivity(currentActivity?.isJapanMode || false); // Keep current mode
});

// ACCEPT TASK FLOW
if (btnAccept) {
    btnAccept.addEventListener('click', async () => {
        const user = getUser();
        // Mark as accepted
        currentActivity.accepted = true;
        await savePendingTask(user, currentActivity);

        // Show upload view
        if (uploadActivityText && currentActivity) {
            uploadActivityText.textContent = currentActivity.instruction;
        }
        switchView('upload');
    });
}

btnNotToday.addEventListener('click', async () => {
    await completeActivity("NOT_TODAY", null, null);
});

// Cancel active task
if (btnCancelTask) {
    btnCancelTask.addEventListener('click', async () => {
        const user = getUser();
        await deletePendingTask(user);
        resetView();
    });
}

// Image compression function
function compressImage(file, maxWidth = 800, quality = 0.7) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Scale down if larger than maxWidth
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Convert to compressed JPEG
                const compressedData = canvas.toDataURL('image/jpeg', quality);
                resolve(compressedData);
            };
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// File input change
uploadFile.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file) {
        fileName.textContent = "Compressing...";
        try {
            // Compress the image before storing
            pendingImageData = await compressImage(file, 800, 0.6);
            fileName.textContent = file.name + " ✓";
        } catch (err) {
            console.error("Image compression failed:", err);
            fileName.textContent = "Error processing image";
            pendingImageData = null;
        }
    } else {
        fileName.textContent = "No file selected";
        pendingImageData = null;
    }
});

btnSave.addEventListener('click', async () => {
    const note = uploadText.value.trim() || null;
    await completeActivity("DONE", note, pendingImageData);
});

// btnSkip removed - now just Save or Cancel

// Logic
async function showActivity(isJapanMode = false) {
    currentActivity = getRandomActivity(isJapanMode);
    currentActivity.isJapanMode = isJapanMode; // Track mode for rerolls
    renderActivity(currentActivity);
    switchView('activity');

    // Save as pending task (not accepted yet)
    const user = getUser();
    await savePendingTask(user, currentActivity);
}

// Japan Mode Toggle Persistence (REMOVED - now button based)

function renderActivity(activity) {
    activityType.textContent = activity.type;
    activityInstruction.textContent = activity.instruction;
    activityDuration.textContent = activity.duration;
}

async function completeActivity(status, note, imageData) {
    const user = getUser();

    try {
        await logActivity(user, currentActivity, status, note, imageData);
        await deletePendingTask(user);

        // Show feedback and effects
        if (status === "DONE") {
            triggerConfetti();
            showFeedback("Saved. You did it.", "success");
        } else {
            triggerLeaves();
            showFeedback("That's okay. Maybe tomorrow.", "neutral");
        }

        // Reset state
        resetUploadForm();
        resetView();

        // Reload calendar if logged in
        if (user) {
            await loadCalendar(user);
            await loadLogList(user);
        }
    } catch (error) {
        console.error("Save error:", error);

        // Check if it's a size error
        if (error.message && error.message.includes('longer than')) {
            showFeedback("Image too large. Try a smaller photo?", "neutral");
        } else {
            showFeedback("Something went wrong. Try again?", "neutral");
        }
    }
}

function showFeedback(message, type) {
    feedbackMessage.textContent = message;
    feedbackMessage.className = `feedback ${type}`;
    feedbackMessage.classList.remove('hidden');

    setTimeout(() => {
        feedbackMessage.classList.add('hidden');
    }, 3000);
}

function switchView(viewName) {
    viewHome.classList.add('hidden');
    viewActivity.classList.add('hidden');
    viewUpload.classList.add('hidden');

    if (viewName === 'home') {
        viewHome.classList.remove('hidden');
    } else if (viewName === 'activity') {
        viewActivity.classList.remove('hidden');
    } else if (viewName === 'upload') {
        viewUpload.classList.remove('hidden');
    }
}

function resetView() {
    switchView('home');
    currentActivity = null;
}

function resetUploadForm() {
    uploadText.value = '';
    uploadFile.value = '';
    fileName.textContent = 'No file selected';
    pendingImageData = null;
}

async function loadLogList(user) {
    const logs = await getUserLogs(user, 20); // 20 latest

    if (logs.length === 0) {
        logListContainer.innerHTML = '';
        return;
    }

    logListContainer.innerHTML = logs.map(log => {
        const date = log.timestamp?.toDate?.()
            ? log.timestamp.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            : 'Recently';

        const statusClass = log.status === 'DONE' ? 'done' : 'nottoday';
        const label = log.status === 'DONE' ? '✓' : '☁️';

        const note = log.note ? `"${log.note}"` : '';

        return `
            
             <div class="calendar-entry" onclick="openDayModal('${log.timestamp?.toDate ? log.timestamp.toDate().toISOString().split("T")[0] : ""}')" style="cursor: pointer;">
                
           
             
             <div class="entry-content">
                    <div>
                        <span class="entry-date">${date}</span>
                        <span class="entry-type"> • ${log.activityType}</span>
                    </div>
                    ${note ? `<div class="entry-note">${note}</div>` : ''}
                </div>
                <span class="entry-status ${statusClass}">${label}</span>
            </div>
        `;
    }).join('');
}

// Calendar Grid Logic
async function loadCalendar(user) {
    const logs = await getUserLogs(user, 100); // Get more logs for the month
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    let html = `
        <div class="calendar-wrapper">
            <div class="month-header">${monthNames[currentMonth]} ${currentYear}</div>
            <div class="calendar-days-header">
                <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
            </div>
            <div class="calendar">
    `;

    // Empty cells for days before the 1st
    for (let i = 1; i <= firstDayIndex; i++) { // Adjusted for Sun=0
        html += `<div class="calendar-day empty"></div>`;
    }

    // Days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        // Find logs for this day
        // Note: logs timestamp is Firestore Timestamp.
        const dayLogs = logs.filter(log => {
            if (!log.timestamp) return false;
            const logDate = log.timestamp.toDate();
            return logDate.getDate() === day &&
                logDate.getMonth() === currentMonth &&
                logDate.getFullYear() === currentYear;
        });

        const isToday = day === today.getDate();
        const hasActivity = dayLogs.length > 0;
        let stamp = '';
        if (hasActivity) {
            // Check status of the latest log for that day
            const latest = dayLogs[0]; // logs are sorted desc
            if (latest.status === 'DONE') {
                stamp = '🌸'; // Flower stamp for completed
            } else if (latest.status === 'NOT_TODAY') {
                stamp = '☁️'; // Cloud for skipped
            }
        }

        html += `
            <div class="calendar-day ${isToday ? 'today' : ''} ${hasActivity ? 'has-activity' : ''}" 
                 onclick="${hasActivity ? `openDayModal('${dateStr}')` : ''}">
                <span class="day-number">${day}</span>
                ${stamp ? `<span class="stamp">${stamp}</span>` : ''}
            </div>
        `;

        // Store logs in a global map for easy access by modal
        if (!window.calendarData) window.calendarData = {};
        window.calendarData[dateStr] = dayLogs;
    }

    html += `</div></div>`; // Close grid and wrapper
    calendarGrid.innerHTML = html;
}

// Modal Logic
const dayModal = document.getElementById('day-modal');
const closeModal = document.getElementById('close-modal');
const modalBody = document.getElementById('modal-body');

window.openDayModal = function (dateStr) {
    const logs = window.calendarData[dateStr];
    if (!logs || logs.length === 0) return;

    const dateObj = new Date(dateStr + 'T12:00:00'); // Safe parsing
    const dateDisplay = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    let content = `<div class="modal-date">${dateDisplay}</div>`;

    logs.forEach(log => {
        content += `
            <div class="modal-entry">
                <div class="modal-activity">${log.activityInstruction || 'Unknown Activity'}</div>
                <div class="activity-type">${log.activityType}</div>
                ${log.note ? `<p class="detail-note">"${log.note}"</p>` : ''}
                ${log.imageData ? `<img src="${log.imageData}" class="detail-image" alt="Uploaded" />` : ''}
                <hr style="opacity: 0.1; margin: 1rem 0;">
            </div>
        `;
    });

    modalBody.innerHTML = content;
    dayModal.classList.remove('hidden');
};

if (closeModal) {
    closeModal.addEventListener('click', () => {
        dayModal.classList.add('hidden');
    });
}

// Close on click outside
window.onclick = function (event) {
    if (event.target === dayModal) {
        dayModal.classList.add('hidden');
    }
};

// iOS Detection & PWA Logic
import { registerSW } from 'virtual:pwa-register';

// Register Service Worker
const updateSW = registerSW({
    onNeedRefresh() {
        console.log('New content available, reload?');
        // We could show a toast here, but for now silent update is fine.
    },
    onOfflineReady() {
        console.log('App is ready for offline work');
    },
});

// Detect iOS
function isIOS() {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
}

// Detect if running as PWA
function isRunningStandalone() {
    return (window.matchMedia('(display-mode: standalone)').matches) || (window.navigator.standalone) || document.referrer.includes('android-app://');
}

// OS Specific Install Logic
const installBtn = document.getElementById('install-btn');
const iosBanner = document.getElementById('ios-install-banner');
const iosCloseBtn = document.getElementById('close-ios-banner');

// Android / Desktop Install Prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Show the install button
    if (!isRunningStandalone() && !isIOS()) {
        installBtn.classList.remove('hidden');
    }
});

if (installBtn) {
    installBtn.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log('Install outcome:', outcome);
        deferredPrompt = null;
        installBtn.classList.add('hidden');
    });
}

// iOS Banner Logic
if (isIOS() && !isRunningStandalone()) {
    // Check if we've already shown it this session
    if (!sessionStorage.getItem('iosBannerDismissed')) {
        // Show after a short delay
        setTimeout(() => {
            iosBanner.classList.remove('hidden');
        }, 2000);
    }
}

if (iosCloseBtn) {
    iosCloseBtn.addEventListener('click', () => {
        iosBanner.classList.add('hidden');
        sessionStorage.setItem('iosBannerDismissed', 'true');
    });
}

// Notification Logic
const btnNotifications = document.getElementById('btn-notifications');

function checkNotificationPermission() {
    if (!('Notification' in window)) {
        if (btnNotifications) btnNotifications.classList.add('hidden');
        return;
    }

    if (Notification.permission === 'granted') {
        if (btnNotifications) {
            btnNotifications.textContent = '🔔 Reminders On';
            btnNotifications.disabled = true;
            btnNotifications.style.opacity = '0.5';
        }
    } else if (Notification.permission === 'denied') {
        if (btnNotifications) {
            btnNotifications.textContent = '🔕 Reminders blocked';
            btnNotifications.disabled = true;
        }
    }
}

async function requestNotificationPermission() {
    if (!('Notification' in window)) return;

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
        if (btnNotifications) {
            btnNotifications.textContent = '🔔 Reminders On';
            btnNotifications.disabled = true;
        }
        new Notification("Sardina y La Patatina", {
            body: "You're all set! We'll remind you to do small things.",
            icon: '/icons/icon-192.png'
        });

        // "Schedule" a pretend notification (POC)
        // In a real PWA we'd use Push API or Periodic Sync if available
        setTimeout(() => {
            if (document.hidden) {
                new Notification("Hey!", {
                    body: "Did you do your sardina activity today?",
                    icon: '/icons/icon-192.png'
                });
            }
        }, 1000 * 60 * 60 * 24); // 24 hours (just a placeholder)
    }
}

if (btnNotifications) {
    btnNotifications.addEventListener('click', requestNotificationPermission);
    checkNotificationPermission();
}

// Start
init();
