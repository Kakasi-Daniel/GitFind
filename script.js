function bcolor(language){

  if (language === "JavaScript"){
    return 'yellow';
  }
  else if (language === "Python"){
    return 'yellow';
  }
  else if(language === "HTML" || language === "Java"){
    return 'red';
  }
  else if(language === "CSS" || language === "C"){
    return 'blue';
  }else{
    return '';
  }

}

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
            console.log(repo.language === "Python");
            output += `
            <div class="repo ${bcolor(repo.language)}">
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


