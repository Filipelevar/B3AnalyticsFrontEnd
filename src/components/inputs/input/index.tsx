import type { InputHTMLAttributes } from 'react'
import type { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'

type InputProps<TFieldValues extends FieldValues> = InputHTMLAttributes<HTMLInputElement> & {
    register: UseFormRegister<TFieldValues>
    registerOptions?: RegisterOptions<TFieldValues>
    isRequired?: boolean
    name: Path<TFieldValues>
}

export function Input<TFieldValues extends FieldValues>({
    registerOptions,
    register,
    isRequired,
    name,
    ...rest
}: InputProps<TFieldValues>) {
    return (
        <input
            {...register(name, {
                required: isRequired ? 'Preenchimento obrigatório' : false,
                ...registerOptions,
            })}
            {...rest}
        />
    )
}