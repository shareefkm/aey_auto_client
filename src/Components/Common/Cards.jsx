import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CardMedia,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";

function Cards({image , altText, roll, content, path}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate()
  const boxWidth = isSmallScreen ? "100%" : "500px";

  return (
      <Box width={boxWidth} padding={isSmallScreen ? '2rem 0' : 0} mx={isSmallScreen ? 'auto' : 0}>
        <Card sx={{backgroundColor: 'secondary.main'}}>
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt={altText}
          />
          <Box display='flex' justifyContent='space-between'>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" color="primary">
              {roll}
            </Typography>
            <Typography variant="body2" color="white">
            {content}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={()=>navigate(path)}><LoginIcon color="primary" sx={{ fontSize: "2rem" }}/></Button>
          </CardActions>
          </Box>
        </Card>
      </Box>
  );
}

export default Cards;
