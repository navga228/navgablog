let response = fetch("/category", {
  method: "GET",
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json"
  }
})
  .then((res) => res)
  .then((data) => data.json())
  .catch((error) => {
    alert(error);
  });

window.onload = async () => {
  const categories = await response;

  let select = document.querySelector("#select_categories");

  for (const category in categories) {
    if (category !== "time") {
      select.innerHTML += `
        <option>${categories[category].name}</option>
        `
    }
  }
};