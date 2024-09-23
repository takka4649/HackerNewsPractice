import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { typeNewsPostsData } from '../../../types/types';
import { styled } from '@mui/system';
import { Comment, Favorite } from '@mui/icons-material';

interface PostCardProps {
  newsPost: typeNewsPostsData;
}
const CardFlexBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});
const NewsPostCard: React.FC<PostCardProps> = ({ newsPost }) => {
  return (
    <Card variant="outlined" sx={{ width: '80%', margin: '0 auto 20px auto' }}>
      <CardContent>
        <CardFlexBox>
          <Typography fontWeight={500}>{newsPost.by}</Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(newsPost.time * 1000).toLocaleString()}
          </Typography>
        </CardFlexBox>
        <Typography variant="h5" component="h3" mt={1} mb={2}>
          {newsPost.title}
        </Typography>
        <CardFlexBox>
          <CardFlexBox sx={{ gap: '8px' }}>
            <Favorite color="error" />
            <Typography variant="body1">{newsPost.score}</Typography>
          </CardFlexBox>
          <CardFlexBox sx={{ gap: '8px' }}>
            <Comment color="primary" />
            <Typography variant="body1">{newsPost.descendants}</Typography>
          </CardFlexBox>
        </CardFlexBox>
      </CardContent>
      {newsPost.url && (
        <CardActions>
          <Button size="small" href={newsPost.url} target="_blank">
            Read More
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default NewsPostCard;
