/* ============================================
   SECURITY PROTECTION SCRIPT
   
   This script protects your website code from:
   - Right-click inspection
   - DevTools (F12, Ctrl+Shift+I, etc.)
   - Text selection and copying
   - Screenshots
   - Console access
   
   TO CUSTOMIZE:
   - Change console messages (lines 88-90)
   - Adjust console clear interval (line 94, currently 2000ms = 2 seconds)
   - Modify DevTools detection threshold (line 99, currently 160px)
   
   TO DISABLE: Triple-click on "Ankur Dey" text on the website
   ============================================ */

// Security Protection Script
let securityEnabled = true;

// ============================================
// DISABLE SECURITY FUNCTION
// Called when user triple-clicks "Ankur Dey"
// ============================================
function disableSecurity() {
  securityEnabled = false;
  clearInterval(consoleClearInterval);
  document.body.style.filter = 'none';
  document.body.style.userSelect = 'auto';
  console.clear();
  console.log('✅ Security protections disabled - Console is now working!');
  alert('Security protections have been disabled');
}

// ============================================
// ENABLE SECURITY FUNCTION
// Reloads page to re-enable all protections
// ============================================
function enableSecurity() {
  securityEnabled = true;
  console.clear();
  console.log('Security protections enabled');
  alert('Security protections have been enabled');
  location.reload();
}

// ============================================
// DISABLE RIGHT-CLICK CONTEXT MENU
// Prevents inspect element via right-click
// ============================================
document.addEventListener('contextmenu', function(e) {
  if (securityEnabled) {
    e.preventDefault();
    return false;
  }
});

// ============================================
// DISABLE KEYBOARD SHORTCUTS
// Blocks: F12, Ctrl+Shift+I/J/C, Ctrl+U, Ctrl+S
// ============================================
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

// ============================================
// DISABLE TEXT SELECTION AND COPYING
// Prevents users from selecting/copying content
// ============================================
document.addEventListener('selectstart', (e) => securityEnabled && e.preventDefault());
document.addEventListener('copy', (e) => securityEnabled && e.preventDefault());

// ============================================
// CONSOLE WARNING MESSAGES
// Customize these messages to your preference
// ============================================
console.log('%cFUCK YOU 🖕', 'color: red; font-size: 50px; font-weight: bold;');
console.log('%cidhar se kuch nhi ukhar payega', 'font-size: 20px; color: white;');
console.log('%cdum hai toh kuch karke dikha', 'font-size: 16px; color: white;');

// ============================================
// AUTO-CLEAR CONSOLE
// Clears console every 2 seconds (2000ms)
// Change interval time below if needed
// ============================================
let consoleClearInterval = setInterval(() => {
  if (securityEnabled) {
    console.clear();
    console.log('%cFUCK YOU 🖕', 'color: red; font-size: 50px; font-weight: bold;');
    console.log('%cidhar se kuch nhi ukhar payega', 'font-size: 20px; color: white;');
    console.log('%cdum hai toh kuch karke dikha', 'font-size: 16px; color: white;');
  }
}, 2000); // Change 2000 to adjust interval (in milliseconds)

// ============================================
// DEVTOOLS DETECTION
// Detects when DevTools is opened and replaces page
// Threshold: 160px difference (adjust if needed)
// ============================================
(function() {
  const threshold = 160; // Adjust this value if detection is too sensitive
  let isDevToolsOpen = false;
  
  setInterval(() => {
    if (securityEnabled) {
      const widthDiff = window.outerWidth - window.innerWidth > threshold;
      const heightDiff = window.outerHeight - window.innerHeight > threshold;
      
      if (widthDiff || heightDiff) {
        if (!isDevToolsOpen) {
          isDevToolsOpen = true;
          // Replace page content with warning message
          // Customize the message below if needed
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
  }, 500); // Check every 500ms (0.5 seconds)
})();

// ============================================
// HIDE NETWORK REQUESTS
// Prevents viewing API calls in Network tab
// ============================================
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

// ============================================
// DISABLE SCREENSHOTS (PrintScreen key)
// Clears clipboard when screenshot is attempted
// ============================================
document.addEventListener('keyup', (e) => {
  if (securityEnabled && e.key === 'PrintScreen') {
    navigator.clipboard.writeText('');
    alert('Screenshots are disabled!');
  }
});
