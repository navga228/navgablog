let blogsGetting = async () => {
  const blogList = await fetch("/blog", {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  })
    .then((res) => res)
    .then((data) => data.json())
    .catch((error) => {
      console.log(error);
    });

  let blogs = document.querySelector(".blog-list");

  for (const blog in blogList) {
    if (blog !== "time") {
      blogs.innerHTML += `
      <a href="userBlog/${blogList[blog].id}">${blogList[blog].title}</a>
      `
    }
  }
}

blogsGetting();