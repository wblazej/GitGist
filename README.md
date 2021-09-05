---

<p align="center">
  <b>Semester final project from JavaScript on WSIZ</b><br><br>
  <img src="https://www.wsi.edu.pl/wp-content/uploads/2019/05/Niebieski-logotyp_new.png">
</p>

----


# GitGist
This project uses Gist GitHub API. The main idea of this project is to create an own GitHub gists viewer. Learn more in [GitHub API Documentation]( https://docs.github.com/en/rest/reference/gists)

![image](https://user-images.githubusercontent.com/62674438/122681958-1edf2580-d1f7-11eb-9282-0ca84a47908a.png)


## Live demo
See live demo of app [here](https://wblazej.github.io/GitGist/)

## Running
Running project on development server
```
git clone https://github.com/wblazej/GitGist
cd GitGist
yarn install
yarn start
```

## Running tests
```
echo '{"token": "your_github_api_token"}' > __tests__/config.json
yarn run test
```

## Usage
On the left side of the page there is a panel, where you have to input your GitHub API token ([How to get GitHub API token](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token)). The token is stored in `localStorage`. After saving, gist viewer is ready to go.

![image](https://user-images.githubusercontent.com/62674438/122681732-1e925a80-d1f6-11eb-8dd6-4aa066869f0e.png)

### Adding gists
![image](https://user-images.githubusercontent.com/62674438/122682016-69f93880-d1f7-11eb-8e16-1b55093d682e.png)

### Viewing gists
![image](https://user-images.githubusercontent.com/62674438/122682039-8e551500-d1f7-11eb-908f-bd44c5fc45c2.png)

### Editing gists
![image](https://user-images.githubusercontent.com/62674438/122682068-b3e21e80-d1f7-11eb-9ee8-94af4b66443f.png)

---

Icons: https://www.figma.com/file/u4tgXFq9SXhjyrT1NDEfAe/GitGist?node-id=27%3A0


Any issues? Please, [let me know](https://github.com/wblazej/GitGist/issues)
