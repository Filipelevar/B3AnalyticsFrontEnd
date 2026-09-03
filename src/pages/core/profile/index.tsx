import { useState } from 'react'

import { Column, Container, Row } from '@/globals/grid'
import { UserAvatar } from '@/components/user-avatar'
import { ShowPasswordButton } from '@/components/buttons/show-password-button'
import { useAuthStore } from '@/stores/auth-store'

import { ProfileCard, ProfileField } from '@/pages/core/profile/styles'

export function Profile() {
    const user = useAuthStore((state) => state.user)
    const [showPassword, setShowPassword] = useState(false)

    if (!user) return null

    return (
        <Container>
            <Row>
                <Column desktop={6}>
                    <h1>Meu perfil</h1>

                    <ProfileCard>
                        <UserAvatar name={user.name} size="large" />

                        <ProfileField>
                            <label>Nome</label>
                            <p>{user.name}</p>
                        </ProfileField>

                        <ProfileField>
                            <label>E-mail</label>
                            <p>{user.email}</p>
                        </ProfileField>

                        <ProfileField>
                            <label>Senha</label>
                            <div>
                                <p>{showPassword ? 'Não é possível exibir sua senha por segurança' : '••••••••'}</p>
                                <ShowPasswordButton
                                    isShowing={showPassword}
                                    clickFunction={() => setShowPassword(!showPassword)}
                                />
                            </div>
                        </ProfileField>
                    </ProfileCard>
                </Column>
            </Row>
        </Container>
    )
}
