// [ ] TODO add comments to describe what's happening in this script

async function updateProfiles(event) {
<<<<<<< HEAD
    event.preventDefault();
  //I don't actually don't know where dietary preferences is
    const title = document.querySelector('input[name="username"]').value.trim();
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        username,
        zip


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
=======
  event.preventDefault();

  // FIXME title is declared but never used
  const title = document.querySelector('input[name="username"]').value.trim();

  // FIXME for this, we can grab the profile (or user) ID from req.session.user_id
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  // COMMENT should we allow the user to change their password? Here, only `username` can be changed
  const response = await fetch(`/api/users/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      username,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // FIXME the user should be routed back to their pofile view (not edit-profile view) instead of the /browsing view
  if (response.ok) {
    document.location.replace("/browsing");
  } else {
    // [ ] TODO use a modal instead of browser alert
    alert(response.statusText);
>>>>>>> 7bcb3b4a6e682f28311f2d8a5aa3ec5375ccef73
  }
}

//I dont know what this button will be called but maybe the class will be edit post form
// FIXME edit-post-form is would not describe a form to edit a user's profile. Please update this class name.
document
  .querySelector(".edit-post-form")
  .addEventListener("submit", updateProfiles);
