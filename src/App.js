import React, { Component } from 'react';
import imgLogo from './assets/images/logo.png';
import imgMediaParagraph from './assets/images/media-paragraph.png';
import imgParagraph from './assets/images/paragraph.png';
import imgRachel from './assets/images/rachel.png';
import { Button } from 'semantic-ui-react';
import { Header, Image, Modal } from 'semantic-ui-react';
import { Dropdown, Icon, Menu } from 'semantic-ui-react'
import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <Menu attached='top' inverted>
                    <a role="button" className="header item">
                        <img alt="" className="logo" src={imgLogo} />
                        <span className="mobile hidden">Brand</span>
                    </a>
                    <Menu.Item name='editorials'>
                        Home
                    </Menu.Item>
                    <Dropdown item icon='ellipsis vertical' simple>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <Icon name='dropdown' />
                                <span className='text'>New</span>
                                <Dropdown.Menu>
                                    <Dropdown.Item>Document</Dropdown.Item>
                                    <Dropdown.Item>Image</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown.Item>
                            <Dropdown.Item>Open</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Menu.Menu position='right'>
                        <div className='ui right aligned category search item'>
                            <div className='ui transparent icon input' style={{maxWidth: '100px'}}>
                                <input className='prompt' type='text' placeholder='Search...' />
                                <i className='search link icon' />
                            </div>
                            <div className='results' />
                        </div>
                    </Menu.Menu>
                </Menu>

                <div className="ui main text container">
                    <h1 className="ui header">Semantic UI Fixed Template</h1>
                    <p>This is a basic fixed menu template using fixed size containers.</p>
                    <p>A text container is used for the main container, which is useful for single column layouts</p>
                    <button className="ui labeled icon button">
                      <i className="pause icon"></i>
                      Pause
                    </button>
                    <Button>Click Here</Button>
                    <Modal trigger={<Button>Show Modal</Button>}>
                        <Modal.Header>Select a Photo</Modal.Header>
                        <Modal.Content image>
                            <Image wrapped size='medium' src={imgRachel} />
                            <Modal.Description>
                                <Header>Default Profile Image</Header>
                                <p>We've found the following gravatar image associated with your e-mail address.</p>
                                <p>Is it okay to use this photo?</p>
                            </Modal.Description>
                        </Modal.Content>
                    </Modal>
                    <img alt="" className="wireframe" src={imgMediaParagraph} style={{ maxWidth: '100%'}} />
                    <img alt="" className="wireframe" src={imgParagraph} style={{ maxWidth: '100%'}} />
                </div>

                <div className="ui inverted vertical footer segment">
                    <div className="ui center aligned container">
                        <div className="ui stackable inverted divided grid">
                            <div className="three wide column">
                                <h4 className="ui inverted header">Group 1</h4>
                                <div className="ui inverted link list">
                                    <a role="button" className="item">Link One</a>
                                    <a role="button" className="item">Link Two</a>
                                    <a role="button" className="item">Link Three</a>
                                    <a role="button" className="item">Link Four</a>
                                </div>
                            </div>
                            <div className="three wide column">
                                <h4 className="ui inverted header">Group 2</h4>
                                <div className="ui inverted link list">
                                    <a role="button" className="item">Link One</a>
                                    <a role="button" className="item">Link Two</a>
                                    <a role="button" className="item">Link Three</a>
                                    <a role="button" className="item">Link Four</a>
                                </div>
                            </div>
                            <div className="three wide column">
                                <h4 className="ui inverted header">Group 3</h4>
                                <div className="ui inverted link list">
                                    <a role="button" className="item">Link One</a>
                                    <a role="button" className="item">Link Two</a>
                                    <a role="button" className="item">Link Three</a>
                                    <a role="button" className="item">Link Four</a>
                                </div>
                            </div>
                            <div className="seven wide column">
                                <h4 className="ui inverted header">Footer Header</h4>
                                <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                            </div>
                        </div>
                        <div className="ui inverted section divider"></div>
                        <img alt="Logo" src={imgLogo} className="ui centered mini image" />
                        <div className="ui horizontal inverted small divided link list">
                            <a className="item" role="button">Site Map</a>
                            <a className="item" role="button">Contact Us</a>
                            <a className="item" role="button">Terms and Conditions</a>
                            <a className="item" role="button">Privacy Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
