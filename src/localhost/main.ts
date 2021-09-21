import {Client} from '@notionhq/client'

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_KEY,
});
// const daily_database_id: string = process.env.DAILY_DATABASE_ID;
async function getTodayPage() {
  let date = new Date();
  let dateStr: string = date.toISOString().slice(0, 10)
  const response = await notion.databases.query({
    database_id: process.env.DAILY_DATABASE_ID,
    filter: {
      property: 'Date',
      date: {
        equals: dateStr,
      },
    },
  });
  console.log(response);
}
getTodayPage();
