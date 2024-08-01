import { list } from "postcss";
import { title } from "process";
import { validation } from "sanity";

const schema = {
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type :'string',
      require,
      validation: (Rule:any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'slug',
      type: 'slug',
      options: { source: 'title'}
    },
    {
      name: 'downloadlink',
      title: 'Dowload Link',
      type: 'url',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'views',
      title: 'Views',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'poster',
      title: 'Poster',
      type: 'image',
      validation: (Rule: any) => Rule.required(),
      options: {
        hotspot: true,
      }
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      valiidation: (Rule: any) => Rule.required(),
      options:{
        list: ['fronted', 'backend', 'next 13', 'fullstack', 'other']
      }
    }
  ]
}

export default schema;