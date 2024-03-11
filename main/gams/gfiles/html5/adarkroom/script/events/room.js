/**
 * EventsRoom is an array of objects, each representing an event that can occur when the Room module is active.
 * Each event has properties like title, isAvailable (a function that returns a boolean indicating if the event is available),
 * scenes (an object containing scenes that can be played during the event), audio (the audio to play when the event is loaded),
 * and onLoad (a function to be called when the event is loaded).
 **/

/**
 * createScene is a function that creates a scene object with the following properties:
 * title (the title of the scene),
 * text (an array of strings that contain the text to be displayed during the scene),
 * notification (whether the notification should blink or not),
 * blink (a boolean indicating if the notification should blink),
 * and buttons (an array of button objects that can be clicked during the scene).
 **/

/**
 * createButton is a function that creates a button object with the following properties:
 * text (the text to be displayed on the button),
 * nextScene (the scene to be played when the button is clicked),
 * cost (the cost to play the scene, if any),
 * available (a boolean indicating if the scene is available),
 * reward (the reward given when the scene is played, if any),
 * and notification (the text to be displayed when the reward is given).
 **/

/**
 * playAudio is a function that plays the given audio.
 **/

/**
 * getRandomInt is a function that returns a random integer between 0 and the given maximum.
 **/

/**
 * addReward is a function that adds the given reward to the store object.
 **/

/**
 * removeResource is a function that removes the given quantity of the given resource from the store object.
 * If the resource is not available in sufficient quantity, the function returns false, otherwise it removes the resource and returns true.
 **/

/**
 * notify is a function that displays the given text as a notification.
 **/
