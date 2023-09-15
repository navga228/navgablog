let deleteUser = async () => {
  let userId = await supertokensSession.getUserId();

  await fetch("/user/" + userId, {
    method: "DELETE"
  })
    .then(res => res.text()).then(res => alert(res)).catch((error) => {
      alert(error);
    });

  sessionStorage.clear();
  window.location.href = "/";
};

let handleSubmit = async (e, form) => {
  e.preventDefault();

  let userId = await supertokensSession.getUserId();
  await fetch("/blog/" + userId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: form.querySelector("input[name=\"title\"]").value,
    })
  })
    .then(res => res.text()).then(res => alert(res))
    .catch((error) => {
      alert(error);
    });
  ;

  location.reload();
};

async function getUser() {

  let userId = await supertokensSession.getUserId();

  let blogTitle = await fetch("/blog/" + userId, {
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

  let greeting = document.querySelector(".usergrreting");
  greeting.innerHTML += `<p>
    Привет, ${userId}
   </p>
   <p>Твой блог называется: <b>${blogTitle.title}</b></p>
   <form onsubmit="handleSubmit(event, this)">
   <input type="text" name="title" placeholder="Введи новое название здесь"/>
   <button type="submit">Поменять название блога</button>
</form>
    <br>
        <br>
            <br>
    <button class="deleteuser" onclick="deleteUser()">
    УДАЛИТЬ ПОЛЬЗОВАТЕЛЯ
    </button>`;
}
