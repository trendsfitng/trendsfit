import type { StructureResolver } from 'sanity/structure';
import {
  MdInfo,
  MdComment,
  MdCampaign,
  MdEmail,
  MdArticle,
  MdCategory,
  MdPerson,
} from 'react-icons/md';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Tales of Style Blog')
    .items([
      S.documentTypeListItem('post').title('Posts').icon(MdArticle),
      S.documentTypeListItem('category').title('Categories').icon(MdCategory),
      S.documentTypeListItem('author').title('Authors').icon(MdPerson),

      S.divider(),
      S.divider(),
      S.divider(),
      S.listItem()
        .title('About Us')
        .icon(MdInfo)
        .child(
          S.editor().id('aboutUs').schemaType('about').documentId('aboutUs')
        ),
      S.divider(),
      S.divider(),
      S.divider(),
      S.documentTypeListItem('advert').title('Adverts').icon(MdCampaign),
      S.documentTypeListItem('newsletter')
        .title('Newsletter Signup')
        .icon(MdEmail),

      S.documentTypeListItem('comment').title('Comments').icon(MdComment),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            'post',
            'category',
            'author',
            'about',
            'comment',
            'advert',
            'newsletter',
          ].includes(item.getId()!)
      ),

      S.divider(),
    ]);
