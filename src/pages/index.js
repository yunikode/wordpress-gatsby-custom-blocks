import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Home = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <Link to={"/blog"}>
      <h4>Posts</h4>
    </Link>

    <Link to={"/pages"}>
      <h4>Pages</h4>
    </Link>

    <h4>Secret Posts</h4>
    {data.allWpSecretPost.nodes.map(node => (
      <div key={node.slug}>
        <Link to={`secret/${node.slug}`}>
          <p>{node.title}</p>
        </Link>
      </div>
    ))}
  </Layout>
)

export default Home

export const pageQuery = graphql`
  query {
    allWpSecretPost(sort: { fields: [date] }) {
      nodes {
        title
        slug
      }
    }
  }
`
