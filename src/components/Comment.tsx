import { ThumbsUp, Trash } from "phosphor-react";
import { useState } from "react";
import { Avatar } from "./Avatar";
import styles from "./Comment.module.css";

interface CommentProps {
	content: string;
	onDeleteComment: (comment: String) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {
	const [aplausos, setAplausos] = useState(0);

	function handleDeleteComment() {
		onDeleteComment(content);
	}

	function handleAplaudir() {
		setAplausos((state) => {
			return state + 1;
		});
	}

	return (
		<div className={styles.comment}>
			<Avatar hasBorder={false} src="https://github.com/valdeirsk8.png" />
			<div className={styles.commentBox}>
				<div className={styles.commentContent}>
					<header>
						<div className={styles.authorAndTime}>
							<strong>Valdeir de Melo</strong>
							<time title="11 de maio ás 08:13h" dateTime="2022-05-11 08:13:30">
								Cerca de 1h atrás
							</time>
						</div>
						<button title="Deletar comentário" onClick={handleDeleteComment}>
							<Trash size={24} />
						</button>
					</header>

					<p>{content}</p>
				</div>

				<footer>
					<button onClick={handleAplaudir}>
						<ThumbsUp />
						Aplaudir <span>{aplausos}</span>
					</button>
				</footer>
			</div>
		</div>
	);
}
