import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Post } from './components/Post'

import './global.css'
import styles from './App.module.css'

const posts = [
  {
    id: 1,
    author: {
      avatar: 'https://picsum.photos/60/60',
      name: 'Luis Fernando',
      role: 'Web Developer'
    },
    publishAt: new Date('2023-02-12 08:02:36'),
    content: [
      { type: 'paragraph', content: 'Fala galera! 🤘' },
      { type: 'paragraph', content: 'Hoje com um novo post apresentado meu novo projeto!' },
      { type: 'link', content: '👉 zanzoti.design/ignite-feed' }
    ]
  },
  {
    id: 2,
    author: {
      avatar: 'https://picsum.photos/60/60',
      name: 'Mariana Silva',
      role: 'UI/UX Designer'
    },
    publishAt: new Date('2023-02-13 12:23:44'),
    content: [
      { type: 'paragraph', content: 'Fala galera! 🤘' },
      { type: 'paragraph', content: 'Hoje com um novo post apresentado meu novo projeto!' },
      { type: 'link', content: '👉 zanzoti.design/ignite-feed' }
    ]
  },
]

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {
            posts.map(post => (
              <Post
                key={`${post.id}`}
                author={post.author}
                content={post.content}
                publishAt={post.publishAt}
              />
            ))
          }
        </main>
      </div>
    </div>
  )
}
