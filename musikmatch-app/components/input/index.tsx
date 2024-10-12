import { IconWrapper, InputContainer, InputElement } from "./styled";

interface InputProps {
    placeholder: string;
    secure: boolean;
    iconPosition: 'left' | 'right' | 'none';
    Icon?: React.JSX.Element;
    iconAction?: () => void;
}

export default function Input(props: InputProps) {

    const { placeholder, secure, iconPosition, Icon, iconAction } = props;

    return (
        <InputContainer>
            {
                iconPosition === 'left' && !!Icon &&
                <IconWrapper onTouchEnd={iconAction}>
                    {Icon}
                </IconWrapper>
            }

            <InputElement
                placeholder={placeholder}
                placeholderTextColor={'#AAA'}
                selectionColor={'#555'}
                secureTextEntry={secure}
            />

            {
                iconPosition === 'right' && !!Icon &&
                <IconWrapper onTouchEnd={iconAction}>
                    {Icon}
                </IconWrapper>
            }
        </InputContainer>
    )
}