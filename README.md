# Focus Mode
This is a Chrome Extension that allows users to block certain URLs when the focus mode is on. 

## Core functionalities
* Users can turn the focus mode on/off
* When the focus mode is on, users cannot visit certain URLs that the users themselves defined.
* When focus mode is off, the logo of this extension will be greyed out (to indicate that it is OFF)

## Implementation details
* use a big power button that user can press to turn the focus mode is on or off.
    * This will be a big circle button with a power logo   
* a section below the power button, we will have that space for adding URLs to block during focus mode. 
    * when users add any URL to that list, we will grey it out or block it 
    * for the first version, we can just prevent the user from reaching that site 
    * 'This site can't be reached' default page should work for now

## Extra Features