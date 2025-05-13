const handleSubmit = (event) => {
  event.preventDefault();
  // Perform form submission logic here
  window.location.href = "/signup?role=parent"; // Redirect to signup with role
};
