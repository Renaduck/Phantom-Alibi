/**
 * Types dialogue text with a typewriter effect
 * 
 * @param content - Text content to be typed
 * @param element - HTML element to type into
 * @param typingSpeed - Speed of typing
 * @param onComplete - Optional callback when typing is complete
 * @returns Interval ID for the typing effect
 */
export function typeText(
  content: string,
  element: HTMLElement,
  typingSpeed: number,
  onComplete?: () => void
): number {
  // Clear existing text before starting
  element.innerHTML = "";
  
  // Adjust speed based on user settings
  const speed = typingSpeed / 50 * 15;
  
  // Start typing effect
  let index = 0;
  const interval = window.setInterval(() => {
    if (index < content.length) {
      element.innerHTML += content.charAt(index);
      index++;
    } else {
      window.clearInterval(interval);
      if (onComplete) {
        onComplete();
      }
    }
  }, speed);
  
  return interval;
}

/**
 * Immediately completes any ongoing typing animation
 * 
 * @param interval - The interval ID to clear
 * @param content - The full content to display
 * @param element - The element to update
 * @param onComplete - Optional callback to run after completion
 */
export function completeTypingAnimation(
  interval: number | null,
  content?: string,
  element?: HTMLElement | null,
  onComplete?: () => void
): void {
  if (interval !== null) {
    window.clearInterval(interval);
    
    // Set the content immediately to its final state
    if (content && element) {
      element.innerHTML = content;
    }
    
    if (onComplete) {
      onComplete();
    }
  }
} 