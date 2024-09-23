import React, { useEffect, useState } from 'react';

// 型定義
type Story = {
  id: number;
  title: string;
  by: string;
  score: number;
  descendants: number;
  time: number;
  url?: string;
};

const FetchItemStatus: React.FC = () => {
  const [story, setStory] = useState<Story | null>(null);

  // UNIXタイムスタンプを通常の日付に変換
  const convertUnixTimeToDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  // データ取得
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch('https://hacker-news.firebaseio.com/v0/item/8863.json');
        const data: Story = await response.json();
        setStory(data);
      } catch (error) {
        console.error('Error fetching story:', error);
      }
    };

    fetchStory();
  }, []);

  return (
    <div>
      {story ? (
        <div>
          {/* 記事のタイトル */}
          <h2>{story.title}</h2>
          {/* 投稿者 */}
          <p>Posted by: {story.by}</p>
          {/* 投稿日時 */}
          <p>Posted on: {convertUnixTimeToDate(story.time)}</p>
          {/* スコア */}
          <p>Score: {story.score}</p>
          {/* コメント数 */}
          <p>Comments: {story.descendants}</p>
          {/* URLがあればリンクを表示 */}
          {story.url && (
            <a href={story.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          )}
        </div>
      ) : (
        <p>Loading story...</p>
      )}
    </div>
  );
};

export default FetchItemStatus;
