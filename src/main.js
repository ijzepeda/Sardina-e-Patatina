import './style.css';
import { initAuth, login, logout, getUser } from './auth.js';
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
const btnDone = document.getElementById('btn-done');
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
const btnSkip = document.getElementById('btn-skip');
const uploadActivityText = document.getElementById('upload-activity-text');

// Calendar
const calendarGrid = document.getElementById('calendar-grid');

// State
let currentActivity = null;
let pendingImageData = null;

// Initialize
async function init() {
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
                renderActivity(pending);
                switchView('activity');
            }

            // Load calendar
            await loadCalendar(user);
        } else {
            authBtn.textContent = "Sign In";
            userDisplay.classList.add('hidden');
            calendarGrid.innerHTML = '<p class="calendar-empty">Sign in to see your history.</p>';

            // Check for guest pending task
            const pending = await getPendingTask(null);
            if (pending) {
                currentActivity = pending;
                renderActivity(pending);
                switchView('activity');
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
    await showActivity();
});

btnReroll.addEventListener('click', async () => {
    await showActivity();
});

btnDone.addEventListener('click', () => {
    // Show upload view with activity reminder
    if (uploadActivityText && currentActivity) {
        uploadActivityText.textContent = currentActivity.instruction;
    }
    switchView('upload');
});

btnNotToday.addEventListener('click', async () => {
    await completeActivity("NOT_TODAY", null, null);
});

// File input change
uploadFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        fileName.textContent = file.name;
        // Convert to base64
        const reader = new FileReader();
        reader.onload = (event) => {
            pendingImageData = event.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        fileName.textContent = "No file selected";
        pendingImageData = null;
    }
});

btnSave.addEventListener('click', async () => {
    const note = uploadText.value.trim() || null;
    await completeActivity("DONE", note, pendingImageData);
});

btnSkip.addEventListener('click', async () => {
    await completeActivity("DONE", null, null);
});

// Logic
async function showActivity() {
    currentActivity = getRandomActivity();
    renderActivity(currentActivity);
    switchView('activity');

    // Save as pending task
    const user = getUser();
    await savePendingTask(user, currentActivity);
}

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

        // Show feedback
        if (status === "DONE") {
            showFeedback("Saved. You did it.", "success");
        } else {
            showFeedback("That's okay. Maybe tomorrow.", "neutral");
        }

        // Reset state
        resetUploadForm();
        resetView();

        // Reload calendar if logged in
        if (user) {
            await loadCalendar(user);
        }
    } catch (error) {
        showFeedback("Something went wrong. Try again?", "neutral");
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

async function loadCalendar(user) {
    const logs = await getUserLogs(user);

    if (logs.length === 0) {
        calendarGrid.innerHTML = '<p class="calendar-empty">No activities yet. Roll the dice!</p>';
        return;
    }

    calendarGrid.innerHTML = logs.map((log, index) => {
        const date = log.timestamp?.toDate?.()
            ? log.timestamp.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            : 'Just now';

        const statusClass = log.status === 'DONE' ? 'done' : 'nottoday';
        const statusLabel = log.status === 'DONE' ? '✓ Done' : '🌧️ Skipped';

        // Check if there's any detail content
        const hasDetails = log.note || log.imageData || log.activityInstruction;
        const detailsId = `details-${index}`;

        return `
            <div class="calendar-entry ${hasDetails ? 'clickable' : ''}" ${hasDetails ? `onclick="toggleDetails('${detailsId}')"` : ''}>
                <div>
                    <span class="entry-date">${date}</span>
                    <span class="entry-type">${log.activityType}</span>
                </div>
                <span class="entry-status ${statusClass}">${statusLabel}</span>
            </div>
            ${hasDetails ? `
            <div id="${detailsId}" class="entry-details hidden">
                <p class="detail-instruction">${log.activityInstruction || ''}</p>
                ${log.note ? `<p class="detail-note">"${log.note}"</p>` : ''}
                ${log.imageData ? `<img src="${log.imageData}" class="detail-image" alt="Uploaded image" />` : ''}
            </div>
            ` : ''}
        `;
    }).join('');
}

// Global function for toggling details (needs to be on window for inline onclick)
window.toggleDetails = function (id) {
    const el = document.getElementById(id);
    if (el) {
        el.classList.toggle('hidden');
    }
};

// Start
init();
