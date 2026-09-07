import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { FieldErrors } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import type { AxiosError } from 'axios'
import toast from 'react-hot-toast'

import { Column, Container, Row } from '@/globals/grid'
import { Label } from '@/globals/forms'
import { PrimaryButton } from '@/globals/buttons'
import { theme } from '@/globals/theme'
import { Input } from '@/components/inputs/input'
import { ShowPasswordButton } from '@/components/buttons/show-password-button'
import { register as registerUser } from '@/services/auth.service'
import type { RegisterUserDTO } from '@/types/AuthTypes'

import { ContainerInputs, Divider, LogoContainer, RightSection } from '@/pages/core/auth-layout/styles'

export function Register() {
    const { register, handleSubmit, formState } = useForm<RegisterUserDTO>()
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)

    async function createAccount(userData: RegisterUserDTO) {
        try {
            await registerUser(userData)
            toast.success('Conta criada com sucesso. Faça login para continuar.', { id: 'register-success' })
            navigate('/login', { replace: true })
        } catch (error) {
            const axiosError = error as AxiosError<{ message?: string }>
            const status = axiosError?.response?.status
            const backendMessage = axiosError?.response?.data?.message

            const message = status === 409
                ? 'Este e-mail já está cadastrado.'
                : status === 400 && backendMessage?.toLowerCase().includes('password')
                    ? 'A senha deve ter pelo menos 8 caracteres.'
                    : backendMessage
                        ?? (axiosError?.request
                            ? 'Não foi possível conectar ao servidor.'
                            : 'Não foi possível criar a conta.')

            toast.error(message, { id: 'register-error' })
        }
    }

    function onInvalid(errors: FieldErrors<RegisterUserDTO>) {
        const message = Object.values(errors)[0]?.message
        toast.error(message ?? 'Preencha os campos obrigatórios.', { id: 'register-validation' })
    }

    return (
        <Container>
            <Row>
                <Column desktop={6}>
                    <LogoContainer>
                        <img src={theme.img.b3Logo} alt="Logo" />
                    </LogoContainer>

                    <form onSubmit={handleSubmit(createAccount, onInvalid)}>
                        <ContainerInputs>
                            <h2>Crie sua conta</h2>
                            <Divider />

                            <Label>
                                Nome
                                <Input
                                    autoComplete="name"
                                    placeholder="Seu nome completo"
                                    name="name"
                                    type="text"
                                    isRequired
                                    register={register}
                                />
                            </Label>

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
                                    autoComplete="new-password"
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

                            <Link to="/login">Já tem conta? Entrar</Link>

                            <Divider />

                            <Row>
                                <Column>
                                    <PrimaryButton type="submit" disabled={formState.isSubmitting}>
                                        Cadastrar
                                    </PrimaryButton>
                                </Column>
                            </Row>
                        </ContainerInputs>
                    </form>
                </Column>

                <Column desktop={6}>
                    <RightSection>
                        <img src={theme.img.tradeLogin} alt="Imagem de cadastro" />
                    </RightSection>
                </Column>
            </Row>
        </Container>
    )
}
