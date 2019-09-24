import fetch from 'isomorphic-fetch'
import Error from 'next/error'
import Layout from '../components/layout'
import Comments from '../components/comments'
import { setPriority } from 'os'

class Article extends React.Component {
  static async getInitialProps({ req, res, query }) {
    let article

    try {
      const articleId = query.id
      const res = await fetch(
        `https://node-hnapi.herokuapp.com/item/${articleId}`
      )
      article = await res.json()
    } catch (err) {
      console.log(err)
      article = null
    }

    return { article }
  }

  render() {
    const { article } = this.props

    if (!article) {
      return <Error statusCode={503} />
    }

    return (
      <Layout title={article.title} backButton={true}>
        <main>
          <h1 className='article-title'>
            <a href={article.url}>{article.title}</a>
          </h1>
          <div className='article-details'>
            <strong>{article.points} points</strong>
            <strong>{article.comments_count} comments</strong>
            <strong>{article.time_ago}</strong>
          </div>
          {article.comments.length > 0 ? (
            <Comments comments={article.comments} />
          ) : (
            <div>There are no comments for this article</div>
          )}
        </main>
        <style>{`
          main {
            padding: 1em;
          }
          .article-title {
            font-size: 1.2rem;
            margin: 0;
            font-weight: 300;
            padding-bottom: 0.5em;
          }
          .article-title a {
            color: #333;
            text-decoration: none;
          }
          .article-title a:hover {
            text-decoration: underline;
          }
          .article-details {
            fonts-size: .8rem;
            padding-bottom: 1em;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            margin-bottomL 1em;
          }
          .article-details strong {
            margin-right: 1em;
          }
          .article-details a {
            color: #f60
          }
        `}</style>
      </Layout>
    )
  }
}

export default Article
