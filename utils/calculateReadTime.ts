import { PortableTextBlock, toPlainText } from 'next-sanity';

export const calculateReadTime = (content: PortableTextBlock[]): number => {
  const plainText: string = toPlainText(content);
  const wordCount: number = plainText.trim().split(/\s+/).length;
  const readTime: number = Math.ceil(wordCount / 200);
  return readTime;
};
