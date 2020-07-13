document.querySelector('input').addEventListener('keyup', e => {

  let value = e.target.value;

  document.querySelector('.results').style.display = 'none';

  fetch(`https://api.github.com/users/${value}`)
    .then(res => res.json())
    .then(data => {
      if(data.message != "Not Found"){
        document.querySelector('.results').style.display = 'flex';
      }
      document.querySelector('.user_img').src = data.avatar_url;
      document.querySelector('.user_name').innerHTML = data.login;
      document.querySelector('.bio').innerHTML = data.bio;
      document.querySelector('.repos_nr').innerHTML = data.public_repos;
      document.querySelector('.followers_nr').innerHTML = data.followers;
      document.querySelector('.following_nr').innerHTML = data.following;

      fetch(data.repos_url)
        .then(res => res.json())
        .then(reposData => {
          let output = '';
          reposData.forEach(repo => {
            output += `
            <div class="repo">
            <div>
              <div class="repo_name">${repo.name}</div>
            <a class="view_project" href="${repo.html_url}" target="_blank">Go to project &rarr; </a>
            </div>
            <div class="language">${repo.language}</div>
          </div>
            `;
          })
          document.querySelector('.repoList').innerHTML = output;
        })

    });

})