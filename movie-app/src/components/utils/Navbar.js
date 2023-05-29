import './navStyle.css'

import {websiteTitle} from '../../consts/consts'
export default function Navbar() {
    return <nav className={'nav'}>
        <a href={'/'} className={"site-title"}>{websiteTitle}</a>
        <ul>
            <li className={'active'}>
                <a href={'/search'}>Search</a>
            </li>
            <li>
                <a href={'/cart'}>Cart</a>
            </li>
        </ul>
    </nav>
}