import { AFFIRMATIONS, ACTIVITIES } from './data.js';
import { db } from './firebase-config.js';
import {
    collection,
    addDoc,
    setDoc,
    getDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    limit,
    getDocs,
    serverTimestamp
} from "firebase/firestore";

// Daily Affirmation Logic
export function getDailyAffirmation() {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('affirmation_date');
    const storedIndex = localStorage.getItem('affirmation_index');

    if (storedDate === today && storedIndex) {
        return AFFIRMATIONS[parseInt(storedIndex)];
    }

    let newIndex;
    if (storedIndex) {
        newIndex = (parseInt(storedIndex) + 1) % AFFIRMATIONS.length;
    } else {
        newIndex = Math.floor(Math.random() * AFFIRMATIONS.length);
    }

    localStorage.setItem('affirmation_date', today);
    localStorage.setItem('affirmation_index', newIndex);

    return AFFIRMATIONS[newIndex];
}

export function getRandomActivity() {
    return ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)];
}

// ============================================
// PENDING TASK LOGIC
// ============================================

/**
 * Save a pending task for the user. Overwrites any existing pending task.
 */
export async function savePendingTask(user, activity) {
    if (!user) {
        // For guests, store in localStorage
        localStorage.setItem('pending_task', JSON.stringify(activity));
        return;
    }

    try {
        const docRef = doc(db, "pendingTasks", user.uid);
        await setDoc(docRef, {
            uid: user.uid,
            activity: activity,
            createdAt: serverTimestamp()
        });
        console.log("Pending task saved");
    } catch (e) {
        console.error("Error saving pending task:", e);
    }
}

/**
 * Get the user's pending task (if any).
 */
export async function getPendingTask(user) {
    if (!user) {
        const stored = localStorage.getItem('pending_task');
        return stored ? JSON.parse(stored) : null;
    }

    try {
        const docRef = doc(db, "pendingTasks", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data().activity;
        }
        return null;
    } catch (e) {
        console.error("Error getting pending task:", e);
        return null;
    }
}

/**
 * Delete the user's pending task after completion.
 */
export async function deletePendingTask(user) {
    if (!user) {
        localStorage.removeItem('pending_task');
        return;
    }

    try {
        const docRef = doc(db, "pendingTasks", user.uid);
        await deleteDoc(docRef);
        console.log("Pending task deleted");
    } catch (e) {
        console.error("Error deleting pending task:", e);
    }
}

// ============================================
// ACTIVITY LOG
// ============================================

/**
 * Log a completed activity to Firestore.
 * @param {Object} user - Firebase user object
 * @param {Object} activity - The activity that was done
 * @param {string} status - "DONE" or "NOT_TODAY"
 * @param {string|null} note - Optional text note
 * @param {string|null} imageData - Optional base64 image data
 */
export async function logActivity(user, activity, status, note = null, imageData = null) {
    if (!user) {
        console.log("Guest User: Activity not saved to cloud", { activity, status });
        return;
    }

    try {
        const docRef = await addDoc(collection(db, "userLogs"), {
            uid: user.uid,
            timestamp: serverTimestamp(),
            activityType: activity ? activity.type : "N/A",
            activityInstruction: activity ? activity.instruction : "N/A",
            status: status,
            note: note || null,
            imageData: imageData || null // Store base64 (small images only)
        });
        console.log("Activity logged with ID:", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document:", e);
        throw e;
    }
}

/**
 * Get user's activity logs for the calendar view.
 */
export async function getUserLogs(user, maxResults = 30) {
    if (!user) {
        return [];
    }

    try {
        // Simple query without orderBy to avoid needing a composite index
        const q = query(
            collection(db, "userLogs"),
            where("uid", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const logs = [];
        querySnapshot.forEach((docSnap) => {
            logs.push({ id: docSnap.id, ...docSnap.data() });
        });

        // Sort client-side by timestamp (desc)
        logs.sort((a, b) => {
            const timeA = a.timestamp?.toMillis?.() || 0;
            const timeB = b.timestamp?.toMillis?.() || 0;
            return timeB - timeA;
        });

        return logs.slice(0, maxResults);
    } catch (e) {
        console.error("Error fetching logs:", e);
        return [];
    }
}
