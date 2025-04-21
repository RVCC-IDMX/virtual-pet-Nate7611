/**
 * app.js
 *
 * Main application file that handles UI interactions and updates.
 * Import your Pet constructor and related constants from pet.js
 */

// TODO: Import the Pet constructor and related constants
import { Pet, PetTypes, States } from './pet.js';

const petSelector = document.getElementById('pet-selector');
const petNameInput = document.getElementById('pet-name');
const createPetButton = document.getElementById('create-pet');
const feedPetButton = document.getElementById('feed-pet');
const resetPetButton = document.getElementById('reset-pet');
const petDisplay = document.getElementById('pet-display');
const statusDisplay = document.getElementById('status-display');

// Application state variables
let currentPet = null;
let updateInterval = null;

/**
 * Initialize the application
 *
 * TODO: Implement this function to:
 * - Select and store DOM elements
 * - Populate the pet selector dropdown
 * - Set up event listeners
 * - Show the pet creation UI
 */
function initApp() {
  populatePetSelector();

  setupEventListeners(petSelector, petNameInput, createPetButton, feedPetButton, resetPetButton, petDisplay, statusDisplay);

  showCreationUI();
}

/**
 * Populate the pet selector dropdown
 *
 * TODO: Implement this function to:
 * - Add an option for each pet type
 * - Set a default selected type
 */
function populatePetSelector() {
  const petSelector = document.getElementById('pet-selector');

  Object.values(PetTypes).forEach(petType => {
    const option = document.createElement('option');
    option.value = petType;
    option.textContent = petType.charAt(0).toUpperCase() + petType.slice(1);
    petSelector.appendChild(option);
  });

  petSelector.value = PetTypes.CAT;
}

/**
 * Set up event listeners for buttons and interactions
 *
 * TODO: Implement this function to:
 * - Add event listeners for the create, feed, and reset buttons
 */
function setupEventListeners() {
  createPetButton.addEventListener('click', () => createNewPet());
  feedPetButton.addEventListener('click', feedPet);
  resetPetButton.addEventListener('click', resetPet);
}

/**
 * Create a new pet based on form selections
 *
 * TODO: Implement this function to:
 * - Get the selected pet type and name
 * - Create a new Pet instance
 * - Update the UI to show the pet
 * - Start the update cycle
 */
function createNewPet() {
  const petType = petSelector.value;
  const petName = petNameInput.value.trim() || 'Pet';

  currentPet = new Pet(petType, petName);

  hideCreationUI();
  updatePetDisplay();
  startUpdateCycle();
}

/**
 * Hide the pet creation UI and show the pet interaction UI
 */
function hideCreationUI() {
  document.getElementById('pet-creation').classList.add('hidden');
  document.getElementById('pet-interaction').classList.remove('hidden');
}

/**
 * Show the pet creation UI and hide the pet interaction UI
 */
function showCreationUI() {
  document.getElementById('pet-creation').classList.remove('hidden');
  document.getElementById('pet-interaction').classList.add('hidden');
}

/**
 * Update the pet display and status elements
 *
 * TODO: Implement this function to:
 * - Update the pet's visual representation
 * - Update the status message
 * - Update the mood indicator
 * - Update the information display
 */
function updatePetDisplay() {
  if (currentPet) {
    petDisplay.textContent = currentPet.appearance;
    statusDisplay.textContent = currentPet.getStatusMessage();
    updateMoodBar();
    updateInfoDisplay();
  }
}

/**
 * Update the mood level display bar
 *
 * TODO: Implement this function to:
 * - Set the width of the mood bar based on the pet's mood level
 * - Change the color based on the mood level
 */
function updateMoodBar() {
  const moodBar = document.getElementById('mood-bar');
  const moodLevel = currentPet.moodLevel;

  moodBar.style.width = `${moodLevel}%`;
  moodBar.style.height = '40px';
  moodBar.style.borderRadius = '5px';

  if (moodLevel >= 75) {
    moodBar.style.backgroundColor = 'green';
  } else if (moodLevel >= 45) {
    moodBar.style.backgroundColor = 'yellow';
  } else {
    moodBar.style.backgroundColor = 'red';
  }
}

/**
 * Update the information display panel
 *
 * TODO: Implement this function to:
 * - Show the pet's name, type, state, etc.
 * - Display the mood level bar
 * - Show timestamps for creation and last feeding
 */
function updateInfoDisplay() {
  const infoDisplay = document.getElementById('info-display');
  infoDisplay.innerHTML = `
    <p><strong>Name:</strong> ${currentPet.name}</p>
    <p><strong>Type:</strong> ${currentPet.type}</p>
    <p><strong>State:</strong> ${currentPet.state}</p>
    <p><strong>Mood Level:</strong> ${currentPet.moodLevel}</p>
    <p><strong>Created:</strong> ${currentPet.created.toLocaleString()}</p>
    <p><strong>Last Fed:</strong> ${currentPet.lastFed.toLocaleString()}</p>
  `;
}

/**
 * Feed the current pet
 *
 * TODO: Implement this function to:
 * - Call the pet's feed method
 * - Update the display with the new state
 */
function feedPet() {
  if (currentPet) {
    const message = currentPet.feed();
    updatePetDisplay();
    alert(message);
  }
}

/**
 * Reset the pet simulator
 *
 * TODO: Implement this function to:
 * - Clear the update interval
 * - Reset the current pet
 * - Clear the displays
 * - Show the creation UI
 */
function resetPet() {
  clearInterval(updateInterval);
  currentPet = null;
  document.getElementById('pet-display').textContent = '';
  document.getElementById('status-display').textContent = 'Create a pet to get started!';
  showCreationUI();
}

/**
 * Start the regular update cycle
 *
 * TODO: Implement this function to:
 * - Clear any existing update interval
 * - Set up a new interval that:
 *   - Updates the pet's state
 *   - Updates the display
 */
function startUpdateCycle() {
  if (updateInterval) {
    clearInterval(updateInterval);
  }

  updateInterval = setInterval(() => {
    if (currentPet) {
      currentPet.updateState();
      updatePetDisplay();
    }
  }, 1000);
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
