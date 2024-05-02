

export function formatDateTime(dateString) {
    const date = new Date(dateString);
  
    // Get the day of the week
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = daysOfWeek[date.getDay()];
  
    // Get the month
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[date.getMonth()];
  
    // Get the day of the month
    const dayOfMonth = date.getDate();
    const dayOfMonthSuffix = (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) ? 'st' : (dayOfMonth === 2 || dayOfMonth === 22) ? 'nd' : (dayOfMonth === 3 || dayOfMonth === 23) ? 'rd' : 'th';
  
    // Get the year
    const year = date.getFullYear();
  
    // Get the hour, minute, and am/pm
    const hour = date.getHours();
    const minute = date.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
  
    // Assemble the formatted date and time
    const formattedDateTime = `${dayOfWeek}, ${month} ${dayOfMonth}${dayOfMonthSuffix}, ${year} at ${formattedHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
  
    return formattedDateTime;
  }

  
// Constants defining the OKLCH space traversal
const maxChroma = 0.2;  // Example maximum chroma value in OKLCH
const minChroma = 0.15;  // Example minimum chroma value
const maxLightness = 0.5;  // Close to white in OKLCH
const minLightness = 0.4;  // Close to black in OKLCH
const hueIncrement = 1;

const chromaRange = maxChroma - minChroma;
const lightnessRange = maxLightness - minLightness;

const totalHueSteps = 360 / hueIncrement;
const totalIndices = Math.floor(chromaRange * 100) * Math.floor(lightnessRange * 100) * totalHueSteps;

// Function to normalize hash to index using MongoDB ObjectId counter
function hashToIndex(objectId) {
  const counterHex = objectId.slice(0, 24);
  const counter = BigInt(`0x${counterHex}`);
  const maxCounterValue = BigInt(0xFFFFFFn); // Max value for 3-byte counter
  const index = Number((counter * BigInt(totalIndices) / maxCounterValue) % BigInt(totalIndices));
  return index;
}

// Function to convert index to OKLCH color
function indexToOKLCH(index) {
  const hueCycleCount = Math.floor(index / (Math.floor(chromaRange * 100) * Math.floor(lightnessRange * 100)));
  const positionInCurrentCycle = index % (Math.floor(chromaRange * 100) * Math.floor(lightnessRange * 100));
  const currentLightness = minLightness + (Math.floor(positionInCurrentCycle / Math.floor(chromaRange * 100)) / 100);
  const currentChroma = minChroma + ((positionInCurrentCycle % Math.floor(chromaRange * 100)) / 100);
  const currentHue = (hueCycleCount * hueIncrement) % 360;
  return `oklch(${currentLightness} ${currentChroma} ${currentHue}deg)`;
}

// Main function to convert ObjectId to OKLCH color
export function objectIdToOKLCH(objectId) {
  const index = hashToIndex(objectId);
  return indexToOKLCH(index);
}


// Given LCH color (L, C, H) and target contrast ratio
function calculateValidLRange(L, targetRatio) {
  // Convert L to relative luminance (Y)
  const Y = L > 8 ? ((L + 16) / 116) : (L / 903.3);

  // Calculate minimum and maximum relative luminance
  const Ymin = Y / targetRatio;
  const Ymax = Y * targetRatio;

  // Convert back to L values
  const Lmin = Math.max(0, Math.min(100, 116 * ((Ymin * 903.3) - 16)));
  const Lmax = Math.max(0, Math.min(100, 116 * ((Ymax * 903.3) - 16)));

  return { Lmin, Lmax };
}

// Example usage:
const inputLCH = { L: 70, C: 40, H: 120 }; // Your LCH color
const targetContrastRatio = 4.5; // Desired contrast ratio

const { Lmin, Lmax } = calculateValidLRange(inputLCH.L, targetContrastRatio);
console.log(`Valid L range: ${Lmin} to ${Lmax}`);



// utils/contrast-color.js
export function setContrastingTextColors() {
  document.querySelectorAll(':not(script):not(style):not(img)').forEach((element) => {
    const backgroundColor = window.getComputedStyle(element).backgroundColor;
    const contrastingTextColor = getContrastingOklchColor(backgroundColor);
    element.style.color = contrastingTextColor;
  });
}


import { parse, formatOkLch } from 'culori';

export function getContrastingOklchColor(oklchStr) {
  try {
    let color = parse(oklchStr);

    // Adjust hue by 180 degrees, ensuring it remains within 0-360 range
    color.h = ((color.h + 180) % 360 + 360) % 360;

    // Adjust lightness to the opposite side of 50%, with a minimum difference of 0.2
    color.l = Math.abs(color.l - 0.5) > 0.2 ? 1 - color.l : color.l + 0.2;

    // Adjust chroma, reducing it by 20% of the original value
    color.c = Math.max(0.1, color.c * 0.8);

    return null;//formatOkLch(color);
  } catch (error) {
    console.error(`Error parsing OKLCH string: ${error}`);
    return null; // or a fallback color
  }
}