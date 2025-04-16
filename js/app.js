console.log("Professional Daily Dashboard initialized");

import { WeatherWidget } from './components/weatherWidget.js';
import { NewsWidget } from './components/newsWidget.js';
import { QuoteWidget } from './components/quoteWidget.js';
import { CalendarWidget } from './components/calendarWidget.js';
import { TimerWidget } from './components/timerWidget.js';
import { NoteWidget } from './components/noteWidget.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded, initializing widgets...");
  
  // App state tracking
  const state = {
    activeSection: 'home',
    initialized: {},
    widgets: {}
  };
  
  // Get user preferences from localStorage
  const userPreferences = {
    theme: localStorage.getItem('theme') || 'light',
    lastVisit: localStorage.getItem('lastVisit'),
    usageCount: parseInt(localStorage.getItem('usageCount') || '0') + 1
  };
  
  // Record this visit
  localStorage.setItem('lastVisit', new Date().toISOString());
  localStorage.setItem('usageCount', userPreferences.usageCount.toString());
  
  // Apply theme
  document.body.classList.add(userPreferences.theme);
  
  // Welcome message based on usage
  if (userPreferences.usageCount <= 1) {
    showWelcomeMessage('Welcome to your Professional Daily Dashboard!');
  } else {
    const lastVisit = userPreferences.lastVisit ? new Date(userPreferences.lastVisit) : null;
    if (lastVisit && isNewDay(lastVisit)) {
      showWelcomeMessage('Welcome back to a new day!');
    }
  }

  const initializeWidget = (WidgetClass, name) => {
    try {
      console.log(`Initializing ${name}...`);
      const widget = new WidgetClass();
      widget.init();
      state.widgets[name] = widget;
      state.initialized[name] = true;
      console.log(`${name} initialized successfully.`);
    } catch (error) {
      console.error(`Error initializing ${name}:`, error);
      state.initialized[name] = false;
    }
  };

  // Initialize widgets
  initializeWidget(WeatherWidget, 'WeatherWidget');
  initializeWidget(NewsWidget, 'NewsWidget');
  initializeWidget(QuoteWidget, 'QuoteWidget');
  initializeWidget(CalendarWidget, 'CalendarWidget');
  initializeWidget(TimerWidget, 'TimerWidget');
  initializeWidget(NoteWidget, 'NoteWidget');

  // Profile button event
  setupProfileButton(userPreferences);
  
  // Nav button events
  setupNavigation(state);
  
  // Setup section visibility transitions
  setupSectionTransitions();
  
  // Register service worker for offline functionality
  registerServiceWorker();
  
  // Analytics tracking
  trackPageMetrics();
});

function isNewDay(lastVisit) {
  const today = new Date();
  return lastVisit.getDate() !== today.getDate() || 
         lastVisit.getMonth() !== today.getMonth() || 
         lastVisit.getFullYear() !== today.getFullYear();
}

function showWelcomeMessage(message) {
  // Create a welcome toast notification
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = `
    <p>${message}</p>
    <button class="toast-close">×</button>
  `;
  
  document.body.appendChild(toast);
  
  // Animate the toast in
  setTimeout(() => {
    toast.classList.add('visible');
  }, 100);
  
  // Dismiss toast when close button is clicked
  toast.querySelector('.toast-close').addEventListener('click', () => {
    toast.classList.remove('visible');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  });
  
  // Auto dismiss after 5 seconds
  setTimeout(() => {
    if (document.body.contains(toast)) {
      toast.classList.remove('visible');
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }
  }, 5000);
}

