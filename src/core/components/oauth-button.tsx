import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { startCase } from 'lodash';
import { FunctionComponent } from "react";
import FACEBOOK_LOGO from '../../public/icons/facebook.png';
import GOOGLE_LOGO from '../../public/icons/google.png';
import { LOGO_WIDTH } from "../../shared/styles";

export enum Provider {
    GOOGLE = "google",
    FACEBOOK = "facebook"
}
interface OauthButtonProps {
    name: Provider,
    onClick: any,
    disabled: boolean | undefined
}

const Logo = styled('img')`
    width: ${LOGO_WIDTH}px;
    height: ${LOGO_WIDTH}px;
    margin-right: 8px;
`

const OAuthButton: FunctionComponent<OauthButtonProps> = ({ name, onClick, disabled }) => {
    const getIcon = () => {
        switch (name) {
            case Provider.GOOGLE:
                return GOOGLE_LOGO
            case Provider.FACEBOOK:
                return FACEBOOK_LOGO
        }
    }

    return (
        <Button sx={{ borderRadius: '29px', mb: 1, mt: 1 }} variant="outlined" fullWidth onClick={onClick} disabled={disabled}>
            <Logo src={getIcon()} />
            <Typography variant="button"> Continue with {startCase(name)} </Typography>
        </Button>

    );
}

export default OAuthButton;