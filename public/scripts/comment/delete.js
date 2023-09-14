async function deleteComment(id) {
  await fetch('/comment/' + id, {
    method: "DELETE",
  })
    .then(res=> res.text()).then(res => alert(res)).catch((error) => {
      alert(error);
    });
  location.reload()
}