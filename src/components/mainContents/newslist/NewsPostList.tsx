import { Box, CircularProgress, Stack } from '@mui/material';
import NewsPostCard from './NewsPostCard';
import { useEffect, useState } from 'react';
import { fetchNewsIDs, fetchNewsPost } from '../../../api/FetchNewsIDs';
import { typeNewsPostsData } from '../../../types/types';

interface pageKindProps {
  tabName: string;
  page: number;
  setPage: (page: number) => void;
}

const NewsPostList: React.FC<pageKindProps> = ({ tabName, page, setPage }) => {
  const [newsPosts, setNewsPosts] = useState<typeNewsPostsData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPage(1);
  }, [tabName]);

  // データ取得
  useEffect(() => {
    setLoading(true);

    const fetchHackerNews = async () => {
      try {
        //tabNameに応じて10件データ取得
        const dividedNewsIDs = await fetchNewsIDs(tabName, page);
        // IDに応じたニュースの情報を取得
        const newsPostList = dividedNewsIDs.map((id) => fetchNewsPost(id));
        // Promise.allで並行して非同期処理を行う
        const newsPostsData: typeNewsPostsData[] = await Promise.all(newsPostList);
        setNewsPosts(newsPostsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Post:', error);
        setLoading(false);
      }
    };

    fetchHackerNews();
  }, [tabName, page]);

  return (
    <>
      <Stack>
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          newsPosts?.map((newsPost) => <NewsPostCard key={newsPost.id} newsPost={newsPost} />)
        )}
      </Stack>
    </>
  );
};

export default NewsPostList;
