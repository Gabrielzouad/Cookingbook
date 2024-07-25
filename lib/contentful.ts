// lib/contentful.js
import { createClient } from 'contentful';

if(!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
    throw new Error('Please provide CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN');
    }

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export const getAllRecipes = async () => {
  const entries = await client.getEntries({ content_type: 'recipe' });
  return entries.items.map(item => ({
    id: item.sys.id,
    slug: item.fields.slug,
    title: item.fields.title,
    description: item.fields.description,
    ingredients: item.fields.ingredients,
  }));
};

export const getRecipe = async (slug: string) => {
  const entries = await client.getEntries({
    content_type: 'recipe',
    'fields.slug': slug,
  });
  return entries.items[0].fields;
};
