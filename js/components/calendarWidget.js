export class CalendarWidget {
    constructor() {
      this.container = document.getElementById('todaysSchedule');
      this.events = JSON.parse(localStorage.getItem('calendarEvents')) || [
        { time: '9:00 AM', title: 'Team Meeting', details: 'Weekly sync with the development team' },
        { time: '11:00 AM', title: 'Client Call', details: 'Discuss project requirements with the client' },
        { time: '1:00 PM', title: 'Lunch Break', details: 'Take some time to recharge' }
      ];
    }
  
    init() {
      if (!this.container) {
        console.error("CalendarWidget: Container '#todaysSchedule' not found in DOM.");
        return;
      }
      console.log("CalendarWidget: Container found, rendering...");
      this.render();
    }
  
    render() {
      try {
        const today = new Date().toLocaleDateString('en-US', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
        
        this.events.sort((a, b) => {
          // Convert time to 24-hour format for comparison
          const getHours = (timeStr) => {
            const [time, modifier] = timeStr.split(' ');
            let [hours, minutes] = time.split(':');
            if (hours === '12') {
              hours = '00';
            }
            if (modifier === 'PM') {
              hours = parseInt(hours, 10) + 12;
            }
            return hours;
          };
          
          return getHours(a.time) - getHours(b.time);
        });
        
        this.container.innerHTML = `
          <h2>Today's Schedule</h2>
          <p class="current-date">${today}</p>
          <ul class="event-list">
            ${this.events.map((event, index) => `
              <li data-index="${index}">
                <div class="event-header">
                  <span class="event-time">${event.time}</span>
                  <span class="event-title">${event.title}</span>
                  <button class="delete-event" data-index="${index}">×</button>
                </div>
                <p class="event-details">${event.details || ''}</p>
              </li>
            `).join('')}
          </ul>
          <div class="add-event">
            <input type="text" id="eventTime" placeholder="Time (e.g. 3:00 PM)">
            <input type="text" id="eventTitle" placeholder="Event Title">
            <input type="text" id="eventDetails" placeholder="Event Details (optional)">
            <button id="addEventBtn">Add Event</button>
          </div>
        `;
        
        // Add event listeners
        this.container.querySelector('#addEventBtn').addEventListener('click', () => {
          this.addEvent();
        });
        
        this.container.querySelectorAll('.delete-event').forEach(button => {
          button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            const index = button.dataset.index;
            this.deleteEvent(index);
          });
        });
        
        console.log("CalendarWidget: Rendered successfully.");
      } catch (error) {
        console.error('CalendarWidget: Error during rendering:', error);
        this.container.innerHTML = `<p>Error loading schedule.</p>`;
      }
    }
    
    addEvent() {
      const timeInput = this.container.querySelector('#eventTime');
      const titleInput = this.container.querySelector('#eventTitle');
      const detailsInput = this.container.querySelector('#eventDetails');
      
      const time = timeInput.value.trim();
      const title = titleInput.value.trim();
      const details = detailsInput.value.trim();
      
      if (time && title) {
        this.events.push({
          time,
          title,
          details
        });
        
        localStorage.setItem('calendarEvents', JSON.stringify(this.events));
        this.render();
      } else {
        alert('Please enter both time and title for the event.');
      }
    }
    
    deleteEvent(index) {
      if (confirm('Are you sure you want to delete this event?')) {
        this.events.splice(index, 1);
        localStorage.setItem('calendarEvents', JSON.stringify(this.events));
        this.render();
      }
    }
  }