let categoriesResponse = fetch("/category", {
  method: "GET",
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json"
  }
})
  .then((res) => res)
  .then((data) => data.json());

async function handlePostUpdate(id) {
  let response = await fetch(`/post/one/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  })
    .then((res) => res)
    .then((data) => data.json());
  let post = document.querySelector(`.post[data-id="${id}"]`);
  let article = post.querySelector(".article");

  post.querySelector(".categories").innerHTML = ``;
  post.querySelector(".buttons").innerHTML = ``;



  article.innerHTML = `
        <form onsubmit="updatePost(event, this, ${id})">
        <input autocomplete="off" name="title" placeholder="Название...">
        <p><b>Автор:</b> ${response.userId}</p>
        <p class="date">${formatDate(response.createdAt)}</p>
        <input autocomplete="off" name="content" placeholder="Описание...">
        <!--    get categories-->
        <p>Категории: </p>
        <select multiple class="select_categories">
        </select>
        <button type="submit">Обновить</button>
        <button type="button" onclick="closeUpdateForm()">Закрыть</button>
  </form>
    `;
  let select = article.querySelector(".select_categories");
  const categories = await categoriesResponse;
  for (const category in categories) {
    if (category !== "time") {
      select.innerHTML += `
        <option>${categories[category].name}</option>
        `;
    }
  }
}

async function updatePost(e, form, postId) {
  e.preventDefault();

  let select = form.getElementsByTagName("select")[0];
  let result = [];
  let options = select && select.options;
  let opt;

  for (let i = 0, iLen = options.length; i < iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }

  let categories = [];

  for (let i = 0; i < result.length; i++) {
    let objCat = { "name": result[i] };
    categories.push(objCat);
  }

  let obj = {
    "title": form.querySelector("input[name=\"title\"]").value,
    "content": form.querySelector("input[name=\"content\"]").value,
    "categories": categories
  };

  await fetch('/post/' + postId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  })
    .then(res => res.text()).then(res => alert(res))
    .catch((error) => {
      alert(error);
    });;

  location.reload();
}

function closeUpdateForm() {
  location.reload();
}