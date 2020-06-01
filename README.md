# Autopilot && Flight assistant for SpaceX ISS Docking simulator https://iss-sim.spacex.com/

This extension allows you to dock to the ISS in semi-automated or
fully-automated mode.

## Usage:

1. Install this Chrome extension
2. Go to https://iss-sim.spacex.com/
3. Click play button
4. Use hotkeys to enable or disable assistants


Hotkeys:

Toggle all assistants:   "f"
Toggle Roll Assistant:   "r"
Toggle Yaw Assistant:    "Shift+Y"
Toggle Pitch Assistant:  "p"
Toggle X-axis Assistant: "x"
Toggle Y-axis Assistant: "y"
Toggle Z-axis Assistant: "z"

Hotkeys can be shown by clicking on extension icon.

5. ...

6. Profit!


## Adding extension to Chrome
The extension is not published yet at chrome webstore,
so the only possible way to install it is manual.

1. Clone this repository, or download zip with source code and unzip it
2. In Chrome paste chrome://extensions/ into address bar and hit Enter
3. In top right switch Developer mode on
4. in top left click "Load unpacked"
5. Navigate to downloaded and unpacked source directory with manifest.json inside.
6. Click Open.
7. If you see a UFO icon in extension bar (top right) that means extension is
   loaded successfully.


P.S. Once it is published in Webstore, installation will be much simpler.

## In addition
I used simple PID Controller algorithm to implement this autopilot.

If you wish to play around with coefficients - you may paste content of 
autopilot.js into browser's console. 
