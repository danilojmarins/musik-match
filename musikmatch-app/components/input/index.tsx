import { IconWrapper, InputContainer, InputElement } from "./styled";

interface InputProps {
    placeholder: string;
    secure: boolean;
    value: string | undefined;
    multiline?: boolean;
    iconPosition: 'left' | 'right' | 'none';
    Icon?: React.JSX.Element;
    iconAction?: () => void;
    onChangeText: (text: string) => void;
}

export default function Input(props: InputProps) {

    const {
        placeholder,
        secure,
        value,
        multiline,
        iconPosition,
        Icon,
        iconAction,
        onChangeText
    } = props;

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
                multiline={multiline ? multiline : false}
                numberOfLines={multiline ? 3 : undefined}
                maxLength={256}
                value={value}
                onChangeText={onChangeText}
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