import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import type { AxiosError } from 'axios'
import toast from 'react-hot-toast'

import { Column, Container, Row } from '@/globals/grid'
import { Label } from '@/globals/forms'
import { PrimaryButton } from '@/globals/buttons'
import { theme } from '@/globals/theme'
import { Input } from '@/components/inputs/input'
import { ShowPasswordButton } from '@/components/buttons/show-password-button'
import { useAuth } from '@/hooks/useAuth'
import type { LoginUserDTO } from '@/types/AuthTypes'

import { ContainerInputs, Divider, LogoContainer, RightSection } from '@/pages/core/auth-layout/styles'

export function Login() {
    const { register, handleSubmit, formState } = useForm<LoginUserDTO>()
    const { handleSignIn } = useAuth()

    const [showPassword, setShowPassword] = useState(false)

    async function authenticate(credentials: LoginUserDTO) {
        try {
            await handleSignIn(credentials)
        } catch (error) {
            const message = (error as AxiosError<{ message?: string }>)?.response?.data?.message
            toast.error(message ?? 'Não foi possível autenticar.', { id: 'login-error' })
        }
    }

    return (
        <Container>
            <Row>
                <Column desktop={6}>
                    <LogoContainer>
                        <img src={theme.img.b3Logo} alt="Logo" />
                    </LogoContainer>

                    <form onSubmit={handleSubmit(authenticate)}>
                        <ContainerInputs>
                            <h2>Acesse sua conta</h2>
                            <Divider />

                            <Label>
                                E-mail
                                <Input
                                    autoComplete="username"
                                    placeholder="seuemail@exemplo.com"
                                    name="email"
                                    type="email"
                                    isRequired
                                    register={register}
                                />
                            </Label>

                            <Label>
                                Senha
                                <Input
                                    autoComplete="current-password"
                                    placeholder="**********"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    isRequired
                                    register={register}
                                />
                                <ShowPasswordButton
                                    isShowing={showPassword}
                                    clickFunction={() => setShowPassword(!showPassword)}
                                />
                            </Label>

                            <Link to="/register">Ainda não tem conta? Cadastre-se</Link>

                            <Divider />

                            <Row>
                                <Column>
                                    <PrimaryButton type="submit" disabled={formState.isSubmitting}>
                                        Entrar
                                    </PrimaryButton>
                                </Column>
                            </Row>
                        </ContainerInputs>
                    </form>
                </Column>

                <Column desktop={6}>
                    <RightSection>
                        <img src={theme.img.tradeLogin} alt="Imagem de login" />
                    </RightSection>
                </Column>
            </Row>
        </Container>
    )
}
