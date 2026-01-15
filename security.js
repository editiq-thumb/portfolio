// Security Protection Script
// This provides basic protection against code inspection

let securityEnabled = true;

// Function to disable security
function disableSecurity() {
  securityEnabled = false;
  console.log('Security protections disabled');
  alert('Security protections have been disabled');
}

// Function to enable security
function enableSecurity() {
  securityEnabled = true;
  console.log('Security protections enabled');
  alert('Security protections have been enabled');
}

// Disable right-click
document.addEventListener('contextmenu', function(e) {
  if (securityEnabled) {
    e.preventDefault();
    return false;
  }
});

// Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
document.addEventListener('keydown', function(e) {
  if (securityEnabled) {
    // F12
    if (e.keyCode === 123) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+I (Inspect)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
      e.preventDefault();
      return false;
    }
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode === 85) {
      e.preventDefault();
      return false;
    }
    // Ctrl+S (Save)
    if (e.ctrlKey && e.keyCode === 83) {
      e.preventDefault();
      return false;
    }
  }
});

// Disable text selection
document.addEventListener('selectstart', function(e) {
  if (securityEnabled) {
    e.preventDefault();
    return false;
  }
});

// Disable copy
document.addEventListener('copy', function(e) {
  if (securityEnabled) {
    e.preventDefault();
    return false;
  }
});

// Detect DevTools
(function() {
  const devtools = /./;
  devtools.toString = function() {
    if (securityEnabled) {
      this.opened = true;
    }
  };
  
  const checkDevTools = setInterval(function() {
    if (securityEnabled && devtools.opened) {
      alert('Developer tools detected! Please close them.');
      devtools.opened = false;
    }
  }, 1000);
})();

// Console warning
if (securityEnabled) {
  console.log('%cSTOP!', 'color: red; font-size: 50px; font-weight: bold;');
  console.log('%cThis is a browser feature intended for developers.', 'font-size: 20px;');
  console.log('%cIf someone told you to copy-paste something here, it is a scam.', 'font-size: 16px;');
}
