// A user enters the website and finds a list of the names, dates, times, locations, and descriptions of all the parties that are happening.
// Next to each party in the list is a delete button. The user clicks the delete button for one of the parties. That party is then removed from the list.
// There is also a form that allows the user to enter information about a new party that they want to schedule. After filling out the form and submitting it, the user observes their party added to the list of parties.


// 1. Establish API URL for document link
const cohort = "2310-fsa-et-web-pt-sf-b-tywon/events";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${cohort}`;
console.log(API_URL);

const state = {
  events: [],
};
const eventLists = document.getElementById('CurrentEvents');

async function render(){
  await getEvents();
  renderEvents();
}
render();

// 2. Pull data from link 
async function getEvents() {
   try {
    const response = await fetch(API_URL);
    const dataNew = await response.json();
    state.events = dataNew.data;
    console.log(dataNew);
  } catch (error) {
    console.error(error);
  }
};

//3. Create function to present list 

function renderEvents() {
  if (!state.events.length) {
    eventLists.innerHTML = "<li>No events.</li>";
    return;
  }

  const eventCards = state.events.map((event) => {
    const li = document.createElement('li');
    let uppercaseName = event.name.toUpperCase();
    li.innerHTML = `
      <p><h2>EVENT ID: (#${event.id}) [${uppercaseName}]</h2></p>
      <p><b>LOCATION:</b> ${event.location}$<p/>
      <em>
        <p><b>DATE:</b> ${event.date}</p>
        <p><b>DESCRIPTION:</b> ${event.description}</p>
      </em>
      <button onclick="deleteEvent(${event.id})">Delete</button>
    `;
    return li;
  });

  eventLists.replaceChildren(...eventCards);
}

// Function to delete an event by ID
function deleteEvent(eventId) {
  // Assuming state.events is an array of events
  state.events = state.events.filter(event => event.id !== eventId);
  renderEvents(); // Re-render the events after deletion
}

renderEvents();

