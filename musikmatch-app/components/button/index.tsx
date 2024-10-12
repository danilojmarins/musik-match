import { Text } from "react-native";
import { ButtonText, CustomButtonStyle } from "./styled";

interface CustomButtonProps {
    text: string;
    backgroundColor: string;
    color: string;
}

export default function CustomButton(props: CustomButtonProps) {
    const { text, backgroundColor, color } = props;

    return (
        <CustomButtonStyle $backgroundColor={backgroundColor}>
            <ButtonText $textColor={color}>{text}</ButtonText>
        </CustomButtonStyle>
    )
}