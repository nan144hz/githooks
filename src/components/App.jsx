import React, {useState} from 'react';
import '../styles/style.css';

export default function App () {
    const [user, setUser] = useState("")
    const [userInp, setUserInp] = useState("")
    const [id, setID] = useState(Number)
    const [url, setURL] = useState("")
    const [avatar, setAvatar] = useState("")
    const [repos, setRepos] = useState([])
    const api = "https://api.github.com/users/"

    const loadInfo = async () => {
        if(userInp.length === 0) return alert('Error! Enter your GitHub username.')
        setUser(userInp)
        const fetchData = await fetch(api+userInp)
        const data = await fetchData.json()
        if(data.message && data.message === "Not Found") return alert('Error! User not found.')
        setID(data.id)
        setURL(data["html_url"])
        setAvatar(data["avatar_url"])
        const api_repos = api+userInp+"/repos"
        const fetchRepos = await fetch(api_repos)
        const datarepos = await fetchRepos.json()
        setRepos(datarepos)
    }    

    return (
        <>
            <div className="box boxInput">
                <h2>Enter your GitHub username:</h2><br />
                <input type="text" onChange={e => setUserInp(e.target.value)}/><br />
                <button onClick={() => loadInfo()}>Let's go!</button>
            </div>
            <div className="box boxInfos">
                <div className="infos">
                    <h3>ID: {id?id:"Not Found"}</h3>
                    <h3>Name: {user?user:"Not Found"}</h3>
                    <h3>URL: <br/>{url?url:"Not Found"}</h3>
                </div>
                <div className="avatar">
                    {avatar?(<img src={avatar} width="90px" height="90px" alt="Your Avatar"/>):"Not Found"}
                </div>
            </div>
            <div className="box boxRepos">
                <h3>Repositories:</h3>
                {repos?repos.map(repo => (<li key={repo.id}>{repo.name}</li>)):"Repositories Not Found"}
            </div>
        </>
    )
}