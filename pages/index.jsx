import fetch from 'isomorphic-fetch'
import Error from 'next/error'
import Link from 'next/link'
import ArticleList from '../components/articleList'
import Layout from '../components/layout'

class Index extends React.Component {
  // use static when running getInitialProps from inside the class
  static async getInitialProps({ req, res, query }) {
    let articles
    let page

    try {
      page = Number(query.page) || 1
      const res = await fetch(
        `https://node-hnapi.herokuapp.com/news?page=${page}/`
      )
      articles = await res.json()
    } catch (err) {
      console.log(err)
      articles = []
    }
    return { page, articles }
  }

  /**
   * here is where we register the service worker, we still need to tell the next server what the service worker is. we will do that with our own custom server in parallel with the server provided to use with NEXT.js
   */
  componentDidMount() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('service worker registration successful')
        })
        .catch(err => {
          console.warn('service worker registration failed', err.message)
        })
    }
  }

  render() {
    const { articles, page } = this.props

    if (articles.length === 0) {
      return <Error statusCode={503} />
    }

    return (
      <Layout
        title='Hacker News PWA'
        description='A hacker news clone made with Next.js'
      >
        <ArticleList articles={articles} />

        <footer>
          <Link href={`/?page=${page + 1}`}>
            <a>Next page ({page}) →</a>
          </Link>
        </footer>
        <style jsx>{`
          footer {
            padding: 1em;
          }
          footer a {
            font-weight: bold;
            color: black;
            text-decoration: none;
          }
        `}</style>
      </Layout>
    )
  }
}

export default Index
