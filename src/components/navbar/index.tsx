import { Link } from 'react-router-dom'

import { AuthDropdown } from '@/components/auth-dropdown'

import { InfoContainer, Logo, NavbarContainer, NavbarWrapper, UserContainer, UserInfo } from '@/components/navbar/styles'
import { theme } from '@/globals/theme'
import { NavbarItem } from '@/globals/buttons'
import { useMemo } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { routes } from '@/globals/navbar-routes'

export function Navbar() {
    const { user } = useAuth();

    const navRoutes = useMemo(() => {
        if (user) return routes.ROLE_USER;
        return [];
    }, [user]);

    return (
        <NavbarWrapper>
            <NavbarContainer>
                <Link to={'/'}>
                    <Logo alt='B3 Analytics' src={theme.img.b3Logo} />
                </Link>
                <nav>
                    {navRoutes.map(route => (
                        <NavbarItem
                            to={route.path}
                            key={route.label}
                            $isActive={
                                !route.disabled && (
                                    location.pathname === route.path ||
                                    location.pathname.startsWith(`${route.path}/`)
                                )
                            }
                            $disabled={route.disabled}
                            aria-disabled={route.disabled}
                            tabIndex={route.disabled ? -1 : undefined}
                            onClick={(event) => route.disabled && event.preventDefault()}
                        >
                            <img src={route.icon} alt="Icone" />
                            {route.label}
                        </NavbarItem>
                    ))}


                </nav>
                <InfoContainer>
                    <UserContainer>
                        <UserInfo>
                            <AuthDropdown />
                        </UserInfo>
                    </UserContainer>

                </InfoContainer>

            </NavbarContainer>
        </NavbarWrapper>
    )
}
