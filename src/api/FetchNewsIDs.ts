import { typeNewsPostsData } from '../types/types';

// HackerNewsのAPIのベースURL
const BASE_URL = 'https://hacker-news.firebaseio.com/v0/';

// ニュース記事のID一覧を取得する
export async function fetchNewsIDs(tabName: string, page: number): Promise<number[]> {
  const allnewsIDs = await fetch(`${BASE_URL}${tabName}stories.json`);
  if (!allnewsIDs.ok) {
    throw new Error('fetchNewsIDs:ニュース記事のID取得に失敗しました。');
  }
  const NewsIDList: number[] = await allnewsIDs.json();
  const dividedNewsIDs: number[] = NewsIDList.slice(page * 10 - 10, 10 * page);
  return dividedNewsIDs;
}

// 記事のIDを基に詳細情報の取得
export async function fetchNewsPost(id: number): Promise<typeNewsPostsData> {
  const newsPost = await fetch(`${BASE_URL}item/${id}.json`);
  if (!newsPost.ok) {
    throw new Error('fetchnewsPost:記事の詳細情報取得に失敗しました。');
  }
  const newsPostData = await newsPost.json();

  const post: typeNewsPostsData = {
    id: newsPostData.id,
    title: newsPostData.title,
    by: newsPostData.by,
    score: newsPostData.score,
    descendants: newsPostData.descendants,
    time: newsPostData.time,
    url: newsPostData.url,
  };

  return post;
}
