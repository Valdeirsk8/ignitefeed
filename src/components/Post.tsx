import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";

interface Author {
	name: string;
	role: string;
	avatarUrl: string;
}

interface Content {
	type: "paragraph" | "link";
	content: String;
}

interface PostProps {
	author: Author;
	publishedAt: Date;
	content: Content[];
}

export function Post({ author, publishedAt, content }: PostProps) {
	const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'ás' HH:mm'h'", {
		locale: ptBR,
	});
	const publishedDateRelativeNow = formatDistanceToNow(publishedAt, {
		addSuffix: true,
		locale: ptBR,
	});

	const [comments, setComments] = useState(["Post muito bacana, hein!"]);

	const [newComment, setNewComment] = useState("");

	function handleCreateNewComment(event: FormEvent) {
		event.preventDefault();
		setComments([...comments, newComment]);
		setNewComment("");
	}

	function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
		event.target.setCustomValidity("");
		setNewComment(event.target.value);
	}

	function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
		event.target.setCustomValidity("Este campo é obrigatório!");
	}

	function deleteComment(comment: String) {
		const newComments = comments.filter((commentToDelete) => {
			return comment !== commentToDelete;
		});

		setComments(newComments);
	}

	const isNewCommentEmpty = newComment.length === 0;

	return (
		<article className={styles.post}>
			<header>
				<div className={styles.author}>
					<Avatar src={author.avatarUrl} />
					<div className={styles.authorInfo}>
						<strong>{author.name}</strong>
						<span>{author.role}</span>
					</div>
				</div>

				<time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
					{publishedDateRelativeNow}
				</time>
			</header>

			<div className={styles.content}>
				{content.map((line) => {
					switch (line.type) {
						case "paragraph":
							return <p>{line.content}</p>;
						case "link":
							return (
								<p>
									<a href="#">{line.content}</a>
								</p>
							);
					}
				})}
			</div>

			<form onSubmit={handleCreateNewComment} className={styles.commentForm}>
				<strong>Deixe seu comentário</strong>

				<textarea
					placeholder="Deixe seu comentário"
					name="comment"
					value={newComment}
					onChange={handleNewCommentChange}
					onInvalid={handleNewCommentInvalid}
					required
				/>

				<footer>
					<button type="submit" disabled={isNewCommentEmpty}>
						Comentar
					</button>
				</footer>
			</form>

			<div className={styles.commentList}>
				{comments.map((comment) => {
					return <Comment key={comment} content={comment} onDeleteComment={deleteComment} />;
				})}
			</div>
		</article>
	);
}
