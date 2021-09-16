import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Blog = ({ data }) => {
  console.log("data", data)
  return (
    <Layout>
      <SEO title="Blog" />
      <h1>Hi people</h1>
      <h4>Posts</h4>
      {data.allWpPost.nodes.map(node => {
        const featuredImage = {
          image: node.featuredImage?.node?.localFile,
        }
        return (
          <div key={node.slug}>
            <Link to={node.slug}>
              {featuredImage && (
                <GatsbyImage
                  image={getImage(node.featuredImage.node.localFile)}
                />
              )}
              <p>{node.title}</p>
            </Link>
            <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </div>
        )
      })}
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query {
    allWpPost(sort: { fields: [date] }) {
      nodes {
        title
        excerpt
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
