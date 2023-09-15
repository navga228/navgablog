async function deleteUser(id) {
  await fetch("/user/" + id, {
    method: "DELETE"
  })
    .then(res => res.text()).then(res => alert(res)).catch((error) => {
      alert(error);
    });
  window.location.href = "/";
}