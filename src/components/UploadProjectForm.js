import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';
import bsCustomFileInput from 'bs-custom-file-input';
import { isAuthenticated } from '../api/authentication-api';
import { uploadProject } from '../api/post-api';
import { Redirect } from 'react-router-dom';

class UploadProjectForm extends Component {

    constructor() {
        super()
        this.state = {
            title: "",
            projectImage: "",
            body: "",
            projectMedium: "",
            projectTags: "",
            projectYear: "",
            projectLink: "",
            projectStatus: "",
            projectCategory: "",
            user: {},
            redirectToStudio: false,
            fileSize: 0,
            error: ""
        }
    }

    handleChange = name => event => {
        this.setState({ error: "" });
        
        const value = name === "projectImage" ? event.target.files[0] : event.target.value;
        
        const fileSize = name === "projectImage" ? event.target.files[0].size : 0;
        
        this.postData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    componentDidMount() {
        // run this to show file name in upload image input field
        bsCustomFileInput.init()
        // for sending the file
        this.postData = new FormData();
        this.setState({ user:isAuthenticated().user })
    }

    // check if the input fields are valid
    isValid = () => {
        const { fileSize, title, body, projectMedium, projectYear, projectCategory } = this.state;
            
            if (title.length === 0) {
                this.setState({ error: `Please declare a title for your project.\nIf you have not named your project, you may input 'Untitled.'` });
                return false;
            }
            if (title.length > 100) {
                this.setState({ error: "Maximum title input is 100 characters." });
                return false;
            }
            if ( fileSize > 2000000 ) {
            this.setState({
                error: "Maximum image size is 2MB. Please select a smaller file." });
                return false;
            }
            if (body.length === 0) {
                this.setState({ error: "Please provide a description of your project." });
                return false;
            }
            if (projectCategory.length === 0 ) {
                this.setState({ error: "Please select a project category." });
                return false;
                }
            if (body.length > 300) {
                this.setState({ error: "Please keep your description fewer than 300 characters or fewer." });
                return false;
            }
            if (projectMedium.length === 0) {
                this.setState({ error: "Please provide the media you used in your project."});
                return false;
            }
            if (projectYear.length === 0) {
                this.setState({ error: "Please assign a production year to your project." });
                return false;
            }
            return true;
        };

    clickUploadProject = event => {
        event.preventDefault();
        if (this.isValid()) {
            const username = isAuthenticated().user.username;   
            const token = isAuthenticated().token;
            uploadProject(username, token, this.postData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else
                    this.setState({
                        title: "",
                        projectImage: "",
                        body: "",
                        projectMedium: "",
                        projectTags: "",
                        projectYear: "",
                        projectLink: "",
                        projectStatus: "",
                        projectCategory: "",
                        redirectToStudio: true,
                        fileSize: 0,
                        error: ""
                    })
                    });
        };
        }

