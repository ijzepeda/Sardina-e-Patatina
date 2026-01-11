// Visual Effects Module

/**
 * Creates a confetti burst effect
 */
export function triggerConfetti() {
    const colors = ['#e8a87c', '#d4956b', '#7eb8a2', '#f5d5c3', '#c9a87c'];
    const confettiCount = 50;
    const container = document.body;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';

        // Random shapes
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        }

        container.appendChild(confetti);

        // Remove after animation
        setTimeout(() => confetti.remove(), 4000);
    }
}

/**
 * Creates a gentle falling leaves/petals effect for "Not Today"
 */
export function triggerLeaves() {
    const leafEmojis = ['🍃', '🌿', '🍂', '✨'];
    const leafCount = 15;
    const container = document.body;

    for (let i = 0; i < leafCount; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'floating-leaf';
        leaf.textContent = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
        leaf.style.left = Math.random() * 100 + 'vw';
        leaf.style.animationDelay = Math.random() * 2 + 's';
        leaf.style.animationDuration = (Math.random() * 3 + 4) + 's';

        container.appendChild(leaf);

        // Remove after animation
        setTimeout(() => leaf.remove(), 7000);
    }
}
