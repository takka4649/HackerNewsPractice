import React, { useEffect, useState } from 'react';

// ニュース記事の型を定義
interface Story {
  id: number;
  title: string;
  url: string;
}

const FetchSample: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // HackerNews APIから記事を取得する関数
  const fetchTopStories = async (): Promise<void> => {
    try {
      const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
      const storyIds: number[] = await response.json();

      // 上位5つのストーリーの詳細を取得
      const top5StoryIds = storyIds.slice(0, 10);
      const storyPromises = top5StoryIds.map((id) =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((res) => res.json())
      );

      const storiesData: Story[] = await Promise.all(storyPromises);
      setStories(storiesData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stories:', error);
      setLoading(false);
    }
  };

  // コンポーネントのマウント時にAPI呼び出しを行う
  useEffect(() => {
    fetchTopStories();
  }, []);

  return (
    <div>
      <h1>HackerNews Top Stories</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {stories.map((story) => (
            <li key={story.id}>
              <a href={story.url} target="_blank" rel="noopener noreferrer">
                {story.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FetchSample;
