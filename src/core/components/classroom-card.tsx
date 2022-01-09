import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import { CLASSROOM_CARD_MEDIA_HEIGHT, CLASSROOM_CARD_WIDTH } from "../../shared/styles";
import { Classroom } from "../../slices/classroom-slice";

interface ClassroomCardProps {
    classroom: Classroom
}

const Description = styled(Typography)({
    height: 40,
    overflow: "hidden",
    textOverflow: "ellipsis"
})


const ClassroomCard: FunctionComponent<ClassroomCardProps> = ({ classroom }) => {
    const history = useHistory()

    const handleClick = () => {
        history.push(`/classrooms/${classroom._id}`)
    }

    return (
        <Card sx={{ maxWidth: CLASSROOM_CARD_WIDTH }} onClick={handleClick}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height={CLASSROOM_CARD_MEDIA_HEIGHT}
                    image="https://media.istockphoto.com/vectors/classroom-nobody-school-classroom-interior-with-teachers-desk-and-vector-id1130490883?k=6&m=1130490883&s=612x612&w=0&h=R_ofyzDvkoX0vXdy2JkVLMWcnXXcv1p_elkeZIFxpJY="
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {classroom.name}
                    </Typography>
                    {/* <Typography variant="subtitle1" color="text.secondary">
                        Trần Thành Long
                    </Typography> */}
                    <Typography variant="caption" color="text.secondary">
                        {classroom.schoolYear}
                    </Typography>
                    <Description variant="subtitle2" color="text.secondary" >
                        {classroom.description}
                    </Description>
                </CardContent>
            </CardActionArea>
        </Card >
    );
}

export default ClassroomCard;