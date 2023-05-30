import './navStyle.css';

import { websiteTitle } from '../../consts/consts';

/**
 * Represents the navigation bar component.
 * Displays a navigation menu with links to different pages.
 */
export default function Navbar() {
    return (
        /**
         * Renders the navigation bar.
         *
         * @returns {JSX.Element} The JSX element representing the navigation bar.
         */
        <nav className={'nav'}>
            <a href={'/'} className={'site-title'}>
                {websiteTitle}
            </a>
            <ul>
                <li className={'active'}>
                    <a href={'/search'}>Search</a>
                </li>
                <li>
                    <a href={'/cart'}>Cart</a>
                </li>
            </ul>
        </nav>
    );
}
