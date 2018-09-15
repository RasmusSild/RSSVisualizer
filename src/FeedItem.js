import React, { Component } from 'react';
import { Card, Image, Modal } from 'semantic-ui-react'
import axios from "axios";

class FeedItem extends Component {

    state = {
        data: this.props.itemData,
        mercuryApiKey: 'cNbQTByxpTbPvYisJevs0G8GO1pSM0gBnEfQWGSu',
        mercuryContent: null,
        mercuryLoading: false,
        modalOpen: false
    };

    getContent = () => {
        const {data, mercuryApiKey} = this.state;
        const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
        const requestUrl = CORS_PROXY + 'https://mercury.postlight.com/parser?url=' + data.link[0];

        this.props.mercuryLoading(true);

        axios.get(requestUrl, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': mercuryApiKey
            }
        })
            .then(response => {
                this.props.mercuryLoading(false);
                this.setState({
                    mercuryContent: response.data,
                    modalOpen: true
                })
            })
            .catch(err => {
                alert(err);
                this.props.mercuryLoading(false);
            });
    };

    closeModal = () => {
        this.setState({
            modalOpen: false
        })
    };

    render() {

        const {data, modalOpen, mercuryContent} = this.state;

        return (
            <Card onClick={this.getContent}>
                <Image src={data['media:thumbnail'][0]['$'].url} />
                <Card.Content>
                    <Card.Header className={'item_header'}>{data.title[0]}</Card.Header>
                    <Card.Meta>{data.pubDate[0]}</Card.Meta>
                    <Card.Description>{data.description[0]}</Card.Description>
                </Card.Content>
                <Modal open={modalOpen} onClose={this.closeModal}>
                    <Modal.Content>
                        {mercuryContent && <div dangerouslySetInnerHTML={{__html: mercuryContent.content}} />}
                    </Modal.Content>
                </Modal>
            </Card>
        );
    }
}

export default FeedItem;