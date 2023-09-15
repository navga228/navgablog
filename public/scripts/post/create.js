async function handlePostSubmit(e, form) {
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

  await fetch("/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  })
    .then(res => res.text()).then(res => alert(res))
    .catch((error) => {
      alert(error);
    });

  window.location.replace('blogs');
}