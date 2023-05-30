import { Row, Col } from 'react-bootstrap';
import { websiteTitle } from '../../consts/consts';

/**
 * Represents the title component.
 * Displays a title with a background image.
 */
function Title() {

    /**
     * The inline style object for the title container.
     */
    const divStyle = {
        backgroundImage: 'url(titleImg.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        height: '30vh',
        color: 'beige',
        padding: '20px',
        textAlign: 'center'
    };

    /**
     * The inline style object for the title text.
     */
    const titleStyle = {
        marginTop: '40px',
        fontSize: '3rem', // Add this line to increase the font size
        fontFamily: 'cursive', // Add this line to set a fancy font
        textShadow: '2px 2px 5px black', // Add this line to add a text shadow
    };

    /**
     * The inline style object for the title text on small screens.
     */
    const smallScreenTitleStyle = {
        ...titleStyle,
        fontSize: '2rem',
    };

    return (
        /**
         * Renders the title component.
         *
         * @returns {JSX.Element} The JSX element representing the title component.
         */
        <div style={divStyle}>
            <Row>
                <Col>
                    <h1 className="d-none d-md-block" style={titleStyle}>{websiteTitle}</h1>
                    <h1 className="d-block d-md-none" style={smallScreenTitleStyle}>{websiteTitle}</h1>
                </Col>
            </Row>
        </div>
    );
}

export default Title;
