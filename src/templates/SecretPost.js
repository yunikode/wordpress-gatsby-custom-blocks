import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import parse, { attributesToProps, domToReact } from "html-react-parser"
import Greeter from "../elements/greeter"

// We're using Gutenberg so we need the block styles
import "@wordpress/block-library/build-style/style.css"
import "@wordpress/block-library/build-style/theme.css"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const SecretPostTemplate = ({ data: { previous, next, post } }) => {
  const featuredImage = {
    image: post.featuredImage?.node?.localFile,
  }

  const parseOptions = {
    replace: ({ attribs, children }) => {
      if (!attribs) {
        return
      }
      if (attribs.id === "customblock") {
        const props = attributesToProps(attribs)
        return <Greeter {...props}>{children}</Greeter>
      }
    },
  }

  return (
    <Layout>
      <SEO title={post.title} description={post.excerpt} />

      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{parse(post.title)}</h1>

          <p>{post.date}</p>
          {/* if we have a featured image for this post let's display it */}
          {featuredImage && (
            <GatsbyImage image={getImage(post.featuredImage.node.localFile)} />
          )}
        </header>

        {!!post.content && (
          <section itemProp="articleBody">
            {parse(post.content, parseOptions)}
          </section>
        )}

        <hr />

        <footer>
          <Bio />
        </footer>
      </article>
    </Layout>
  )
}

export default SecretPostTemplate

export const pageQuery = graphql`
  query SecretPostById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
  ) {
    # selecting the current post by id
    post: wpSecretPost(id: { eq: $id }) {
      id
      content
      title
      date(formatString: "MMMM DD, YYYY")

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
`
