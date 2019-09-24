import Link from 'next/link'

const ArticleList = ({ articles }) => (
  <div className='article-list'>
    {articles.map(a => (
      <div className='article' key={a.id}>
        <h2 className='article-title'>
          <a href={a.url}>{a.title}</a>
        </h2>
        <div className='article-details'>
          <span>{a.points || 0} points</span>
          <Link href={`/article?id=${a.id}`}>
            <a>{a.comments_count || 0} comments</a>
          </Link>
        </div>
      </div>
    ))}
    <style>{`
      .article-list {
        padding: 0 1em;
      }
      . article {
        padding: 1em 0;
      }
      .article-title {
        font-size: 1rem;
        font-weight: 400;
        margin: 0;
        margin-bottom: 0.25em;
      }
      .article-title a {
        color: #333;
        text-decoration: none;
      }
      .article-title a:hover, 
      .article-details a:hover {
        text-decoration: underline;
      }
      .article-details {
        font-size: 0.8rem;
        font-weight: bold;
        margin-bottom: 2rem;
      }
      .article-details span {
        margin-right: 1em;
      }
      .article-details a {
        color: #6600ff;
        text-decoration: none;
      }
    `}</style>
  </div>
)

export default ArticleList
