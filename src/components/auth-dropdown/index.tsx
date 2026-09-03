import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { OutlineButton, PrimaryButton } from '@/globals/buttons'
import { UserAvatar } from '@/components/user-avatar'
import { useAuth } from '@/hooks/useAuth'

import { Panel, TriggerButton, Wrapper } from '@/components/auth-dropdown/styles'

export function AuthDropdown() {
    const { user, isAuthenticated, handleLogout } = useAuth()

    const [isOpen, setIsOpen] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    if (isAuthenticated) {
        return (
            <Wrapper ref={wrapperRef}>
                <TriggerButton type="button" onClick={() => setIsOpen((value) => !value)}>
                    <UserAvatar name={user?.name ?? ''} size="small" />
                    {user?.name}
                </TriggerButton>

                {isOpen && (
                    <Panel>
                        <OutlineButton as={Link} to="/profile" onClick={() => setIsOpen(false)}>
                            Perfil
                        </OutlineButton>
                        <PrimaryButton type="button" onClick={handleLogout}>
                            Sair
                        </PrimaryButton>
                    </Panel>
                )}
            </Wrapper>
        )
    }

    return (
        <Wrapper ref={wrapperRef}>
            <TriggerButton type="button" onClick={() => setIsOpen((value) => !value)}>
                Conta
            </TriggerButton>

            {isOpen && (
                <Panel>
                    <PrimaryButton as={Link} to="/login" onClick={() => setIsOpen(false)}>
                        Entrar
                    </PrimaryButton>
                    <PrimaryButton as={Link} to="/register" onClick={() => setIsOpen(false)}>
                        Cadastrar
                    </PrimaryButton>
                </Panel>
            )}
        </Wrapper>
    )
}