    UploadProjectInputFields = (
        title,
        projectImage,
        body,
        projectMedium,
        projectTags,
        projectYear,
        projectLink,
        projectStatus,
        projectCategory
        ) => (

        <Form.Group className="text-center">   

            <Form.Control
                onChange={this.handleChange("title")}
                value={this.state.title}
                id="title-input" type="text" placeholder="project title" />
            
            <Form>
                <Form.File 
                onChange={this.handleChange("projectImage")}
                id="custom-file"
                type="file"
                accept="image/*"
                label="project image"
                custom
                />
            </Form>

            <Form.Control
                onChange={this.handleChange("body")}
                value={this.state.body}
                id="body-input" type="text" placeholder="project description"
                as="textarea" rows="3" />

            <Form.Control
                className="category-select"
                as="select"
                onChange={this.handleChange("projectCategory")}
            >
                <option hidden>project category</option>
                <option value='visual arts'>visual arts</option>
                <option value='performance arts'>performance arts</option>
                <option value='literary arts'>literary arts</option>

            </Form.Control>

            <Form.Control
                onChange={this.handleChange("projectMedium")}
                value={this.state.projectMedium}
                id="project-medium-input" type="text" placeholder="project medium" />

            <InputGroup className="input-group">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">http://</InputGroup.Text>
                </InputGroup.Prepend>
            
            <Form.Control
                onChange={this.handleChange("projectLink")}
                value={this.state.projectLink}
                id="projectLink-input" type="text" placeholder="project link" />
            </InputGroup>

            <Form.Control
                onChange={this.handleChange("projectTags")}
                value={this.state.projectTags}
                id="project-tags-input" type="text" placeholder="project tags" />
            
            <div className="flex-div">
                                
            <Form.Control
                className="date-select"
                as="select"
                onChange={this.handleChange("projectYear")}
            >
            {/* set for loop to render these options with this year and back, to dynamically populate and update with each passing year */}
                <option hidden>year</option>
                    <option value='2020'>2020</option>
                    <option value='2019'>2019</option>
                    <option value='2018'>2018</option>
                    <option value='2017'>2017</option>
                    <option value='2016'>2016</option>
                    <option value='2015'>2015</option>
                    <option value='2014'>2014</option>
                    <option value='2013'>2013</option>
                    <option value='2012'>2012</option>
                    <option value='2011'>2011</option>
                    <option value='2010'>2010</option>
                    <option value='2009'>2009</option>
                    <option value='2008'>2008</option>
                    <option value='2007'>2007</option>
                    <option value='2006'>2006</option>
                    <option value='2005'>2005</option>
                    <option value='2004'>2004</option>
                    <option value='2003'>2003</option>
                    <option value='2002'>2002</option>
                    <option value='2001'>2001</option>
                    <option value='2000'>2000</option>
                    <option value='1999'>1999</option>
                    <option value='1998'>1998</option>
                    <option value='1997'>1997</option>
                    <option value='1996'>1996</option>
                    <option value='1995'>1995</option>
                    <option value='1994'>1994</option>
                    <option value='1993'>1993</option>
                    <option value='1992'>1992</option>
                    <option value='1991'>1991</option>
                    <option value='1990'>1990</option>
                    <option value='1989'>1989</option>
                    <option value='1988'>1988</option>
                    <option value='1987'>1987</option>
                    <option value='1986'>1986</option>
                    <option value='1985'>1985</option>
                    <option value='1984'>1984</option>
                    <option value='1983'>1983</option>
                    <option value='1982'>1982</option>
                    <option value='1981'>1981</option>
                    <option value='1980'>1980</option>
                    <option value='1979'>1979</option>
                    <option value='1978'>1978</option>
                    <option value='1977'>1977</option>
                    <option value='1976'>1976</option>
                    <option value='1975'>1975</option>
                    <option value='1974'>1974</option>
                    <option value='1973'>1973</option>
                    <option value='1972'>1972</option>
                    <option value='1971'>1971</option>
                    <option value='1970'>1970</option>
                    <option value='1969'>1969</option>
                    <option value='1968'>1968</option>
                    <option value='1967'>1967</option>
                    <option value='1966'>1966</option>
                    <option value='1965'>1965</option>
                    <option value='1964'>1964</option>
                    <option value='1963'>1963</option>
                    <option value='1962'>1962</option>
                    <option value='1961'>1961</option>
                    <option value='1960'>1960</option>
                    <option value='1959'>1959</option>
                    <option value='1958'>1958</option>
                    <option value='1957'>1957</option>
                    <option value='1956'>1956</option>
                    <option value='1955'>1955</option>
                    <option value='1954'>1954</option>
                    <option value='1953'>1953</option>
                    <option value='1952'>1952</option>
                    <option value='1951'>1951</option>
                    <option value='1950'>1950</option>
            </Form.Control>
        
            <Form.Control
                className="status-select"
                as="select"
                onChange={this.handleChange("projectStatus")}
            >
                <option hidden>project status</option>
                <option value='completed'>completed</option>
                <option value='work in progress'>work in progress</option>
            </Form.Control>

            </div>


            <div className="buttons">
            <Button 
                onClick={this.clickUploadProject}
                id="sign-up-button">Upload Project</Button>{' '}
            </div>

        </Form.Group>

    );

    render() {
        
        const {
            title,
            projectImage,
            body,
            projectMedium,
            projectTags,
            projectYear,
            projectLink,
            projectStatus,
            projectCategory,
            redirectToStudio,
            error,
            user
        } = this.state;
        
        if (redirectToStudio) {
            return <Redirect to={`/artist/studio/${user.username}`} />;
        }

        return (
            <div className="component text-center">
                
                <Jumbotron fluid className="jumbotron" >
                    <div className="vertical-center">
                        <div className="page page-title">
                            upload project</div>
                    </div>                    
                </Jumbotron>

                <div
                    className="form-message-error text-center"
                    style={{ display: error ? "" : "none"}}>    
                        { error }
                </div>

                {this.UploadProjectInputFields(
                    title,
                    projectImage,
                    body,
                    projectMedium,
                    projectTags,
                    projectYear,
                    projectLink,
                    projectCategory,
                    projectStatus
                )}
                
            </div>
        );
    };
}

export default UploadProjectForm