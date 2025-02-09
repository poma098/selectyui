/**
 * Checks if the EyeDropper API is supported in the browser.
 * Note that even if it's supported, we still need to check if the user has
 * granted permissions for the page to access the screen.
 * @returns {boolean} true if the EyeDropper API is supported, false otherwise.
 */
export const isEyeDropperSupported = (): boolean => {
  return typeof window !== "undefined" && "EyeDropper" in window;
};
