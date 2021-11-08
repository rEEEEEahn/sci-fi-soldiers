
const newGoalHandler = async (event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value.trim();
  const goal_type_id = document.querySelector("#goal_type_id").value.trim();
  const client_id = document.querySelector("#client_id").value.trim();
  const professional_id = document.querySelector("#professional_id").value.trim();
  
  if (name && goal_type_id && client_id && professional_id) {
    console.log(name, goal_type_id)  
    const response = await fetch("/api/goals", {
      method: "POST",
      body: JSON.stringify({ 
        "name": name, 
        "goal_type_id": goal_type_id,
        "client_id": client_id, 
        "professional_id": professional_id 
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      alert('Failed to sign up.');
      return;
    }
    

    window.location.replace(`/client/${client_id}`);
  }
};

document
  .querySelector(".new_goal_form")
  .addEventListener("submit", newGoalHandler);