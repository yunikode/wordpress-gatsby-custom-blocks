import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Pages = ({ data }) => (
  <Layout>
    <SEO title="Pages" />
    <h1>Hi people</h1>

    <h4>Pages</h4>
    {data.allWpPage.nodes.map(node => (
      <div key={node.slug}>
        <Link to={`/${node.slug}`}>
          <p>{node.title}</p>
        </Link>
      </div>
    ))}
  </Layout>
)

export default Pages

export const pageQuery = graphql`
  query {
    allWpPage(sort: { fields: [date] }) {
      nodes {
        title
        slug
        featuredImage {
          node {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(width: 200)
              }
            }
          }
        }
      }
    }
  }
`
