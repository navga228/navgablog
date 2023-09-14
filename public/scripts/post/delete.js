async function deletePost(id) {
  await fetch('/post/' + id, {
    method: "DELETE",
  })
    .then(res=> res.text()).then(res => alert(res)).catch((error) => {
      alert(error);
    });
  location.reload()
}