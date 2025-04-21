/**
 * pet.js
 *
 * This file should contain your Pet constructor function and prototype methods.
 * Export your Pet constructor and any necessary constants to be used in app.js.
 */

// TODO: Create a PetTypes object with different pet type options
// Example: const PetTypes = { CAT: 'cat', DOG: 'dog', ... }
const PetTypes = {
  CAT: 'cat',
  DOG: 'dog',
  COW: 'cow',
  BUNNY: 'bunny'
};

// TODO: Create a States object with different mood states
// Example: const States = { HAPPY: 'happy', SAD: 'sad', ... }
const States = {
  ECSTATIC: 'ecstatic',
  HAPPY: 'happy',
  CONTENT: 'content',
  NEUTRAL: 'neutral',
  BORED: 'bored',
  SAD: 'sad',
  MISERABLE: 'miserable'
};

/**
 * Pet constructor function
 *
 * TODO: Implement this constructor function that creates a virtual pet
 * Parameters should include type and name
 * Initialize properties for tracking mood, state, and timestamps
 */
function Pet(type, name) {
  this.type = type || PetTypes.COW;
  this.name = name || 'Pet';

  this.moodLevel = 80;
  this.state = States.HAPPY;

  this.created = new Date();
  this.lastFed = new Date();

  this.isSpeaking = false;
  this.speechText = '';
  this.speechTimeout = null;

  this.updateAppearance();
}

/**
 * Feed the pet
 *
 * TODO: Implement this method to feed the pet, which should:
 * - Increase the pet's mood level
 * - Update the last fed timestamp
 * - Update the pet's state
 * - Return a message about the feeding
 */
Pet.prototype.feed = function () {
  this.moodLevel = Math.min(100, this.moodLevel + 20);

  this.lastFed = new Date();

  this.updateState();

  this.speak("Yum! That was delicious!");

  return `${this.name} has been fed and is ${this.state}!`;
};

/**
 * Check if the pet is hungry
 *
 * TODO: Implement this method to determine if the pet is hungry based on
 * how much time has passed since it was last fed
 */
Pet.prototype.isHungry = function () {
  const now = new Date();
  const timeSinceLastFed = now - this.lastFed;
  const hungerTime = 60 * 1000;
  return timeSinceLastFed > hungerTime;
};

/**
 * Update the pet's state based on mood level
 *
 * TODO: Implement this method to:
 * - Update the pet's mood based on time passed
 * - Set the appropriate state based on mood level
 * - Occasionally trigger random thoughts
 * - Update the pet's appearance
 */
Pet.prototype.updateState = function () {
  if (this.isHungry()) {
    this.moodLevel = Math.max(0, this.moodLevel - 2);
  }

  if (this.moodLevel >= 90) {
    this.state = States.ECSTATIC;
  } else if (this.moodLevel >= 75) {
    this.state = States.HAPPY;
  } else if (this.moodLevel >= 60) {
    this.state = States.CONTENT;
  } else if (this.moodLevel >= 45) {
    this.state = States.NEUTRAL;
  } else if (this.moodLevel >= 30) {
    this.state = States.BORED;
  } else if (this.moodLevel >= 15) {
    this.state = States.SAD;
  } else {
    this.state = States.MISERABLE;
  }

  if (Math.random() < 0.15 && !this.isSpeaking) {
    this.speakRandomThought();
  }

  this.updateAppearance();

  return this.state;
};


/**
 * Make the pet speak a random thought based on its mood
 *
 * TODO: Implement this method to have the pet express a random thought
 * appropriate to its current mood
 */
Pet.prototype.speakRandomThought = function () {
  const phrases = [
    "Life is good!",
    "I'm feeling kind of sleepy...",
    "I need a snack!",
    "I'm bored... entertain me!",
    "You're my favorite human.",
    "Let's go on an adventure!",
    "Why is the sky blue?",
  ];
  const randomIndex = Math.floor(Math.random() * phrases.length);
  const phrase = phrases[randomIndex];
  this.speak(phrase);
};

