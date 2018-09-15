import React, { Component } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import FeedItem from "./FeedItem";
import {Card, Dimmer, Loader} from 'semantic-ui-react'

class Feed extends Component {

    constructor(props) {
        super(props);

        //this.feedUrl = 'https://flipboard.com/@raimoseero/feed-nii8kd0sz?rss';
        this.feedUrl = 'http://feeds.bbci.co.uk/news/rss.xml';

        this.state = {
            items: null,
            mercuryLoading: false
        }
    }

    componentDidMount() {
        const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

        axios.get(CORS_PROXY + this.feedUrl)
            .then(response => {
                parseString(response.data, (err, res2) =>{
                    this.setState({
                        items: res2.rss.channel[0].item
                    })
                });
            })
            .catch(err => alert(err));
    }

    toggleLoader = (value) => {
        this.setState({
            mercuryLoading: value
        })
    };

    render() {

        const {items, mercuryLoading} = this.state;

        let output = null;

        if (items) {
            output =
                <Card.Group className={'items_group'}>
                    {
                        items.map((item, index) => <FeedItem key={index} itemData={item} mercuryLoading={this.toggleLoader}/>)
                    }
                </Card.Group>
        }

        return <div>
            <Dimmer active={mercuryLoading === true}>
                <Loader />
            </Dimmer>
            {output}
        </div>;
    }
}

export default Feed;
