import React, { Component } from 'react';
import Layout from 'antd/lib/layout';
import axios from '../../axios';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import ClipboardJS from 'clipboard/dist/clipboard.min';
import Button from '../../components/Button';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';

const { Header, Footer, Content } = Layout;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longUrl : '',
      shortUrl : 'Get your link here',
    };
    this.clip = new ClipboardJS('#copyBtn');
    this.clip.on('success', e => e.clearSelection());
  }

  getShortUrl = async () => {
    this.setState({ loading: true }, () => {
      axios({
        method: 'post',
        url: `api/add/${encodeURIComponent(this.state.longUrl)}`,
      })
      .then((response) => {
        this.setState({
          shortUrl: `${window.location.origin}/${response.data}`
        });
      })
      .catch((error) => {
        console.log(error.data);
      });
    });
  };

  setLongURL(url) {
    this.setState({
      longUrl: url
    });
  }
  render() {
    return (
      <Layout>
        <Header>
          <SiteHeader />
        </Header>
        <Content className="content">
          <Row>
            <Col span={24}>
              <h3>
                Transform your long link into tiny one :)
              </h3>
            </Col>
            <Col>
          <Input
            name="urlInput"
            onChange={e => this.setLongURL(e.target.value)}
            value={this.state.longUrl}
            placeholder="Paste your link here"
          />
              <Button
                className="more"
                onClick={this.getShortUrl}
                text="Tiny me !!!"
              />
            </Col>
            <Col span={24}>
              <Input
                id="foo"
                value={this.state.shortUrl}
              />
              <button
                id="copyBtn"
                data-clipboard-target="#foo"
              >
                COPY
              </button>
            </Col>
          </Row>
        </Content>
        <Footer>
          <SiteFooter />
        </Footer>
      </Layout>
    );
  }
}

export default HomePage;