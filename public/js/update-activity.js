const { Activity } = require("../../models");

async function updateActivities(event) {
    event.preventDefault();
    const formData = new FormData();
    const title = document.querySelector('input[name="activity-title"]').value.trim();
    const description = document.querySelector('input[name="activity-title"]').value.trim();
    const location = document.querySelector('input[name="activity-title"]').value.trim();
    const occurrence = document.querySelector('input[name="activity-title"]').value.trim();
    const organizer_id = document.querySelector('input[name="activity-title"]').value.trim();
    const is_private = document.querySelector('input[name="activity-title"]').value.trim();
    const seats = document.querySelector('input[name="activity-title"]').value.trim();

// formData.append('title', `${title}`);
// formData.append('description', `${description}`);
// formData.append('location', `${location}`);
// formData.append('occurrence', `${}`);
// formData.append('organizer_id',`${}` );
// formData.append('is_private', `${}`);
// formData.append('seats', );
  
    

    //so i dont really understand this code but it seems to work in the 
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/activities/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        description,
        location,
        occurrence, 
        organizer_id,
        is_private,
        seats
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/browsing/');
    } else {
      alert(response.statusText);
    }
  }
  //I dont know what this button will be called but maybe the class will be edit activity form
  document.querySelector('.edit-activity-form').addEventListener('submit', updateActivities);