import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css'

type ContentType = {
  type: 'paragraph' | 'link',
  content: string
}

type CommentType = {
  content: string
  publishAt: Date
}

interface PostProps {
  author: {
    name: string
    avatar: string
    role: string
  }
  content: ContentType[]
  publishAt: Date
}

export function Post({ author, content, publishAt }: PostProps) {

  const [comments, setComments] = useState<CommentType[]>([])
  const [commentText, setCommentText] = useState('')

  const formattedPublishedAt = format(publishAt, "d 'de' LLLL 'às' HH:mm'h'", { locale: ptBr })
  const relativePublishedAt = formatDistanceToNow(publishAt, { locale: ptBr, addSuffix: true })

  function handleAddInvalidComment(event: InvalidEvent<HTMLTextAreaElement>) {
    event?.target?.setCustomValidity("O texto do seu comentário é obrigatório.")
  }

  function handleAddComment(event: FormEvent) {
    event.preventDefault()
    const newComment = {
      content: commentText,
      publishAt: new Date()
    }

    setComments(prevState => ([...prevState, newComment]))
    setCommentText('')
  }

  function handleDeleteComment(commentContent: string) {
    const newComments = comments.filter(comment => comment.content !== commentContent)
    setComments(newComments)
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatar} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={formattedPublishedAt} dateTime={publishAt.toISOString()}>{relativePublishedAt}</time>
      </header>

      <div className={styles.content}>
        {content.map((item, index) => {
          if (item.type === 'paragraph') return (
            <p key={`${index}`}>{item.content}</p>
          )
          if (item.type === 'link') return (
            <p key={`${index}`}><a href="">{item.content}</a></p>
          )
        })}
      </div>

      <form onSubmit={handleAddComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          value={commentText}
          onChange={(event) => {
            event?.target?.setCustomValidity('')
            setCommentText(event.target.value)
          }}
          placeholder="Deixe seu comentário"
          onInvalid={handleAddInvalidComment}
          required
        />
        <footer>
          <button disabled={!commentText.trim()} type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => (
          <Comment key={comment.content} content={comment.content} onDelete={handleDeleteComment} />
        ))}
      </div>
    </article>
  )
}