import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { FunctionComponent } from "react";

export const VerticalCenterContainer = styled(Box)(({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
}));

export const HorizontalCenterContainer = styled(Box)(({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
}));

export const CenterContainer: FunctionComponent<{ children: any }> = ({ children }): JSX.Element => {
    return (
        <VerticalCenterContainer>
            <HorizontalCenterContainer>
                {children}
            </HorizontalCenterContainer>
        </VerticalCenterContainer>
    )
}