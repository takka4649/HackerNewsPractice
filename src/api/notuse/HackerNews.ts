// HackerNewsのAPIのベースURL
const BASE_URL = 'https://hacker-news.firebaseio.com/v0/';

// ニュース記事のID一覧を取得する
async function fetchTopStories(): Promise<number[]> {
  const response = await fetch(`${BASE_URL}topstories.json`);
  if (!response.ok) {
    throw new Error('Failed to fetch top stories');
  }
  const data: number[] = await response.json();
  return data;
}

// 特定の記事の詳細情報を取得する関数
async function fetchStory(id: number): Promise<any> {
  const response = await fetch(`${BASE_URL}item/${id}.json`);
  if (!response.ok) {
    throw new Error('Failed to fetch story');
  }
  const data = await response.json();
  return data;
}

// 取得した記事の一覧を表示する関数
async function fetchAndDisplayTopStories(): Promise<void> {
  try {
    const storyIds = await fetchTopStories();
    const top5Stories = storyIds.slice(0, 10); // 上位10件の記事を取得
    const stories = await Promise.all(top5Stories.map((id) => fetchStory(id)));

    stories.forEach((story) => {
      console.log(`Title: ${story.title}, URL: ${story.url}`);
    });
  } catch (error) {
    console.error(error);
  }
}

// 実行
fetchAndDisplayTopStories();