/**
 * Make the pet say something
 *
 * TODO: Implement this method to display a speech bubble with text
 * and clear it after a few seconds
 */
Pet.prototype.speak = function (text) {
  if (this.speechTimeout) {
    clearTimeout(this.speechTimeout);
  }

  this.isSpeaking = true;
  this.speechText = text;

  this.speechTimeout = setTimeout(() => {
    this.isSpeaking = false;
    this.speechText = '';
    this.updateAppearance();
  }, 4000);

  this.updateAppearance();
};


/**
 * Get a status message based on the pet's current state
 *
 * TODO: Implement this method to return an appropriate message
 * describing the pet's current mood state
 */
Pet.prototype.getStatusMessage = function () {
  switch (this.state) {
    case States.ECSTATIC:
      return `${this.name} is absolutely ecstatic!`;
    case States.HAPPY:
      return `${this.name} is very happy!`;
    case States.CONTENT:
      return `${this.name} is content.`;
    case States.NEUTRAL:
      return `${this.name} is doing okay.`;
    case States.BORED:
      return `${this.name} seems a bit bored.`;
    case States.SAD:
      return `${this.name} is feeling sad.`;
    case States.MISERABLE:
      return `${this.name} is miserable and very hungry!`;
    default:
      return `${this.name} is here.`;
  }
};

/**
 * Update the pet's appearance based on its type and state
 *
 * TODO: Implement this method to set the pet's appearance property
 * based on its current type and state
 * Include speech bubble if the pet is speaking
 */
Pet.prototype.updateAppearance = function () {
  // Dont know if I was supposed to make these, they look bad...
  const petArt = {
    [PetTypes.CAT]: {
      [States.ECSTATIC]: "=^w^=",
      [States.HAPPY]: "=^.^=",
      [States.CONTENT]: "=^_^=",
      [States.NEUTRAL]: "=^o^=",
      [States.BORED]: "=^u^=",
      [States.SAD]: "=^..^=",
      [States.MISERABLE]: "=^;^="
    },
    [PetTypes.DOG]: {
      [States.ECSTATIC]: "U^o^U",
      [States.HAPPY]: "U^.^U",
      [States.CONTENT]: "U^_^U",
      [States.NEUTRAL]: "Uo_oU",
      [States.BORED]: "U~o~U",
      [States.SAD]: "U;_;U",
      [States.MISERABLE]: "U...U"
    },
    [PetTypes.COW]: {
      [States.ECSTATIC]: "Moo! ^o^",
      [States.HAPPY]: "Moo~ ^.^",
      [States.CONTENT]: "Moo! :)",
      [States.NEUTRAL]: "Moo~",
      [States.BORED]: "Moo... :|",
      [States.SAD]: "Moo... :(",
      [States.MISERABLE]: "Moo... :(("
    },
    [PetTypes.BUNNY]: {
      [States.ECSTATIC]: "(o>^o^<o)",
      [States.HAPPY]: "(o^_^o)",
      [States.CONTENT]: "(o-_-o)",
      [States.NEUTRAL]: "(o_o)",
      [States.BORED]: "(o~o)",
      [States.SAD]: "(oT_To)",
      [States.MISERABLE]: "(o_ _o)"
    }
  };

  const typeArt = petArt[this.type] || petArt[PetTypes.COW];
  const art = typeArt[this.state] || typeArt[States.NEUTRAL];

  if (this.isSpeaking && this.speechText) {
    const bubbleWidth = Math.min(40, Math.max(this.speechText.length + 4, 10));
    const topBubble = ' ' + '_'.repeat(bubbleWidth);
    const bottomBubble = ' ' + '-'.repeat(bubbleWidth);
    const textLine = '| ' + this.speechText.padEnd(bubbleWidth - 2, ' ') + ' |';

    this.appearance = `${topBubble}\n${textLine}\n${bottomBubble}\n \\\n  ${art}`;
  } else {
    this.appearance = art;
  }
};

// TODO: Export the Pet constructor and any necessary constants
export { Pet, PetTypes, States };
