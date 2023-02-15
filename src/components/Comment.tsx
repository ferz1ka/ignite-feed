import React, { useState } from 'react'
import { ThumbsUp, Trash } from 'phosphor-react'
import styles from './Comment.module.css'
import { Avatar } from './Avatar'

interface CommentProps {
  content: string
  onDelete: (content: string) => void
}

export function Comment({ content, onDelete }: CommentProps) {

  const [commentLikeCount, setCommentLikeCount] = useState(0)

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/ferz1ka.png" />
      <div className={styles.commentBox}>
        <main className={styles.commentBoxContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Fernando Zanzoti</strong>
              <time title="13 de fevereiro às 13h30" dateTime='2023-02-13 13:30:00'>Cerca de 1h atrás</time>
            </div>
            <button onClick={() => onDelete(content)} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>
          <p>{content}</p>
        </main>
        <footer>
          <button onClick={() => setCommentLikeCount(prevState => prevState + 1)}>
            <ThumbsUp /> Curtir <span>{commentLikeCount}</span>
          </button>
        </footer>
      </div>

    </div>
  )
}