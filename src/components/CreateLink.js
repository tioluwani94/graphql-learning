import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";

class CreateLink extends Component {
    state = {
        url: "",
        description: "",
    };

    createLink = async () => {
        const {description, url} = this.state;
        await this.props.postMutation({
            variables: {
                description,
                url
            }
        })
    };

    render() {
        return (
            <div>
                <input
                    value={this.state.url}
                    onChange={e => this.setState({
                        url: e.target.value
                    })}
                    className="mb2"
                    type="text"
                    placeholder="The URL for the link"
                />
                <input
                    value={this.state.description}
                    onChange={e => this.setState({
                        description: e.target.value
                    })}
                    className="mb2"
                    type="text"
                    placeholder="A description for the link"
                />
                <button
                    type="button"
                    onClick={this.createLink}
                >
                    Submit
                </button>
            </div>
        )
    }
}

const POST_MUTATION = gql`
    mutation PostMutation($description: String!, $url: String!) {
        post(description: $description, url: $url) {
            id
            description
            url
            createdAt
        }
    }
`;

export default graphql(POST_MUTATION, {name: "postMutation"})(CreateLink);