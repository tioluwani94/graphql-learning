import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag"
import Link from "./Link";

class LinkList extends Component {
    render() {
        if (this.props.feeds && this.props.feeds.loading) {
            return <div>Loading</div>
        }
        if (this.props.feeds && this.props.feeds.error) {
            return <div>Error</div>
        }
        const {feeds: {feed: {links}}} = this.props;
        return (
            <div>
                {
                    links.map((link, i) => <Link key={i.toString()} link={link}/>)
                }
            </div>
        )
    }
}

const FEED_QUERY = gql`
    query FeedQuery {
        feed {
            links {
                id
                url
                description
                createdAt
            }
        }
    }
`;

export default graphql(FEED_QUERY, {name: "feeds"})(LinkList);