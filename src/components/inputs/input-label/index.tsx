import type { FieldValues } from "react-hook-form";

import { AlertError } from "../../../globals/text";
import { Input } from "../input";
import { ContainerInput, Content, StyledInput, StyledLabel } from "./styles";


type InputLabelProps<TFieldValues extends FieldValues> = React.ComponentProps<typeof Input<TFieldValues>> & {
    label: string;
    error?: string;
};

export function InputLabel<TFieldValues extends FieldValues>({ label, error, ...props }: InputLabelProps<TFieldValues>) {
    return (
        <Content>
            {label && (
                <StyledLabel htmlFor={props.name}>{label}</StyledLabel>
            )}
            <ContainerInput error={!!error}>
                <StyledInput id={props.name} {...props} />
            </ContainerInput>
            {error && <AlertError>{error}</AlertError>}
        </Content>
    );
}