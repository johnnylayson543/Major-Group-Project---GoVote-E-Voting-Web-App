

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

  
// Constants defining the LCH space traversal
const maxChroma = 60;
const minChroma = 30;  // Example minimum chroma value
const maxLightness = 80; 
const minLightness = 70;  // Example minimum lightness value
const hueIncrement = 1;

const chromaRange = maxChroma - minChroma + 1;  // +1 to include maxChroma in the range
const lightnessRange = maxLightness - minLightness;  // Assuming minLightness is 1% to maxLightness - 1%

const totalHueSteps = 360 / hueIncrement;
const totalIndices = chromaRange * lightnessRange * totalHueSteps;

// Function to normalize hash to index using MongoDB ObjectId counter
function hashToIndex(objectId) {
  const counterHex = objectId.slice(0, 24); // 18, 24
  const counter = BigInt(`0x${counterHex}`);
  const maxCounterValue = BigInt(0xFF); // Max value for 3-byte counter // 0xFFFFFF
  const index = Number((counter * BigInt(totalIndices) / maxCounterValue) % BigInt(totalIndices));
  return index;
}

// Function to convert index to LCH color
function indexToLCH(index) {
  const hueCycleCount = Math.floor(index / (chromaRange * lightnessRange));
  const positionInCurrentCycle = index % (chromaRange * lightnessRange);
  const currentLightness = minLightness + Math.floor(positionInCurrentCycle / chromaRange);
  const currentChroma = minChroma + positionInCurrentCycle % chromaRange;
  const currentHue = (hueCycleCount * hueIncrement) % 360;
  return `lch(${currentLightness}% ${currentChroma} ${currentHue}deg)`;
}

// Main function to convert ObjectId to LCH color
export function objectIdToLCH(objectId) {
  const index = hashToIndex(objectId);
  return indexToLCH(index);
}