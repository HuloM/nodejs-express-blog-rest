import {Disclosure} from '@headlessui/react'
import {useContext, useState} from 'react'
import authContext from '../../../context/AuthContext/auth-context'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Header = props => {
    const ctx = useContext(authContext)
    const [navItems, setNavItems] = useState([
        {name: 'Posts', href: '#', current: true, requireLogin: null, onclick: props.onPostButtonClick},
        {name: 'Sign up', href: '#', current: false, requireLogin: false, onclick: props.onSignupButtonClick},
        {name: 'Login', href: '#', current: false, requireLogin: false, onclick: props.onLoginButtonClick},
        {name: 'Logout', href: '#', current: false, requireLogin: true, onclick: ctx.LogoutUserHandler},
    ])


    const handleButtonClick = event => {
        const buttonClicked = event.target.text
        setNavItems(prevState => {
            for (const navItem of prevState) {
                if (navItem.name === buttonClicked) {
                    navItem.current = true
                    navItem.onclick()
                }
                else
                    navItem.current = false
            }
            return [...prevState]
        })
    }

    return (
        <Disclosure as="nav" className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <h2 className='text-white text-2xl'>{ctx.isLoggedIn && ctx.username !== '' && ctx.username}</h2>
                    <div className="absolute right-0 space-x-4">
                        {navItems.map((item) => (
                            (props.isLoggedIn === item.requireLogin || item.requireLogin === null) &&
                            <a key={item.name} href={item.href} onClick={handleButtonClick}
                                className={classNames(
                                    item.current ? 'bg-gray-900 text-white' :
                                        'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'px-3 py-2 rounded-md text-sm font-medium')}
                                aria-current={item.current ? 'page' : undefined}>
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </Disclosure>
    )
}

export default Header