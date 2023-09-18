let delete_action = document.getElementById("delete-innactive");
delete_action.addEventListener("click", async () => {
    let response = await fetch(`/api/users/` , { method: "DELETE" });
    let result = await response.json();
    if (result.status === "success") {
      alert(result.payload);
      setTimeout(() => window.location.href = `users`, 500);
    }else{
      alert(result.payload);
    }
  });
  