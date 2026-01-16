// Security Protection Script
let securityEnabled = true;

// Function to disable security
function disableSecurity() {
  securityEnabled = false;
  clearInterval(consoleClearInterval);
  document.body.style.filter = 'none';
  document.body.style.userSelect = 'auto';
  console.clear();
  console.log('✅ Security protections disabled - Console is now working!');
  alert('Security protections have been disabled');
}

// Function to enable security
function enableSecurity() {
  securityEnabled = true;
  console.clear();
  console.log('Security protections enabled');
  alert('Security protections have been enabled');
  location.reload();
}

// Disable right-click
document.addEventListener('contextmenu', function(e) {
  if (securityEnabled) {
    e.preventDefault();
    return false;
  }
});

// Disable keyboard shortcuts
document.addEventListener('keydown', function(e) {
  if (securityEnabled) {
    // F12
    if (e.key === 'F12') {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+I (Inspect)
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
      e.preventDefault();
      return false;
    }
    // Ctrl+U (View Source)
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
      e.preventDefault();
      return false;
    }
    // Ctrl+S (Save)
    if (e.ctrlKey && (e.key === 'S' || e.key === 's')) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+C (Inspect Element)
    if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
      e.preventDefault();
      return false;
    }
  }
});

// Disable text selection and copy
document.addEventListener('selectstart', (e) => securityEnabled && e.preventDefault());
document.addEventListener('copy', (e) => securityEnabled && e.preventDefault());

// Console warning
console.log('%cFUCK YOU 🖕', 'color: red; font-size: 50px; font-weight: bold;');
console.log('%cidhar se kuch nhi ukhar payega', 'font-size: 20px; color: white;');
console.log('%cdum hai toh kuch karke dikha', 'font-size: 16px; color: white;');

// Clear console periodically
let consoleClearInterval = setInterval(() => {
  if (securityEnabled) {
    console.clear();
    console.log('%cFUCK YOU 🖕', 'color: red; font-size: 50px; font-weight: bold;');
    console.log('%cidhar se kuch nhi ukhar payega', 'font-size: 20px; color: white;');
    console.log('%cdum hai toh kuch karke dikha', 'font-size: 16px; color: white;');
  }
}, 2000);

// Detect DevTools
(function() {
  const threshold = 160;
  let isDevToolsOpen = false;
  
  setInterval(() => {
    if (securityEnabled) {
      const widthDiff = window.outerWidth - window.innerWidth > threshold;
      const heightDiff = window.outerHeight - window.innerHeight > threshold;
      
      if (widthDiff || heightDiff) {
        if (!isDevToolsOpen) {
          isDevToolsOpen = true;
          // Completely replace page content
          document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#ef4444;font-size:48px;font-weight:bold;text-align:center;flex-direction:column;font-family:system-ui;"><div>🖕 FUCK YOU 🖕</div><div style="font-size:24px;margin-top:20px;color:#fff;">F12 se nhi khula isliye......</div><div style="font-size:18px;margin-top:10px;color:#fff;">band kar sale koi fayda nhi hai 🤣</div></div>';
        }
        // Keep replacing content
        document.body.style.filter = 'none';
        document.body.style.userSelect = 'none';
        document.body.style.pointerEvents = 'none';
      } else {
        if (isDevToolsOpen) {
          isDevToolsOpen = false;
          // Reload page when DevTools closes
          location.reload();
        }
      }
    }
  }, 500);
})();

// Additional protection - hide all network requests
(function() {
  if (securityEnabled) {
    // Override fetch
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      console.clear();
      return originalFetch.apply(this, args);
    };
    
    // Override XMLHttpRequest
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(...args) {
      console.clear();
      return originalOpen.apply(this, args);
    };
  }
})();

// Disable screenshots
document.addEventListener('keyup', (e) => {
  if (securityEnabled && e.key === 'PrintScreen') {
    navigator.clipboard.writeText('');
    alert('Screenshots are disabled!');
  }
});
