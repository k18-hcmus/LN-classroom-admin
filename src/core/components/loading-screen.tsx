import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import SpinnerLoading from "./spinner-loading";

const StyledContainer = styled(Box)(({ theme }) => ({
    position: 'fixed',
    bottom: 0,
    right: 0,
    zIndex: theme.zIndex.modal + 1,
    height: "100%",
    width: "100%",
    backgroundColor: theme.colors.background.pageBackground
}));

const LoadingScreen = () => {
    return (
        <StyledContainer >
            <SpinnerLoading />
        </StyledContainer>
    );
}

export default LoadingScreen;