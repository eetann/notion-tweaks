# Notion Tweaks
Chrome Extension to tweak Notion.

## Installation
Chrome Web Store link is [Here](https://chrome.google.com/webstore/detail/notion-tweaks/fodemmhibeapiocbkojhfpbbiipojcof)

<!-- 日本語の記事はこちら -->

## Features

+ Open or Create Today's Page of a specific database
+ Create Page of a specific database quickly
+ Enter the timestamp(HH:mm) quickly
+ Close Slash command menu and Emoji menu
+ Narrow the page margins when page width is less than 850px
+ Narrow the margin at the bottom of Code Block
+ Always show the language of Code Block


### Today's Page
If you specify the id of the Notion database and type `Ctrl + shit + y`,
Today's Page of that database will be opened.  
If the page has not been created, it will opened after it is created.  

Here are the details of the page that was created.

|               |              |
|---------------|--------------|
| Title         | `YYYY-MM-DD` |
| Date property | `YYYY-MM-DD` |
| Page Contents | None         |

![onTodayPage](./imgs/onTodayPage.gif)

**require**

+ [`Share` a database with yout integration](https://developers.notion.com/docs)
+ set `Select API` and `GAS URL or Notion API key`
+ Daily Database id
+ Turn on `Today's Page` in the Settings page


## Create Page of a specific database quickly
If you specify the id of the Notion database and type `Ctrl + q` + `z` in Notion page,
Untitled Page of that database will be created and insert the url.  
If you were selecting a string, that string will become the title.  

This is useful when Notion is treated as a Zettelkasten.  

I forget the spelling `Zettelkasten`, so I write z10n.  

![onCreateZ10n](./imgs/onCreateZ10n.gif)

**require**

+ [`Share` a database with yout integration](https://developers.notion.com/docs)
+ set `Select API` and `GAS URL or Notion API key`
+ z10n Database id
+ Turn on `Create Page of z10n database` in the Settings page
+ If you have already opened a Notion page, reload it


### Enter the timestamp(HH:mm) quickly
If you type `Ctrl + q` + `t` in Notion page,
timestamp will be inserted. Its format is `HH:mm`.  

![onTimeStamp](./imgs/onTimeStamp.gif)

**require**
+ Turn on `Time Stamp` in the Settings page
+ If you have already opened a Notion page, reload it


### Close Slash command menu and Emoji menu
If you type `Ctrl + q` + `c` while Slach command or Emoji menu is displaying,
the menu will be closed.  
Pressing the escape key to do the same thing, so we don't need this feature.  

![onCloseMenu](./imgs/onCloseMenu.gif)

**require**
+ Turn on `Close menu` in the Settings page
+ If you have already opened a Notion page, reload it


### Narrow the page margins
This feature makes the page margin narrower **when page width is less than 850px**.  
This is useful for displaying windows side-by-side or in the Vivaldi web panel.


![Narrow the page margins](./imgs/narrow-page-margin-page.jpg)

:thumbsup: **Preview, too!**

![Narrow the page preview margins](./imgs/narrow-page-margin-preview.jpg)

**require**
+ Turn on `Narrow the page margins` in the Settings page
+ If you have already opened a Notion page, reload it


### Narrow the margin at the bottom of Code Block
This feature makes the margin at the bottom of Code Block narrower.  

![NarrowerCodeBlockBottom](./imgs/narrow-code-block-bottom.jpg)

**require**
+ Turn on `Narrower Code Block Bottom` in the Settings page
+ If you have already opened a Notion page, reload it


### Always show the language of Code Block
This feature makes the language of Code Block always visible.  

![ShowCodeBlockLanguage](./imgs/ShowCodeBlockLanguage.gif)

**require**
+ Turn on `Show Code Block Language` in the Settings page
+ If you have already opened a Notion page, reload it


## About APIs
There are 2 ways to run Notion API for this Extension.  
Use at your own risk.


### Use Notion API directly
In this method, the API key of Notion API is directly stored in `chrome.storage.local`.  
This is dangerous because the storage isn't encrypted.  


### Use Google Apps Script
In this method, the API key of Notion API is stored in Script's scriptProperties of your Google Apps Script,
and the URL that the script can will be executed is stored in `chrome.storage.local`.  
To use the URL, you need to sign in with your Google account.

**require**
+ Creat Script ([Document](https://developers.google.com/apps-script/guides/standalone))
+ Copy and Paste [This Code](https://github.com/eetann/notion-tweaks/blob/main/src/gas.js)
+ Set your API key `scriptProperties.setProperties({ "NOTION_API_KEY": "YOUR_API_KEY", });`
+ Run `init` function
+ Delete `init` function from the code
+ Deploy and copy the URL
    + (You can use `Test deployments`)
    + Type: web app
    + Permissions: Execute the app as me
+ set `Select API: GAS URL` and the URL