function setupProfileButton(userPreferences) {
  const profileBtn = document.getElementById('profileBtn');
  if (profileBtn) {
    profileBtn.addEventListener('click', () => {
      const dialog = document.createElement('dialog');
      dialog.classList.add('profile-dialog');
      
      const userName = localStorage.getItem('userName') || '';
      
      dialog.innerHTML = `
        <div class="dialog-header">
          <h2>User Settings</h2>
          <button id="closeDialog">×</button>
        </div>
        
        <div class="setting-group">
          <h3>Profile</h3>
          <div class="form-group">
            <label for="userName">Your Name</label>
            <input type="text" id="userName" value="${userName}" placeholder="Enter your name">
          </div>
        </div>
        
        <div class="setting-group">
          <h3>Theme</h3>
          <div class="theme-options">
            <label class="theme-option ${userPreferences.theme === 'light' ? 'selected' : ''}">
              <input type="radio" name="theme" value="light" ${userPreferences.theme === 'light' ? 'checked' : ''}>
              <div class="theme-preview light-preview">
                <div class="preview-header"></div>
                <div class="preview-content"></div>
              </div>
              Light Mode
            </label>
            <label class="theme-option ${userPreferences.theme === 'dark' ? 'selected' : ''}">
              <input type="radio" name="theme" value="dark" ${userPreferences.theme === 'dark' ? 'checked' : ''}>
              <div class="theme-preview dark-preview">
                <div class="preview-header"></div>
                <div class="preview-content"></div>
              </div>
              Dark Mode
            </label>
          </div>
        </div>
        
        <div class="dialog-buttons">
          <button id="saveSettings" class="button">Save Settings</button>
        </div>
      `;
      
      document.body.appendChild(dialog);
      dialog.showModal();
      
      // Theme selection highlights
      const themeOptions = dialog.querySelectorAll('.theme-option');
      themeOptions.forEach(option => {
        const radio = option.querySelector('input[type="radio"]');
        radio.addEventListener('change', () => {
          themeOptions.forEach(opt => opt.classList.remove('selected'));
          if (radio.checked) {
            option.classList.add('selected');
          }
        });
      });
      
      // Close button event
      dialog.querySelector('#closeDialog').addEventListener('click', () => {
        dialog.close();
        document.body.removeChild(dialog);
      });
      
      // Handle click outside to close
      dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
          dialog.close();
          document.body.removeChild(dialog);
        }
      });
      
      // Save settings
      dialog.querySelector('#saveSettings').addEventListener('click', () => {
        const selectedTheme = dialog.querySelector('input[name="theme"]:checked').value;
        const newUserName = dialog.querySelector('#userName').value.trim();
        
        // Save theme preference
        if (selectedTheme !== userPreferences.theme) {
          document.body.classList.remove('light', 'dark');
          document.body.classList.add(selectedTheme);
          localStorage.setItem('theme', selectedTheme);
          userPreferences.theme = selectedTheme;
        }
        
        // Save user name
        if (newUserName !== userName) {
          localStorage.setItem('userName', newUserName);
        }
        
        dialog.close();
        document.body.removeChild(dialog);
        
        // Show confirmation
        showWelcomeMessage('Settings saved successfully!');
      });
    });
  } else {
    console.error("Profile button not found.");
  }
}

function setupNavigation(state) {
  const navButtons = document.querySelectorAll('.navBtn');
  const sections = document.querySelectorAll('main > section');
  
  // Function to show/hide sections based on active section
  const updateSectionVisibility = (activeSection) => {
    if (activeSection === 'home') {
      // Show all sections in home view
      sections.forEach(section => {
        section.classList.remove('hidden');
      });
    } else {
      // Show only relevant section(s) for other views
      sections.forEach(section => {
        const sectionId = section.id;
        
        if (
          (activeSection === 'weather' && sectionId === 'weatherForecast') ||
          (activeSection === 'news' && sectionId === 'businessNews') ||
          (activeSection === 'calendar' && sectionId === 'todaysSchedule') ||
          (activeSection === 'settings')
        ) {
          section.classList.remove('hidden');
          section.classList.add('full-view');
        } else {
          section.classList.add('hidden');
          section.classList.remove('full-view');
        }
      });
    }
    
    // Record the active section change
    state.activeSection = activeSection;
    localStorage.setItem('lastActiveSection', activeSection);
  };
  
  if (navButtons.length > 0) {
    navButtons.forEach(button => {
      button.addEventListener('click', () => {
        const section = button.dataset.section;
        
        // Update active button state
        navButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update section visibility
        updateSectionVisibility(section);
      });
    });
    
    // Set initial section based on localStorage if available
    const lastSection = localStorage.getItem('lastActiveSection');
    if (lastSection) {
      const targetButton = Array.from(navButtons).find(btn => btn.dataset.section === lastSection);
      if (targetButton) {
        targetButton.click();
      }
    }
  } else {
    console.error("Nav buttons not found.");
  }
}

function setupSectionTransitions() {
  // Add CSS classes for transitions when sections change visibility
  const style = document.createElement('style');
  style.textContent = `
    main > section {
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    main > section.hidden {
      opacity: 0;
      height: 0;
      overflow: hidden;
      margin: 0;
      padding: 0;
    }
    main > section.full-view {
      grid-column: 1 / -1 !important;
      max-height: none;
    }
  `;
  document.head.appendChild(style);
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/serviceWorker.js')
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
}

function trackPageMetrics() {
  // Record page load time
  const loadTime = performance.now();
  console.log(`Page loaded in ${Math.round(loadTime)}ms`);
  localStorage.setItem('lastLoadTime', loadTime.toString());
  
  // Track page views
  const pageViews = parseInt(localStorage.getItem('pageViews') || '0') + 1;
  localStorage.setItem('pageViews', pageViews.toString());
  
  // Update last visit timestamp
  localStorage.setItem('lastVisitTimestamp', Date.now().toString());
}