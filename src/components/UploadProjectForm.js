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
                    <option value="1949">1949</option>
                    <option value="1948">1948</option>
                    <option value="1947">1947</option>
                    <option value="1946">1946</option>
                    <option value="1945">1945</option>
                    <option value="1944">1944</option>
                    <option value="1943">1943</option>
                    <option value="1942">1942</option>
                    <option value="1941">1941</option>
                    <option value="1940">1940</option>
                    <option value="1939">1939</option>
                    <option value="1938">1938</option>
                    <option value="1937">1937</option>
                    <option value="1936">1936</option>
                    <option value="1935">1935</option>
                    <option value="1934">1934</option>
                    <option value="1933">1933</option>
                    <option value="1932">1932</option>
                    <option value="1931">1931</option>
                    <option value="1930">1930</option>
                    <option value="1929">1929</option>
                    <option value="1928">1928</option>
                    <option value="1927">1927</option>
                    <option value="1926">1926</option>
                    <option value="1925">1925</option>
                    <option value="1924">1924</option>
                    <option value="1923">1923</option>
                    <option value="1922">1922</option>
                    <option value="1921">1921</option>
                    <option value="1920">1920</option>
                    <option value="1919">1919</option>
                    <option value="1918">1918</option>
                    <option value="1917">1917</option>
                    <option value="1916">1916</option>
                    <option value="1915">1915</option>
                    <option value="1914">1914</option>
                    <option value="1913">1913</option>
                    <option value="1912">1912</option>
                    <option value="1911">1911</option>
                    <option value="1910">1910</option>
                    <option value="1909">1909</option>
                    <option value="1908">1908</option>
                    <option value="1907">1907</option>
                    <option value="1906">1906</option>
                    <option value="1905">1905</option>
                    <option value="1904">1904</option>
                    <option value="1903">1903</option>
                    <option value="1902">1902</option>
                    <option value="1901">1901</option>
                    <option value="1900">1900</option>
                    <option value="1899">1899</option>
                    <option value="1898">1898</option>
                    <option value="1897">1897</option>
                    <option value="1896">1896</option>
                    <option value="1895">1895</option>
                    <option value="1894">1894</option>
                    <option value="1893">1893</option>
                    <option value="1892">1892</option>
                    <option value="1891">1891</option>
                    <option value="1890">1890</option>
                    <option value="1889">1889</option>
                    <option value="1888">1888</option>
                    <option value="1887">1887</option>
                    <option value="1886">1886</option>
                    <option value="1885">1885</option>
                    <option value="1884">1884</option>
                    <option value="1883">1883</option>
                    <option value="1882">1882</option>
                    <option value="1881">1881</option>
                    <option value="1880">1880</option>
                    <option value="1879">1879</option>
                    <option value="1878">1878</option>
                    <option value="1877">1877</option>
                    <option value="1876">1876</option>
                    <option value="1875">1875</option>
                    <option value="1874">1874</option>
                    <option value="1873">1873</option>
                    <option value="1872">1872</option>
                    <option value="1871">1871</option>
                    <option value="1870">1870</option>
                    <option value="1869">1869</option>
                    <option value="1868">1868</option>
                    <option value="1867">1867</option>
                    <option value="1866">1866</option>
                    <option value="1865">1865</option>
                    <option value="1864">1864</option>
                    <option value="1863">1863</option>
                    <option value="1862">1862</option>
                    <option value="1861">1861</option>
                    <option value="1860">1860</option>
                    <option value="1859">1859</option>
                    <option value="1858">1858</option>
                    <option value="1857">1857</option>
                    <option value="1856">1856</option>
                    <option value="1855">1855</option>
                    <option value="1854">1854</option>
                    <option value="1853">1853</option>
                    <option value="1852">1852</option>
                    <option value="1851">1851</option>
                    <option value="1850">1850</option>
                    <option value="1849">1849</option>
                    <option value="1848">1848</option>
                    <option value="1847">1847</option>
                    <option value="1846">1846</option>
                    <option value="1845">1845</option>
                    <option value="1844">1844</option>
                    <option value="1843">1843</option>
                    <option value="1842">1842</option>
                    <option value="1841">1841</option>
                    <option value="1840">1840</option>
                    <option value="1839">1839</option>
                    <option value="1838">1838</option>
                    <option value="1837">1837</option>
                    <option value="1836">1836</option>
                    <option value="1835">1835</option>
                    <option value="1834">1834</option>
                    <option value="1833">1833</option>
                    <option value="1832">1832</option>
                    <option value="1831">1831</option>
                    <option value="1830">1830</option>
                    <option value="1829">1829</option>
                    <option value="1828">1828</option>
                    <option value="1827">1827</option>
                    <option value="1826">1826</option>
                    <option value="1825">1825</option>
                    <option value="1824">1824</option>
                    <option value="1823">1823</option>
                    <option value="1822">1822</option>
                    <option value="1821">1821</option>
                    <option value="1820">1820</option>
                    <option value="1819">1819</option>
                    <option value="1818">1818</option>
                    <option value="1817">1817</option>
                    <option value="1816">1816</option>
                    <option value="1815">1815</option>
                    <option value="1814">1814</option>
                    <option value="1813">1813</option>
                    <option value="1812">1812</option>
                    <option value="1811">1811</option>
                    <option value="1810">1810</option>
                    <option value="1809">1809</option>
                    <option value="1808">1808</option>
                    <option value="1807">1807</option>
                    <option value="1806">1806</option>
                    <option value="1805">1805</option>
                    <option value="1804">1804</option>
                    <option value="1803">1803</option>
                    <option value="1802">1802</option>
                    <option value="1801">1801</option>
                    <option value="1800">1800</option>
                    <option value="1799">1799</option>
                    <option value="1798">1798</option>
                    <option value="1797">1797</option>
                    <option value="1796">1796</option>
                    <option value="1795">1795</option>
                    <option value="1794">1794</option>
                    <option value="1793">1793</option>
                    <option value="1792">1792</option>
                    <option value="1791">1791</option>
                    <option value="1790">1790</option>
                    <option value="1789">1789</option>
                    <option value="1788">1788</option>
                    <option value="1787">1787</option>
                    <option value="1786">1786</option>
                    <option value="1785">1785</option>
                    <option value="1784">1784</option>
                    <option value="1783">1783</option>
                    <option value="1782">1782</option>
                    <option value="1781">1781</option>
                    <option value="1780">1780</option>
                    <option value="1779">1779</option>
                    <option value="1778">1778</option>
                    <option value="1777">1777</option>
                    <option value="1776">1776</option>
                    <option value="1775">1775</option>
                    <option value="1774">1774</option>
                    <option value="1773">1773</option>
                    <option value="1772">1772</option>
                    <option value="1771">1771</option>
                    <option value="1770">1770</option>
                    <option value="1769">1769</option>
                    <option value="1768">1768</option>
                    <option value="1767">1767</option>
                    <option value="1766">1766</option>
                    <option value="1765">1765</option>
                    <option value="1764">1764</option>
                    <option value="1763">1763</option>
                    <option value="1762">1762</option>
                    <option value="1761">1761</option>
                    <option value="1760">1760</option>
                    <option value="1759">1759</option>
                    <option value="1758">1758</option>
                    <option value="1757">1757</option>
                    <option value="1756">1756</option>
                    <option value="1755">1755</option>
                    <option value="1754">1754</option>
                    <option value="1753">1753</option>
                    <option value="1752">1752</option>
                    <option value="1751">1751</option>
                    <option value="1750">1750</option>
                    <option value="1749">1749</option>
                    <option value="1748">1748</option>
                    <option value="1747">1747</option>
                    <option value="1746">1746</option>
                    <option value="1745">1745</option>
                    <option value="1744">1744</option>
                    <option value="1743">1743</option>
                    <option value="1742">1742</option>
                    <option value="1741">1741</option>
                    <option value="1740">1740</option>
                    <option value="1739">1739</option>
                    <option value="1738">1738</option>
                    <option value="1737">1737</option>
                    <option value="1736">1736</option>
                    <option value="1735">1735</option>
                    <option value="1734">1734</option>
                    <option value="1733">1733</option>
                    <option value="1732">1732</option>
                    <option value="1731">1731</option>
                    <option value="1730">1730</option>
                    <option value="1729">1729</option>
                    <option value="1728">1728</option>
                    <option value="1727">1727</option>
                    <option value="1726">1726</option>
                    <option value="1725">1725</option>
                    <option value="1724">1724</option>
                    <option value="1723">1723</option>
                    <option value="1722">1722</option>
                    <option value="1721">1721</option>
                    <option value="1720">1720</option>
                    <option value="1719">1719</option>
                    <option value="1718">1718</option>
                    <option value="1717">1717</option>
                    <option value="1716">1716</option>
                    <option value="1715">1715</option>
                    <option value="1714">1714</option>
                    <option value="1713">1713</option>
                    <option value="1712">1712</option>
                    <option value="1711">1711</option>
                    <option value="1710">1710</option>
                    <option value="1709">1709</option>
                    <option value="1708">1708</option>
                    <option value="1707">1707</option>
                    <option value="1706">1706</option>
                    <option value="1705">1705</option>
                    <option value="1704">1704</option>
                    <option value="1703">1703</option>
                    <option value="1702">1702</option>
                    <option value="1701">1701</option>
                    <option value="1700">1700</option>
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
                            add to your gallery</div>
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