import { Text } from "react-native";
import { ButtonText, CustomButtonStyle } from "./styled";

interface CustomButtonProps {
    text: string;
    backgroundColor: string;
    color: string;
    width?: string;
    buttonAction: () => void;
}

export default function CustomButton(props: CustomButtonProps) {
    const { text, backgroundColor, color, width, buttonAction } = props;

    return (
        <CustomButtonStyle onPress={buttonAction} $backgroundColor={backgroundColor} $width={width}>
            <ButtonText $textColor={color}>{text}</ButtonText>
        </CustomButtonStyle>
    )
}