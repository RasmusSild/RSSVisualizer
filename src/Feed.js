import React, { Component } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import FeedItem from "./FeedItem";
import {Card, Dimmer, Loader, Header, Grid} from 'semantic-ui-react'

class Feed extends Component {

    constructor(props) {
        super(props);

        //this.feedUrl = 'https://flipboard.com/@raimoseero/feed-nii8kd0sz?rss';
        this.feedUrl = 'http://feeds.bbci.co.uk/news/rss.xml';

        this.state = {
            items: null,
            mercuryLoading: false,
            title: null,
            copyright: null
        }
    }

    componentDidMount() {
        const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

        axios.get(CORS_PROXY + this.feedUrl)
            .then(response => {
                parseString(response.data, (err, res2) =>{
                    console.log(res2);
                    this.setState({
                        items: res2.rss.channel[0].item,
                        title: res2.rss.channel[0].title[0],
                        copyright: res2.rss.channel[0].copyright[0]
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

        const {items, mercuryLoading, title, copyright} = this.state;

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
            {title && <Header as='h1' className={'page_header'}>{title}</Header>}
            {output}
            {copyright && <Grid textAlign='right' columns={1}>
                <Grid.Row>
                    <Grid.Column className={'copyright'}>
                        {copyright}
                    </Grid.Column>
                </Grid.Row>
            </Grid>}
        </div>;
    }
}

export default Feed;
