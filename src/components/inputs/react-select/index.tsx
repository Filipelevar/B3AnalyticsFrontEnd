import Select from 'react-select';
import type { StylesConfig } from 'react-select';
import { Controller } from 'react-hook-form';
import type { Control, FieldValues, Path } from 'react-hook-form';

import { ReactSelectError, selectCustomStyles } from './styles';

export type SelectOption = {
    label: string,
    value: string | number,
    type?: number
}

type SelectInputProps<TFieldValues extends FieldValues> = {
    control: Control<TFieldValues>,
    name: Path<TFieldValues>,
    isMulti?: boolean,
    isRequired?: boolean,
    options?: SelectOption[],
    placeholder?: string,
    isSearchable?: boolean,
    isDisabled?: boolean,
    extraStyles?: StylesConfig<SelectOption, boolean>
}

export function ReactSelect<TFieldValues extends FieldValues>({
    control,
    name,
    isMulti = false,
    options = [],
    placeholder,
    isSearchable = false,
    isRequired = false,
    extraStyles = {},
    ...props
}: SelectInputProps<TFieldValues>) {
    return (
        <Controller
            control={control}
            name={name}
            rules={{ required: isRequired ? "Campo obrigatório" : undefined }}
            render={({ field, fieldState: { error } }) => (<>
                <Select<SelectOption, boolean>
                    {...props}
                    name={field.name}
                    value={field.value as SelectOption | SelectOption[] | null}
                    onBlur={field.onBlur}
                    onChange={(value) => field.onChange(value)}
                    styles={{ ...selectCustomStyles, ...extraStyles }}
                    options={options}
                    isMulti={isMulti}
                    placeholder={placeholder}
                    isSearchable={isSearchable}
                    components={{ IndicatorSeparator: null }}
                />
                {error && <ReactSelectError>{error.message}</ReactSelectError>}
            </>)}
        />)
}
