import { Link } from 'react-router-dom'

import { AuthDropdown } from '@/components/auth-dropdown'

import { Brand, NavbarContainer, NavbarWrapper } from '@/components/navbar/styles'

export function Navbar() {
    return (
        <NavbarWrapper>
            <NavbarContainer>
                <Brand as={Link} to="/">B3 Analytics</Brand>
                <nav>
                    <AuthDropdown />
                </nav>
            </NavbarContainer>
        </NavbarWrapper>
    )
}
