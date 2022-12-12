import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Post } from "./components/Post";

import styles from "./App.module.css";

import "./global.css";

const posts = [
	{
		id:1,
		author:{
			avatarUrl: "http://github.com/valdeirsk8.png",
			name: "Valdeir de Melo",
			role: "Software engineer",
		},
		content:[
			{type:'paragraph', content:'Fala galeraa 👋'},
			{type:'paragraph', content:'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
			{type:'link', content:'jane.design/doctorcare'},
		],
		publishedAt: new Date('2022-12-01 05:00:00'),
	},
	{
		id:2,
		author:{
			avatarUrl: "https://i.pinimg.com/236x/65/16/7a/65167af9b1f9d3d7f7d334b329854648--wicked-witch-the-witch.jpg",
			name: "Vanessa Daiane",
			role: "Esthetician",
		},
		content:[
			{type:'paragraph', content:'Fala pessoal 👋'},
			{type:'paragraph', content:'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
			{type:'link', content:'jane.design/doctorcare'},
		],
		publishedAt: new Date('2022-11-30 05:00:00'),
	},
]

function App() {
	return (
		<>
			<Header /> 

			<div className={styles.wrapper}>
				<Sidebar />

				<main>
					{posts.map(post =>{ 
						return (
							<Post 
								key={post.id}
								author={post.author}
								content={post.content}
								publishedAt={post.publishedAt}								
							/>
						)
					})}
				</main>
			</div>
		</>
	);
}

export default App;
