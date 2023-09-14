let response = fetch("/post", {
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

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  };
  return new Date(dateString).toLocaleDateString('ru-RU', options);
};

async function handleCreateComment(e, form, postId) {
  e.preventDefault()
  let commentText = form.querySelector('input[name="text"]').value;

  let obj = {
    "text" : `${commentText}`,
  }

  console.log(obj)

  await fetch('/comment/' + postId, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res=> res.text()).then(res => alert(res))
    .catch((error) => {
      alert(error);
    });

  window.location.reload();
}


window.onload = async () => {
  let user = await doesSessionExist();
  let userId;

  if (user) {
    userId = await supertokensSession.getUserId();
  }

  const postList = await response;
  for (const post in postList) {
    if (post !== "time") {
      const post_section = document.createElement("div");
      post_section.className = "post";
      post_section.setAttribute("data-id", postList[post].id);
      post_section.innerHTML += `
                <article class="article">
                    <h2 class="title">${postList[post].title}</h2>
                    <p class="author"><b>Автор:</b> ${postList[post].userId}</p>
                    <p class="date">${formatDate(postList[post].createdAt)}</p>
                    <p class="content">${postList[post].content}</p>
                </article>
      `;


      if (postList[post].categories.length !== 0) {
        const category_section = document.createElement("div");
        category_section.className = "categories";
        post_section.appendChild(category_section);
        category_section.innerHTML += `
        <h3 class="category-name">Категории:</h3>
       `;
        for (const category in postList[post].categories) {
          category_section.innerHTML += `
          <p data-id="${postList[post].categories[category].id}" class="category-name">${postList[post].categories[category].name}</p>
        `;
        }
      }

      let button_section = document.createElement('div');
      button_section.setAttribute('class', 'buttons')
      post_section.appendChild(button_section);
      if (user && userId === postList[post].userId) {
        button_section.innerHTML += `
        <button type="button" onclick="deletePost(${postList[post].id})">Удалить</button>
        <button type="button" onclick="handlePostUpdate(${postList[post].id})">Обновить</button>
      `
      }

      const comment_section = document.createElement("div");
      comment_section.className = "comments";
      post_section.appendChild(comment_section);

      comment_section.innerHTML += `
        <h3 class="comments-header">Комментарии:</h3>
       `;

      if (postList[post].comments.length === 0) {
        comment_section.innerHTML += `
        <div class="comments_empty">Будьте первым, кто оставит комментарий под публикацией.</div>
        `;
      } else {
        for (const comment in postList[post].comments) {
          comment_section.innerHTML += `
            <div data-id="${postList[post].comments[comment].id}" class="comment">
                    <p class="commentAuthor"><b>Автор:</b> ${postList[post].comments[comment].userId}</p>
                    <p class="commentText">${postList[post].comments[comment].text}</p>
            </div>`;
          if (user && userId === postList[post].comments[comment].userId) {
            comment_section.innerHTML += `
        <button type="button" onclick="deleteComment(${postList[post].comments[comment].id})">Удалить</button>
      `
          }
        }
      }

      const add_comment_form = document.createElement("div");
      add_comment_form.className = "add-comment-form";
      const comment_form = document.createElement('form');
      comment_form.id = ('post_form');
      comment_form.setAttribute('onsubmit', `handleCreateComment(event, this, ${postList[post].id})`)
      comment_form.innerHTML += `
                  <input type="text" autocomplete="off" placeholder="Оставить комментарий..." name="text"/>
                  <button type="submit">Отправить</button>
      `

      add_comment_form.appendChild(comment_form);
      post_section.appendChild(add_comment_form);

      document.querySelector("#post_container").appendChild(post_section);
    }
  }
};


